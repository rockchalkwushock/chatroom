import $ from 'jquery';


$(document).ready(() => {
  // Manager object, will automatically attempt to connect to the server
  // allowing sending and receiving of messages.
  let socket = io();
  let input = $('input');
  let message = $('#messages');

  let addMessage = (msg) => {
    message.append('<div>' + msg + '</div>');
  };

  input.on('keydown', (event) => {
    if (event.keyCode != 13) {

        return;
    }

    let message = input.val();
    addMessage(message);
    socket.emit('message', message); // send message to Server...text from input box.
    input.val('');
  });
  socket.on('message', addMessage);
  socket.on('user connected', () => {
    message.append('User is connected.');
  });
  socket.on('user disconnected', () => {
    message.append('User is disconnected.');
  });
});
