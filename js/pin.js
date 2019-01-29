'use strict';

(function () {
  var PIC_WIDTH = 50;
  var PIC_HEIGHT = 70;
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var MAX_QUANTITY_PICS = 5;
  var similarPicElement = document.querySelector('.map__pins');
  var similarPicTemplate = document.querySelector('#pin').content;
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__checkbox');
  var loadedAppartments = [];
  var renederedPins = [];

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
    window.popup.closePopup();
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

  var filterTypePins = function () {
    if (filterMap.type === 'any' || !filterMap.type) {
      return;
    }
    renederedPins = renederedPins.filter(function (it) {
      return it.offer.type === filterMap.type;
    });
  };

  var filterPricePins = function () {
    if (filterMap.price === 'any' || !filterMap.price) {
      return;
    }

    if (filterMap.price === 'low') {
      renederedPins = renederedPins.filter(function (it) {
        return it.offer.price < LOW_PRICE;
      });
    }

    if (filterMap.price === 'middle') {
      renederedPins = renederedPins.filter(function (it) {
        return it.offer.price > LOW_PRICE && it.offer.price < HIGH_PRICE;
      });
    }

    if (filterMap.price === 'high') {
      renederedPins = renederedPins.filter(function (it) {
        return it.offer.price > HIGH_PRICE;
      });
    }
  };

  var filterRoomsPins = function () {
    if (filterMap.rooms === 'any' || !filterMap.rooms) {
      return;
    }
    renederedPins = renederedPins.filter(function (it) {
      return it.offer.rooms === filterMap.rooms;
    });
  };

  var filterGuestsPins = function () {
    if (filterMap.guests === 'any' || !filterMap.guests) {
      return;
    }
    renederedPins = renederedPins.filter(function (it) {
      return it.offer.guests === parseInt(filterMap.guests, 10);
    });
  };

  var filterFeaturesPins = function () {
    if (filterMap.features.length === 0) {
      return;
    }

    renederedPins = renederedPins.filter(function (it) {
      var result = filterMap.features.every(function (feature) {
        return it.offer.features.includes(feature);
      });

      return result;
    });
  };

  var filterMap = {
    type: 'any',
    price: 'any',
    rooms: 0,
    guests: 'any',
    features: [],
  };

  var filterAll = function () {
    renederedPins = loadedAppartments.slice(0);
    filterTypePins();
    filterPricePins();
    filterRoomsPins();
    filterGuestsPins();
    filterFeaturesPins();
    removePins();
    renderPins(renederedPins);
  };

  housingType.addEventListener('change', function (evt) {
    filterMap.type = evt.target.value;
    window.debounce(filterAll());
  });

  housingPrice.addEventListener('change', function (evt) {
    filterMap.price = evt.target.value;
    window.debounce(filterAll());
  });

  housingRooms.addEventListener('change', function (evt) {
    filterMap.rooms = Number(evt.target.value);
    window.debounce(filterAll());
  });

  housingGuests.addEventListener('change', function (evt) {
    filterMap.guests = evt.target.value;
    window.debounce(filterAll());
  });

  housingFeatures.forEach(function (input) {
    input.addEventListener('change', function () {
      var featuresElements = [];
      document.querySelectorAll('.map__checkbox:checked').forEach(function (featureElement) {
        featuresElements.push(featureElement.value);
      });

      filterMap.features = featuresElements;
      window.debounce(filterAll());
    });
  });

  document.querySelectorAll('.map__checkbox:checked').forEach(function (featureElement) {
    filterMap.features.push(featureElement);
  });

  var successLoad = function (data) {
    loadedAppartments = data.slice(0);
    renderPins(loadedAppartments);
  };

  var loadData = function () {
    window.server.load(successLoad, window.serverMessage.rendErrorMessage);
  };

  window.pin = {
    loadData: loadData,
    removePins: removePins,
    housingType: housingType,
    housingPrice: housingPrice,
    housingRooms: housingRooms,
    housingGuests: housingGuests,
    housingFeatures: housingFeatures
  };
})();
