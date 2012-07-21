var http = require('http')
  , handler = require('../')({
      realm: 'My secret server',
      accounts: ['foo:1234']
    })
  , port = 3001
  ;

http.createServer(function(req, res) {
  handler(req, res, function() {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('welcome!');
    res.end();
  });
}).listen(port, function() {
  console.log('test server running on port ' + port);
});