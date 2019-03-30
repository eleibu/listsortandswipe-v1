require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import classNames from 'classNames/dedupe';
import axios from 'axios';
import { encodeHTML, trimString } from './utils.js';

var client = require('braintree-web/client');
var hostedFields = require('braintree-web/hosted-fields');
var hostedFieldsInstance = null;

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
var divTableTerms = document.getElementById('div-table-terms');
var inputTerms = document.getElementById('input-terms');
var divTermsSubmsg = document.getElementById('div-terms-submsg');
var divPlaceOrder = document.getElementById('div-place-order');
var spinnerContPlaceOrder = document.getElementById('div-spinner-cont-placeorder');
var divPlaceOrderSubmsg = document.getElementById('div-place-order-submsg');

var requirePayment = true;
var inputPID = document.getElementById('input-pid');
if (inputPID && inputPID.value == 'BBCE2AC1-35DA-4D86-8B20-1411A5C553E2') {
	requirePayment = false;
}

if (requirePayment) {
	var inputClientToken = document.getElementById('input-client-token');
	var inputNonce = document.getElementById('input-nonce');
	var inputDiscountCode = document.getElementById('input-discountcode');
	var divDiscountSubmsg = document.getElementById('div-discount-submsg');
	var spinnerContDiscount = document.getElementById('div-spinner-cont-discount');
	var divApplyDiscount = document.getElementById('div-apply-discount');
	var divPaymentNumber = document.getElementById('div-payment-number');
	var divPaymentExpirationDate = document.getElementById('div-payment-expirationDate');
	var divPaymentCVV = document.getElementById('div-payment-cvv');
	var divPaymentSubmsg = document.getElementById('div-payment-submsg');
}

// SIGNUP

if ((maskCont) && (inputEmail) && (divEmailSubmsg) && (inputPassword) && (divPasswordSubmsg) && (inputFirstname) && (inputSurname) && (divNameSubmsg) && (inputCompanyname) && (selectCountry) && (divCountrySubmsg) && (pIndivName) && (pCoName) && (pCountry) && (divTableTerms) && (inputTerms) && (divTermsSubmsg) && (divPlaceOrder) && (spinnerContPlaceOrder) && (divPlaceOrderSubmsg)) {
	setupNonPayment();

	if ((inputClientToken) && (inputDiscountCode) && (divDiscountSubmsg) && (spinnerContDiscount) && (divApplyDiscount) && (divPaymentNumber) && (divPaymentExpirationDate) && (divPaymentCVV) && (divPaymentSubmsg)) {
		setupPayment();
	}
}

