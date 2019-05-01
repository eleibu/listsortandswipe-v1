require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import { pageMenuShowHide } from './page-menu-show-hide.js';
import { lithiumlist } from './lithiumlist-1.0.0.js';

var listCont = document.getElementById('div-list-cont');
var outerCont = document.getElementById('div-ptable');
// var outerCont = window;
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
	sortDragHandleClass: 'icon-grab-ui',
	leftButtonClass: 'icon-trash',
	rightButtonClass: 'icon-archive',
	onSortEnd: sortEnd,
	sortScrollSpeed: 3,
	leftEnabled: true,
	leftBySwipe: true,
    leftMasks: [{
    	background: 'rgba(252, 13, 27, 1)',
		classNameDefault: 'left-mask',
		classNameSlideOut: 'left-mask-slide-out',
		classNameSlideBack: 'left-mask-slide-back',
		childNode: divLeft
    }],
	rightEnabled: true,
	rightBySwipe: true,
    rightMasks: [{
    	background: 'rgba(15, 127, 18, 1)',
		classNameDefault: 'right-mask',
		classNameSlideOut: 'right-mask-slide-out',
		classNameSlideBack: 'right-mask-slide-back',
		childNode: divRight
    }],
};

lithiumlist.attachToList(
	'123456789',
    outerCont,
    listCont,
    listItemClass,
    listProperties
);

function sortEnd(instance, origIndex, newIndex) {
	if (origIndex != newIndex) {
		var items = instance.listCont.getElementsByClassName(instance.listItemClass);
		var origItem = items[origIndex];
		var newItem = items[newIndex];

		instance.listCont.removeChild(origItem);	
		if (newIndex > origIndex) {
			instance.listCont.insertBefore(origItem, newItem.nextSibling);
		} else {
			instance.listCont.insertBefore(origItem, newItem);
		}		
	}
}