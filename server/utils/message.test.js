var expect=require('expect');
var {generateMessage,generateLocationMessage}=require('./message');

describe('generateMessage', ()=>{
  it('should generate correct message object', ()=>{
    var from='anj';
    var text='somthng';
    var message=generateMessage(from,text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });
});


describe('generateLocationMessage', ()=>{
  it('should generate correct location object', ()=>{
    var from='anj12';
    var latitude='10';
    var longitude='15';
    var url='https://www.google.com/maps?q=10,15'
    var message=generateLocationMessage(from,latitude,longitude);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,url});
  });
});
