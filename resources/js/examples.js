require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import { pageMenuShowHide } from './page-menu-show-hide.js';
import { lithiumlist } from './lithiumlist-1.0.0.js';

import Prism from 'prismjs';
Prism.highlightAll();

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


