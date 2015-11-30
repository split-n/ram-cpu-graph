var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, { path: '/r-node/socket.io' });

app.use("/r-node", express.static('public_html'));

io.on('connection', function(socket){
  console.log('a user connected');
  console.log(socket);
});


server.listen(5500, '0.0.0.0', function(){
  console.log('listening on *:5500');
});

setInterval(function() {
  var msg = (new Date()).toString();
  io.emit("message", msg);
  console.log("emit message: " + msg);
}, 2000);
