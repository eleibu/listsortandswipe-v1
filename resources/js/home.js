require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import { pageMenuShowHide } from './page-menu-show-hide.js';
import { lithiumlist } from './lithiumlist-1.0.0.js';

var listCont = document.getElementById('div-list-cont');
var outerCont = document.getElementById('div-ptable');
var listItemClass = 'listitem-cont';

var textLeft = document.createTextNode("Delete");
var spanLeft = document.createElement("span");
spanLeft.appendChild(textLeft);
var divLeft = document.createElement("div");
divLeft.appendChild(spanLeft);
divLeft.className = 'label-cont';

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
    onLeftEnd: leftEnd,
	rightEnabled: false
};

lithiumlist.attachToList(
	'h7rg0P4NRjsXOffykBu7sUaBwGdBBL',
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

function leftEnd(instance, index, didSlideOut) {
	if (didSlideOut) {
		var items = instance.listCont.getElementsByClassName(instance.listItemClass);
		if (items.length >= 1) {
			items[index].remove();
			if (items.length == 0) {
				var divRestore = document.getElementById('div-restore-cont');
				divRestore.className = 'show';				
			}
		}
	}
}

var retoreItems = Array.prototype.slice.call(listCont.getElementsByClassName(listItemClass));
var restoreCont = document.getElementById('div-restore-cont');
restoreCont.addEventListener('click', function() {
	if (this.className == 'show') {
		this.className = null;
		setTimeout(function() {
			for (var i = 0, len = retoreItems.length; i < len; i++) {
				listCont.appendChild(retoreItems[i]);
			}
		}, 200);
	}
});