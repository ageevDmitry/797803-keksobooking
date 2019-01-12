'use strict';

(function () {

  var PIC_WIDTH = 50;
  var PIC_HEIGHT = 70;
  var similarPicElement = document.querySelector('.map__pins');
  var similarPicTemplate = document.querySelector('#pin').content;


  var renderPic = function (apartment) {

    var picElement = similarPicTemplate.cloneNode(true);

    picElement.querySelector('button').setAttribute('style', 'left: ' + (apartment.location.x - PIC_WIDTH / 2) + 'px; top: ' + (apartment.location.y - PIC_HEIGHT) + 'px;');
    picElement.querySelector('img').setAttribute('src', apartment.author.avatar);
    picElement.querySelector('img').setAttribute('alt', apartment.offer.title);

    return picElement;
  };

  var fragmentPic = document.createDocumentFragment();

  var otherPics = function (pics) {

    for (var j = 0; j < pics.length; j++) {
      fragmentPic.appendChild(renderPic(pics[j]));
    }

    return fragmentPic;
  };

  window.server.load(otherPics, window.error.rendErrorMessage);

  window.pin = {
    similarPicElement: similarPicElement,
    fragmentPic: fragmentPic,
  };

})();
