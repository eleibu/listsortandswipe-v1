require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import classNames from 'classNames/dedupe';
import { trimString } from './utils.js';


var msgFirstSurNameDefault = '';
var msgCompanyNameDefault = '';
var msgCountryDefault = '';
var msgTermsDefault = '';


var spinnerCont = document.getElementById('div-spinner-cont');
var maskCont = document.getElementById('div-sitecont-mask');

var inputEmail = document.getElementById('input-email');
var divEmailSubmsg = document.getElementById('div-email-submsg');
var inputPassword = document.getElementById('input-password');
var divPasswordSubmsg = document.getElementById('div-password-submsg');


var inputFirstname = document.getElementById('input-firstname');
var inputSurname = document.getElementById('input-surname');
var divNameSubmsg = document.getElementById('div-name-submsg');

var inputCompanyname = document.getElementById('input-companyname');
var selectCountry = document.getElementById('select-country');
var divCountrySubmsg = document.getElementById('div-country-submsg');

var pIndivName = document.getElementById('p_indiv_name');
var pCoName = document.getElementById('p_co_name');
var pCountry = document.getElementById('p_country');

var inputDiscountCode = document.getElementById('input-discountcode');
var divDiscountSubmsg = document.getElementById('div-discount-submsg');
var divApplyDiscount = document.getElementById('div-apply-discount');


var inputTerms = document.getElementById('input-discountcode');
var divTermsSubmsg = document.getElementById('div-terms-submsg');

var divPlaceOrder = document.getElementById('div-place-order');


if ((spinnerCont) && (maskCont) && (inputEmail) && (divEmailSubmsg) && (inputPassword) && (divPasswordSubmsg) && (inputFirstname) && (inputSurname) && (divNameSubmsg) && (inputCompanyname) && (selectCountry) && (divCountrySubmsg) && (pIndivName) && (pCoName) && (pCountry) && (inputDiscountCode) && (divDiscountSubmsg) && (divApplyDiscount) && (inputTerms) && (divTermsSubmsg) && (divPlaceOrder)) {

	inputEmail.addEventListener("focus", function(e) {
		inputEmail.className = classNames({
			'textentry' : true,
			'focus' : true
		});
		divEmailSubmsg.innerHTML = msgEmailDefault;
	});

	inputEmail.addEventListener("blur", function(e) {
		inputEmail.className = classNames({
			'textentry' : true
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
		inputPassword.className = classNames({
			'textentry' : true,
			'focus' : focus
		});
		divPasswordSubmsg.innerHTML = msgPasswordDefault;
	});

	inputPassword.addEventListener("blur", function(e) {
		inputPassword.className = classNames({
			'textentry' : true
		});
		divPasswordSubmsg.innerHTML = msgPasswordDefault;
	});

	inputPassword.addEventListener("keypress", function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			e.preventDefault();
			inputFirstname.focus();
			inputFirstname.select();
		}
	});

	// first name
	inputFirstname.addEventListener("focus", function(e) {
		inputFirstname.className = classNames({
			'textentry' : true,
			'left' : true,
			'focus' : true
		});
		divNameSubmsg.innerHTML = msgFirstSurNameDefault;
	});

	inputFirstname.addEventListener("blur", function(e) {
		inputFirstname.className = classNames({
			'textentry' : true,
			'left' : true
		});
		divNameSubmsg.innerHTML = msgFirstSurNameDefault;
	});

	inputFirstname.addEventListener("input", function(e) {
		setParaFirstSurName();
	});

	inputFirstname.addEventListener("keypress", function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			e.preventDefault();
			inputSurname.focus();
			inputSurname.select();
		}
	});

	// surname
	inputSurname.addEventListener("focus", function(e) {
		inputSurname.className = classNames({
			'textentry' : true,
			'right' : true,
			'focus' : true
		});
		divNameSubmsg.innerHTML = msgFirstSurNameDefault;
	});

	inputSurname.addEventListener("blur", function(e) {
		inputSurname.className = classNames({
			'textentry' : true,
			'right' : true
		});
		divNameSubmsg.innerHTML = msgFirstSurNameDefault;
	});

	inputSurname.addEventListener("input", function(e) {
		setParaFirstSurName();
	});

	inputSurname.addEventListener("keypress", function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			e.preventDefault();
			inputCompanyname.focus();
			inputCompanyname.select();
		}
	});

	// company name
	inputCompanyname.addEventListener("focus", function(e) {
		inputCompanyname.className = classNames({
			'textentry' : true,
			'focus' : true
		});
		divCountrySubmsg.innerHTML = msgCompanyNameDefault;
	});

	inputCompanyname.addEventListener("blur", function(e) {
		inputCompanyname.className = classNames({
			'textentry' : true
		});
		divCountrySubmsg.innerHTML = msgCompanyNameDefault;
	});

	inputCompanyname.addEventListener("input", function(e) {
		setParaCompanyName();
	});

	inputCompanyname.addEventListener("keypress", function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			e.preventDefault();
			selectCountry.focus();
		}
	});

	// country
	selectCountry.addEventListener('change', function() {
		setParaCountry();
		if (selectCountry.options[selectCountry.selectedIndex].value.length > 0) {
			selectCountry.className = classNames({});
			divCountrySubmsg.innerHTML = msgCountryDefault;
		}
	});

	selectCountry.addEventListener("keypress", function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			inputDiscountCode.focus();
			inputDiscountCode.select();
		}
	});

	// discount

	// var divDiscountSubmsg = document.getElementById('div-discount-submsg');
	// var divApplyDiscount = document.getElementById('div-apply-discount');


	// terms
	inputTerms.addEventListener('change', function() {
		if (inputTerms.checked) {
			divTermsSubmsg.innerHTML = msgTermsDefault;
		}
	});


	// place order
	divPlaceOrder.addEventListener("click", function() {
		validateAndSubmit();
	});
}

