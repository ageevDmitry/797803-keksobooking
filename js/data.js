'use strict';

(function () {

  var NUMBER_OF_APARTMENTS = 8;
  var PIC_COORDINATE_X_MIN = 270;
  var PIC_COORDINATE_X_MAX = 1100;
  var PIC_COORDINATE_Y_MIN = 130;
  var PIC_COORDINATE_Y_MAX = 630;
  var APARTMENT_PRICE_MIN = 1000;
  var APARTMENT_PRICE_MAX = 1000000;
  var APARTMENT_ROOMS_MIN = 1;
  var APARTMENT_ROOMS_MAX = 5;
  var APARTMENT_GUESTS_MIN = 2;
  var APARTMENT_GUESTS_MAX = 7;

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

  window.data = {
    apartments: apartments,
    apartmentPhotos: apartmentPhotos
  };

})();
