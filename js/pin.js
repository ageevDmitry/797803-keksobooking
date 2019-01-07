'use strict';

(function () {

  var PIC_WIDTH = 40;
  var PIC_HEIGHT = 40;
  var similarPicElement = document.querySelector('.map__pins');
  var similarPicTemplate = document.querySelector('#pin').content;

  var renderPic = function (apartment) {

    var picElement = similarPicTemplate.cloneNode(true);

    picElement.querySelector('button').setAttribute('style', 'left: ' + (apartment.location.x + PIC_WIDTH / 2) + 'px; top: ' + (apartment.location.y + PIC_HEIGHT) + 'px;');
    picElement.querySelector('img').setAttribute('src', apartment.author.avatar);
    picElement.querySelector('img').setAttribute('alt', apartment.offer.title);

    return picElement;
  };

  var fragmentPic = document.createDocumentFragment();

  for (var j = 0; j < window.data.apartments.length; j++) {
    fragmentPic.appendChild(renderPic(window.data.apartments[j]));
  }

  window.pin = {
    similarPicElement: similarPicElement,
    fragmentPic: fragmentPic,
  };

})();
