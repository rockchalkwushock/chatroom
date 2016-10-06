import socket_io from 'socket.io';
import http from 'http';
import express from 'express';

let app = express();
app.use(express.static('build'));

let server = http.Server(app); // Allows socket_io to run alongside express.
let io = socket_io(server); // Creates a socket_io server that acts as an EventEmitter()
let counter = 0;
let people = {};

// Conncetion made to Server.
io.on('connection', (socket) => {
    console.log('Client connected');
    // Counting # of users online
    counter +=1;
    console.log(counter + ' client(s) connected');
    socket.broadcast.emit('user connected');
    socket.on('message', (user, message) => {      // listens for a message from Client and then prints that message.
       console.log('Received message:', people[socket.id] ,message);
       socket.broadcast.emit('message', people[socket.id] ,message); // sends message to all clients on server (except socket object which is being used by the Server: aka. the client who sent the message.)
   });

   socket.on('join', (user) => {
     people[socket.id] = user;
     console.log(user, ' has joined the room.');

     socket.broadcast.emit('join', user);
   });

   // Disconnecting from Server.
   socket.on('disconnect',  () => {
     // Counting # of users online
     counter -=1;
     console.log(counter + ' client(s) connected');
     socket.broadcast.emit('user disconnected');

     let user = people[socket.id];
     console.log(user + ' has left the chatroom.');
     delete people[socket.id];
     io.emit('remove-user', user);
   });

});




server.listen(process.env.PORT || 3000);
