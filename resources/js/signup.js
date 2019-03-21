require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import classNames from 'classNames/dedupe';
import axios from 'axios';
import { encodeHTML, trimString } from './utils.js';

var client = require('braintree-web/client');
var hostedFields = require('braintree-web/hosted-fields');

axios.defaults.headers.common = {
    'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute("content"),
    'X-Requested-With': 'XMLHttpRequest'
};

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
var spinnerContDiscount = document.getElementById('div-spinner-cont-discount');
var divApplyDiscount = document.getElementById('div-apply-discount');
var divTableTerms = document.getElementById('div-table-terms');
var inputTerms = document.getElementById('input-terms');
var divTermsSubmsg = document.getElementById('div-terms-submsg');
var divPlaceOrder = document.getElementById('div-place-order');
var spinnerContPlaceOrder = document.getElementById('div-spinner-cont-placeorder');
var divPlaceOrderSubmsg = document.getElementById('div-place-order-submsg');

if ((maskCont) && (inputEmail) && (divEmailSubmsg) && (inputPassword) && (divPasswordSubmsg) && (inputFirstname) && (inputSurname) && (divNameSubmsg) && (inputCompanyname) && (selectCountry) && (divCountrySubmsg) && (pIndivName) && (pCoName) && (pCountry) && (inputDiscountCode) && (divDiscountSubmsg) && (spinnerContDiscount) && (divApplyDiscount) && (divTableTerms) && (inputTerms) && (divTermsSubmsg) && (divPlaceOrder) && (spinnerContPlaceOrder) && (divPlaceOrderSubmsg)) {



	client.create({
		authorization: document.getElementById('input-client-token').value
	}).then(function (clientInstance) {
		var options = {
			client: clientInstance,
			styles: {
				'input': {
					'font-size': '16px',
					'font-family': 'courier, monospace',
					'font-weight': 'lighter',
					'color': '#CCCCCC'
				},
				':focus': {
					'color': '#222222'
				},
				'.valid': {
					'color': '#66CC33'
				}
			},
			fields: {
				number: {
					selector: '#div-card-number',
					placeholder: '4111 1111 1111 1111'
				},
				expirationDate: {
					selector: '#div-expiry-date',
					placeholder: 'MM/YYYY'
				},
				cvv: {
					selector: '#div-cvv',
					placeholder: 'CVV'
				}
			}
		};

		return hostedFields.create(options);
	}).then(function (hostedFieldsInstance) {
		// console.log('all good');
	}).catch(function (err) {
		// console.log(err);
		// var teardown = function (event) {
		// 	event.preventDefault();
		// 	alert('Submit your nonce to your server here!');
		// 	hostedFieldsInstance.teardown(function () {
		// 		createHostedFields(clientInstance);
		// 		form.removeEventListener('submit', teardown, false);
		// 	});
		// };

		// form.addEventListener('submit', teardown, false);
	});

	inputEmail.addEventListener("focus", function(e) {
		inputEmail.className = classNames({
			'textentry' : true,
			'focus' : true
		});
		divEmailSubmsg.innerHTML = msgEmailDefault;
		divEmailSubmsg.className = classNames({
			'submsg-cont' : true
		});
		hidePlaceOrderSubmsg();
	});

	inputEmail.addEventListener("blur", function(e) {
		inputEmail.className = classNames({
			'textentry' : true
		});
		divEmailSubmsg.innerHTML = msgEmailDefault;
		divEmailSubmsg.className = classNames({
			'submsg-cont' : true
		});
		hidePlaceOrderSubmsg();
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
		divPasswordSubmsg.className = classNames({
			'submsg-cont' : true
		});
		hidePlaceOrderSubmsg();
	});

	inputPassword.addEventListener("blur", function(e) {
		inputPassword.className = classNames({
			'textentry' : true
		});
		divPasswordSubmsg.innerHTML = msgPasswordDefault;
		divPasswordSubmsg.className = classNames({
			'submsg-cont' : true
		});
		hidePlaceOrderSubmsg();
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
		divNameSubmsg.innerHTML = msgNameDefault;
		divNameSubmsg.className = classNames({
			'submsg-cont' : true
		});
		hidePlaceOrderSubmsg();
	});

	inputFirstname.addEventListener("blur", function(e) {
		inputFirstname.className = classNames({
			'textentry' : true,
			'left' : true
		});
		divNameSubmsg.innerHTML = msgNameDefault;
		divNameSubmsg.className = classNames({
			'submsg-cont' : true
		});
		hidePlaceOrderSubmsg();
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
		divNameSubmsg.innerHTML = msgNameDefault;
		divNameSubmsg.className = classNames({
			'submsg-cont' : true
		});
		hidePlaceOrderSubmsg();
	});

	inputSurname.addEventListener("blur", function(e) {
		inputSurname.className = classNames({
			'textentry' : true,
			'right' : true
		});
		divNameSubmsg.innerHTML = msgNameDefault;
		divNameSubmsg.className = classNames({
			'submsg-cont' : true
		});
		hidePlaceOrderSubmsg();
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
		hidePlaceOrderSubmsg();
	});

	inputCompanyname.addEventListener("blur", function(e) {
		inputCompanyname.className = classNames({
			'textentry' : true
		});
		hidePlaceOrderSubmsg();
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
			divCountrySubmsg.className = classNames({
				'submsg-cont' : true
			});
			hidePlaceOrderSubmsg();
		}
	});

	selectCountry.addEventListener("keypress", function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			inputDiscountCode.focus();
			inputDiscountCode.select();
		}
	});

	// discount
	inputDiscountCode.addEventListener("focus", function(e) {
		divDiscountSubmsg.innerHTML = msgDiscountDefault;
		divDiscountSubmsg.className = classNames({
			'submsg-cont' : true
		});
	});

	inputDiscountCode.addEventListener("blur", function(e) {
		divDiscountSubmsg.innerHTML = msgDiscountDefault;
		divDiscountSubmsg.className = classNames({
			'submsg-cont' : true
		});
	});

	inputDiscountCode.addEventListener('input', function() {
		divDiscountSubmsg.innerHTML = msgDiscountDefault;
		divDiscountSubmsg.className = classNames({
			'submsg-cont' : true
		});
	});

	inputDiscountCode.addEventListener("keypress", function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			e.preventDefault();
			var code = inputDiscountCode.value;
			if (code.length > 0) {
				checkDiscountCode(code);
			}
		}
	});


	divApplyDiscount.addEventListener("click", function() {
		divDiscountSubmsg.innerHTML = msgDiscountDefault;
		divDiscountSubmsg.className = classNames({
			'submsg-cont' : true
		});

		var code = inputDiscountCode.value;
		if (code.length > 0) {
			checkDiscountCode(code);
		}
	});

	// terms
	inputTerms.addEventListener('change', function() {
		if (inputTerms.checked) {
			divTableTerms.className = classNames({});
			divTermsSubmsg.innerHTML = msgTermsDefault;
			divTermsSubmsg.className = classNames({
				'submsg-cont' : true
			});
			hidePlaceOrderSubmsg();
		}
	});

	// place order
	divPlaceOrder.addEventListener("click", function() {
		validateAndSubmit();
	});
}

