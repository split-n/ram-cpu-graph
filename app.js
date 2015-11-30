var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public_html'));

io.on('connection', function(socket){
  console.log('a user connected');
});


http.listen(5500, function(){
  console.log('listening on *:5500');
});

setInterval(function() {
  var msg = (new Date()).toString();
  io.emit("message", msg);
  console.log("emit message: " + msg);
}, 2000);
