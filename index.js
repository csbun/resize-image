(function(root, factory) {
  'use strict';
  /* istanbul ignore else  */
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(function() {
      return factory();
    });
  } else if (typeof define === 'function' && define.cmd) {
    // CMD
    define(function(require, exports, module) {
      module.exports = factory();
    });
  } else {
    // Global Variables
    root.ResizeImage = factory();
  }
})(this, function () {
  'use strict';
  var out = {};

  var IMG_TYPE_PNG = 'png';
  var IMG_TYPE = [IMG_TYPE_PNG, 'gif', 'bmp', 'jpeg', 'webp'];

  for (var i = 0; i < IMG_TYPE.length; i++) {
    out[IMG_TYPE[i].toUpperCase()] = IMG_TYPE[i];
  }

  /**
   * 计算新图片宽高
   * Calculate new picture width
   * 
   * @private
   * @param  {Image}  img    an <img> or Image() or <canvas>
   * @param  {number} width  output image width
   * @param  {number} height output image height
   * @return {array<number>} [ width, height ]
   */
  function getNewImageDimentions(img, width, height) {
    var detImg = img.width / img.height;
    if (width > 0 && height > 0) {
      // 同时指定了宽高，按原图缩放
      // At the same time specify the width and height, according to the original zoom
      if (width / height > detImg) {
        height = width / detImg;
      } else {
        width = height * detImg;
      }
      return [ width, height ];
    } else if (width > 0) {
      // 只指定宽度的情况
      // Only specify width
      return [ width, width / detImg ];
    } else if (height > 0) {
      // 只指定高度的情况
      // Only specify the height
      return [ height * detImg, height ];
    } else {
      // 否则原 size 返回
      // Otherwise the original size returns
      return [ img.width, img.height ];
    }
  }

  /**
   * resize an <img> or <canvas> to canvas
   * @param  {Image}  img    an <img> or Image() or <canvas>
   * @param  {number} width  output image width
   * @param  {number} height output image height
   * @return {Canvas}        output image canvas
   */
  function resize2Canvas(img, width, height) {
    if (!img) {
      throw new Error('`img` is required.');
    }
    // 计算新图片的宽高
    // Calculate the width and height of the new image
    var newImageDimentions = getNewImageDimentions(img, width, height);
    width = newImageDimentions[0];
    height = newImageDimentions[1];
    
    // 画到 canvas 中
    // Draw to canvas
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    return canvas;
  }
  out.resize2Canvas = resize2Canvas;

  /**
   * resize an <img> or <canvas> to base64
   * @param  {Image}  img    an <img> or Image() or <canvas
   * @param  {number} width  output image width
   * @param  {number} height output image height
   * @param  {string} type   output image type
   * @return {string}        output image base64 string
   */
  out.resize = function resize(img, width, height, type) {
    if (IMG_TYPE.indexOf(type) < 0) {
      type = IMG_TYPE_PNG;
    }
    var canvas = resize2Canvas(img, width, height);
    var ctx = canvas.getContext('2d');
    // set backgrund color to #fff while output type is NOT PNG
    if (type !== IMG_TYPE_PNG) {
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = '';
    }
    return canvas.toDataURL('image/' + type);
  };

  return out;
});
