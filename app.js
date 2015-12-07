var os = require('os');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, { path: '/r-node/socket.io' });
var child_process = require('child_process');

var OUT_EMIT_LOG = process.argv.indexOf("-d") != -1

app.use("/r-node", express.static(__dirname + '/public_html'));

var connects = 0;

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
    // sorry but sync
    var vmstat = child_process.execSync("vmstat").toString().split("\n")[2];
    var cpuIdle = parseInt(vmstat.split(/\s+/)[15]);

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
}, 200);
