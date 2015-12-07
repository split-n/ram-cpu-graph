var memChartInstance;

function initChart(range_max) {
  memChartInstance = $('#area').epoch({
      type: 'time.line',
      data: [{label: "freemem", values: []}],
      axes: ['right', 'bottom'],
      range: [0, range_max],
      queueSize: 1
  });
}

$(document).ready(function() {
  var socket = io({path: '/r-node/socket.io', 'sync disconnect on unload': true });
  socket.on("connected", function(msg) {
    console.log(msg);
  });
  socket.on("info", function(infoJson) {
    var info = JSON.parse(infoJson);
    var totalMB = Math.round(info.memory.total/1048576);
    var freeMB = Math.round(info.memory.free/1048576);
    var usedMB = totalMB-freeMB;
    var time = Math.floor(info.time/1000)
    if (!memChartInstance) {
      initChart(info.memory.total);
    }
    var used = info.memory.total - info.memory.free
    memChartInstance.push([{time:time, y:used}]);
    $("#mem_free").text(freeMB);
    $("#mem_used").text(usedMB);
    $("#mem_total").text(totalMB);
    console.log(info);
  });

  $("#disconnect-btn").on('click', function(){
    socket.disconnect();
  });

});

