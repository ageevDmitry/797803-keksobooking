'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var closeErrorMessage = function () {
    var errorMessageClass = document.querySelector('.error');
    window.form.adForm.removeChild(errorMessageClass);
    document.removeEventListener('click', onClickErrorMessage);
    document.removeEventListener('keydown', onKeyDownErrorMesssage);
  };

  var onClickErrorMessage = function () {
    closeErrorMessage();
  };

  var onKeyDownErrorMesssage = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeErrorMessage();
    }
  };

  var closeSuccessMessage = function () {
    var successMessageClass = document.querySelector('.success');
    window.form.adForm.removeChild(successMessageClass);
    document.removeEventListener('click', onClickSuccessMessage);
    document.removeEventListener('keydown', onKeySuccessMessage);
  };

  var onClickSuccessMessage = function () {
    closeSuccessMessage();
  };

  var onKeySuccessMessage = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSuccessMessage();
    }
  };

  window.serverMessage = {
    rendSuccessMessage: function () {
      var successMessageContent = document.querySelector('#success').cloneNode(true).content;
      window.form.adForm.appendChild(successMessageContent);
      window.utils.disableWindow();
      window.pin.removePins();

      document.addEventListener('keydown', onKeySuccessMessage);
      document.addEventListener('click', onClickSuccessMessage);
    },

    rendErrorMessage: function () {
      var error = document.querySelector('#error').cloneNode(true).content;
      window.form.adForm.appendChild(error);

      document.addEventListener('keydown', onKeyDownErrorMesssage);
      document.addEventListener('click', onClickErrorMessage);
      document.querySelector('.error__button').querySelector(
          'click',
          function () {
            closeErrorMessage();
          },
          {once: true}
      );
    },
  };
})();
