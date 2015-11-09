var url = require('url');
var Nightmare = require('nightmare');
var assert = require('assert');
// enable generator `it('', function * () {})`
require('mocha-generators').install();

var PORT = 7500;
var ASSERT_SIZE = 200;

describe('resize-image', function () {
  this.timeout(5000);
  // start server
  before(function (done) {
    require('./server').listen(PORT, done);
  });

  // test `.resize`
  it('.resize: Resize any image to ' + ASSERT_SIZE, function * () {
    var nightmare = Nightmare();

    var min = yield nightmare
      .goto('http://0.0.0.0:' + PORT + '/')
      .evaluate(function (ASSERT_SIZE) {
        var img = document.getElementById('img');
        // resize
        var base64 = window.ResizeImage.resize(img, ASSERT_SIZE, ASSERT_SIZE, ResizeImage.PNG);
        // get resized image size
        var resizedImg = new Image();
        resizedImg.src = base64;
        return Math.min(resizedImg.width, resizedImg.height);
      }, ASSERT_SIZE)

    yield nightmare.end();
    assert.equal(min, ASSERT_SIZE);
  });
});