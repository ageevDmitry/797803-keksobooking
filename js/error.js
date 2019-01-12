'use strict';

(function () {

  window.error = {

    rendErrorMessage: function () {
      var adForm = document.querySelector('.ad-form');
      var error = document.querySelector('#error').content;
      adForm.appendChild(error);
    }
  };
})();
