require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import classNames from 'classNames/dedupe';
import { trimString } from './utils.js';

var spinnerCont = document.getElementById('div-spinner-cont');
var maskCont = document.getElementById('div-middlebox-mask');

var divMainmsg = document.getElementById('div-mainmsg');
var divEmailCont = document.getElementById('div-email-cont');
var divPasswordCont = document.getElementById('div-password-cont');
var inputEmail = document.getElementById('input-email');
var inputPassword = document.getElementById('input-password');
var divEmailSubmsg = document.getElementById('div-email-submsg');
var divPasswordSubmsg = document.getElementById('div-password-submsg');
var submitButton = document.getElementById('div-submit');

if ((divMainmsg) && (divEmailCont) && (divPasswordCont) && (inputEmail) && (inputPassword) && (divEmailSubmsg) && (divPasswordSubmsg) && (submitButton) && (spinnerCont) && (maskCont)) {
	if (trimString(divPasswordSubmsg.innerHTML).length == 0) {
		divPasswordSubmsg.innerHTML = msgPasswordDefault;
	}

	inputEmail.focus();
	inputEmail.select();

	inputEmail.addEventListener("focus", function(e) {
		divMainmsg.innerHTML = "";
		divEmailCont.className = classNames({
			'text-cont' : true,
			'focus' : true
		});
		divEmailSubmsg.innerHTML = msgEmailDefault;
	});

	inputEmail.addEventListener("blur", function(e) {
		divEmailCont.className = classNames({
			'text-cont' : true
		});
		divEmailSubmsg.innerHTML = msgEmailDefault;
	});

	inputEmail.addEventListener("keypress", function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			e.preventDefault();
			inputPassword.focus();
			inputPassword.select();
		}
	});

	inputPassword.addEventListener("focus", function(e) {
		divMainmsg.innerHTML = "";
		divPasswordCont.className = classNames({
			'text-cont' : true,
			'focus' : focus
		});
		divPasswordSubmsg.innerHTML = msgPasswordDefault;
	});

	inputPassword.addEventListener("blur", function(e) {
		divPasswordCont.className = classNames({
			'text-cont' : true
		});
		divPasswordSubmsg.innerHTML = msgPasswordDefault;
	});

	inputPassword.addEventListener("keypress", function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			e.preventDefault();
			validateAndSubmit();
		}
	});

	submitButton.addEventListener("click", function() {
		validateAndSubmit();
	});
}

var resendButton = document.getElementById('div-resend-link');

if ((resendButton) && (spinnerCont) && (maskCont)) {
	resendButton.addEventListener("click", function() {
		maskCont.className = classNames({
			'show' : true
		});
		spinnerCont.className = classNames({
			'spinner-cont' : true,
			'spinning' : true
		});
		document.getElementById('form').submit();
	});
}

function validateAndSubmit() {
	divMainmsg.innerHTML = "";

	var emailOk = false;
	var email = trimString(inputEmail.value);

	if (email.length > 0) {
		var regex = /^[^@]+@[^@]+\.[^@]+$/;
		if (regex.test(email)) {
			emailOk = true;

			divEmailCont.className = classNames({
				'text-cont' : true
			});
			divEmailSubmsg.innerHTML = msgEmailDefault;
		} else {
			divEmailCont.className = classNames({
				'text-cont' : true,
				'error' : true
			});
			divEmailSubmsg.innerHTML = msgEmailInvalid;
		}
	} else {
		divEmailCont.className = classNames({
			'text-cont' : true,
			'error' : true
		});
		divEmailSubmsg.innerHTML = msgEmailNoBlank;
	}

	var passwordOk = false;
	var password = inputPassword.value;

	if (password.length > 0) {
		if (password.length >= 6) {
			passwordOk = true;

			divPasswordCont.className = classNames({
				'text-cont' : true
			});
			divPasswordSubmsg.innerHTML = msgPasswordDefault;
		} else {
			divPasswordCont.className = classNames({
				'text-cont' : true,
				'error' : true
			});
			divPasswordSubmsg.innerHTML = msgPasswordInvalid;
		}
	} else {
		divPasswordCont.className = classNames({
			'text-cont' : true,
			'error' : true
		});
		divPasswordSubmsg.innerHTML = msgPasswordNoBlank;
	}

	if ((emailOk) && (passwordOk)) {
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