require('bootstrap');

import { lithiumlistPro } from './lithiumlist-pro-1.0.0.js';

var listCont = document.getElementById('div-list-cont');
var scrollCont = document.getElementById('div-scroll-cont');
// var eventsTarget = document.getElementById('div-body');
var eventsTarget = window;
var listItemClass = 'listitem-cont';

// function(listCont, scrollCont, eventsTarget, listItemClass, listProperties)

var listProperties = {
	sortDragHandleClass: 'budicon-grab-ui',
	leftDragHandleClass: 'budicon-reload-ui',
	rightDragHandleClass: 'budicon-trash',
	onSortEnd: sortEnd
};

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

lithiumlistPro.attachToList(
    scrollCont,
    listCont,
    eventsTarget,
    listItemClass,
    listProperties
);

// lithiumlistPro.setDefaults({delay: 200});

// lithiumlistPro.detach(listCont);