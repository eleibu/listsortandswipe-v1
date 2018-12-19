require('bootstrap');

import { lithiumlistPro } from './lithiumlist-pro-1.0.0.js';

var listCont = document.getElementById('div-list-cont');
var scrollCont = document.getElementById('div-scroll-cont');
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

// var listProperties = {
// 	sortDragHandleClass: 'budicon-grab-ui',
// 	leftDragHandleClass: 'budicon-trash',
// 	rightDragHandleClass: 'budicon-reload-ui',
// 	onSortEnd: sortEnd,
// 	sortScrollSpeed: 5,
// 	leftEnabled: true,
// 	leftByDrag: true,
//     leftMasks: [{
// 		classNameDefault: 'left-mask',
// 		classNameSlideOut: 'left-mask-slide-out',
// 		classNameSlideBack: 'left-mask-slide-back',
// 		childNode: divLeft
//     }],
// 	rightEnabled: true,
// 	rightByDrag: true,
//     rightMasks: [{
// 		classNameDefault: 'right-mask',
// 		classNameSlideOut: 'right-mask-slide-out',
// 		classNameSlideBack: 'right-mask-slide-back',
// 		childNode: divRight
//     }],
// };

var listProperties = {
	sortScrollSpeed: 3,
	leftDragStartThreshold: '40%',
	onSortEnd: sortEnd
};

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

	lithiumlistPro.detachFromList(listCont);

    var eventsTarget = window;
    if (classtxt == 'xs') {
    	eventsTarget = document.getElementById('div-body');
    }

	lithiumlistPro.attachToList(
	    listCont,
	    scrollCont,
	    eventsTarget,
	    listItemClass,
	    listProperties
	);
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

var temp = document.getElementById('temp');
temp.addEventListener('click', function() {
	lithiumlistPro.triggerRight(listCont, 23);
});


// lithiumlistPro.setDefaults({delay: 200});

// lithiumlistPro.detach(listCont);