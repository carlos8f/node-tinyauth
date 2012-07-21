node-tinyauth
-------------

Really basic basic authentication middleware

Example
=======

```javascript
var http = require('http')
  , handler = require('tinyauth')({
      realm: 'My secret server',
      accounts: ['foo:1234']
    })
  , port = 3000
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
```

License
=======

MIT