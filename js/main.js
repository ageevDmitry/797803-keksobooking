'use strict';

var NUMBER_OF_APARTMENTS = 8;
var NUMBER_OF_FEATURES = 6;
var PIC_COORDINATE_X_MIN = 270;
var PIC_COORDINATE_X_MAX = 1100;
var PIC_COORDINATE_Y_MIN = 130;
var PIC_COORDINATE_Y_MAX = 630;
var PIC_COORDINATE_Х_DEFAULT = 570;
var PIC_COORDINATE_Y_DEFAULT = 375;
var APARTMENT_PRICE_MIN = 1000;
var APARTMENT_PRICE_MAX = 1000000;
var APARTMENT_ROOMS_MIN = 1;
var APARTMENT_ROOMS_MAX = 5;
var APARTMENT_GUESTS_MIN = 2;
var APARTMENT_GUESTS_MAX = 7;
var RUBLE = '&#x20bd';
var PIC_WIDTH = 40;
var PIC_HEIGHT = 40;
var PIC_WIDTH_MAIN = 40;
var PIC_HEIGHT_MAIN = 44;
var apartmentOfferTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var offerTypes = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var checkTimes = [
  '12:00',
  '13:00',
  '14:00',
  '15:00'
];
var apartmentfeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var apartmentPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var apartments = [];

var shuffle = function (array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

var getRandomIntFromRange = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomApartmentFeatures = function (arr) {
  var newArr = [];
  var cloneArr = arr.slice(0);
  var randomArrLength = getRandomIntFromRange(1, arr.length);

  for (var m = 0; m < randomArrLength; m++) {
    var randomIndex = getRandomIntFromRange(0, cloneArr.length - 1);
    newArr.push(cloneArr[randomIndex]);
    cloneArr.splice(randomIndex, 1);
  }

  return newArr;
};

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

var getApartment = function (i) {

  return {

    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },

    offer: {
      title: apartmentOfferTitles[i],
      address: getRandomIntFromRange(PIC_COORDINATE_X_MIN, PIC_COORDINATE_X_MAX) + ', ' + getRandomIntFromRange(PIC_COORDINATE_Y_MIN, PIC_COORDINATE_Y_MAX),
      price: getRandomIntFromRange(APARTMENT_PRICE_MIN, APARTMENT_PRICE_MAX),
      type: offerTypes[getRandomIntFromRange(0, offerTypes.length - 1)],
      rooms: getRandomIntFromRange(APARTMENT_ROOMS_MIN, APARTMENT_ROOMS_MAX),
      guests: getRandomIntFromRange(APARTMENT_GUESTS_MIN, APARTMENT_GUESTS_MAX),
      checkin: checkTimes[getRandomIntFromRange(0, checkTimes.length - 1)],
      checkout: checkTimes[getRandomIntFromRange(0, checkTimes.length - 1)],
      features: getRandomApartmentFeatures(apartmentfeatures),
      description: '',
      photos: shuffle(apartmentPhotos)
    },

    location: {
      x: getRandomIntFromRange(PIC_COORDINATE_X_MIN, PIC_COORDINATE_X_MAX),
      y: getRandomIntFromRange(PIC_COORDINATE_Y_MIN, PIC_COORDINATE_Y_MAX)
    }
  };
};


for (var i = 0; i < NUMBER_OF_APARTMENTS; i++) {
  apartments.push(getApartment(i));
}

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

for (var j = 0; j < apartments.length; j++) {
  fragmentPic.appendChild(renderPic(apartments[j]));
}

var similarMapTemplate = document.querySelector('#card').content;

var renderMap = function () {

  var mapElement = similarMapTemplate.cloneNode(true);

  mapElement.querySelector('.popup__avatar').setAttribute('src', apartments[0].author.avatar);
  mapElement.querySelector('.popup__title').textContent = apartments[0].offer.title;
  mapElement.querySelector('.popup__text--address').textContent = apartments[0].offer.address;
  mapElement.querySelector('.popup__text--price').innerHTML = apartments[0].offer.price + RUBLE;
  mapElement.querySelector('.popup__type').textContent = getOfferTypeInRussian(apartments[0].offer.type);
  mapElement.querySelector('.popup__text--capacity').textContent = apartments[0].offer.rooms + ' комнаты для ' + apartments[0].offer.guests + ' гостей';
  mapElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + apartments[0].offer.checkin + ', выезд до ' + apartments[0].offer.checkout;
  mapElement.querySelector('.popup__description').textContent = apartments[0].offer.description;

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

  for (var k = 0; k < apartmentPhotos.length; k++) {
    parentPhotoElement.appendChild(renderPhoto(popupPhoto, apartments[0], k));
  }

  for (var n = NUMBER_OF_FEATURES; n > 0; n--) {
    var childrenFeatures = parentFeaturesElement.children[n - 1];
    childrenFeatures.remove();
  }

  for (var p = 0; p < apartments[0].offer.features.length; p++) {
    getPopapFeatures(apartments[0].offer.features[p]);
  }

  return mapElement;
};

