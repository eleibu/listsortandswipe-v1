require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import { lithiumlistPro } from './lithiumlist-pro-1.0.0.js';

monitorWinWidth();
window.addEventListener("resize", function() { monitorWinWidth() });

var aPageMenuShow = document.getElementById('a-pagemenu-show');
var aPageMenuHide = document.getElementById('a-pagemenu-hide');
var divPageMask = document.getElementById('div-pagemask');
var divPageMenu = document.getElementById('div-pagemenu-cont');
aPageMenuShow.addEventListener('click', function () {
	menuShow();
});
aPageMenuHide.addEventListener('click', function () {
	menuHide();
});
divPageMask.addEventListener('click', function () {
	menuHide();
});
function menuShow() {
	addClass(divPageMask, 'show');
	addClass(divPageMenu, 'show');
	setTimeout(function() {addClass(divPageMenu, 'revealed');}, 1);
}
function menuHide() {
	removeClass(divPageMenu, 'revealed');
	setTimeout(function() {
		removeClass(divPageMenu, 'show');
		removeClass(divPageMask, 'show');
	}, 200);	
}

var listCont = document.getElementById('div-list-cont');
// var scrollCont = document.getElementById('div-scroll-cont');
var scrollCont = document.getElementById('div-body');
var touchEventsTarget = document.getElementById('div-body');
var listItemClass = 'listitem-cont';


var textLeft = document.createTextNode("Delete");
var spanLeft = document.createElement("span");
spanLeft.appendChild(textLeft);
var divLeft = document.createElement("div");
divLeft.appendChild(spanLeft);
divLeft.className = 'label-cont';

var textRight = document.createTextNode("Archive");
var spanRight = document.createElement("span");
spanRight.appendChild(textRight);
var divRight = document.createElement("div");
divRight.appendChild(spanRight);
divRight.className = 'label-cont';

var listProperties = {
	sortDragHandleClass: 'budicon-grab-ui',
	leftDragHandleClass: 'budicon-trash',
	rightDragHandleClass: 'budicon-reload-ui',
	onSortEnd: sortEnd,
	sortScrollSpeed: 3,
	leftEnabled: true,
	leftByDrag: true,
    leftMasks: [{
    	background: 'rgba(252, 13, 27, 1)',
		classNameDefault: 'left-mask',
		classNameSlideOut: 'left-mask-slide-out',
		classNameSlideBack: 'left-mask-slide-back',
		childNode: divLeft
    }],
	rightEnabled: true,
	rightByDrag: true,
    rightMasks: [{
    	background: 'rgba(15, 127, 18, 1)',
		classNameDefault: 'right-mask',
		classNameSlideOut: 'right-mask-slide-out',
		classNameSlideBack: 'right-mask-slide-back',
		childNode: divRight
    }],
};

lithiumlistPro.attachToList(
	'123456789',
    listCont,
    scrollCont,
    touchEventsTarget,
    listItemClass,
    listProperties
);

function sortEnd(origIndex, newIndex) {
	if (origIndex != newIndex) {
		var items = listCont.getElementsByClassName(listItemClass);
		var origItem = items[origIndex];
		var newItem = items[newIndex];

		listCont.removeChild(origItem);	
		if (newIndex > origIndex) {
			listCont.insertBefore(origItem, newItem.nextSibling);
		} else {
			listCont.insertBefore(origItem, newItem);
		}		
	}
}

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