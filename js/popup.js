'use strict';

(function () {
  var RUBLE = '&#x20bd';
  var ECS_KEYCODE = 27;
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

  var renderPopup = function (apartments) {
    var mapElement = similarMapTemplate.cloneNode(true);

    mapElement.querySelector('.popup__avatar').setAttribute('src', apartments.author.avatar);
    mapElement.querySelector('.popup__title').textContent = apartments.offer.title;
    mapElement.querySelector('.popup__text--address').textContent = apartments.offer.address;
    mapElement.querySelector('.popup__text--price').innerHTML = apartments.offer.price + RUBLE;
    mapElement.querySelector('.popup__type').textContent = getOfferTypeInRussian(
        apartments.offer.type
    );
    mapElement.querySelector('.popup__text--capacity').textContent =
      apartments.offer.rooms + ' комнат для ' + apartments.offer.guests + ' гостей';
    mapElement.querySelector('.popup__text--time').textContent =
      'Заезд после ' + apartments.offer.checkin + ', выезд до ' + apartments.offer.checkout;
    mapElement.querySelector('.popup__description').textContent = apartments.offer.description;

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

    var renderPhoto = function (popupPhotoElement, photoUrl) {
      var photo = popupPhotoElement.cloneNode(true);
      photo.setAttribute('src', photoUrl);
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
      parentFeaturesElement.appendChild(cloneElement.cloneNode(true));
    };

    apartments.offer.photos.forEach(function (photo) {
      parentPhotoElement.appendChild(renderPhoto(popupPhoto, photo));
    });

    parentFeaturesElement.innerHTML = '';

    apartments.offer.features.forEach(function (feature) {
      getPopapFeatures(feature);
    });

    mapElement.querySelector('.popup__close').addEventListener('click', function () {
      closePopup();
    });

    document.addEventListener('keydown', closeEscPopup, {once: true});
    return mapElement;
  };

  var closeEscPopup = function (e) {
    if (e.keyCode === ECS_KEYCODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    var articlePopup = document.querySelector('article');
    parentMapElement.removeChild(articlePopup);
  };

  var fragmentMap = document.createDocumentFragment();

  window.popup = {
    parentMapElement: parentMapElement,
    fragmentMap: fragmentMap,
    referenceMapElement: referenceMapElement,
    renderPopup: renderPopup,
    closePopup: closePopup,
  };
})();
