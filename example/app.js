var fs = require('fs');
var http = require('http');
var browserify = require('browserify');

var html = fs.readFileSync('./example.html', 'utf8');
var pngFile = './google.png';
var pngStat = fs.statSync(pngFile);

http.createServer(function (req, res) {
  if (req.url === '/google.png') {
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': pngStat.size
    });
    var readStream = fs.createReadStream(pngFile);
    readStream.pipe(res);
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    browserify('./example.js', { debug: true })
      .bundle(function (err, buf) {
        if (buf) {
          res.end(html.replace('{js}', buf.toString()));
        } else {
          res.end(err.toString());
        }
      });
  }
}).listen(4000, function () {
  console.log('server start on 4000');
});
