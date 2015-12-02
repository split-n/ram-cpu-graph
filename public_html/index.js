var socket = io({path: '/r-node/socket.io', 'sync disconnect on unload': true });
socket.on("connected", function(msg) {
  console.log(msg);
});
socket.on("message", function(msg) {
  $("<li>").append(msg).appendTo($("ul"));
});


