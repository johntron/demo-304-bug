var express = require('express');
var app = express();
var etag = '"6cbeebe0e3de380a47f72b8ecd18812b"';

app.use(express.static('public', {maxAge: 1000}));
app.get('/test/1', function (req, res) {
  console.log(req.get('If-None-Match'), etag);
  
  res.set({
    'Cache-Control': 'max-age=0, private, must-revalidate',
    'ETag': etag,
	'Connection': 'keep-alive'
  });
  
  if (req.get('If-None-Match') === etag) {
    res.status(304).end();
    return;
  }
  
  res.set({
	  'Transfer-Encoding': 'chunked',
  	  'Content-Type': 'application/json; charset=utf-8'
  });
  res.end('{"response": "success!"}');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


listener.on('connection', function(socket) {
  console.log("A new connection was made by a client.");
  socket.setTimeout(30 * 1000); 
  // 30 second timeout. Change this as you see fit.
})
