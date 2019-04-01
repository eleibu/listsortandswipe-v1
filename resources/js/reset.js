require('bootstrap');
import { monitorWinWidth } from './monitor-win-width.js';
import classNames from 'classNames/dedupe';
import { trimString } from './utils.js';

// var divMainmsg = document.getElementById('div-mainmsg');
// var spinnerCont = document.getElementById('div-spinner-cont');
// var maskCont = document.getElementById('div-middlebox-mask');

// var divEmailRequestCont = document.getElementById('div-emailrequest-cont');
// var inputEmailRequest = document.getElementById('input-emailrequest');
// var divEmailRequestSubmsg = document.getElementById('div-emailrequest-submsg');
// var submitButton = document.getElementById('div-submit');


var maskCont = document.getElementById('div-sitecont-mask');
var spinnerCont = document.getElementById('div-spinner-cont');
var divSubmitSubmsg = document.getElementById('div-submit-submsg');

var inputEmailRequest = document.getElementById('input-emailrequest');
var divEmailRequestSubmsg = document.getElementById('div-emailrequest-submsg');
var submitButton = document.getElementById('div-submit');

if ((maskCont) && (spinnerCont) && (divSubmitSubmsg) && (inputEmailRequest) && (divEmailRequestSubmsg) && (submitButton)) {
	if (trimString(divEmailRequestSubmsg.innerHTML).length == 0) {
		divEmailRequestSubmsg.innerHTML = msgEmailRequestDefault;
	}

	inputEmailRequest.addEventListener("focus", function(e) {
		inputEmailRequest.className = classNames({
			'textentry' : true,
			'focus' : true
		});
		divEmailRequestSubmsg.innerHTML = msgEmailRequestDefault;
		divEmailRequestSubmsg.className = classNames({
			'submsg-cont' : true
		});
		hideSubmitSubmsg();
	});

	inputEmailRequest.addEventListener("blur", function(e) {
		inputEmailRequest.className = classNames({
			'textentry' : true
		});
		divEmailRequestSubmsg.innerHTML = msgEmailRequestDefault;
		divEmailRequestSubmsg.className = classNames({
			'submsg-cont' : true
		});
		hideSubmitSubmsg();
	});

	inputEmailRequest.addEventListener("keypress", function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			e.preventDefault();
			validateAndSubmitRequest();
		}
	});

	submitButton.addEventListener("click", function() {
		validateAndSubmitRequest();
	});

	inputEmailRequest.focus();
	inputEmailRequest.select();
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
			divEmailRequestSubmsg.innerHTML = msgEmailRequestDefault;
			divEmailRequestSubmsg.className = classNames({
				'submsg-cont' : true
			});

		} else {
			inputEmailRequest.className = classNames({
				'textentry' : true,
				'error' : true
			});
			divEmailRequestSubmsg.innerHTML = msgEmailRequestInvalid;
			divEmailRequestSubmsg.className = classNames({
				'submsg-cont' : true,
				'error' : true
			});
		}
	} else {
		inputEmailRequest.className = classNames({
			'textentry' : true,
			'error' : true
		});
		divEmailRequestSubmsg.innerHTML = msgEmailRequestNoBlank;
		divEmailRequestSubmsg.className = classNames({
			'submsg-cont' : true,
			'error' : true
		});
	}

	if (emailOk) {
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

// if ((divMainmsg) && (divEmailRequestCont) && (inputEmailRequest) && (divEmailRequestSubmsg) && (submitButton) && (spinnerCont) && (maskCont)) {
// 	if (trimString(divEmailRequestSubmsg.innerHTML).length == 0) {
// 		divEmailRequestSubmsg.innerHTML = msgEmailRequestDefault;
// 	}

// 	inputEmailRequest.focus();
// 	inputEmailRequest.select();

// 	inputEmailRequest.addEventListener("focus", function(e) {
// 		divMainmsg.innerHTML = "";
// 		divEmailRequestCont.className = classNames({
// 			'text-cont' : true,
// 			'focus' : true
// 		});
// 		divEmailRequestSubmsg.innerHTML = msgEmailRequestDefault;
// 	});

// 	inputEmailRequest.addEventListener("blur", function(e) {
// 		divEmailRequestCont.className = classNames({
// 			'text-cont' : true
// 		});
// 		divEmailRequestSubmsg.innerHTML = msgEmailRequestDefault;
// 	});

// 	inputEmailRequest.addEventListener("keypress", function(e) {
// 		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
// 			e.preventDefault();
// 			validateAndSubmitRequest();
// 		}
// 	});

// 	submitButton.addEventListener("click", function() {
// 		validateAndSubmitRequest();
// 	});
// }

// function validateAndSubmitRequest() {
// 	divMainmsg.innerHTML = "";

// 	var emailOk = false;
// 	var email = trimString(inputEmailRequest.value);

// 	if (email.length > 0) {
// 		var regex = /^[^@]+@[^@]+\.[^@]+$/;
// 		if (regex.test(email)) {
// 			emailOk = true;

// 			divEmailRequestCont.className = classNames({
// 				'text-cont' : true
// 			});
// 			divEmailRequestSubmsg.innerHTML = msgEmailRequestDefault;
// 		} else {
// 			divEmailRequestCont.className = classNames({
// 				'text-cont' : true,
// 				'error' : true
// 			});
// 			divEmailRequestSubmsg.innerHTML = msgEmailRequestInvalid;
// 		}
// 	} else {
// 		divEmailRequestCont.className = classNames({
// 			'text-cont' : true,
// 			'error' : true
// 		});
// 		divEmailRequestSubmsg.innerHTML = msgEmailRequestNoBlank;
// 	}

// 	if (emailOk) {
// 		maskCont.className = classNames({
// 			'show' : true
// 		});
// 		spinnerCont.className = classNames({
// 			'spinner-cont' : true,
// 			'spinning' : true
// 		});
// 		document.getElementById('form').submit();
// 	}	
// }

// var divEmailDoresetCont = document.getElementById('div-emaildoreset-cont');
// var divPasswordCont = document.getElementById('div-password-cont');
// var inputEmailDoreset = document.getElementById('input-emaildoreset');
// var inputPassword = document.getElementById('input-password');
// var divEmailDoresetSubmsg = document.getElementById('div-emaildoreset-submsg');
// var divPasswordSubmsg = document.getElementById('div-password-submsg');
// var submitDoresetButton = document.getElementById('div-submit-doreset');

// if ((divMainmsg) && (divEmailDoresetCont) && (divPasswordCont) && (inputEmailDoreset) && (inputPassword) && (divEmailDoresetSubmsg) && (divPasswordSubmsg) && (submitDoresetButton) && (spinnerCont) && (maskCont)) {
// 	if (trimString(divPasswordSubmsg.innerHTML).length == 0) {
// 		divPasswordSubmsg.innerHTML = msgPasswordDefault;
// 	}

// 	inputEmailDoreset.focus();
// 	inputEmailDoreset.select();

// 	inputEmailDoreset.addEventListener("focus", function(e) {
// 		divMainmsg.innerHTML = "";
// 		divEmailDoresetCont.className = classNames({
// 			'text-cont' : true,
// 			'focus' : true
// 		});
// 		divEmailDoresetSubmsg.innerHTML = msgEmailDoresetDefault;
// 	});

// 	inputEmailDoreset.addEventListener("blur", function(e) {
// 		divEmailDoresetCont.className = classNames({
// 			'text-cont' : true
// 		});
// 		divEmailDoresetSubmsg.innerHTML = msgEmailDoresetDefault;
// 	});

// 	inputEmailDoreset.addEventListener("keypress", function(e) {
// 		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
// 			e.preventDefault();
// 			inputPassword.focus();
// 			inputPassword.select();
// 		}
// 	});

// 	inputPassword.addEventListener("focus", function(e) {
// 		divMainmsg.innerHTML = "";
// 		divPasswordCont.className = classNames({
// 			'text-cont' : true,
// 			'focus' : focus
// 		});
// 		divPasswordSubmsg.innerHTML = msgPasswordDefault;
// 	});

// 	inputPassword.addEventListener("blur", function(e) {
// 		divPasswordCont.className = classNames({
// 			'text-cont' : true
// 		});
// 		divPasswordSubmsg.innerHTML = msgPasswordDefault;
// 	});

// 	inputPassword.addEventListener("keypress", function(e) {
// 		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
// 			e.preventDefault();
// 			validateAndSubmitDoreset();
// 		}
// 	});

// 	submitDoresetButton.addEventListener("click", function() {
// 		validateAndSubmitDoreset();
// 	});
// }

// function validateAndSubmitDoreset() {
// 	divMainmsg.innerHTML = "";

// 	var emailOk = false;
// 	var email = trimString(inputEmailDoreset.value);

// 	if (email.length > 0) {
// 		var regex = /^[^@]+@[^@]+\.[^@]+$/;
// 		if (regex.test(email)) {
// 			emailOk = true;

// 			divEmailDoresetCont.className = classNames({
// 				'text-cont' : true
// 			});
// 			divEmailDoresetSubmsg.innerHTML = msgEmailDoresetDefault;
// 		} else {
// 			divEmailDoresetCont.className = classNames({
// 				'text-cont' : true,
// 				'error' : true
// 			});
// 			divEmailDoresetSubmsg.innerHTML = msgEmailDoresetInvalid;
// 		}
// 	} else {
// 		divEmailDoresetCont.className = classNames({
// 			'text-cont' : true,
// 			'error' : true
// 		});
// 		divEmailDoresetSubmsg.innerHTML = msgEmailDoresetNoBlank;
// 	}

// 	var passwordOk = false;
// 	var password = inputPassword.value;

// 	if (password.length > 0) {
// 		if (password.length >= 6) {
// 			passwordOk = true;

// 			divPasswordCont.className = classNames({
// 				'text-cont' : true
// 			});
// 			divPasswordSubmsg.innerHTML = msgPasswordDefault;
// 		} else {
// 			divPasswordCont.className = classNames({
// 				'text-cont' : true,
// 				'error' : true
// 			});
// 			divPasswordSubmsg.innerHTML = msgPasswordInvalid;
// 		}
// 	} else {
// 		divPasswordCont.className = classNames({
// 			'text-cont' : true,
// 			'error' : true
// 		});
// 		divPasswordSubmsg.innerHTML = msgPasswordNoBlank;
// 	}

// 	if ((emailOk) && (passwordOk)) {
// 		maskCont.className = classNames({
// 			'show' : true
// 		});
// 		spinnerCont.className = classNames({
// 			'spinner-cont' : true,
// 			'spinning' : true
// 		});
// 		document.getElementById('form').submit();
// 	}	
// }