require('bootstrap');

import { lithiumlistPro } from './lithiumlist-pro-1.0.0.js';

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

var options = {
	sortDragHandleClass: 'budicon-grab-ui',
	leftButtonClass: 'budicon-trash',
    leftMasks: [{
    	background: 'rgba(252, 13, 27, 1)',
		classNameDefault: 'left-mask',
		classNameSlideOut: 'left-mask-slide-out',
		classNameSlideBack: 'left-mask-slide-back',
		childNode: divLeft
    }],
	rightButtonClass: 'budicon-reload-ui',
    rightMasks: [{
    	background: 'rgba(15, 127, 18, 1)',
		classNameDefault: 'right-mask',
		classNameSlideOut: 'right-mask-slide-out',
		classNameSlideBack: 'right-mask-slide-back',
		childNode: divRight
    }]
};


var outerCont = document.getElementById('outerCont');
var listCont = document.getElementById('listCont');
if (outerCont && listCont) {
	lithiumlistPro.attachToList(
		'123456789',
	    outerCont,
	    listCont,
	    'listItem',
	    options
	);	
}