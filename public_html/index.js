var ioUrl = location.host + ":" + location.port + "/r-node";
var socket = io(ioUrl, { path: '/r-node/socket.io' });
socket.on("connected", function(msg) {
  console.log(msg);
});
socket.on("message", function(msg) {
  $("<li>").append(msg).appendTo($("ul"));
});
