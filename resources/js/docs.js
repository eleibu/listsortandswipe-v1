require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import { pageMenuShowHide } from './page-menu-show-hide.js';
import { lithiumlistPro } from './lithiumlist-pro-1.0.0.js';

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

// sales points
var outerContSalesPoints = document.getElementById('div-salespoints-outer-cont');
var listContSalesPoints = document.getElementById('div-salespoints-list-cont');
if (outerContSalesPoints && listContSalesPoints) {
	lithiumlistPro.attachToList(
		'123456789',
	    outerContSalesPoints,
	    listContSalesPoints,
	    listItemClass,
	    {
	    	onSortEnd: function(instance, origIndex, newIndex) {
	    		sortEnd(instance, origIndex, newIndex);
	    	},
	    	rightEnabled: false,
	    	leftSwipeStartThreshold: '15%',
	    	leftSwipeEndThreshold: '40%',
	        leftMasks: [],
	    	onLeftEnd: function(instance, activeIndex, didSlideOut) {
	    		if (didSlideOut) {
		    		var items = instance.listCont.getElementsByClassName(instance.listItemClass);
		    		items[activeIndex].className = items[activeIndex].className + ' deleting';
		    		setTimeout(function() {
		    			instance.listCont.removeChild(items[activeIndex]);
		    		}, 200);
	    		}
	    	}
	    }
	);	
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
	    	onSortEnd: function(instance, origIndex, newIndex) {
	    		sortEnd(instance, origIndex, newIndex);
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
	    	leftEnabled: false,
	    	rightEnabled: false,
	    	onSortEnd: function(instance, origIndex, newIndex) {
	    		sortEnd(instance, origIndex, newIndex);
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


// clone
var outerContClone = document.getElementById('div-diag-outer-cont-clone');
var listContClone = document.getElementById('div-diag-list-cont-clone');
if (outerContClone && listContClone) {
	lithiumlistPro.attachToList(
		'123456789',
	    outerContClone,
	    listContClone,
	    listItemClass,
	    {
	    	sortDragHandleClass: 'budicon-grab-ui',
	    	leftEnabled: false,
	    	rightEnabled: false,
	    	onSortEnd: function(instance, origIndex, newIndex) {
	    		sortEnd(instance, origIndex, newIndex);
	    	}
	    }
	);	
}

var selectSortCloneBoxShadow = document.getElementById('select-sortCloneBoxShadow');
var selectSortCloneScale = document.getElementById('select-sortCloneScale');
if (selectSortCloneBoxShadow && selectSortCloneScale) {
	selectSortCloneBoxShadow.addEventListener('change', function() {
		itemCloneChange();
	});
	selectSortCloneScale.addEventListener('change', function() {
		itemCloneChange();
	});
}

function itemCloneChange() {
	lithiumlistPro.setListProperties(listContClone, {
        sortCloneBoxShadow: selectSortCloneBoxShadow.options[selectSortCloneBoxShadow.selectedIndex].value,
        sortCloneScale: selectSortCloneScale.options[selectSortCloneScale.selectedIndex].value
	});
}

// masks
var outerContMasks = document.getElementById('div-diag-outer-cont-masks');
var listContMasks = document.getElementById('div-diag-list-cont-masks');
if (outerContMasks && listContMasks) {
	lithiumlistPro.attachToList(
		'123456789',
	    outerContMasks,
	    listContMasks,
	    listItemClass,
	    {
	    	sortEnabled: false,
	    	leftButtonClass: 'budicon-trash',
	    	rightButtonClass: 'budicon-reload-ui'
	    }
	);	
}

var selectLeftMaskBackground = document.getElementById('select-leftMaskBackground');
var selectLeftMaskLabel = document.getElementById('select-leftMaskLabel');
var selectRightMaskBackground = document.getElementById('select-rightMaskBackground');
var selectRightMaskLabel = document.getElementById('select-rightMaskLabel');

if (selectLeftMaskBackground && selectLeftMaskLabel && selectRightMaskBackground && selectRightMaskLabel) {
	selectLeftMaskBackground.addEventListener('change', function() {
		masksChange();
	});
	selectLeftMaskLabel.addEventListener('change', function() {
		masksChange();
	});
	selectRightMaskBackground.addEventListener('change', function() {
		masksChange();
	});
	selectRightMaskLabel.addEventListener('change', function() {
		masksChange();
	});
}

function masksChange() {
	var leftDiv = null;
	var leftValue = selectLeftMaskLabel.options[selectLeftMaskLabel.selectedIndex].value;
	if (leftValue != 'none') {
		leftDiv = createBgdDiv(leftValue);
	}

	var rightDiv = null;
	var rightValue = selectRightMaskLabel.options[selectRightMaskLabel.selectedIndex].value;
	if (rightValue != 'none') {
		rightDiv = createBgdDiv(rightValue);
	}

	lithiumlistPro.setListProperties(listContMasks, {
        leftMasks: [{
        	background: selectLeftMaskBackground.options[selectLeftMaskBackground.selectedIndex].value,
			classNameDefault: 'left-mask',
			classNameSlideOut: 'left-mask-slide-out',
			classNameSlideBack: 'left-mask-slide-back',
			childNode: leftDiv
        }],
        rightMasks: [{
        	background: selectRightMaskBackground.options[selectRightMaskBackground.selectedIndex].value,
			classNameDefault: 'right-mask',
			classNameSlideOut: 'right-mask-slide-out',
			classNameSlideBack: 'right-mask-slide-back',
			childNode: rightDiv
        }]
	});
}

function createBgdDiv(text) {
	var textNode = document.createTextNode(text);
	var span = document.createElement("span");
	span.appendChild(textNode);
	var div = document.createElement("div");
	div.appendChild(span);
	div.className = 'label-cont';
	return div;
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