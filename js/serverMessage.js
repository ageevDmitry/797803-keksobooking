'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var ESC_KEYCODE = 27;

  var closeServerMessage = function (classMessage) {
    adForm.removeChild(classMessage);
  };

  window.serverMessage = {

    rendSuccessMessage: function () {

      var successMessageContent = document.querySelector('#success').content;
      adForm.appendChild(successMessageContent);
      var successMessageClass = document.querySelector('.success');
      window.utils.disableWindow();
      window.pin.removePins();

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          closeServerMessage(successMessageClass);
        }
      }, {once: true});

      document.addEventListener('click', function () {
        closeServerMessage(successMessageClass);
      }, {once: true});
    },

    rendErrorMessage: function () {

      var error = document.querySelector('#error').content;
      adForm.appendChild(error);
      var errorMessageClass = document.querySelector('.error');

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          closeServerMessage(errorMessageClass);
        }
      }, {once: true});

      document.addEventListener('click', function () {
        closeServerMessage(errorMessageClass);
      }, {once: true});

      document.querySelector('.error_button').querySelector('click', function () {
        closeServerMessage(errorMessageClass);
      }, {once: true});
    }
  };
})();