function checkDiscountCode(code) {
	maskCont.className = classNames({
		'show' : true
	});
	spinnerContDiscount.className = classNames({
		'spinner-cont' : true,
		'spinning' : true
	});

    let url = api_url_web + 'signup-discount';
    axios({
        method: 'post',
        url: url,
        data: {
        	'code' : code
        }
    })
    .then((response)=>{
    	// discount code is valid - change order summary
    })
    .catch((error)=>{
		divDiscountSubmsg.innerHTML = msgDiscountInvalid;
		divDiscountSubmsg.className = classNames({
			'submsg-cont' : true,
			'error' : true
		});
    })
    .then(()=>{
		maskCont.className = classNames({});
		spinnerContDiscount.className = classNames({
			'spinner-cont' : true
		});
    });
}

function validateAndSubmit() {
	var emailOk = false;
	var passwordOk = false;
	var firstnameOk = false;
	var surnameOk = false;
	var countryOk = false;

	var email = trimString(inputEmail.value);
	var password = inputPassword.value;
	var firstname = trimString(inputFirstname.value);
	var surname = trimString(inputSurname.value);
	var country = selectCountry.options[selectCountry.selectedIndex].value;
	var termsOk = inputTerms.checked;

	if (email.length > 0) {
		var regex = /^[^@]+@[^@]+\.[^@]+$/;
		if (regex.test(email)) {
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
			divEmailSubmsg.innerHTML = msgEmailInvalid;
			divEmailSubmsg.className = classNames({
				'submsg-cont' : true,
				'error' : true
			});
		}
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

	if (firstname.length > 0 && surname.length > 0) {
		firstnameOk = true;
		surnameOk = true;

		inputFirstname.className = classNames({
			'textentry' : true,
			'left' : true
		});
		inputSurname.className = classNames({
			'textentry' : true,
			'right' : true
		});
		divNameSubmsg.innerHTML = msgNameDefault;
		divNameSubmsg.className = classNames({
			'submsg-cont' : true
		});
	} else {
		if (firstname.length == 0 && surname.length == 0) {
			inputFirstname.className = classNames({
				'textentry' : true,
				'left' : true,
				'error' : true
			});
			inputSurname.className = classNames({
				'textentry' : true,
				'right' : true,
				'error' : true
			});
			divNameSubmsg.innerHTML = msgNameNoBlankBoth;
			divNameSubmsg.className = classNames({
				'submsg-cont' : true,
				'error' : true
			});
		} else if (firstname.length == 0) {
			surnameOk = true;
			inputFirstname.className = classNames({
				'textentry' : true,
				'left' : true,
				'error' : true
			});
			divNameSubmsg.innerHTML = msgNameNoBlankFirstname;
			divNameSubmsg.className = classNames({
				'submsg-cont' : true,
				'error' : true
			});
		} else {
			firstnameOk = true;
			inputSurname.className = classNames({
				'textentry' : true,
				'right' : true,
				'error' : true
			});
			divNameSubmsg.innerHTML = msgNameNoBlankSurname;
			divNameSubmsg.className = classNames({
				'submsg-cont' : true,
				'error' : true,
				'right' : true
			});
		}
	}

	if (country.length > 0) {
		countryOk = true;
		divCountrySubmsg.innerHTML = msgCountryDefault;
		divCountrySubmsg.className = classNames({
			'submsg-cont' : true
		});
	} else {
		selectCountry.className = classNames({
			'error' : true
		});
		divCountrySubmsg.innerHTML = msgCountryNoBlank;
		divCountrySubmsg.className = classNames({
			'submsg-cont' : true,
			'error' : true
		});
	}

	if (termsOk) {
		divTableTerms.className = classNames({});
		divTermsSubmsg.innerHTML = msgTermsDefault;
		divTermsSubmsg.className = classNames({
			'submsg-cont' : true
		});
	} else {
		divTableTerms.className = classNames({
			'error' : true
		});
		divTermsSubmsg.innerHTML = msgTermsNoBlank;
		divTermsSubmsg.className = classNames({
			'submsg-cont' : true,
			'error' : true
		});
	}

	if ((emailOk) && (passwordOk) && (firstnameOk) && (surnameOk) && (countryOk) && (termsOk)) {
		hidePlaceOrderSubmsg();
		maskCont.className = classNames({
			'show' : true
		});
		spinnerContPlaceOrder.className = classNames({
			'spinner-cont' : true,
			'spinning' : true
		});
		document.getElementById('form').submit();
	} else {
		divPlaceOrderSubmsg.innerHTML = msgPlaceOrderErrors;
		divPlaceOrderSubmsg.className = classNames({
			'submsg-cont' : true,
			'error' : true
		});
	}
}

function hidePlaceOrderSubmsg() {
	divPlaceOrderSubmsg.innerHTML = msgPlaceOrderDefault;
	divPlaceOrderSubmsg.className = classNames({
		'submsg-cont' : true
	});
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

		pIndivName.innerHTML = encodeHTML(name);
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
		pCoName.innerHTML = encodeHTML(coname);
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