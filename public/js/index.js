var socket=io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect',function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  var timeStamp=moment(message.createdAt).format('h:mm a');
  var template=jQuery('#message-template').html();
  var html=Mustache.render(template, {
    text:message.text,
    from:message.from,
    createdAt:timeStamp
  });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
  var timeStamp=moment(message.createdAt).format('h:mm a');
  var template=jQuery('#location-message-template').html();
  var html=Mustache.render(template, {
    url:message.url,
    from:message.from,
    createdAt:timeStamp
  });
  jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from:'User',
    text:jQuery('[name=message]').val()
  }, function () {
    jQuery('[name=message]').val('')
  });
});

var locationButton=jQuery('#send-location');
locationButton.on('click', function (){
  if(!navigator.geolocation) {
    return alert('Geolocation not supported');
  }
locationButton.attr('disabled','disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  }, function (){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch position');
  });
});
