'use strict';

(function () {

  var serverRequest = function (methodRequest, URL, onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.open(methodRequest, URL);
    xhr.send();

  };

  window.server = {

    load: function (onLoad, onError) {

      var URL = 'https://js.dump.academy/keksobooking/data';
      var methodRequest = 'GET';

      serverRequest(methodRequest, URL, onLoad, onError);
    }
  };


})();
