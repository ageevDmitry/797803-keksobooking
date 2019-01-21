'use strict';

(function () {
  var PIC_WIDTH_MAIN = 64;
  var PIC_HEIGHT_MAIN = 84;
  var PIC_MAIN_COORDINATE_Y_MIN = 130;
  var PIC_MAIN_COORDINATE_Y_MAX = 630;
  var START_MAP_PIN_MAIN_X = 570;
  var START_MAP_PIN_MAIN_Y = 375;

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapOverlay = document.querySelector('.map__overlay');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var dragged = false;

    var mapOverlayWidth = mapOverlay.offsetWidth;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var mapPinMainTop = mapPinMain.offsetTop - shift.y;
      var mapPinMainLeft = mapPinMain.offsetLeft - shift.x;

      if (mapPinMainTop < PIC_MAIN_COORDINATE_Y_MIN) {
        mapPinMainTop = PIC_MAIN_COORDINATE_Y_MIN;
      } else if (mapPinMainTop > PIC_MAIN_COORDINATE_Y_MAX) {
        mapPinMainTop = PIC_MAIN_COORDINATE_Y_MAX;
      }

      if (mapPinMainLeft < 0) {
        mapPinMainLeft = 0;
      } else if (mapPinMainLeft > mapOverlayWidth - PIC_WIDTH_MAIN) {
        mapPinMainLeft = mapOverlayWidth - PIC_WIDTH_MAIN;
      }

      mapPinMain.style.top = mapPinMainTop + 'px';
      mapPinMain.style.left = mapPinMainLeft + 'px';
      var mapPinMainLeftCoords = mapPinMainLeft + PIC_WIDTH_MAIN / 2;
      var mapPinMainTopCoords = mapPinMainTop + PIC_HEIGHT_MAIN;
      window.form.addressNotice.setAttribute(
          'value',
          mapPinMainLeftCoords + ', ' + mapPinMainTopCoords
      );
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (window.utils.windowDisabled) {
        window.utils.activateWindow();
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (e) {
          e.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var setStartMapPinMain = function () {
    mapPinMain.style.top = START_MAP_PIN_MAIN_Y + 'px';
    mapPinMain.style.left = START_MAP_PIN_MAIN_X + 'px';
    window.form.addressNotice.setAttribute(
        'value',
        START_MAP_PIN_MAIN_X + ', ' + START_MAP_PIN_MAIN_Y
    );
  };

  window.dragAndDrop = {
    setStartMapPinMain: setStartMapPinMain
  };
})();
