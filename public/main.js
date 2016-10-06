import $ from 'jquery';


$(document).ready(() => {
  // Manager object, will automatically attempt to connect to the server
  // allowing sending and receiving of messages.
  // let socket = io();
  let input = $('input');
  let message = $('#message');

  let addMessage = (message) => {
    messages.append('<div>' + message + '</div>');
  };

  input.on('keydown', (event) => {
    if (event.keyCode != 13) {
        return;
    }

    let message = input.val();
    addMessage(message);
    // socket.emit('message', message); // send message to Server...text from input box.
    input.val('');
  });
});


// Where to put this:
// socket.on('message', addMessage);
