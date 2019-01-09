export var pageMenuShowHide = (function () {
	var menuShow = function() {
		addClass(divPageMask, 'show');
		setTimeout(function() {addClass(divPageMask, 'revealed');}, 1);
		addClass(divPageMenu, 'show');
		setTimeout(function() {addClass(divPageMenu, 'revealed');}, 1);
	};

	var menuHide = function() {
		removeClass(divPageMenu, 'revealed');
		removeClass(divPageMask, 'revealed');
		setTimeout(function() {
			removeClass(divPageMenu, 'show');
			removeClass(divPageMask, 'show');
		}, 200);
	};

	var addClass = function(el, className) {
		if (el.classList) {
			el.classList.add(className);
		} else if (!hasClass(el, className)) {
			el.className += " " + className;
		}
	};

	var removeClass = function(el, className) {
		if (el.classList) {
			el.classList.remove(className);
		} else if (hasClass(el, className)) {
	        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
	        el.className = el.className.replace(reg, ' ');
		}
	};

	var aPageMenuShow = document.getElementById('a-pagemenu-show');
	var aPageMenuHide = document.getElementById('a-pagemenu-hide');
	var divPageMask = document.getElementById('div-pagemask');
	var divPageMenu = document.getElementById('div-pagemenu-cont');
	
	if ((aPageMenuShow) && (aPageMenuHide) && (divPageMask) && (divPageMenu)) {
		aPageMenuShow.addEventListener('click', function () {
			menuShow();
		});
		aPageMenuHide.addEventListener('click', function () {
			menuHide();
		});
		divPageMask.addEventListener('click', function () {
			menuHide();
		});
	}
})();