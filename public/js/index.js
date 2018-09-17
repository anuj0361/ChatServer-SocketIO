var socket=io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect',function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('New message', message);
  var li=jQuery('<li></li>');
  li.text(`${message.from}:${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {

  var li=jQuery('<li></li>');
  var  a=jQuery('<a target="_blank">My currernt location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from:'User',
    text:jQuery('[name=message]').val()
  }, function (data) {
    console.log(data)
  });
});

var locationButton=jQuery('#send-location');
locationButton.on('click', function (){
  if(!navigator.geolocation) {
    return alert('Geolocation not supported');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  }, function (){
    alert('Unable to fetch position');
  });
});