function validateAndSubmit() {
	var emailOk = false;
	var email = trimString(inputEmail.value);

	if (email.length > 0) {
		var regex = /^[^@]+@[^@]+\.[^@]+$/;
		if (regex.test(email)) {
			emailOk = true;

			inputEmail.className = classNames({
				'textentry' : true
			});
			divEmailSubmsg.innerHTML = msgEmailDefault;
		} else {
			inputEmail.className = classNames({
				'textentry' : true,
				'error' : true
			});
			divEmailSubmsg.innerHTML = msgEmailInvalid;
		}
	} else {
		inputEmail.className = classNames({
			'textentry' : true,
			'error' : true
		});
		divEmailSubmsg.innerHTML = msgEmailNoBlank;
	}

	var passwordOk = false;
	var password = inputPassword.value;

	if (password.length > 0) {
		if (password.length >= 6) {
			passwordOk = true;

			inputPassword.className = classNames({
				'textentry' : true
			});
			divPasswordSubmsg.innerHTML = msgPasswordDefault;
		} else {
			inputPassword.className = classNames({
				'textentry' : true,
				'error' : true
			});
			divPasswordSubmsg.innerHTML = msgPasswordInvalid;
		}
	} else {
		inputPassword.className = classNames({
			'textentry' : true,
			'error' : true
		});
		divPasswordSubmsg.innerHTML = msgPasswordNoBlank;
	}

	if ((emailOk) && (passwordOk)) {
		// maskCont.className = classNames({
		// 	'show' : true
		// });
		// spinnerCont.className = classNames({
		// 	'spinner-cont' : true,
		// 	'spinning' : true
		// });
		// document.getElementById('form').submit();
	}
}

function setParaFirstSurName() {
	var firstname = trimString(inputFirstname.value);
	var surname = trimString(inputSurname.value);
	var name = firstname;
	if (surname.length > 0) {
		if (name.length > 0) {
			name = name + ' ';
		}
		name = name + surname;
	}
	if (name.length > 0) {
		pIndivName.innerHTML = name;
		pIndivName.className = classNames({});
	} else {
		pIndivName.innerHTML = '&nbsp;';
		pIndivName.className = classNames({
			'empty' : true
		});
	}
}

