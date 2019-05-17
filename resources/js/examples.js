require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import { pageMenuShowHide } from './page-menu-show-hide.js';
import lithiumlist from 'lithiumlist';

import Prism from 'prismjs';
Prism.highlightAll();

// super simple
var outerContSuperSimple = document.getElementById('outerCont-super-simple');
var listContSuperSimple = document.getElementById('listCont-super-simple');
if (outerContSuperSimple && listContSuperSimple) {
    lithiumlist.attachToList(
        '123456789',
        outerContSuperSimple,
        listContSuperSimple,
        'listItem'
    );
}

// page scrolling
var outerContFullPageScrolling = document.getElementById('pageWrapper');
var listContFullPageScrolling = document.getElementById('listCont-full-page-scrolling');
if (outerContFullPageScrolling && listContFullPageScrolling) {
    lithiumlist.attachToList(
        '123456789',
        outerContFullPageScrolling,
        listContFullPageScrolling,
        'listItem'
    );
}

// buttons
var outerContButtons = document.getElementById('outerCont-buttons');
var listContButtons = document.getElementById('listCont-buttons');
if (outerContButtons && listContButtons) {
    lithiumlist.attachToList(
        '123456789',
        outerContButtons,
        listContButtons,
        'listItem',
        {
        	sortDragHandleClass: 'icon-grab-ui',
        	leftButtonClass: 'icon-arrow-left-circle',
        	rightButtonClass: 'icon-arrow-right-circle'
        }
    );
}

// onSortEnd
var outerContOnSortEnd = document.getElementById('outerCont-on-sort-end');
var listContOnSortEnd = document.getElementById('listCont-on-sort-end');
if (outerContOnSortEnd && listContOnSortEnd) {
    lithiumlist.attachToList(
        '123456789',
        outerContOnSortEnd,
        listContOnSortEnd,
        'listItem',
        {
        	leftEnabled: false,
        	rightEnabled: false,
        	onSortEnd: function(instance, oldIndex, newIndex) {
		        if (oldIndex != newIndex) {
		            var items = instance.listCont.getElementsByClassName(instance.listItemClass);
		            var oldItem = items[oldIndex];
		            var newItem = items[newIndex];

		            instance.listCont.removeChild(oldItem);    
		            if (newIndex > oldIndex) {
		                instance.listCont.insertBefore(oldItem, newItem.nextSibling);
		            } else {
		                instance.listCont.insertBefore(oldItem, newItem);
		            }
		        }
        	}
        }
    );
}

// background labels
var outerContBackgroundLabels = document.getElementById('outerCont-background-labels');
var listContBackgroundLabels = document.getElementById('listCont-background-labels');
if (outerContBackgroundLabels && listContBackgroundLabels) {
	var labelLeft = document.createElement('div');
	labelLeft.innerHTML = '<span class=\'left\'>Delete</span>';

	var labelRight = document.createElement('div');
	labelRight.innerHTML = '<span class=\'right\'>Archive</span>';

    lithiumlist.attachToList(
        '123456789',
        outerContBackgroundLabels,
        listContBackgroundLabels,
        'listItem',
        {
        	sortEnabled: false,
		    leftMasks: [{
		    	background: 'red',
		    	classNameDefault: 'mask',
				childNode: labelLeft
		    }],
		    rightMasks: [{
		    	background: 'green',
		    	classNameDefault: 'mask',
				childNode: labelRight
		    }]
        }
    );
}

// no masks
var outerContNoMasks = document.getElementById('outerCont-no-masks');
var listContNoMasks = document.getElementById('listCont-no-masks');
if (outerContNoMasks && listContNoMasks) {
    lithiumlist.attachToList(
        '123456789',
        outerContNoMasks,
        listContNoMasks,
        'listItem',
        {
        	sortEnabled: false,
		    leftMasks: [],
		    rightMasks: []
        }
    );
}

// delete item
var outerContDeleteItem = document.getElementById('outerCont-delete-item');
var listContDeleteItem = document.getElementById('listCont-delete-item');
if (outerContDeleteItem && listContDeleteItem) {
	var items = Array.prototype.slice.call(listContDeleteItem.getElementsByClassName('listItem'));
	var aRefresh = document.getElementById('a-delete-item-refresh');
	if (aRefresh) {
		aRefresh.addEventListener("click", function() {
			listContDeleteItem.innerHTML = '';
			for (var i = 0, len = items.length; i < len; i++) {
				listContDeleteItem.appendChild(items[i]);
			}
		});
	}

    lithiumlist.attachToList(
        '123456789',
        outerContDeleteItem,
        listContDeleteItem,
        'listItem',
        {
        	sortEnabled: false,
        	rightEnabled: false,
        	leftButtonClass: 'icon-trash',
		    leftMasks: [],
	    	onLeftEnd: function(instance, index, didSlideOut) {
	    		if (didSlideOut) {
		    		var items = instance.listCont.getElementsByClassName(instance.listItemClass);
		    		var origLength = items[index].className.length;
		    		items[index].className = items[index].className + ' deleting';
		    		setTimeout(function() {
		    			items[index].className = items[index].className.substr(0, origLength);
		    			instance.listCont.removeChild(items[index]);
		    		}, 200);
	    		}
	    	}
        }
    );
}

