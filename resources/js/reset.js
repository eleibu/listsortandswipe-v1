require('bootstrap');
import { monitorWinWidth } from './monitor-win-width.js';
import classNames from 'classNames/dedupe';
import { trimString } from './utils.js';

var maskCont = document.getElementById('div-sitecont-mask');
var spinnerCont = document.getElementById('div-spinner-cont');

// request link

var inputEmailRequest = document.getElementById('input-emailrequest');
var divEmailSubmsgRequest = document.getElementById('div-emailrequest-submsg');
var submitButtonRequest = document.getElementById('div-submit-request');
var divSubmitSubmsgRequest = document.getElementById('div-submit-submsg-request');

if ((maskCont) && (spinnerCont) && (inputEmailRequest) && (divEmailSubmsgRequest) && (submitButtonRequest) && (divSubmitSubmsgRequest)) {
	if (trimString(divEmailSubmsgRequest.innerHTML).length == 0) {
		divEmailSubmsgRequest.innerHTML = msgEmailRequestDefault;
	}

	inputEmailRequest.addEventListener("focus", function(e) {
		inputEmailRequest.className = classNames({
			'textentry' : true,
			'focus' : true
		});
		divEmailSubmsgRequest.innerHTML = msgEmailRequestDefault;
		divEmailSubmsgRequest.className = classNames({
			'submsg-cont' : true
		});
		hideSubmitSubmsgRequest();
	});

	inputEmailRequest.addEventListener("blur", function(e) {
		inputEmailRequest.className = classNames({
			'textentry' : true
		});
		divEmailSubmsgRequest.innerHTML = msgEmailRequestDefault;
		divEmailSubmsgRequest.className = classNames({
			'submsg-cont' : true
		});
		hideSubmitSubmsgRequest();
	});

	inputEmailRequest.addEventListener("keypress", function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			e.preventDefault();
			validateAndSubmitRequest();
		}
	});

	submitButtonRequest.addEventListener("click", function() {
		validateAndSubmitRequest();
	});
}

function validateAndSubmitRequest() {
	var emailOk = false;
	var email = trimString(inputEmailRequest.value);

	if (email.length > 0) {
		var regex = /^[^@]+@[^@]+\.[^@]+$/;
		if (regex.test(email)) {
			emailOk = true;

			inputEmailRequest.className = classNames({
				'textentry' : true
			});
			divEmailSubmsgRequest.innerHTML = msgEmailRequestDefault;
			divEmailSubmsgRequest.className = classNames({
				'submsg-cont' : true
			});

		} else {
			inputEmailRequest.className = classNames({
				'textentry' : true,
				'error' : true
			});
			divEmailSubmsgRequest.innerHTML = msgEmailRequestInvalid;
			divEmailSubmsgRequest.className = classNames({
				'submsg-cont' : true,
				'error' : true
			});
		}
	} else {
		inputEmailRequest.className = classNames({
			'textentry' : true,
			'error' : true
		});
		divEmailSubmsgRequest.innerHTML = msgEmailRequestNoBlank;
		divEmailSubmsgRequest.className = classNames({
			'submsg-cont' : true,
			'error' : true
		});
	}

	if (emailOk) {
		hideSubmitSubmsgRequest();

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

function hideSubmitSubmsgRequest() {
	divSubmitSubmsgRequest.innerHTML = '';
	divSubmitSubmsgRequest.className = classNames({
		'submsg-cont' : true
	});
}

// reset password

var inputPassword = document.getElementById('input-password');
var divPasswordSubmsg = document.getElementById('div-password-submsg');
var submitButtonDoReset = document.getElementById('div-submit-doreset');
var divSubmitSubmsgDoReset = document.getElementById('div-submit-submsg-doreset');

if ((maskCont) && (spinnerCont) && (inputPassword) && (divPasswordSubmsg) && (submitButtonDoReset) && (divSubmitSubmsgDoReset)) {
	if (trimString(divPasswordSubmsg.innerHTML).length == 0) {
		divPasswordSubmsg.innerHTML = msgPasswordDefault;
	}

	inputPassword.addEventListener("focus", function(e) {
		inputPassword.className = classNames({
			'textentry' : true,
			'focus' : true
		});
		divPasswordSubmsg.innerHTML = msgPasswordDefault;
		divPasswordSubmsg.className = classNames({
			'submsg-cont' : true
		});
		hideSubmitSubmsgDoReset();
	});

	inputPassword.addEventListener("blur", function(e) {
		inputPassword.className = classNames({
			'textentry' : true
		});
		divPasswordSubmsg.innerHTML = msgPasswordDefault;
		divPasswordSubmsg.className = classNames({
			'submsg-cont' : true
		});
		hideSubmitSubmsgDoReset();
	});

	inputPassword.addEventListener("keypress", function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			e.preventDefault();
			validateAndSubmitDoReset();
		}
	});

	submitButtonDoReset.addEventListener("click", function() {
		validateAndSubmitDoReset();
	});
}

function validateAndSubmitDoReset() {
	var passwordOk = false;
	var password = inputPassword.value;

	if (password.length > 0) {
		if (password.length >= 6) {
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
			divPasswordSubmsg.innerHTML = msgPasswordInvalid;
			divPasswordSubmsg.className = classNames({
				'submsg-cont' : true,
				'error' : true
			});
		}
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

	if (passwordOk) {
		hideSubmitSubmsgDoReset();

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

function hideSubmitSubmsgDoReset() {
	divSubmitSubmsgDoReset.innerHTML = '';
	divSubmitSubmsgDoReset.className = classNames({
		'submsg-cont' : true
	});
}