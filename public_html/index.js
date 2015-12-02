var socket = io({path: '/r-node/socket.io', 'sync disconnect on unload': true });
socket.on("connected", function(msg) {
  console.log(msg);
});
socket.on("info", function(infoJson) {
  var info = JSON.parse(infoJson);
  var total = Math.round(info.memory.total/1048576);
  var free = Math.round(info.memory.free/1048576);
  var time = info.time;

  var msg = `${time} Total: ${total}MB, Free: ${free}MB`;
  $("<li>").append(msg).appendTo($("ul"));
});


