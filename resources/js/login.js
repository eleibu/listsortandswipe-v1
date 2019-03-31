require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import classNames from 'classNames/dedupe';
import { trimString } from './utils.js';

var maskCont = document.getElementById('div-sitecont-mask');
var inputEmail = document.getElementById('input-email');
var divEmailSubmsg = document.getElementById('div-email-submsg');
var inputPassword = document.getElementById('input-password');
var divPasswordSubmsg = document.getElementById('div-password-submsg');
var submitButton = document.getElementById('div-submit');
var spinnerCont = document.getElementById('div-spinner-cont');
var divSubmitSubmsg = document.getElementById('div-submit-submsg');

if ((maskCont) && (inputEmail) && (divEmailSubmsg) && (inputPassword) && (divPasswordSubmsg) && (submitButton) && (spinnerCont) && (divSubmitSubmsg)) {
	inputEmail.focus();
	inputEmail.select();

	inputEmail.addEventListener("focus", function(e) {
		inputEmail.className = classNames({
			'textentry' : true,
			'focus' : true
		});
		divEmailSubmsg.innerHTML = msgEmailDefault;
		divEmailSubmsg.className = classNames({
			'submsg-cont' : true
		});
		hideSubmitSubmsg();
	});

	inputEmail.addEventListener("blur", function(e) {
		inputEmail.className = classNames({
			'textentry' : true
		});
		divEmailSubmsg.innerHTML = msgEmailDefault;
		divEmailSubmsg.className = classNames({
			'submsg-cont' : true
		});
		hideSubmitSubmsg();
	});

	inputEmail.addEventListener("keypress", function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			e.preventDefault();
			inputPassword.focus();
			inputPassword.select();
		}
	});

	// password
	inputPassword.addEventListener("focus", function(e) {
		inputPassword.className = classNames({
			'textentry' : true,
			'focus' : focus
		});
		divPasswordSubmsg.innerHTML = msgPasswordDefault;
		divPasswordSubmsg.className = classNames({
			'submsg-cont' : true
		});
		hideSubmitSubmsg();
	});

	inputPassword.addEventListener("blur", function(e) {
		inputPassword.className = classNames({
			'textentry' : true
		});
		divPasswordSubmsg.innerHTML = msgPasswordDefault;
		divPasswordSubmsg.className = classNames({
			'submsg-cont' : true
		});
		hideSubmitSubmsg();
	});

	inputPassword.addEventListener("keypress", function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			e.preventDefault();
			validateAndSubmit();
		}
	});

	// submit
	submitButton.addEventListener("click", function() {
		validateAndSubmit();
	});
}

function validateAndSubmit() {
	var emailOk = false;
	var passwordOk = false;

	var email = trimString(inputEmail.value);
	var password = inputPassword.value;

	if (email.length > 0) {
		emailOk = true;

		inputEmail.className = classNames({
			'textentry' : true
		});
		divEmailSubmsg.innerHTML = msgEmailDefault;
		divEmailSubmsg.className = classNames({
			'submsg-cont' : true
		});
	} else {
		inputEmail.className = classNames({
			'textentry' : true,
			'error' : true
		});
		divEmailSubmsg.innerHTML = msgEmailNoBlank;
		divEmailSubmsg.className = classNames({
			'submsg-cont' : true,
			'error' : true
		});
	}

	if (password.length > 0) {
		passwordOk = true;

		inputPassword.className = classNames({
			'textentry' : true
		});
		divPasswordSubmsg.innerHTML = msgPasswordDefault;
		divPasswordSubmsg.className = classNames({
			'submsg-cont' : true
		});
	} else {
		inputPassword.className = classNames({
			'textentry' : true,
			'error' : true
		});
		divPasswordSubmsg.innerHTML = msgPasswordNoBlank;
		divPasswordSubmsg.className = classNames({
			'submsg-cont' : true,
			'error' : true
		});
	}

	if ((emailOk) && (passwordOk)) {
		hideSubmitSubmsg();

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

function hideSubmitSubmsg() {
	divSubmitSubmsg.innerHTML = '';
	divSubmitSubmsg.className = classNames({
		'submsg-cont' : true
	});
}