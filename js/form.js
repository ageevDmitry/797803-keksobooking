'use strict';

(function () {
  var PIC_MAIN_COORDINATE_Х_DEFAULT = 570;
  var PIC_MAIN_COORDINATE_Y_DEFAULT = 375;
  var adForm = document.querySelector('.ad-form');
  var selectors = document.querySelectorAll(
      'form.ad-form input, form.ad-form  select, form.ad-form  textarea, form.map__filters select, form.map__filters input'
  );
  var titleNotice = document.querySelector('#title');
  var priceNotice = document.querySelector('#price');
  var timeInNotice = document.querySelector('#timein');
  var timeOutNotice = document.querySelector('#timeout');
  var addressNotice = document.querySelector('#address');
  var adFormFeatures = adForm.querySelector('.features');
  var adFormSubmit = adForm.querySelector('.ad-form__element--submit');
  var capacityInput = adForm.querySelector('#capacity');
  var capacityInputNew = document.querySelectorAll('#capacity option');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  // var roomNumber = adForm.querySelector('#room_number');

  var typeMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var onTypeChange = function (evt) {
    var minPrice = typeMap[evt.target.value];
    priceNotice.setAttribute('min', minPrice);
    priceNotice.setAttribute('placeholder', minPrice);
  };

  var ready = function () {
    addressNotice.setAttribute(
        'value',
        PIC_MAIN_COORDINATE_Х_DEFAULT + ', ' + PIC_MAIN_COORDINATE_Y_DEFAULT
    );
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

  var validRoomsCapacity = function (valueInput) {

    var rooms = {
      1: [2, 3, 0],
      2: [3, 0],
      3: [0],
      100: [1, 2, 3],
    };

    var disabled = rooms[valueInput];

    capacityInputNew.forEach(function (Item) {
      if (disabled.includes(parseInt(Item.value, 10))) {
        Item.disabled = true;
      }
    });
  };

  document.querySelector('#type').addEventListener('change', onTypeChange);

  document.querySelector('#timein').addEventListener('change', function (evt) {
    timeOutNotice.value = evt.target.value;
  });

  document.querySelector('#timeout').addEventListener('change', function (evt) {
    timeInNotice.value = evt.target.value;
  });

  document.querySelector('#room_number').addEventListener('click', function (evt) {
    capacityInputNew.forEach(function (Item) {
      Item.disabled = false;
    });
    validRoomsCapacity(evt.target.value);
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.server.save(new FormData(adForm),
        window.serverMessage.rendSuccessMessage,
        window.serverMessage.rendErrorMessage);
  });

  adFormReset.addEventListener('click', function () {
    window.utils.disableWindow();
  });

  document.addEventListener('DOMContentLoaded', ready);

  window.form = {
    adForm: adForm,
    selectors: selectors,
    addressNotice: addressNotice,
    adFormFeatures: adFormFeatures,
    adFormSubmit: adFormSubmit,
    capacityInput: capacityInput
  };
})();

