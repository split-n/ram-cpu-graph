var socket = io({path: '/r-node/socket.io' });
socket.on("connected", function(msg) {
  console.log(msg);
});
socket.on("message", function(msg) {
  $("<li>").append(msg).appendTo($("ul"));
});
