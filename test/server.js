var fs = require('fs');
var path = require('path');
var http = require('http');

var html = fs.readFileSync(path.join(__dirname, 'test.html'), 'utf8');

var pngFile = path.join(__dirname, '../example/google.png');
var pngStat = fs.statSync(pngFile);

var jsFile = path.join(__dirname, '../index.js');
var jsStat = fs.statSync(jsFile);

module.exports = http.createServer(function (req, res) {
  if (req.url === '/resize-image.js') {
    res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Content-Length': jsStat.size
    });
    fs.createReadStream(jsFile).pipe(res);
  } else if (req.url === '/google.png') {
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': pngStat.size
    });
    var readStream = fs.createReadStream(pngFile);
    readStream.pipe(res);
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  }
});