function setParaCompanyName() {
	var coname = trimString(inputCompanyname.value);
	if (coname.length > 0) {
		pCoName.innerHTML = coname;
		pCoName.className = classNames({
			'company' : true
		});
	} else {
		pCoName.innerHTML = '&nbsp;';
		pCoName.className = classNames({
			'company' : true,
			'empty' : true
		});
	}
}

function setParaCountry() {
	if (selectCountry.options[selectCountry.selectedIndex].value.length > 0) {
		pCountry.innerHTML = selectCountry.options[selectCountry.selectedIndex].innerHTML;
		pCountry.className = classNames({});
	} else {
		pCountry.innerHTML = '&nbsp;';
		pCountry.className = classNames({
			'empty' : true
		});
	}
}

// var divMainmsg = document.getElementById('div-mainmsg');
// var divEmailCont = document.getElementById('div-email-cont');
// var divPasswordCont = document.getElementById('div-password-cont');
// var inputEmail = document.getElementById('input-email');
// var inputPassword = document.getElementById('input-password');
// var divEmailSubmsg = document.getElementById('div-email-submsg');
// var divPasswordSubmsg = document.getElementById('div-password-submsg');
// var submitButton = document.getElementById('div-submit');

// if ((divMainmsg) && (divEmailCont) && (divPasswordCont) && (inputEmail) && (inputPassword) && (divEmailSubmsg) && (divPasswordSubmsg) && (submitButton) && (spinnerCont) && (maskCont)) {
// 	if (trimString(divPasswordSubmsg.innerHTML).length == 0) {
// 		divPasswordSubmsg.innerHTML = msgPasswordDefault;
// 	}

// 	inputEmail.focus();
// 	inputEmail.select();

// 	inputEmail.addEventListener("focus", function(e) {
// 		divMainmsg.innerHTML = "";
// 		divEmailCont.className = classNames({
// 			'text-cont' : true,
// 			'focus' : true
// 		});
// 		divEmailSubmsg.innerHTML = msgEmailDefault;
// 	});

// 	inputEmail.addEventListener("blur", function(e) {
// 		divEmailCont.className = classNames({
// 			'text-cont' : true
// 		});
// 		divEmailSubmsg.innerHTML = msgEmailDefault;
// 	});

// 	inputEmail.addEventListener("keypress", function(e) {
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
// 			validateAndSubmit();
// 		}
// 	});

// 	submitButton.addEventListener("click", function() {
// 		validateAndSubmit();
// 	});
// }

// var resendButton = document.getElementById('div-resend-link');

// if ((resendButton) && (spinnerCont) && (maskCont)) {
// 	resendButton.addEventListener("click", function() {
// 		maskCont.className = classNames({
// 			'show' : true
// 		});
// 		spinnerCont.className = classNames({
// 			'spinner-cont' : true,
// 			'spinning' : true
// 		});
// 		document.getElementById('form').submit();
// 	});
// }

// function validateAndSubmit() {
// 	divMainmsg.innerHTML = "";

// 	var emailOk = false;
// 	var email = trimString(inputEmail.value);

// 	if (email.length > 0) {
// 		var regex = /^[^@]+@[^@]+\.[^@]+$/;
// 		if (regex.test(email)) {
// 			emailOk = true;

// 			divEmailCont.className = classNames({
// 				'text-cont' : true
// 			});
// 			divEmailSubmsg.innerHTML = msgEmailDefault;
// 		} else {
// 			divEmailCont.className = classNames({
// 				'text-cont' : true,
// 				'error' : true
// 			});
// 			divEmailSubmsg.innerHTML = msgEmailInvalid;
// 		}
// 	} else {
// 		divEmailCont.className = classNames({
// 			'text-cont' : true,
// 			'error' : true
// 		});
// 		divEmailSubmsg.innerHTML = msgEmailNoBlank;
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