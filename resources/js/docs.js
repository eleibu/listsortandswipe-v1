require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import { pageMenuShowHide } from './page-menu-show-hide.js';
import { lithiumlistPro } from './lithiumlist-pro-1.0.0.js';

import Prism from 'prismjs';
Prism.highlightAll();

var outerCont = document.getElementById('div-diag-outer-cont');
var listCont = document.getElementById('div-diag-list-cont');
if (outerCont && listCont) {
	lithiumlistPro.attachToList(
		'123456789',
	    outerCont,
	    listCont,
	    'list-item'
	);	
}