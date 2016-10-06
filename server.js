// import socket_io from 'socket.io';
// import http from 'http';
import express from 'express';

let app = express();
app.use(express.static('public'));

// let server = http.Server(app); // Allows socket_io to run alongside express.
// let io = socket_io(server); // Creates a socket_io server that acts as an EventEmitter()
//
// io.on('connection', (socket) => {
//     console.log('Client connected');
// });


// server.listen(process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
