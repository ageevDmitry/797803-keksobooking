'use strict';

var NUMBER_OF_APARTMENTS = 8;
var NUMBER_OF_FEATURES = 6;

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
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var checkTimes = ['12:00', '13:00', '14:00', '15:00'];
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

var mixApartmentPhotos = function (array) {
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

var getApartment = function () {

  return {

    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },

    offer: {
      title: apartmentOfferTitles[i],
      address: getRandomIntFromRange(270, 1100) + ', ' + getRandomIntFromRange(130, 630),
      price: getRandomIntFromRange(1000, 1000000),
      type: offerTypes[getRandomIntFromRange(0, offerTypes.length - 1)],
      rooms: getRandomIntFromRange(1, 5),
      guests: getRandomIntFromRange(2, 7),
      checkin: checkTimes[getRandomIntFromRange(0, checkTimes.length - 1)],
      checkout: checkTimes[getRandomIntFromRange(0, checkTimes.length - 1)],
      features: getRandomApartmentFeatures(apartmentfeatures),
      description: '',
      photos: mixApartmentPhotos(apartmentPhotos)
    },

    location: {
      x: getRandomIntFromRange(270, 1100),
      y: getRandomIntFromRange(130, 630)
    }
  };
};


for (var i = 0; i < NUMBER_OF_APARTMENTS; i++) {
  apartments.push(getApartment(i));
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

  var renderPhoto = function (k) {
    popupPhoto.setAttribute('src', apartments[0].offer.photos[k]);
    var photo = popupPhoto.cloneNode(true);
    return photo;
  };

  var getPopapFeatures = function (feature) {
    if (feature === 'wifi') {
      var clonePopapWifi = popapWifi.cloneNode(true);
      return parentFeaturesElement.appendChild(clonePopapWifi);
    } else if (feature === 'dishwasher') {
      var cloneDishwasher = popapDishwasher.cloneNode(true);
      return parentFeaturesElement.appendChild(cloneDishwasher);
    } else if (feature === 'parking') {
      var clonePopapParking = popapParking.cloneNode(true);
      return parentFeaturesElement.appendChild(clonePopapParking);
    } else if (feature === 'washer') {
      var clonePopapWasher = popapWasher.cloneNode(true);
      return parentFeaturesElement.appendChild(clonePopapWasher);
    } else if (feature === 'elevator') {
      var clonePopapElevator = popapElevator.cloneNode(true);
      return parentFeaturesElement.appendChild(clonePopapElevator);
    } var clonePopapConditioner = popapConditioner.cloneNode(true);
    return parentFeaturesElement.appendChild(clonePopapConditioner);
  };


  var mapElement = similarMapTemplate.cloneNode(true);

  mapElement.querySelector('.popup__avatar').setAttribute('src', apartments[0].author.avatar);
  mapElement.querySelector('.popup__title').textContent = apartments[0].offer.title;
  mapElement.querySelector('.popup__text--address').textContent = apartments[0].offer.address;
  mapElement.querySelector('.popup__text--price').innerHTML = apartments[0].offer.price + '&#x20bd';
  mapElement.querySelector('.popup__type').textContent = getOfferTypeInRussian(apartments[0].offer.type);
  mapElement.querySelector('.popup__text--capacity').textContent = apartments[0].offer.rooms + ' комнаты для ' + apartments[0].offer.guests + ' гостей';
  mapElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + apartments[0].offer.checkin + ', выезд до ' + apartments[0].offer.checkout;
  mapElement.querySelector('.popup__description').textContent = apartments[0].offer.description;


  var parentPhotoElement = mapElement.querySelector('.popup__photos');
  var popupPhoto = mapElement.querySelector('.popup__photo');
  parentPhotoElement.removeChild(popupPhoto);

  for (var k = 0; k < apartmentPhotos.length; k++) {
    parentPhotoElement.appendChild(renderPhoto(k));
  }


  var parentFeaturesElement = mapElement.querySelector('.popup__features');
  var popapWifi = mapElement.querySelector('.popup__feature--wifi');
  var popapDishwasher = mapElement.querySelector('.popup__feature--dishwasher');
  var popapParking = mapElement.querySelector('.popup__feature--parking');
  var popapWasher = mapElement.querySelector('.popup__feature--washer');
  var popapElevator = mapElement.querySelector('.popup__feature--elevator');
  var popapConditioner = mapElement.querySelector('.popup__feature--conditioner');

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

parentMapElement.insertBefore(fragmentMap, referenceMapElement);

