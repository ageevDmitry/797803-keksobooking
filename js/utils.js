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
  };

  var disableWindow = function () {
    userDialog.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    window.form.adFormFeatures.setAttribute('disabled');
    window.form.adFormSubmit.setAttribute('disabled');
    window.form.selectors.forEach(function (selector) {
      selector.setAttribute('disabled');
    });
    window.utils.windowDisabled = true;
  };

  window.utils = {
    activateWindow: activateWindow,
    disableWindow: disableWindow,
    windowDisabled: windowDisabled,
  };
})();
