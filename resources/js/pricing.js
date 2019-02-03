require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import { pageMenuShowHide } from './page-menu-show-hide.js';
import Tooltip from 'tooltip.js';

var ttsHover = [];
var tElemsHover = document.getElementsByClassName('tt-hover');
var templateHover = '<div class=\'tooltip-cont hover\'><div class=\'tooltip-outer\'><div class=\'tooltip-inner\'></div><div class=\'tooltip-arrow\'><img src=\'' + urlArrowImg + '\' alt=\'\' width=\'11\' height=\'8\' /></div></div></div>';
for (var i = 0, len = tElemsHover.length; i < len; i++) {
	var ttHover = new Tooltip(tElemsHover[i], {
		offset: 'popper:0,10,0,0',
		title: function() {
			return this.getAttribute('data-title');
		},
		template: templateHover
	});
	ttsHover.push(ttHover);
}

var ttsClick = [];
var tElemsClick = document.getElementsByClassName('tt-click');
var templateClick = '<div class=\'tooltip-cont click\'><div class=\'tooltip-outer\'><div class=\'tooltip-inner\'></div><div class=\'tooltip-arrow\'><img src=\'' + urlArrowImg + '\' alt=\'\' width=\'11\' height=\'8\' /></div></div></div>';
for (var i = 0, len = tElemsClick.length; i < len; i++) {
	var ttClick = new Tooltip(tElemsClick[i], {
		offset: 'popper:0,10,0,0',
		title: function() {
			return this.getAttribute('data-title');
		},
		trigger: 'click',
		template: templateClick,
		container: document.getElementById('pageWrapper')
	});
	ttsClick.push(ttClick);
}

window.addEventListener('scroll', function() {
	for (var i = 0, len = ttsClick.length; i < len; i++) {
		ttsClick[i].hide();
	}
});

window.addEventListener('touchstart', function() {
	for (var i = 0, len = ttsClick.length; i < len; i++) {
		ttsClick[i].hide();
	}
});