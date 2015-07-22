'use strict';

var IMG_TYPE_PNG = 'png';
var IMG_TYPE = [IMG_TYPE_PNG, 'gif', 'bmp', 'jpeg', 'webp'];

for (var i = 0; i < IMG_TYPE.length; i++) {
  exports[IMG_TYPE[i].toUpperCase()] = IMG_TYPE[i];
}

exports.resize = function resize(img, width, height, type) {
  if (!img || !width) {
    return img;
  }
  if (IMG_TYPE.indexOf(type) < 0) {
    type = IMG_TYPE_PNG;
  }
  height = height || width;
  // 按原图缩放
  var detImg = img.width / img.height;
  if (width / height > detImg) {
    height = width / detImg;
  } else {
    width = height * detImg;
  }
  // 画到 canvas 中
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');
  if (type !== IMG_TYPE_PNG) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL('image/' + type);
};
