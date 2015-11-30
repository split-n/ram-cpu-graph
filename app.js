var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public_html/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});


http.listen(5500, function(){
  console.log('listening on *:5500');
});

setInterval(function() {
  var msg = (new Date()).toString();
  io.emit("message", msg, { for: 'everyone' });
  console.log("emit message: " + msg);
}, 2000);