function setupNonPayment() {
	// email
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

function setupPayment() {
	// discount
	inputDiscountCode.addEventListener("focus", function(e) {
		inputDiscountCode.className = classNames({
			'textentry' : true,
			'focus' : true
		});
		divDiscountSubmsg.innerHTML = msgDiscountDefault;
		divDiscountSubmsg.className = classNames({
			'submsg-cont' : true
		});
	});

	inputDiscountCode.addEventListener("blur", function(e) {
		inputDiscountCode.className = classNames({
			'textentry' : true
		});
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

	inputDiscountCode.addEventListener("keydown", function(e) {
		if ((e.which && e.which == 9) || (e.keyCode && e.keyCode == 9)) {
			e.preventDefault();
			if (hostedFieldsInstance) {
				hostedFieldsInstance.focus('number', function (focusErr) {});
			}
		}
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

	// payment
	client.create({
		authorization: inputClientToken.value
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
					'color': '#222222'
				}
			},
			fields: {
				number: {
					selector: '#' + divPaymentNumber.id,
					placeholder: '4111 1111 1111 1111'
				},
				expirationDate: {
					selector: '#' + divPaymentExpirationDate.id,
					placeholder: 'MM/YYYY'
				},
				cvv: {
					selector: '#' + divPaymentCVV.id,
					placeholder: 'CVV'
				}
			}
		};
		return hostedFields.create(options);
	}).then(function (instance) {
		hostedFieldsInstance = instance;

		hostedFieldsInstance.on('focus', function (event) {
			setClassesOnHostedFieldFocus(event.emittedBy);
			divPaymentSubmsg.innerHTML = '';
			divPaymentSubmsg.className = classNames({
				'submsg-cont' : true
			});
			hidePlaceOrderSubmsg();
		});

		hostedFieldsInstance.on('blur', function (event) {
			setClassesOnHostedFieldBlur();
			divPaymentSubmsg.innerHTML = '';
			divPaymentSubmsg.className = classNames({
				'submsg-cont' : true
			});
			hidePlaceOrderSubmsg();
		});
	}).catch(function (err) {
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
    	// discount code is valid - change order summary to include discount
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

		if (requirePayment) {
			if (hostedFieldsInstance != null) {
				maskCont.className = classNames({
					'show' : true
				});
				spinnerContPlaceOrder.className = classNames({
					'spinner-cont' : true,
					'spinning' : true
				});
		        hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
					if (tokenizeErr) {
						maskCont.className = classNames({});
						spinnerContPlaceOrder.className = classNames({
							'spinner-cont' : true
						});

						switch (tokenizeErr.code) {
							case 'HOSTED_FIELDS_FIELDS_EMPTY':
								divPaymentNumber.className = classNames({
									'hosted-field' : true,
									'error' : true
								});
								divPaymentExpirationDate.className = classNames({
									'hosted-field' : true,
									'error' : true
								});
								divPaymentCVV.className = classNames({
									'hosted-field' : true,
									'error' : true
								});
								divPaymentSubmsg.innerHTML = 'Payment details can&#39;t be blank.';
								break;
							case 'HOSTED_FIELDS_FIELDS_INVALID':
								if (tokenizeErr.details.invalidFieldKeys.includes('number')) {
									divPaymentNumber.className = classNames({
										'hosted-field' : true,
										'error' : true
									});
								}
								if (tokenizeErr.details.invalidFieldKeys.includes('expirationDate')) {
									divPaymentExpirationDate.className = classNames({
										'hosted-field' : true,
										'error' : true
									});
								}
								if (tokenizeErr.details.invalidFieldKeys.includes('cvv')) {
									divPaymentCVV.className = classNames({
										'hosted-field' : true,
										'error' : true
									});
								}
								divPaymentSubmsg.innerHTML = 'The supplied credit card details are invalid.';
								break;
							case 'HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED':
								divPaymentCVV.className = classNames({
									'hosted-field' : true,
									'error' : true
								});
								divPaymentSubmsg.innerHTML = 'The credit card CVV is invalid.';
								break;
							case 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR':
								divPaymentSubmsg.innerHTML = 'Can&#39;t connect to payment server, please try again.';
								break;
							default:
								divPaymentSubmsg.innerHTML = 'A payment error occurred, please try again.';
						}

						divPaymentSubmsg.className = classNames({
							'submsg-cont' : true,
							'error' : true
						});

						showPlaceOrderSubmsg();
						return;
					}

					inputNonce.value = payload.nonce;
					document.getElementById('form').submit();
		        });
			}
		} else {
			maskCont.className = classNames({
				'show' : true
			});
			spinnerContPlaceOrder.className = classNames({
				'spinner-cont' : true,
				'spinning' : true
			});
			document.getElementById('form').submit();
		}
	} else {
		divPlaceOrderSubmsg.innerHTML = msgPlaceOrderErrors;
		showPlaceOrderSubmsg();
	}
}

function setClassesOnHostedFieldFocus(emittedBy) {
	if (emittedBy == 'number') {
		divPaymentNumber.className = classNames({
			'hosted-field' : true,
			'focus' : true
		});
	} else {
		divPaymentNumber.className = classNames({
			'hosted-field' : true
		});
	}
	if (emittedBy == 'expirationDate') {
		divPaymentExpirationDate.className = classNames({
			'hosted-field' : true,
			'focus' : true
		});
	} else {
		divPaymentExpirationDate.className = classNames({
			'hosted-field' : true
		});
	}
	if (emittedBy == 'cvv') {
		divPaymentCVV.className = classNames({
			'hosted-field' : true,
			'focus' : true
		});
	} else {
		divPaymentCVV.className = classNames({
			'hosted-field' : true
		});
	}
}

function setClassesOnHostedFieldBlur() {
	divPaymentNumber.className = classNames({
		'hosted-field' : true
	});
	divPaymentExpirationDate.className = classNames({
		'hosted-field' : true
	});
	divPaymentCVV.className = classNames({
		'hosted-field' : true
	});
}

function showPlaceOrderSubmsg() {
	divPlaceOrderSubmsg.className = classNames({
		'submsg-cont' : true,
		'error' : true
	});
}

function hidePlaceOrderSubmsg() {
	divPlaceOrderSubmsg.innerHTML = '';
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

// ACCOUNT CREATED REQUIRES ACTIVATION
// LINK SENT

var divResenDLink = document.getElementById('div-resendlink');
var spinnerContResendLink = document.getElementById('div-spinner-cont-resendlink');

if ((maskCont) && (divResenDLink) && (spinnerContResendLink)) {
	divResenDLink.addEventListener("click", function() {
		maskCont.className = classNames({
			'show' : true
		});
		spinnerContResendLink.className = classNames({
			'spinner-cont' : true,
			'spinning' : true
		});
		document.getElementById('form').submit();
	});
}