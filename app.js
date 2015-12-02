var os = require('os');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, { path: '/r-node/socket.io' });

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
    var meminfo = {total: os.totalmem(), free: os.freemem()};
    var msg = JSON.stringify(meminfo);
    io.emit("meminfo", msg);
    console.log("emit mem: " + msg);
  }
}, 1000);
