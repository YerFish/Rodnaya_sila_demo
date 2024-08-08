/* libs start */
; (function () {
	var canUseWebP = function () {
		var elem = document.createElement('canvas');

		if (!!(elem.getContext && elem.getContext('2d'))) {
			// was able or not to get WebP representation
			return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
		}

		// very old browser like IE 8, canvas not supported
		return false;
	};

	var isWebpSupported = canUseWebP();

	if (isWebpSupported === false) {
		var lazyItems = document.querySelectorAll('[data-src-replace-webp]');

		for (var i = 0; i < lazyItems.length; i += 1) {
			var item = lazyItems[i];

			var dataSrcReplaceWebp = item.getAttribute('data-src-replace-webp');
			if (dataSrcReplaceWebp !== null) {
				item.setAttribute('data-src', dataSrcReplaceWebp);
			}
		}
	}

	var lazyLoadInstance = new LazyLoad({
		elements_selector: ".lazy"
	});
})();
/* libs end */

// mission-slider start
$(document).ready(function(){
	$('.mission-slider').slick({
		arrows:true,
		dots:false,
		slidesToShow:1,
		rows: 1,
		infinite: false,
		// infinite: true,
		autoplay:false,
		speed:700,
		autoplaySpeed:800,
		focusOnSelect: true
	});
});
// mission-slider end

// copy start
function copyFunction() {
  var copyText = document.getElementById("copy_field");
  copyText.select();

  var tooltip = document.getElementById("copy_tooltip");
  tooltip.innerHTML = "Скопировано!"
}
function outFunc() {
  var tooltip = document.getElementById("copy_tooltip");
  tooltip.innerHTML = "Скопировать ссылку";
}
// copy end

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

/* header start */
; (function () {
	if (window.matchMedia('(max-width: 992px)').matches) {
		return;
	}

	var headerPage = document.querySelector('.header-page');

	window.addEventListener('scroll', function () {
		if (window.pageYOffset > 0) {
			headerPage.classList.add('is-active');
		} else {
			headerPage.classList.remove('is-active');
		}
	});
})();
/* header end */

/* menu */

; (function () {
	var showMenu = function (target) {
		target.classList.add('menu-on');
	};

	var closeMenu = function (target) {
		target.classList.remove('menu-on');
	};

	myLib.body.addEventListener('click', function (e) {
		var target = e.target;
		var menuClass = myLib.closestAttr(target, 'data-menu');

		if (menuClass === null) {
			return;
		}

		e.preventDefault();
		var menu = document.querySelector('.' + menuClass);

		var menuOn = document.querySelector('.menu.menu-on');

		if (menu && !menuOn) {
			showMenu(menu);
			myLib.toggleScroll();
		}
	});

	myLib.body.addEventListener('click', function (e) {
		var target = e.target;

		if (target.classList.contains('menu-close') ||
			target.classList.contains('menu__inner')) {
			var menu = myLib.closestItemByClass(target, 'menu');

			closeMenu(menu);
			myLib.toggleScroll();
		}
	});

	myLib.body.addEventListener('keydown', function (e) {
		if (e.keyCode !== 27) {
			return;
		}

		var menu = document.querySelector('.menu.menu-on');

		if (menu) {
			closeMenu(menu);
			myLib.toggleScroll();
		}
	});
})();

/* menu */

/* sidebar start */

; (function () {
	var showSidebar = function (target) {
		target.classList.add('sidebar-active');
	};

	var closeSidebar = function (target) {
		target.classList.remove('sidebar-active');
	};

	myLib.body.addEventListener('click', function (e) {
		var target = e.target;
		var sidebarClass = myLib.closestAttr(target, 'show-sidebar');

		if (sidebarClass === null) {
			return;
		}

		e.preventDefault();
		var sidebar = document.querySelector('.' + sidebarClass);

		var sidebarOn = document.querySelector('.sidebar.sidebar-active');

		if (sidebar && !sidebarOn) {
			showSidebar(sidebar);
		}
		if (sidebar && sidebarOn) {
			closeSidebar(sidebar);
		}
	});
})();

