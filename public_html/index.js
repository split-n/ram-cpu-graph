var memChartInstance;
var cpuChartInstance;

function initMemChart(range_max) {
  memChartInstance = $('#memChart').epoch({
      type: 'time.line',
      data: [{label: "freemem", values: []}],
      axes: ['right', 'bottom'],
      range: [0, range_max],
      queueSize: 1,
      margins: { right: 70 },
      tickFormats: {
        right: function(v) {
          return Math.floor(v/1024/1024) + " MB  ";
        },
        bottom: function(v) {
          return (new Date(v)).toLocaleTimeString();
        }
      }
  });
}

function applyInfoJson(infoJson) {
    var info = JSON.parse(infoJson);
    var totalMB = Math.round(info.memory.total/1048576);
    var freeMB = Math.round(info.memory.free/1048576);
    var usedMB = totalMB-freeMB;
    var time = info.time
    if (!memChartInstance) { // only first
      initMemChart(info.memory.total);
    }
    var usedMem = info.memory.total - info.memory.free
    memChartInstance.push([{time:time, y:usedMem}]);
    $("#mem_free").text(freeMB);
    $("#mem_used").text(usedMB);
    $("#mem_total").text(totalMB);

    var cpuUsed = 100 - info.cpuIdle;
    cpuChartInstance.push([{time:time, y:cpuUsed}]);
    $("#cpu_used").text(cpuUsed);

    console.log(info);
}

$(document).ready(function() {
  cpuChartInstance = $('#cpuChart').epoch({
      type: 'time.line',
      data: [{label: "usedCpu", values: []}],
      axes: ['right', 'bottom'],
      range: [0, 100],
      queueSize: 1,
      margins: { right: 70 },
      tickFormats: {
        right: function(v) {
          return v + " %";
        },
        bottom: function(v) {
          return (new Date(v)).toLocaleTimeString();
        }
      }
  });

  var socket = io({path: '/r-node/socket.io', 'sync disconnect on unload': true });
  socket.on("connected", function(msg) {
    console.log(msg);
  });

  socket.on("info", applyInfoJson);
});

