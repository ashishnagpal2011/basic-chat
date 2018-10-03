var express=require('express');
var socket=require('socket.io');

//Creating a variable to start express
var app=express();

//Setting the server on port number for listening
var server=app.listen(3000,function(){
	console.log("Server started successfully :)");
});

//static variables
app.use(express.static('public'));

//Socket setup
var io=socket(server);

io.on('connection',function(socket){
	console.log("Made socket connection :)",socket.id);
	socket.on('chat',function(data){
		io.sockets.emit('chat',data);
	});
	socket.on('typing',function(data){
		socket.broadcast.emit('typing',data);
	});

	socket.on('user image', function (msg) {
      //console.log(msg);
      socket.broadcast.emit('user image',msg);
    });

});
