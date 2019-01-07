'use strict';

(function () {

  var RUBLE = '&#x20bd';
  var NUMBER_OF_FEATURES = 6;
  var parentMapElement = document.querySelector('.map');
  var referenceMapElement = document.querySelector('.map__filters-container');
  var similarMapTemplate = document.querySelector('#card').content;

  var getOfferTypeInRussian = function (type) {
    if (type === 'palace') {
      return 'Дворец';
    } else if (type === 'flat') {
      return 'Квартира';
    } else if (type === 'house') {
      return 'Дом';
    }
    return 'Бунгало';
  };

  var renderMap = function () {

    var mapElement = similarMapTemplate.cloneNode(true);

    mapElement.querySelector('.popup__avatar').setAttribute('src', window.data.apartments[0].author.avatar);
    mapElement.querySelector('.popup__title').textContent = window.data.apartments[0].offer.title;
    mapElement.querySelector('.popup__text--address').textContent = window.data.apartments[0].offer.address;
    mapElement.querySelector('.popup__text--price').innerHTML = window.data.apartments[0].offer.price + RUBLE;
    mapElement.querySelector('.popup__type').textContent = getOfferTypeInRussian(window.data.apartments[0].offer.type);
    mapElement.querySelector('.popup__text--capacity').textContent = window.data.apartments[0].offer.rooms + ' комнаты для ' + window.data.apartments[0].offer.guests + ' гостей';
    mapElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.data.apartments[0].offer.checkin + ', выезд до ' + window.data.apartments[0].offer.checkout;
    mapElement.querySelector('.popup__description').textContent = window.data.apartments[0].offer.description;

    var parentPhotoElement = mapElement.querySelector('.popup__photos');
    var popupPhoto = mapElement.querySelector('.popup__photo');
    parentPhotoElement.removeChild(popupPhoto);

    var parentFeaturesElement = mapElement.querySelector('.popup__features');
    var popapWifi = mapElement.querySelector('.popup__feature--wifi');
    var popapDishwasher = mapElement.querySelector('.popup__feature--dishwasher');
    var popapParking = mapElement.querySelector('.popup__feature--parking');
    var popapWasher = mapElement.querySelector('.popup__feature--washer');
    var popapElevator = mapElement.querySelector('.popup__feature--elevator');
    var popapConditioner = mapElement.querySelector('.popup__feature--conditioner');

    var renderPhoto = function (popupPhotoElement, apartment, k) {
      popupPhotoElement.setAttribute('src', apartment.offer.photos[k]);
      var photo = popupPhotoElement.cloneNode(true);
      return photo;
    };

    var getPopapFeatures = function (feature) {
      var cloneElement;
      if (feature === 'wifi') {
        cloneElement = popapWifi;
      } else if (feature === 'dishwasher') {
        cloneElement = popapDishwasher;
      } else if (feature === 'parking') {
        cloneElement = popapParking;
      } else if (feature === 'washer') {
        cloneElement = popapWasher;
      } else if (feature === 'elevator') {
        cloneElement = popapElevator;
      } else {
        cloneElement = popapConditioner;
      }
      return parentFeaturesElement.appendChild(cloneElement.cloneNode(true));
    };

    for (var k = 0; k < window.data.apartmentPhotos.length; k++) {
      parentPhotoElement.appendChild(renderPhoto(popupPhoto, window.data.apartments[0], k));
    }

    for (var n = NUMBER_OF_FEATURES; n > 0; n--) {
      var childrenFeatures = parentFeaturesElement.children[n - 1];
      childrenFeatures.remove();
    }

    for (var p = 0; p < window.data.apartments[0].offer.features.length; p++) {
      getPopapFeatures(window.data.apartments[0].offer.features[p]);
    }

    return mapElement;
  };

  var fragmentMap = document.createDocumentFragment();

  fragmentMap.appendChild(renderMap(window.data.apartments));

  window.card = {
    parentMapElement: parentMapElement,
    fragmentMap: fragmentMap,
    referenceMapElement: referenceMapElement
  };

})();
