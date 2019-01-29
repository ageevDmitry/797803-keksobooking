'use strict';

(function () {
  var CAPACITY_INPUT_DEFAULT = '1';
  var userDialog = document.querySelector('.map');
  var windowDisabled = true;
  var textArea = document.querySelector('#description');
  var features = document.querySelectorAll('.feature__checkbox');

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
    window.form.priceNotice.placeholder = 0;
    window.form.priceNotice.min = 0;
    window.form.typeNotice.options[0].selected = true;
    window.form.capacityInput.options[2].selected = true;
    window.form.capacityInput.options[0].disabled = true;
    window.form.capacityInput.options[1].disabled = true;
    window.form.capacityInput.options[3].disabled = true;
  };

  var disableWindow = function () {
    window.form.priceNotice.placeholder = 5000;
    userDialog.classList.add('map--faded');
    window.form.titleNotice.value = '';
    textArea.value = '';
    window.form.typeNotice.options[0].selected = true;
    window.form.priceNotice.value = '';
    window.form.priceNotice.min = 5000;
    window.form.timeInNotice.options[0].selected = true;
    window.form.timeOutNotice.options[0].selected = true;
    window.form.roomNumber.options[0].selected = true;
    window.form.capacityInput.options[0].selected = true;
    features.forEach(function (feature) {
      feature.checked = false;
    });
    window.pin.housingType.options[0].selected = true;
    window.pin.housingPrice.options[0].selected = true;
    window.pin.housingRooms.options[0].selected = true;
    window.pin.housingGuests.options[0].selected = true;
    window.pin.housingFeatures.forEach(function (feature) {
      feature.checked = false;
    });
    window.form.adForm.classList.add('ad-form--disabled');
    window.form.adFormFeatures.setAttribute('disabled', 'disabled');
    window.form.adFormSubmit.setAttribute('disabled', 'disabled');
    window.form.selectors.forEach(function (selector) {
      selector.setAttribute('disabled', 'disabled');
    });
    window.dragAndDrop.setStartPosition();
    window.pin.removePins();
    window.utils.windowDisabled = true;
  };

  window.utils = {
    activateWindow: activateWindow,
    disableWindow: disableWindow,
    windowDisabled: windowDisabled,
  };
})();
