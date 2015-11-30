var socket = io();
socket.on("message", function(msg) {
  $("<li>").append(msg).appendTo($("ul"));
});
