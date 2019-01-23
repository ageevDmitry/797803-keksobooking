'use strict';

(function () {
  var PIC_WIDTH = 50;
  var PIC_HEIGHT = 70;
  var MAX_QUANTITY_PICS = 5;
  var similarPicElement = document.querySelector('.map__pins');
  var similarPicTemplate = document.querySelector('#pin').content;
  var loadedAppartments = [];
  // var adFormElement = document.querySelector('.ad-form__element');

  var renderPin = function (apartment) {
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
      fragmentPic.appendChild(renderPin(pin));
    });
    similarPicElement.appendChild(fragmentPic);

  };

  var typeApartment;
  var quantityRoomsApartment;
  // var quantityGuestsApartment;

  var filterPins = function () {

    var filteredPins = loadedAppartments.filter(function (it) {
      var result = true;

      if (it.offer.type !== typeApartment || it.offer.rooms !== quantityRoomsApartment) {
        result = false;
      }

      // if (it.offer.rooms !== quantityRoomsApartment) {
      //   result = false;
      // }

      // if (typeApartment === 'any' || quantityRoomsApartment === 'any') {
      //   result = true;
      // }

      // if (quantityGuestsApartment === 'any') {
      //   result = true;
      // }

      // if (it.offer.guests !== quantityGuestsApartment) {
      //   result = false;
      // }

      return result;
    });

    // if (typePrice && typePrice === 'low') {
    //   filteredPins = loadedAppartments.filter(function (it) {
    //     return it.offer.price < 10000;
    //   });
    // } else if (typePrice && typePrice === 'middle') {
    //   filteredPins = loadedAppartments.filter(function (it) {
    //     return it.offer.price < 50000;
    //   });
    // } else if (typePrice && typePrice === 'high') {
    //   filteredPins = loadedAppartments.filter(function (it) {
    //     return it.offer.price > 50000;
    //   });
    // } else if (typePrice === 'any') {
    //   filteredPins = loadedAppartments;
    // }

    removePins();
    renderPins(filteredPins.slice(0, MAX_QUANTITY_PICS));
  };

  document.querySelector('#housing-type').addEventListener('change', function (evt) {
    typeApartment = evt.target.value;
    filterPins();
  });

  document.querySelector('#housing-rooms').addEventListener('change', function (evt) {
    quantityRoomsApartment = Number(evt.target.value);
    filterPins();
  });

  document.querySelector('#housing-guests').addEventListener('change', function (evt) {
    quantityGuestsApartment = Number(evt.target.value);
    filterPins();
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
