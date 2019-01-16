'use strict';

(function () {

  var PIC_WIDTH_MAIN = 64;
  var PIC_HEIGHT_MAIN = 84;
  var PIC_MAIN_COORDINATE_Y_MIN = 130;
  var PIC_MAIN_COORDINATE_Y_MAX = 630;
  var mapPinMain = document.querySelector('.map__pin--main');
  var userDialog = document.querySelector('.map');


  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;
    var firstMove = true;
    var mapOverlay = document.querySelector('.map__overlay');
    var mapOverlayWidth = mapOverlay.offsetWidth;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinMainTop = mapPinMain.offsetTop - shift.y;
      var mapPinMainLeft = mapPinMain.offsetLeft - shift.x;

      if (mapPinMainTop < PIC_MAIN_COORDINATE_Y_MIN) {
        mapPinMain.style.top = PIC_MAIN_COORDINATE_Y_MIN + 'px';
      } else if (mapPinMainTop > PIC_MAIN_COORDINATE_Y_MAX) {
        mapPinMain.style.top = PIC_MAIN_COORDINATE_Y_MAX + 'px';
      } else {
        mapPinMain.style.top = mapPinMainTop + 'px';
      }

      if (mapPinMainLeft < 0) {
        mapPinMain.style.left = 0 + 'px';
      } else if (mapPinMainLeft > mapOverlayWidth - PIC_WIDTH_MAIN) {
        mapPinMain.style.left = mapOverlayWidth - PIC_WIDTH_MAIN + 'px';
      } else {
        mapPinMain.style.left = mapPinMainLeft + 'px';
      }

      var mapPinMainLeftCoords = mapPinMainLeft + PIC_WIDTH_MAIN / 2;
      var mapPinMainTopCoords = mapPinMainTop + PIC_HEIGHT_MAIN;
      window.form.addressNotice.setAttribute('value', mapPinMainLeftCoords + ', ' + mapPinMainTopCoords);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (firstMove) {
        userDialog.classList.remove('map--faded');

        // window.card.parentMapElement.insertBefore(window.card.fragmentMap, window.card.referenceMapElement);

        window.pin.similarPicElement.appendChild(window.pin.fragmentPic);

        window.form.adForm.classList.remove('ad-form--disabled');
        window.form.adForm.querySelector('.ad-form__element--submit').removeAttribute('disabled');
        window.form.adForm.querySelector('.features').removeAttribute('disabled');

        window.form.selectors.forEach(function (selector) {
          selector.removeAttribute('disabled');
        });
        firstMove = false;
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

})();
