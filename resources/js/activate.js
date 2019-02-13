require('bootstrap');
import { monitorWinWidth } from './monitor-win-width.js';
import classNames from 'classNames/dedupe';

var resendButton = document.getElementById('div-resend-link');
var spinnerCont = document.getElementById('div-spinner-cont');
var maskCont = document.getElementById('div-middlebox-mask');

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