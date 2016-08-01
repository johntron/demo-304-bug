var express = require('express');
var app = express();
var etag = '"6cbeebe0e3de380a47f72b8ecd18812f"';

app.use(express.static('public', {maxAge: 1000}));

app.get('/test', function (req, res) {
  console.log(req.get('If-None-Match'), etag);
  
  res.set('ETag', etag);
  
  if (req.get('If-None-Match') === etag) {
    return res.status(304).end();
  }
  
  res.end('{"response": "success!"}');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

listener.on('connection', function(socket) {
  console.log("A new connection was made by a client.");
  socket.setTimeout(30 * 1000);
})
