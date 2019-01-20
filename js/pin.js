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
    var button = picElement.querySelector('button');

    picElement.querySelector('button').setAttribute('style', 'left: ' + (apartment.location.x - PIC_WIDTH / 2) + 'px; top: ' + (apartment.location.y - PIC_HEIGHT) + 'px;');
    picElement.querySelector('img').setAttribute('src', apartment.author.avatar);
    picElement.querySelector('img').setAttribute('alt', apartment.offer.title);

    button.addEventListener('click', function () {

      var articlePopup = document.querySelector('article');

      if (articlePopup) {
        window.popup.closePopup();
      }

      window.popup.fragmentMap.appendChild(window.popup.renderPopup(apartment));
      window.popup.parentMapElement.insertBefore(window.popup.fragmentMap, window.popup.referenceMapElement);

    });

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
      fragmentPic.appendChild(renderPic(arrPics[j], j));
    }

    if (!startState) {
      similarPicElement.appendChild(fragmentPic);
    }

    startState = false;
    return fragmentPic;
  };

  var sortPics = function (typePins, typePrice) {

    if (typePins) {
      var sameTypePins = serverArrPins.filter(function (it) {
        return it.offer.type === typePins;
      });
      otherPics(sameTypePins, true);
    } else if (typePins === 'any') {
      otherPics(sameTypePins, true);
    }

    if (typePrice) {

      if (typePrice === 'low') {
        var samePricePins = serverArrPins.filter(function (it) {
          return it.offer.price < 10000;
        });
        otherPics(samePricePins, true);
      }
    }
  };

  document.querySelector('#housing-type').addEventListener('change', function (evt) {
    var typeHouse = evt.target.value;
    sortPics(typeHouse, null);
  });

  document.querySelector('#housing-price').addEventListener('change', function (evt) {
    var typePrice = evt.target.value;
    sortPics(null, typePrice);
  });

  window.server.load(otherPics);

  window.pin = {
    similarPicElement: similarPicElement,
    fragmentPic: fragmentPic,
  };

})();

