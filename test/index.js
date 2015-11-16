'use strict';

const resizeImage = require('../index');
const assert = require('assert');

const ASSERT_SIZE = 200;

describe('resize-image', function () {
    it('.resize: Resize any image to ' + ASSERT_SIZE, function (done) {
        let img = new Image();
        // use [url-loader](https://github.com/webpack/url-loader)
        img.src = require('url!../example/google.png');
        img.onload = function () {
            let base64 = resizeImage.resize(img, ASSERT_SIZE, ASSERT_SIZE, resizeImage.PNG);
            let resizedImg = new Image();
            resizedImg.onload = function () {
                let minWH = Math.min(resizedImg.width, resizedImg.height);
                assert.equal(minWH, ASSERT_SIZE);
                done();
            };
            resizedImg.src = base64;
        };

    });
});
