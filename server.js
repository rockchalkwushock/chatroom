import socket_io from 'socket.io';
import http from 'http';
import express from 'express';

let app = express();
app.use(express.static('build'));

let server = http.Server(app); // Allows socket_io to run alongside express.
let io = socket_io(server); // Creates a socket_io server that acts as an EventEmitter()

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.broadcast.emit('user connected');
    socket.on('message', (message) => {      // listens for a message from Client and then prints that message.
       console.log('Received message:', message);
       socket.broadcast.emit('message', message); // sends message to all clients on server (except socket object which is being used by the Server: aka. the client who sent the message.)
   });
   socket.on('disconnect',  () => {
     socket.broadcast.emit('user disconnected');
   });

});




server.listen(process.env.PORT || 3000);
