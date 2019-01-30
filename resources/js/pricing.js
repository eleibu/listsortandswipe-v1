require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import { pageMenuShowHide } from './page-menu-show-hide.js';
import Tooltip from 'tooltip.js';

var tElems = document.getElementsByClassName('tt-hover');
var template = '<div class=\'tooltip-cont\'><div class=\'tooltip-outer\'><div class=\'tooltip-inner\'></div><div class=\'tooltip-arrow\'><img src=\'' + urlArrowImg + '\' alt=\'\' width=\'11\' height=\'8\' /></div></div></div>';
for (var i = 0, len = tElems.length; i < len; i++) {
	new Tooltip(tElems[i], {
		offset: 'popper:0,10,0,0',
		title: function() {
			return this.getAttribute('data-title');
		},
		template: template
	});
}