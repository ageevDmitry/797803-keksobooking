'use strict';

(function () {
  var PIC_WIDTH = 50;
  var PIC_HEIGHT = 70;
  var MAX_QUANTITY_PICS = 5;
  var similarPicElement = document.querySelector('.map__pins');
  var similarPicTemplate = document.querySelector('#pin').content;
  var loadedAppartments = [];

  var renderPic = function (apartment) {
    var picElement = similarPicTemplate.cloneNode(true);
    var button = picElement.querySelector('button');

    picElement
      .querySelector('button')
      .setAttribute(
          'style',
          'left: ' +
          (apartment.location.x - PIC_WIDTH / 2) +
          'px; top: ' +
          (apartment.location.y - PIC_HEIGHT) +
          'px;'
      );
    picElement.querySelector('img').setAttribute('src', apartment.author.avatar);
    picElement.querySelector('img').setAttribute('alt', apartment.offer.title);

    button.addEventListener('click', function () {

      if (document.querySelector('article')) {
        window.popup.closePopup();
      }

      window.popup.parentMapElement.insertBefore(
          window.popup.renderPopup(apartment),
          window.popup.referenceMapElement
      );
    });

    return picElement;
  };

  var removePins = function () {
    var setupSimilarItem = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    setupSimilarItem.forEach(function (Item) {
      similarPicElement.removeChild(Item);
    });
  };

  var renderPins = function (arrPics) {
    var fragmentPic = document.createDocumentFragment();
    var limitedSamePins = arrPics.slice(0, MAX_QUANTITY_PICS);
    limitedSamePins.forEach(function (pin) {
      fragmentPic.appendChild(renderPic(pin));
    });

    similarPicElement.appendChild(fragmentPic);
  };

  var sortPics = function (typePins, typePrice) {
    var filteredPins = [];
    var filteredTypePins = null;
    var filteredPricePins = null;

    if (typePins && typePins !== 'any') {
      filteredTypePins = loadedAppartments.filter(function (it) {
        return it.offer.type === typePins;
      });
    } else if (typePins === 'any') {
      filteredTypePins = loadedAppartments;
    }

    if (typePrice && typePrice === 'low') {
      filteredPricePins = loadedAppartments.filter(function (it) {
        return it.offer.price < 10000;
      });
    } else if (typePrice && typePrice === 'middle') {
      filteredPricePins = loadedAppartments.filter(function (it) {
        return it.offer.price < 10000 < 50000;
      });
    } else if (typePrice && typePrice === 'high') {
      filteredPricePins = loadedAppartments.filter(function (it) {
        return it.offer.price > 50000;
      });
    } else if (typePrice === 'any') {
      filteredPricePins = loadedAppartments;
    }

    var arr = filteredTypePins.concat(filteredPricePins);

    filteredPins = arr.slice(0);

    removePins();
    renderPins(filteredPins.slice(0, MAX_QUANTITY_PICS));
  };

  document.querySelector('#housing-type').addEventListener('change', function (evt) {
    var typeHouse = evt.target.value;
    sortPics(typeHouse, null);
  });

  document.querySelector('#housing-price').addEventListener('change', function (evt) {
    var typePrice = evt.target.value;
    sortPics(null, typePrice);
  });

  var successLoad = function (data) {
    loadedAppartments = data.slice(0);
    renderPins(loadedAppartments);
  };

  var loadData = function () {
    window.server.load(successLoad);
  };

  window.pin = {
    loadData: loadData,
    removePins: removePins
  };
})();