/* sidebar end */

/* popup start */
; (function () {
	var showPopup = function (target) {
		target.classList.add('is-active');
	};

	var closePopup = function (target) {
		target.classList.remove('is-active');
	};

	myLib.body.addEventListener('click', function (e) {
		var target = e.target;
		var popupClass = myLib.closestAttr(target, 'data-popup');

		if (popupClass === null) {
			return;
		}

		e.preventDefault();
		var popup = document.querySelector('.' + popupClass);
		var popupOn = document.querySelector('.popup.is-active');

		if (popup) {
			if (popupOn) {
				closePopup(popupOn);
				showPopup(popup);
				myLib.toggleScroll();
			}
			else {
			showPopup(popup);
			myLib.toggleScroll();
			}
		}

	});

	myLib.body.addEventListener('click', function (e) {
		var target = e.target;

		if (target.classList.contains('popup-close') ||
			target.classList.contains('popup__inner')) {
			var popup = myLib.closestItemByClass(target, 'popup');

			closePopup(popup);
			myLib.toggleScroll();
		}
	});

	myLib.body.addEventListener('keydown', function (e) {
		if (e.keyCode !== 27) {
			return;
		}

		var popup = document.querySelector('.popup.is-active');

		if (popup) {
			closePopup(popup);
			myLib.toggleScroll();
		}
	});
})();

/* popup end */


/* scrollTo start */
;(function() {

  var scroll = function(target) {
    var targetTop = target.getBoundingClientRect().top;
    var scrollTop = window.pageYOffset;
    var targetOffsetTop = targetTop + scrollTop;
    var headerOffset = document.querySelector('.header-page').clientHeight;

    window.scrollTo(0, targetOffsetTop - headerOffset);
  }

  myLib.body.addEventListener('click', function(e) {
    var target = e.target;
    var scrollToItemClass = myLib.closestAttr(target, 'data-scroll-to');

    if (scrollToItemClass === null) {
      return;
    }

    e.preventDefault();
    var scrollToItem = document.querySelector('.' + scrollToItemClass);

    if (scrollToItem) {
      scroll(scrollToItem);
    }
  });
})();
/* scrollTo end */

// products slider start
$(document).ready(function(){
	$('.products-slider').slick({
		arrows:true,
		dots:false,
		slidesToShow: 4,
		rows: 2,
		infinite: false,
		autoplay:false,
		speed:700,
		autoplaySpeed:800,
		focusOnSelect: true,
		responsive:[
			{
				breakpoint: 1160,
				settings: {
					slidesToShow:3
				}
			},
			{
				breakpoint: 990,
				settings: {
					rows: 4,
					slidesToShow:2
				}
			},
			{
				breakpoint: 630,
				settings: {
					rows: 12,
					slidesToShow:1
				}
			}
		]
	});
});
// products slider end

// recommendations slider start
$(document).ready(function(){
	$('.recommendations-slider').slick({
		arrows:true,
		dots:false,
		slidesToShow:4,
		rows: 1,
		infinite: false,
		autoplay:false,
		speed:700,
		autoplaySpeed:800,
		focusOnSelect: true,
		responsive:[
			{
				breakpoint: 1160,
				settings: {
					slidesToShow:3
				}
			},
			{
				breakpoint: 990,
				settings: {
					slidesToShow:2
				}
			},
			{
				breakpoint: 630,
				settings: {
					slidesToShow:1
				}
			}
		]
	});
});
// products recommendations end


// feedback slider start
$(document).ready(function(){
	$('.feedback-slider').slick({
		arrows:true,
		dots:false,
		slidesToShow:3,
		rows: 1,
		infinite: true,
		autoplay:false,
		speed:700,
		autoplaySpeed:800,
		focusOnSelect: true,
		responsive:[
			{
				breakpoint: 1160,
				settings: {
					slidesToShow:2
				}
			},
			{
				breakpoint: 890,
				settings: {
					slidesToShow:1
				}
			},
		]
	});
});
// feedback slider end
