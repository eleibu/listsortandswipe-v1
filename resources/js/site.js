require('bootstrap');

import { lithiumlistPro } from './lithiumlist-pro-1.0.0.js';

var listCont = document.getElementById('div-list-cont');
var scrollCont = document.getElementById('div-scroll-cont');
// var scrollCont = document.getElementById('div-body');
// var scrollCont = window;
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
	onSortAutoScrollStart: onSortAutoScrollStart,
	onSortAutoScrollEnd: onSortAutoScrollEnd,
	sortScrollSpeed: 3,
	leftEnabled: true,
	leftByDrag: true,
    leftMasks: [{
		classNameDefault: 'left-mask',
		classNameSlideOut: 'left-mask-slide-out',
		classNameSlideBack: 'left-mask-slide-back',
		childNode: divLeft
    }],
	rightEnabled: true,
	rightByDrag: true,
    rightMasks: [{
		classNameDefault: 'right-mask',
		classNameSlideOut: 'right-mask-slide-out',
		classNameSlideBack: 'right-mask-slide-back',
		childNode: divRight
    }],
};

lithiumlistPro.attachToList(
    listCont,
    scrollCont,
    touchEventsTarget,
    listItemClass,
    listProperties
);

function onSortAutoScrollStart(index, up) {
	// console.log('index: ' + index + ' up: ' + up);
}

function onSortAutoScrollEnd(index) {
	// console.log('index: ' + index);
}


function monitorWinWidth() {
    var width = window.innerWidth;
    if (width > 1330) {
        setWidthClass('xl');
    } else if (width > 1130) {
        setWidthClass('lg');
    } else if (width > 760) {
        setWidthClass('md');
    } else if (width > 540) {
        setWidthClass('sm');
    } else {
        setWidthClass('xs');
    }
}



var event_changeWidthClass = new Event('changeWidthClass');
function setWidthClass(classtxt) {
    var divtarget = document.getElementById("div-scroll-cont");
    if (divtarget.className != classtxt) {
        divtarget.className = classtxt;
        window.dispatchEvent(event_changeWidthClass);
    }
}

monitorWinWidth();
window.addEventListener("resize", function() { monitorWinWidth() });

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

// var temp = document.getElementById('temp');
// temp.addEventListener('click', function() {
// 	console.log('window: ' + window.pageYOffset);
// 	console.log(window.innerHeight);
// 	// console.log('window: ' + window.scrollTop);
// 	// console.log('document: ' + document.scrollTop);
// 	// console.log('body: ' + document.body.scrollTop);
// 	// lithiumlistPro.triggerRight(listCont, 23);
// });


// lithiumlistPro.setDefaults({delay: 200});

// lithiumlistPro.detach(listCont);