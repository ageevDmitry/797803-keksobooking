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

  var renederedPins;

  var renderPins = function (arrPics) {
    var fragmentPic = document.createDocumentFragment();
    var limitedSamePins = arrPics.slice(0, MAX_QUANTITY_PICS);
    limitedSamePins.forEach(function (pin) {
      fragmentPic.appendChild(renderPin(pin));
    });
    similarPicElement.appendChild(fragmentPic);
    renederedPins = arrPics.slice(0);
    console.log(renederedPins);
  };

  var typeApartment;
  var quantityRoomsApartment;
  var quantityGuestsApartment;


  var filterTypePins = function (type) {

    var filteredPins1 = loadedAppartments.filter(function (it) {
      var result = true;

      if (it.offer.type !== type) {
        result = false;
      }

      if (type === 'any') {
        result = true;
      }

      return result;
    });

    compareArr(filteredPins1);
    // removePins();
    // renderPins(filteredPins.slice(0, MAX_QUANTITY_PICS));
  };


  var filterRoomsPins = function (type) {

    var filteredPins2 = loadedAppartments.filter(function (it) {
      var result = true;

      if (it.offer.rooms !== type) {
        result = false;
      }

      if (type === 'any') {
        result = true;
      }

      return result;
    });


    compareArr(filteredPins2);
    // removePins();
    // renderPins(filteredPins.slice(0, MAX_QUANTITY_PICS));
  };


  var compareArr = function (filteredPins) {




    // filteredPins.forEach(function (Item) {

    //   var filteredPins3 = loadedAppartments.filter(function (it) {
    //     var result = true;

    //     if (it.offer.type !== Item.offer.type) {
    //       result = false;
    //     }

    //     if (it.offer.rooms !== Item.offer.rooms) {
    //       result = true;
    //     }

    //     return result;
    //   });
    //   console.log(filteredPins3);
    // });

    // var filteredPins3 = renederedPins.filter(function (it) {
    //   var result = true;
    //   console.log(it.offer.type);
    //   console.log(filteredPins[0].offer.type);

    //   if (it.offer.type !== filteredPins.offer.type) {
    //     result = false;
    //   }

    //   if (it.offer.rooms !== filteredPins.offer.rooms) {
    //     result = true;
    //   }

    //   return result;
    // });

    removePins();
    renderPins(filteredPins.slice(0, MAX_QUANTITY_PICS));

  };


  document.querySelector('#housing-type').addEventListener('change', function (evt) {
    typeApartment = evt.target.value;
    // window.debounce(filterPins);
    filterTypePins(typeApartment);
  });

  document.querySelector('#housing-rooms').addEventListener('change', function (evt) {
    if (evt.target.value === 'any') {
      quantityRoomsApartment = evt.target.value;
    } else {
      quantityRoomsApartment = Number(evt.target.value);
    }
    filterRoomsPins(quantityRoomsApartment);
  });

  // document.querySelector('#housing-guests').addEventListener('change', function (evt) {
  //   quantityGuestsApartment = Number(evt.target.value);
  //   filterPins();
  // });

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
