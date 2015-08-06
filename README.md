# resize-image
Resize images in browser using canvas

## Install

### npm

```sh
npm i resize-image --save
```

### bower

```sh
bower install resize-image --save
```

## Usage

```javascript
var resizeImage = require('resize-image');

var img = new Image();
img.onload= function () {
  var data = resizeImage.resize(img, 200, 100, resizeImage.PNG);
  console.log(data);
};
img.src = url; // local image url
```

### .resize2Canvas(img, width, height)

resize an <img> or Image or <canvas> to canvas

- {Image}  img:    an <img> or Image()
- {number} width:  output image width
- {number} height: output image height

### .resize(img, width, height, type)

resize an <img> or Image or <canvas> to base64

- {Image}  img:    an <img> or Image()
- {number} width:  output image width
- {number} height: output image height
- {string} type:   output image type

### types

- .PNG
- .GIF
- .BMP
- .JPEG
- .WEBP

## Examples

- [simple example](https://github.com/csbun/resize-image/tree/master/example)
