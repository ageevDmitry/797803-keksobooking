'use strict';

(function () {

  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var methodRequest;

  var serverRequest = function (method, URL, onLoad, onError, data) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open(method, URL);
    xhr.send(data);

  };

  window.server = {

    load: function (onload) {

      methodRequest = 'GET';

      serverRequest(methodRequest, URL_LOAD, onload);
    },

    save: function (data, onLoad, onError) {

      methodRequest = 'POST';

      serverRequest(methodRequest, URL_SAVE, onLoad, onError, data);
    }
  };

})();

