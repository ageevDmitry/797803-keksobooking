'use strict';

var PIC_AVATAR = ['01', '02', '03', '04', '05', '06', '07', '08'];

var cloneArr = [];

var apartments = [];

var getApartmentParameter = function (arr) {
  var k = Math.round(-0.5 + Math.random() * (8));
  if (cloneArr.length === 0) {
    cloneArr.push(arr[k]);
    return arr[k];
  } else {
    outer:
    for (var p = 0; p < cloneArr.length; p++) {
      var k = Math.round(-0.5 + Math.random() * (8));
      if (arr[k] === cloneArr[p]) {
        break outer;
      } else {
        cloneArr.push(arr[k]);
        return arr[k];
      }
    }
  } //Здесь могло бы быть еще много вариантов данной функции, но они все не работают
};

var getLocationApartment = function (min, max) {
  var coordinate = Math.round(min - 0.5 + Math.random() * (max - min + 1));
  return coordinate;
};

var getApartment = function () {

  return {

    author: {
      avatar: 'img/avatars/user' + getApartmentParameter(PIC_AVATAR) + '.png'
    },

    offer: {
      title: 'Большая уютная квартира',
      address: '600, 350',
      price: 1000,
      type: 'palace',
      rooms: 1,
      guests: 2,
      checkin: '12:00',
      checkout: '14:00',
      features: [
        'wifi', 'dishwasher', 'parking', 'washer', 'elevator'
      ],
      description: 'Какое-то описание',
      photos: [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
      ]
    },

    location: {
      x: getLocationApartment(270, 1100),
      y: getLocationApartment(130, 630)
    }
  };
};

for (var i = 0; i < 8; i++) {
  apartments.push(getApartment());
}

var apartment = [

  {
    author: {
      avatar: 'img/avatars/user04.png'
    },

    offer: {
      title: 'Большая уютная квартира',
      address: '600, 350',
      price: 1000,
      type: 'palace',
      rooms: 1,
      guests: 2,
      checkin: '12:00',
      checkout: '14:00',
      features: [
        'wifi', 'dishwasher', 'parking', 'washer', 'elevator'
      ],
      description: 'Какая-то дичь',
      photos: [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
      ]
    },

    location: {
      x: 500,
      y: 200
    }
  }
];

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
  mapElement.querySelector('.popup__text--price').textContent = apartments[0].offer.price + '&#x20bd';
  mapElement.querySelector('.popup__type').textContent = apartments[0].offer.type;
  mapElement.querySelector('.popup__text--capacity').textContent = apartments[0].offer.rooms + ' комнаты для ' + apartment[0].offer.guests + ' гостей';
  mapElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + apartments[0].offer.checkin + ', выезд до ' + apartment[0].offer.checkout;
  mapElement.querySelector('.popup__description').textContent = apartments[0].offer.description;
  // mapElement.querySelector('.popup__features').textContent = apartment[0].offer.features;
  mapElement.querySelector('.popup__photo').setAttribute('src', apartments[0].offer.photos[0]);

  return mapElement;
};

var fragmentMap = document.createDocumentFragment();

fragmentMap.appendChild(renderMap(apartments));

parentMapElement.insertBefore(fragmentMap, referenceMapElement);


