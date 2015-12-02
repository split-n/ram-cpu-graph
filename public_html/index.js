$(document).ready(function() {
  var memChartInstance = $('#area').epoch({
      type: 'time.line',
      data: [{label: "freemem", values: []}],
      axes: ['right', 'bottom', 'left']
  });


  var socket = io({path: '/r-node/socket.io', 'sync disconnect on unload': true });
  socket.on("connected", function(msg) {
    console.log(msg);
  });
  socket.on("info", function(infoJson) {
    var info = JSON.parse(infoJson);
    var total = Math.round(info.memory.total/1048576);
    var free = Math.round(info.memory.free/1048576);
    var time = Math.floor(info.time/1000)
    if (memChartInstance) {
      memChartInstance.push([{time:time, y:free}]);
      console.log(info);
    }
  });

  $("#disconnect-btn").on('click', function(){
    socket.disconnect();
  });

});