// detach from list
var outerContDetachFromList = document.getElementById('outerCont-detach-from-list');
var listContDetachFromList = document.getElementById('listCont-detach-from-list');
var aDetach = document.getElementById('a-detach');
var aAttach = document.getElementById('a-attach');

if (outerContDetachFromList && listContDetachFromList && aDetach && aAttach) {
	attachToList();
	aDetach.addEventListener("click", function() {
		detachFromList();
		aDetach.style.display = 'none';
		aAttach.style.display = 'inline';
	});
	aAttach.addEventListener("click", function() {
		attachToList();
		aDetach.style.display = 'inline';
		aAttach.style.display = 'none';
	});
}

function attachToList() {
	outerContDetachFromList.style.border = '1px solid #777777';
    lithiumlist.attachToList(
        '123456789',
        outerContDetachFromList,
        listContDetachFromList,
        'listItem'
    );
}

function detachFromList() {
	outerContDetachFromList.style.border = '1px solid #CCCCCC';
	lithiumlist.detachFromList(listContDetachFromList);
}

// set list properties
var outerContSetListProperties = document.getElementById('outerCont-set-list-properties');
var listContSetListProperties = document.getElementById('listCont-set-list-properties');
var spanEnabled = document.getElementById('span-enabled');
var spanDisabled = document.getElementById('span-disabled');
var aTurnOff = document.getElementById('a-turn-off');
var aTurnOn = document.getElementById('a-turn-on');

if (outerContSetListProperties && listContSetListProperties && spanEnabled && spanDisabled && aTurnOff && aTurnOn) {
	lithiumlist.attachToList(
	    '123456789',
	    outerContSetListProperties,
	    listContSetListProperties,
	    'listItem',
	    {
	    	leftEnabled: true,
	    	rightEnabled: true,
	    	sortEnabled: false
	    }
	);

	aTurnOff.addEventListener("click", function() {
		outerContSetListProperties.style.border = '1px solid #CCCCCC';
		lithiumlist.setListProperties(
			listContSetListProperties,
			{
		    	leftEnabled: false,
		    	rightEnabled: false,
			}
		);
		spanEnabled.style.display = 'none';
		spanDisabled.style.display = 'inline';
	});
	aTurnOn.addEventListener("click", function() {
		outerContSetListProperties.style.border = '1px solid #777777';
		lithiumlist.setListProperties(
			listContSetListProperties,
			{
		    	leftEnabled: true,
		    	rightEnabled: true,
			}
		);
		spanEnabled.style.display = 'inline';
		spanDisabled.style.display = 'none';

	});
}

// trigger left and right
var outerContTriggerLeftAndRight = document.getElementById('outerCont-trigger-leftandright');
var listContTriggerLeftAndRight = document.getElementById('listCont-trigger-leftandright');
var selectListItem = document.getElementById('select-listItem');
var aTriggerLeft = document.getElementById('a-trigger-left');
var aTriggerRight = document.getElementById('a-trigger-right');

if (outerContTriggerLeftAndRight && listContTriggerLeftAndRight && selectListItem && aTriggerLeft && aTriggerRight) {
	lithiumlist.attachToList(
	    '123456789',
	    outerContTriggerLeftAndRight,
	    listContTriggerLeftAndRight,
	    'listItem',
	    {
	    	sortEnabled: false,
	    	leftBySwipe: false,
	    	rightBySwipe: false
	    }
	);

	selectListItem.addEventListener('change', function() {
		var items = listContTriggerLeftAndRight.getElementsByClassName('listItem');
		for (var i = 0, len = items.length; i < len; i++) {
			items[i].style.backgroundColor = '#FFFFFF';
		}
		items[selectListItem.options[selectListItem.selectedIndex].value].style.backgroundColor = '#FFFFCC';
	});

	aTriggerLeft.addEventListener("click", function() {
		var index = selectListItem.options[selectListItem.selectedIndex].value;
		lithiumlist.triggerLeft(
			listContTriggerLeftAndRight,
			index
		);
	});

	aTriggerRight.addEventListener("click", function() {
		var index = selectListItem.options[selectListItem.selectedIndex].value;
		lithiumlist.triggerRight(
			listContTriggerLeftAndRight,
			index
		);
	});

}




