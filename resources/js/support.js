require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import { pageMenuShowHide } from './page-menu-show-hide.js';
import classNames from 'classNames/dedupe';

var maskCont = document.getElementById('div-sitecont-mask');
var inputSubject = document.getElementById('input-subject');
var textareaBody = document.getElementById('textarea-body');
var divBodySubmsg = document.getElementById('div-body-submsg');
var submitButton = document.getElementById('div-submit');
var spinnerCont = document.getElementById('div-spinner-cont');

if ((maskCont) && (inputSubject) && (textareaBody) && (divBodySubmsg) && (submitButton) && (spinnerCont)) {
	inputSubject.addEventListener("focus", function(e) {
		inputSubject.className = classNames({
			'textentry' : true,
			'focus' : true
		});
	});

	inputSubject.addEventListener("blur", function(e) {
		inputSubject.className = classNames({
			'textentry' : true
		});
	});

	inputSubject.addEventListener("keypress", function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			e.preventDefault();
			textareaBody.focus();
			textareaBody.select();
		}
	});

	textareaBody.addEventListener("focus", function(e) {
		textareaBody.className = classNames({
			'textentry' : true,
			'focus' : true
		});
		divBodySubmsg.innerHTML = msgBodyDefault;
		divBodySubmsg.className = classNames({
			'submsg-cont' : true
		});
	});

	textareaBody.addEventListener("blur", function(e) {
		textareaBody.className = classNames({
			'textentry' : true
		});
		divBodySubmsg.innerHTML = msgBodyDefault;
		divBodySubmsg.className = classNames({
			'submsg-cont' : true
		});
	});

	submitButton.addEventListener("click", function() {
		validateAndSubmit();
	});
}

function validateAndSubmit() {
	var bodyOk = false;
	var body = textareaBody.value;

	if (body.length > 0) {
		bodyOk = true;

		textareaBody.className = classNames({
			'textentry' : true
		});
		divBodySubmsg.innerHTML = msgBodyDefault;
		divBodySubmsg.className = classNames({
			'submsg-cont' : true
		});
	} else {
		textareaBody.className = classNames({
			'textentry' : true,
			'error' : true
		});
		divBodySubmsg.innerHTML = msgBodyNoBlank;
		divBodySubmsg.className = classNames({
			'submsg-cont' : true,
			'error' : true
		});
	}

	if (bodyOk) {
		maskCont.className = classNames({
			'show' : true
		});
		spinnerCont.className = classNames({
			'spinner-cont' : true,
			'spinning' : true
		});
		document.getElementById('form').submit();
	}
}