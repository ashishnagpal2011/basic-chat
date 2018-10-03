var socket=io.connect('http://localhost:3000');

var output=document.getElementById('output');
var username=document.getElementById('username');
var message=document.getElementById('message');
var btn=document.getElementById('send');
var feedback=document.getElementById('feedback');

btn.addEventListener('click',function(){
  socket.emit('chat',{
    username:username.value,
    message:message.value
  });
});

message.addEventListener('keypress',function(){
  socket.emit('typing',username.value);
});

socket.on('chat',function(data){
  var d = new Date();
  feedback.innerHTML="";
  output.innerHTML+='<p><strong>'+data.username+' <font color=green>'+d.getHours()+':'+d.getMinutes()+'</font>'+':</strong>'+data.message+'</p>';
});

socket.on('typing',function(data){
  feedback.innerHTML='<p><em>'+data+' is typing a message...'+'</em></p>';
});

function image (base64Image) {
	var d = new Date();
	//output.innerHTML+='<p><strong>'+username.value+' <font color=green>'+d.getHours()+':'+d.getMinutes()+'</font>'+':</strong>'+'</p>'+'</br>'+'<img src="' + base64Image + '"/>';
    $('#output').append($('<p>').append($('<strong>').text(username.value), '<strong>' +' <font color=green>'+d.getHours()+':'+d.getMinutes()+'</font>'+'</strong>'+'</br>', '<img src="' + base64Image + '"/>'));
 }


socket.on('user image', image);


$('#imagefile').bind('change', function(e){
      var data = e.originalEvent.target.files[0];
      var reader = new FileReader();
      reader.onload = function(evt){
        image(evt.target.result);
        socket.emit('user image', evt.target.result);
      };
      reader.readAsDataURL(data);   
    });