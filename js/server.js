'use strict';

(function () {
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var ERROR_SERVER = 500;
  var ERROR_BAD_REQUEST = 400;
  var ERROR_NOT_FOUND = 404;
  var SUCCESS = 200;
  var methodRequest;

  var serverRequest = function (method, URL, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        onLoad(xhr.response);
      } else if (xhr.status === ERROR_SERVER) {
        onError();
      } else if (xhr.status === ERROR_BAD_REQUEST) {
        onError();
      } else if (xhr.status === ERROR_NOT_FOUND) {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open(method, URL);
    xhr.send(data);
  };

  window.server = {
    load: function (onload, onError) {
      methodRequest = 'GET';

      serverRequest(methodRequest, URL_LOAD, onload, onError);
    },

    save: function (data, onLoad, onError) {
      methodRequest = 'POST';

      serverRequest(methodRequest, URL_SAVE, onLoad, onError, data);
    },
  };
})();
