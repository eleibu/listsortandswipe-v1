require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import { pageMenuShowHide } from './page-menu-show-hide.js';
import { lithiumlistPro } from './lithiumlist-pro-1.0.0.js';

import Prism from 'prismjs';
Prism.highlightAll();

var listItemClass = 'list-item';
function sortEnd(listCont, origIndex, newIndex) {
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

// sorting
var outerContSorting = document.getElementById('div-diag-outer-cont-sorting');
var listContSorting = document.getElementById('div-diag-list-cont-sorting');
if (outerContSorting && listContSorting) {
	lithiumlistPro.attachToList(
		'123456789',
	    outerContSorting,
	    listContSorting,
	    listItemClass,
	    {
	    	sortDragHandleClass: 'budicon-grab-ui',
	    	leftEnabled: false,
	    	rightEnabled: false,
	    	onSortEnd: function(origIndex, newIndex) {
	    		sortEnd(listContSorting, origIndex, newIndex);
	    	}
	    }
	);	
}

// automatic scrolling
var outerContAutomaticScrolling = document.getElementById('div-diag-outer-cont-automatic-scrolling');
var listContAutomaticScrolling = document.getElementById('div-diag-list-cont-automatic-scrolling');
if (outerContAutomaticScrolling && listContAutomaticScrolling) {
	lithiumlistPro.attachToList(
		'123456789',
	    outerContAutomaticScrolling,
	    listContAutomaticScrolling,
	    listItemClass,
	    {
	    	sortDragHandleClass: 'budicon-grab-ui',
	    	sortScrollSpeed: 3,
	    	leftEnabled: false,
	    	rightEnabled: false,
	    	onSortEnd: function(origIndex, newIndex) {
	    		sortEnd(listContAutomaticScrolling, origIndex, newIndex);
	    	}
	    }
	);	
}

var selectSortScrollSpeed = document.getElementById('select-sortScrollSpeed');
if (selectSortScrollSpeed) {
	selectSortScrollSpeed.addEventListener('change', function() {
		lithiumlistPro.setListProperties(listContAutomaticScrolling, {
			sortScrollSpeed: parseInt(selectSortScrollSpeed.options[selectSortScrollSpeed.selectedIndex].value)
		});
	});	
}

// sliding and swiping
var outerContSlidingAndSwiping = document.getElementById('div-diag-outer-cont-sliding-and-swiping');
var listContSlidingAndSwiping = document.getElementById('div-diag-list-cont-sliding-and-swiping');
if (outerContSlidingAndSwiping && listContSlidingAndSwiping) {
	lithiumlistPro.attachToList(
		'123456789',
	    outerContSlidingAndSwiping,
	    listContSlidingAndSwiping,
	    listItemClass,
	    {
	    	sortEnabled: false,
	    	leftButtonClass: 'budicon-trash',
	    	rightButtonClass: 'budicon-reload-ui',
	    }
	);	
}


var selectLeftSwipeStartThreshold = document.getElementById('select-leftSwipeStartThreshold');
var selectLeftSwipeEndThreshold = document.getElementById('select-leftSwipeEndThreshold');
var selectLeftSlideOutDuration = document.getElementById('select-leftSlideOutDuration');
var selectLeftSlideBackDuration = document.getElementById('select-leftSlideBackDuration');

if (selectLeftSwipeStartThreshold && selectLeftSwipeEndThreshold && selectLeftSlideOutDuration && selectLeftSlideBackDuration) {
	selectLeftSwipeStartThreshold.addEventListener('change', function() {
		slideSwipeChange();
	});
	selectLeftSwipeEndThreshold.addEventListener('change', function() {
		slideSwipeChange();
	});
	selectLeftSlideOutDuration.addEventListener('change', function() {
		slideSwipeChange();
	});
	selectLeftSlideBackDuration.addEventListener('change', function() {
		slideSwipeChange();
	});
}

function slideSwipeChange() {
	lithiumlistPro.setListProperties(listContSlidingAndSwiping, {
        leftSwipeStartThreshold: selectLeftSwipeStartThreshold.options[selectLeftSwipeStartThreshold.selectedIndex].value,
        leftSwipeEndThreshold: selectLeftSwipeEndThreshold.options[selectLeftSwipeEndThreshold.selectedIndex].value,
        leftSlideOutDuration: parseInt(selectLeftSlideOutDuration.options[selectLeftSlideOutDuration.selectedIndex].value),
        leftSlideBackDuration: parseInt(selectLeftSlideBackDuration.options[selectLeftSlideBackDuration.selectedIndex].value)
	});
}


// setup
var outerContSetup = document.getElementById('div-diag-outer-cont-setup');
var listContSetup = document.getElementById('div-diag-list-cont-setup');
if (outerContSetup && listContSetup) {
	lithiumlistPro.attachToList(
		'123456789',
	    outerContSetup,
	    listContSetup,
	    'list-item'
	);	
}