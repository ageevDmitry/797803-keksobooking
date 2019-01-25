'use strict';

(function () {
  var CAPACITY_INPUT_DEFAULT = '1';
  var userDialog = document.querySelector('.map');
  var windowDisabled = true;
  var titleNotice = document.querySelector('#title');
  var textArea = document.querySelector('#description');
  var typeApartment = document.querySelector('#type');
  var priceApartment = document.querySelector('#price');
  var timeinApartment = document.querySelector('#timein');
  var timeoutApartment = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');
  var features = document.querySelectorAll('.feature__checkbox');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRoom = document.querySelector('#housing-rooms');
  var housingGuest = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__checkbox');

  var activateWindow = function () {
    userDialog.classList.remove('map--faded');
    window.pin.loadData();
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.adFormFeatures.removeAttribute('disabled');
    window.form.adFormSubmit.removeAttribute('disabled');
    window.form.selectors.forEach(function (selector) {
      selector.removeAttribute('disabled');
    });
    window.utils.windowDisabled = false;
    window.form.capacityInput.value = CAPACITY_INPUT_DEFAULT;
  };

  var disableWindow = function () {
    userDialog.classList.add('map--faded');
    titleNotice.value = '';
    textArea.value = '';
    typeApartment.options[1].selected = true;
    priceApartment.value = '';
    timeinApartment.options[0].selected = true;
    timeoutApartment.options[0].selected = true;
    roomNumber.options[0].selected = true;
    roomCapacity.options[2].selected = true;
    features.forEach(function (feature) {
      feature.checked = false;
    });
    housingType.options[0].selected = true;
    housingPrice.options[0].selected = true;
    housingRoom.options[0].selected = true;
    housingGuest.options[0].selected = true;
    housingFeatures.forEach(function (feature) {
      feature.checked = false;
    });
    window.form.adForm.classList.add('ad-form--disabled');
    window.form.adFormFeatures.setAttribute('disabled', 'disabled');
    window.form.adFormSubmit.setAttribute('disabled', 'disabled');
    window.form.selectors.forEach(function (selector) {
      selector.setAttribute('disabled', 'disabled');
    });
    window.dragAndDrop.setStartMapPinMain();
    window.pin.removePins();
    window.utils.windowDisabled = true;
  };

  window.utils = {
    activateWindow: activateWindow,
    disableWindow: disableWindow,
    windowDisabled: windowDisabled,
  };
})();
