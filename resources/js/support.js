require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import { pageMenuShowHide } from './page-menu-show-hide.js';

var maskCont = document.getElementById('div-sitecont-mask');
var inputSubject = document.getElementById('input-subject');
var textareaMessage = document.getElementById('textarea-message');
var divMessageSubmsg = document.getElementById('div-message-submsg');
var spinnerCont = document.getElementById('div-spinner-cont');

if ((maskCont) && (inputSubject) && (textareaMessage) && (divMessageSubmsg) && (spinnerCont)) {
	// inputEmail.addEventListener("focus", function(e) {
	// 	inputEmail.className = classNames({
	// 		'textentry' : true,
	// 		'focus' : true
	// 	});
	// 	divEmailSubmsg.innerHTML = msgEmailDefault;
	// 	divEmailSubmsg.className = classNames({
	// 		'submsg-cont' : true
	// 	});
	// 	hideSubmitSubmsg();
	// });

	// inputEmail.addEventListener("blur", function(e) {
	// 	inputEmail.className = classNames({
	// 		'textentry' : true
	// 	});
	// 	divEmailSubmsg.innerHTML = msgEmailDefault;
	// 	divEmailSubmsg.className = classNames({
	// 		'submsg-cont' : true
	// 	});
	// 	hideSubmitSubmsg();
	// });

	// inputEmail.addEventListener("keypress", function(e) {
	// 	if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
	// 		e.preventDefault();
	// 		inputPassword.focus();
	// 		inputPassword.select();
	// 	}
	// });


}