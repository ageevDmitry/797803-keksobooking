'use strict';

var picAvatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
var offerTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var checkTimes = ['12:00', '13:00', '14:00'];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var apartments = [];

var getRandomIndex = function (length) {
  return Math.floor(Math.random() * (length));
};

var compareRandom = function () {
  return Math.random() - 0.5;
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

var getStringParameter = function (arr, method) {
  if (method === 'noRepeat') {
    var randomIndexNoRepeat = getRandomIndex(arr.length);
    var cloneArr = arr.slice(0);
    arr.splice(randomIndexNoRepeat, 1);
    return cloneArr[randomIndexNoRepeat];
  } else if (method === 'randomOrder') {
    return arr.sort(compareRandom);
  } else {
    var randomIndex = getRandomIndex(arr.length);
    return arr[randomIndex];
  }
};

var getNumberParameter = function (min, max) {
  var coordinate = Math.floor(min + Math.random() * (max + 1 - min));
  return coordinate;
};

var getApartment = function () {

  return {

    author: {
      avatar: 'img/avatars/user' + getStringParameter(picAvatars, 'noRepeat') + '.png'
    },

    offer: {
      title: getStringParameter(offerTitles, 'noRepeat'),
      address: getNumberParameter(270, 1100) + ', ' + getNumberParameter(130, 630),
      price: getNumberParameter(1000, 1000000),
      type: getStringParameter(offerTypes),
      rooms: getNumberParameter(1, 5),
      guests: getNumberParameter(2, 7),
      checkin: getStringParameter(checkTimes),
      checkout: getStringParameter(checkTimes),
      features: [
        'wifi', 'dishwasher', 'parking', 'washer', 'elevator'
      ],
      description: '',
      photos: getStringParameter(photos, 'randomOrder')
    },

    location: {
      x: getNumberParameter(270, 1100),
      y: getNumberParameter(130, 630)
    }
  };
};

for (var i = 0; i < 8; i++) {
  apartments.push(getApartment());
}


var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

var similarPicElement = document.querySelector('.map__pins');
var similarPicTemplate = document.querySelector('#pin').content;

var renderPic = function () {

  var picElement = similarPicTemplate.cloneNode(true);

  picElement.querySelector('button').setAttribute('style', 'left: ' + (apartments[j].location.x - 20) + 'px; top: ' + (apartments[j].location.y - 40) + 'px;');
  picElement.querySelector('img').setAttribute('src', apartments[j].author.avatar);
  picElement.querySelector('img').setAttribute('alt', apartments[j].offer.title);

  return picElement;
};

var fragmentPic = document.createDocumentFragment();

for (var j = 0; j < apartments.length; j++) {
  fragmentPic.appendChild(renderPic(apartments[j]));
}
similarPicElement.appendChild(fragmentPic);

var parentMapElement = document.querySelector('.map');
var referenceMapElement = document.querySelector('.map__filters-container');
var similarMapTemplate = document.querySelector('#card').content;

var renderMap = function () {

  var mapElement = similarMapTemplate.cloneNode(true);

  mapElement.querySelector('.popup__avatar').setAttribute('src', apartments[0].author.avatar);
  mapElement.querySelector('.popup__title').textContent = apartments[0].offer.title;
  mapElement.querySelector('.popup__text--address').textContent = apartments[0].offer.address;
  mapElement.querySelector('.popup__text--price').innerHTML = apartments[0].offer.price + '&#x20bd';
  mapElement.querySelector('.popup__type').textContent = getOfferTypeInRussian(apartments[0].offer.type);
  mapElement.querySelector('.popup__text--capacity').textContent = apartments[0].offer.rooms + ' комнаты для ' + apartments[0].offer.guests + ' гостей';
  mapElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + apartments[0].offer.checkin + ', выезд до ' + apartments[0].offer.checkout;
  mapElement.querySelector('.popup__description').textContent = apartments[0].offer.description;
  // mapElement.querySelector('.popup__features').textContent = apartment[0].offer.features;

  var parentPhotoElement = mapElement.querySelector('.popup__photos');
  var similarPhotoTemplate = mapElement.querySelector('.popup__photo');

  var fragmentPhoto = document.createDocumentFragment();

  var renderPhoto = function () {
    var photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.popup__photo').setAttribute('src', apartments[0].author.avatar[0]);
    return photoElement;
  };

  for (var k = 0; k < 3; k++) {
    fragmentPhoto.appendChild(renderPhoto(apartments));
  }

  parentPhotoElement.appendChild(fragmentPhoto);

  return mapElement;

};

var fragmentMap = document.createDocumentFragment();

fragmentMap.appendChild(renderMap(apartments));

parentMapElement.insertBefore(fragmentMap, referenceMapElement);


