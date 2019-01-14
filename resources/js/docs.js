require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import { pageMenuShowHide } from './page-menu-show-hide.js';
import { lithiumlistPro } from './lithiumlist-pro-1.0.0.js';

import Prism from 'prismjs';
Prism.highlightAll();

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

var outerContSorting = document.getElementById('div-diag-outer-cont-sorting');
var listContSorting = document.getElementById('div-diag-list-cont-sorting');
if (outerContSorting && listContSorting) {
	lithiumlistPro.attachToList(
		'123456789',
	    outerContSorting,
	    listContSorting,
	    'list-item',
	    {
	    	sortDragHandleClass: 'budicon-grab-ui',
	    	leftEnabled: false,
	    	rightEnabled: false
	    }
	);	
}