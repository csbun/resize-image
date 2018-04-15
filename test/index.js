'use strict';

const resizeImage = require('../index');
const assert = require('assert');

const ASSERT_SIZE = 200;

describe('.resize', function() {

  it('Should throw Error with empty `img`', function() {
    assert.throws(function() {
      resizeImage.resize()
    });
  });

  it('Resize any image to (' + ASSERT_SIZE + ',' + ASSERT_SIZE + ')', function(done) {
    const img = new Image();
    img.onload = function() {
      const base64 = resizeImage.resize(img, ASSERT_SIZE, ASSERT_SIZE, resizeImage.PNG);
      const resizedImg = new Image();
      resizedImg.onload = function() {
        const minWH = Math.min(resizedImg.width, resizedImg.height);
        assert.equal(minWH, ASSERT_SIZE);
        done();
      };
      resizedImg.src = base64;
    };
    // use webpack [url-loader](https://github.com/webpack/url-loader) peer with file-loader
    // use `url-loader!file` here, NO need to specialize in webpack.conf.js
    img.src = require('url-loader!../example/google.png');
  });

  it('Resize any image to width: ' + ASSERT_SIZE, function(done) {
    const img = new Image();
    img.onload = function() {
      const base64 = resizeImage.resize(img, ASSERT_SIZE);
      const resizedImg = new Image();
      resizedImg.onload = function() {
        assert.equal(resizedImg.width, ASSERT_SIZE);
        done();
      };
      resizedImg.src = base64;
    };
    img.src = require('url-loader!../example/google.png');
  });


  it('Resize any image to height: ' + ASSERT_SIZE, function(done) {
    const img = new Image();
    img.onload = function() {
      const base64 = resizeImage.resize(img, 0, ASSERT_SIZE);
      const resizedImg = new Image();
      resizedImg.onload = function() {
        assert.equal(resizedImg.height, ASSERT_SIZE);
        done();
      };
      resizedImg.src = base64;
    };
    img.src = require('url-loader!../example/google.png');
  });

  it('Should fill with #fff for JPEG', function(done) {
    const img = new Image();
    img.onload = function() {
      const base64 = resizeImage.resize(img, 0, 0, resizeImage.JPEG);
      const resizedImg = new Image();
      resizedImg.onload = function() {
        const { width, height } = resizedImg;
        // 应该和原图片大小相同
        assert.equal(width, img.width);
        assert.equal(height, img.height);
        // 左上角的点应该是白色
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(resizedImg, 0, 0, width, height);
        const color = ctx.getImageData(1, 1, 1, 1).data;
        assert.equal(color[0], 255);
        assert.equal(color[1], 255);
        assert.equal(color[2], 255);
        assert.equal(color[3], 255);
        done();
      };
      resizedImg.src = base64;
    };
    img.src = require('url-loader!../example/google.png');
  });

});
