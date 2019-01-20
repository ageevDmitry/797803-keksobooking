'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');

  window.serverMessage = {

    rendSuccessMessage: function () {

      var success = document.querySelector('#success').content;
      adForm.appendChild(success);

      adForm.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          var newSuccess = document.querySelector('.success');
          adForm.removeChild(newSuccess);
        }
      });
    },

    rendErrorMessage: function () {

      var error = document.querySelector('#error').content;
      adForm.appendChild(error);
      error.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          var newError = document.querySelector('.error');
          adForm.removeChild(newError);
        }
      });
    }
  };
})();

// rendSuccessMessage: function () {

//   adForm.appendChild(success);
//   document.addEventListener('keydown', function (evt) {
//     if (evt.keyCode === 27) {
//       var newSuccess = document.querySelector('.success');
//       adForm.removeChild(newSuccess);
//     }
//   });

//   document.addEventListener('click', function () {
//     var newSuccess = document.querySelector('.success');
//     adForm.removeChild(newSuccess);
//   });
// },

// rendErrorMessage: function () {
//   var error = document.querySelector('#error').content;
//   adForm.appendChild(error);

//   document.addEventListener('keydown', function (evt) {
//     if (evt.keyCode === 27) {
//       var newError = document.querySelector('.error');
//       adForm.removeChild(newError);
//     }
//   });

//   document.addEventListener('click', function () {
//     var newError = document.querySelector('.error');
//     adForm.removeChild(newError);
//   });

//   document.querySelector('.error__button').addEventListener('click', function () {
//     var newError = document.querySelector('.error');
//     adForm.removeChild(newError);
//   });
