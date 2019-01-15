'use strict';

(function () {

  var PIC_WIDTH = 50;
  var PIC_HEIGHT = 70;
  var MAX_QUANTITY_PICS = 5;
  var similarPicElement = document.querySelector('.map__pins');
  var similarPicTemplate = document.querySelector('#pin').content;
  var serverArrPins = [];
  var startState = true;

  var renderPic = function (apartment) {

    var picElement = similarPicTemplate.cloneNode(true);

    picElement.querySelector('button').setAttribute('style', 'left: ' + (apartment.location.x - PIC_WIDTH / 2) + 'px; top: ' + (apartment.location.y - PIC_HEIGHT) + 'px;');
    picElement.querySelector('img').setAttribute('src', apartment.author.avatar);
    picElement.querySelector('img').setAttribute('alt', apartment.offer.title);

    return picElement;
  };

  var fragmentPic = document.createDocumentFragment();

  var otherPics = function (arrPics, changePins) {

    var limitedSamePins = arrPics.slice(0, MAX_QUANTITY_PICS);

    if (changePins) {
      var setupSimilarItem = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      setupSimilarItem.forEach(function (Item) {
        similarPicElement.removeChild(Item);
      });
    } else {
      serverArrPins = arrPics.slice(0);
    }

    for (var j = 0; j < limitedSamePins.length; j++) {
      fragmentPic.appendChild(renderPic(arrPics[j]));
    }

    if (!startState) {
      similarPicElement.appendChild(fragmentPic);
    }

    startState = false;
    return fragmentPic;
  };

  var sortPics = function (typePins) {

    if (typePins === 'any') {
      otherPics(serverArrPins, true);
    } else {
      var samePins = serverArrPins.filter(function (it) {
        return it.offer.type === typePins;
      });
      otherPics(samePins, true);
    }
  };

  document.querySelector('#housing-type').addEventListener('change', function (evt) {
    var typeHouse = evt.target.value;
    sortPics(typeHouse);
  });

  window.server.load(otherPics, window.error.rendErrorMessage);

  window.pin = {
    similarPicElement: similarPicElement,
    fragmentPic: fragmentPic,
  };

})();
