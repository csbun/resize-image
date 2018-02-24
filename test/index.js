'use strict';

const resizeImage = require('../index');
const assert = require('assert');

const ASSERT_SIZE = 200;

describe('resize-image', function () {
    it('.resize: Resize any image to ' + ASSERT_SIZE, function (done) {
        const img = new Image();
        // use webpack [url-loader](https://github.com/webpack/url-loader) peer with file-loader
        // use `url-loader!file` here, NO need to specialize in webpack.conf.js
        img.src = require('url-loader!../example/google.png');
        img.onload = function () {
            const base64 = resizeImage.resize(img, ASSERT_SIZE, ASSERT_SIZE, resizeImage.PNG);
            const resizedImg = new Image();
            resizedImg.onload = function () {
                const minWH = Math.min(resizedImg.width, resizedImg.height);
                assert.equal(minWH, ASSERT_SIZE);
                done();
            };
            resizedImg.src = base64;
        };

    });
});
