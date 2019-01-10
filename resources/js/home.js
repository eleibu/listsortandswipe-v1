require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import { pageMenuShowHide } from './page-menu-show-hide.js';
import { lithiumlistPro } from './lithiumlist-pro-1.0.0.js';

var listCont = document.getElementById('div-list-cont');
var scrollCont = document.getElementById('div-body');
// var scrollCont = window;
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