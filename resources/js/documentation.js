require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import { pageMenuShowHide } from './page-menu-show-hide.js';
import { lithiumlist } from './lithiumlist-1.0.0.js';

import Prism from 'prismjs';
Prism.highlightAll();

var listItemClass = 'list-item';
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

// setup
var outerContSetup = document.getElementById('div-diag-outer-cont-setup');
var listContSetup = document.getElementById('div-diag-list-cont-setup');
if (outerContSetup && listContSetup) {
	lithiumlist.attachToList(
		'123456789',
	    outerContSetup,
	    listContSetup,
	    'list-item'
	);
}