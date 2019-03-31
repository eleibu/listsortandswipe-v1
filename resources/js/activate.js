require('bootstrap');
import { monitorWinWidth } from './monitor-win-width.js';
import classNames from 'classNames/dedupe';

var maskCont = document.getElementById('div-sitecont-mask');
var divResendLink = document.getElementById('div-resendlink');
var spinnerContResendLink = document.getElementById('div-spinner-cont-resendlink');

if ((maskCont) && (divResendLink) && (spinnerContResendLink)) {
    divResendLink.addEventListener("click", function() {
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