/* myLib start */
; (function () {
	window.myLib = {};

	window.myLib.body = document.querySelector('body');

	window.myLib.closestAttr = function (item, attr) {
		var node = item;

		while (node) {
			var attrValue = node.getAttribute(attr);
			if (attrValue) {
				return attrValue;
			}

			node = node.parentElement;
		}

		return null;
	};

	window.myLib.closestItemByClass = function (item, className) {
		var node = item;

		while (node) {
			if (node.classList.contains(className)) {
				return node;
			}

			node = node.parentElement;
		}

		return null;
	};

	window.myLib.toggleScroll = function () {
		myLib.body.classList.toggle('no-scroll');
	};
})();
/* myLib end */

/* map start */
;(function() {
  var sectionContacts = document.querySelector('.section-contacts');

  var ymapInit = function() {
    if (typeof ymaps === 'undefined') {
      return;
    }
  
    ymaps.ready(function () {
      var myMap = new ymaps.Map('ymap', {
              center: [55.710281, 37.665192],
              zoom: 16
          }, {
              searchControlProvider: 'yandex#search'
          }),
  
          myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
              balloonContent: 'г. Москва, Автозаводская улица, 1'
          }, {
              iconLayout: 'default#image',
							iconImageHref: '../img/common/marker.svg',
              iconImageSize: [60, 58.2],
              iconImageOffset: [-20, -38]
          });
  
      myMap.geoObjects.add(myPlacemark);
  
      myMap.behaviors.disable('scrollZoom');
    });
  };

  var ymapLoad = function() {
    var script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru';
    myLib.body.appendChild(script);
    script.addEventListener('load', ymapInit);
  };

  var checkYmapInit = function() {
    var sectionContactsTop = sectionContacts.getBoundingClientRect().top;
    var scrollTop = window.pageYOffset;
    var sectionContactsOffsetTop = scrollTop + sectionContactsTop;

    if (scrollTop + window.innerHeight > sectionContactsOffsetTop) {
      ymapLoad();
      window.removeEventListener('load', checkYmapInit);
    }
  };

  window.addEventListener('load', checkYmapInit);
  checkYmapInit();
})();
/* map end */