var fragmentMap = document.createDocumentFragment();

fragmentMap.appendChild(renderMap(apartments));

var mapPinMain = document.querySelector('.map__pin--main');
var userDialog = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var selectors = document.querySelectorAll(
    'form.ad-form input, form.ad-form  select, form.ad-form  textarea, form.map__filters select, form.map__filters input'
);
var titleNotice = document.querySelector('#title');
var priceNotice = document.querySelector('#price');
var timeInNotice = document.querySelector('#timein');
var timeOutNotice = document.querySelector('#timeout');
var addressNotice = document.querySelector('#address');

var typeMap = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var onTypeChange = function (evt) {
  var minPrice = typeMap[(evt.target.value)];
  priceNotice.setAttribute('min', minPrice);
  priceNotice.setAttribute('placeholder', minPrice);
};

var ready = function () {
  addressNotice.setAttribute('value', PIC_COORDINATE_Х_DEFAULT + ', ' + PIC_COORDINATE_Y_DEFAULT);
  addressNotice.setAttribute('readonly', 'readonly');

  selectors.forEach(function (selector) {
    selector.setAttribute('disabled', 'disabled');
  });

  adForm.querySelector('.ad-form__element--submit').setAttribute('disabled', 'disabled');
  adForm.querySelector('.features').setAttribute('disabled', 'disabled');
  titleNotice.setAttribute('required', 'required');
  titleNotice.setAttribute('minlength', '30');
  titleNotice.setAttribute('maxlength', '100');
  priceNotice.setAttribute('required', 'required');
  priceNotice.setAttribute('max', 1000000);
  adForm.setAttribute('method', 'post');
  adForm.setAttribute('enctype', 'multipart/form-data');
  adForm.setAttribute('action', 'https://js.dump.academy/keksobooking');

};

document.querySelector('#type').addEventListener('change', onTypeChange);

document.querySelector('#timein').addEventListener('change', function (evt) {
  timeOutNotice.value = evt.target.value;
});

document.querySelector('#timeout').addEventListener('change', function (evt) {
  timeInNotice.value = evt.target.value;
});

document.addEventListener('DOMContentLoaded', ready);

(function () {

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinMainTop = mapPinMain.offsetTop - shift.y;
      var mapPinMainLeft = mapPinMain.offsetLeft - shift.x;

      if (mapPinMainTop < PIC_COORDINATE_Y_MIN - PIC_HEIGHT_MAIN) {
        mapPinMain.style.top = PIC_COORDINATE_Y_MIN;
      } else if (mapPinMainTop > PIC_COORDINATE_Y_MAX - PIC_HEIGHT_MAIN) {
        mapPinMain.style.top = PIC_COORDINATE_Y_MAX;
      } else if (mapPinMainLeft < PIC_COORDINATE_X_MIN - PIC_WIDTH_MAIN / 2) {
        mapPinMain.style.top = PIC_COORDINATE_X_MIN;
      } else if (mapPinMainLeft > PIC_COORDINATE_X_MAX - PIC_WIDTH_MAIN / 2) {
        mapPinMain.style.top = PIC_COORDINATE_X_MAX;
      } else {
        mapPinMain.style.top = mapPinMainTop + 'px';
        mapPinMain.style.left = mapPinMainLeft + 'px';
      }

      var mapPinMainLeftCoords = mapPinMainLeft + PIC_WIDTH_MAIN / 2;
      var mapPinMainTopCoords = mapPinMainTop + PIC_HEIGHT_MAIN;
      addressNotice.setAttribute('value', mapPinMainLeftCoords + ', ' + mapPinMainTopCoords);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var firstMove = true;

      if (firstMove) {
        userDialog.classList.remove('map--faded');

        similarPicElement.appendChild(fragmentPic);

        adForm.classList.remove('ad-form--disabled');
        adForm.querySelector('.ad-form__element--submit').removeAttribute('disabled');
        adForm.querySelector('.features').removeAttribute('disabled');

        selectors.forEach(function (selector) {
          selector.removeAttribute('disabled');
        });
        firstMove = false;
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (e) {
          e.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
