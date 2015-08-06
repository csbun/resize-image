var resizeImage = require('../index');

var display = document.getElementById('display');

// resize an <img> to 200*100
function resize(url, type) {
  var img = new Image();
  display.innerHTML = '';
  img.onload= function () {
    var data = resizeImage.resize(img, 200, 100, type);
    var smallImg = new Image();
    display.appendChild(smallImg);
    smallImg.src = data;
  };
  display.appendChild(img);
  img.src = url;
}

// resize an <img> to jpeg
// this png comes from https://www.google.com/images/srpr/logo11w.png
resize('/google.png', resizeImage.JPEG);


// resize an <input type="file"> to canvas
var fr = new FileReader();
fr.onload = function () {
  var img = new Image();
  img.onload= function () {
    var canvas = resizeImage.resize2Canvas(img, 200, 100);
    display.appendChild(canvas);
    // resize canvas to a smaller PNG data
    var data = resizeImage.resize(canvas, 100, 50, resizeImage.PNG);
    var smallImg = new Image();
    display.appendChild(smallImg);
    smallImg.src = data;
  };
  display.appendChild(img);
  img.src = fr.result;
};

var input = document.getElementById('input-file');
input.onchange = function (e) {
  fr.readAsDataURL(input.files[0]);
};
