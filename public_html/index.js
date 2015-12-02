var socket = io({path: '/r-node/socket.io', 'sync disconnect on unload': true });
socket.on("connected", function(msg) {
  console.log(msg);
});
socket.on("meminfo", function(meminfo) {
  var m = JSON.parse(meminfo);
  var total = Math.round(m.total/1048576);
  var free = Math.round(m.free/1048576);

  var msg = `Total: ${total}MB, Free: ${free}MB`;
  $("<li>").append(msg).appendTo($("ul"));
});


