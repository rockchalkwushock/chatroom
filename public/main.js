import $ from 'jquery';


$(document).ready(() => {
  // Manager object, will automatically attempt to connect to the server
  // allowing sending and receiving of messages.
  let socket = io();
  let join = $('#join');
  let send = $('#send');
  let name = $('#name');
  let msg = $('#msg');
  let message = $('#messages');
  let connected = $('#connected');
  let num_users = 0;


  // Add Message to DOM.
  let addMessage = (user, msg) => {
    message.append('<div>' + user + ': ' + msg + '</div>');
  };

  // Add a new User.
  let addUser = (user) => {
    message.append('<div>' + user + ' has joined the chatroom.' + '</div>');
    num_users++;
  };
  socket.on('user connected', () => {
    connected.html(num_users + ' users are currently in the chatroom.');
  });

  // Removing a User.
  let removeUser = (user) => {
    message.append('<div>' + user + ' has left the chatroom.' + '</div>');
    num_users--;
  };
  socket.on('user disconnected', () => {
    connected.html(num_users + ' users are currently in the chatroom.');
  });

  // User Join Event
  join.on('click', (event) => {
    let user = name.val();
    addUser(user);
    name.val('');
    socket.emit('join', user); // maybe broadcast.emit()???



    // Message Sending Event
    msg.on('keydown', (event) => {
      if (event.keyCode != 13) {
          return;
      }
      let message = msg.val();
      if (message !== '') {
        addMessage(user, message);
        socket.emit('message', user, message); // send message to Server...text from input box.
        msg.val('');
      }
  });

  send.on('click', (event) => {
    let message = msg.val();
    addMessage(user, message);
    socket.emit('message', user, message); // send message to Server...text from input box.
    msg.val('');
  });
});

  socket.on('join', addUser);
  socket.on('message', addMessage);
  socket.on('remove-user', removeUser);
});
