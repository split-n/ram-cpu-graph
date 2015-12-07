var os = require('os');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, { path: '/r-node/socket.io' });
var procfs = require('procfs-stats');

var OUT_EMIT_LOG = process.argv.indexOf("-d") != -1

app.use("/r-node", express.static(__dirname + '/public_html'));

var connects = 0;
var prevCpu;

io.on('connection', function(socket){
  console.log('a user connected');
  connects++;
  console.log(connects + " users connected");

  socket.on('disconnect', function(){
    console.log('a user disconnected');
    connects--;
    console.log(connects + " users connected");
  });
});


server.listen(5500, '0.0.0.0', function(){
  console.log('listening on *:5500');
});

setInterval(function() {
  if(connects) {
    procfs.cpu(function(err, data) {
      if(prevCpu) {
        var diffUser = parseInt(data.cpu.user) - parseInt(prevCpu.cpu.user);
        var diffSystem = parseInt(data.cpu.system) - parseInt(prevCpu.cpu.system);
        var diffIdle = parseInt(data.cpu.idle) - parseInt(prevCpu.cpu.idle);

        var diffAll = diffUser + diffSystem + diffIdle;
        var cpuIdle = Math.round(diffIdle / diffAll * 100);

        var info = {
          memory: {
            total: os.totalmem(),
            free: os.freemem()
          },
          cpuIdle: cpuIdle,
          time: (new Date()).getTime()
        };

        var msg = JSON.stringify(info);
        io.emit("info", msg);
        if(OUT_EMIT_LOG) {
          console.log("emit info: " + msg);
        }
      }

      prevCpu = data;
    });
  }
}, 200);
