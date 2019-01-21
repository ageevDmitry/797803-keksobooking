'use strict';

(function () {
  var userDialog = document.querySelector('.map');
  var windowDisabled = true;

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
    window.form.capacityInput.value = '1';
  };

  var disableWindow = function () {
    userDialog.classList.add('map--faded');
    // var titleNotice = document.querySelector('#title');
    // titleNotice.reset();
    window.form.adForm.classList.add('ad-form--disabled');
    window.form.adFormFeatures.setAttribute('disabled', 'disabled');
    window.form.adFormSubmit.setAttribute('disabled', 'disabled');
    window.form.selectors.forEach(function (selector) {
      selector.setAttribute('disabled', 'disabled');
    });
    window.dragAndDrop.setStartMapPinMain();
    window.utils.windowDisabled = true;
  };

  window.utils = {
    activateWindow: activateWindow,
    disableWindow: disableWindow,
    windowDisabled: windowDisabled,
  };
})();
