import React from 'react';
import classNames from 'classNames/dedupe';
import { CSSTransition } from 'react-transition-group';
import { getLicenceTypeText, getDiffMinutes, expiresText, licenceTypeText } from './utils.js';
import moment from 'moment';
import axios from 'axios';
import { requestObjCreate } from './utils.js';

const client = require('braintree-web/client');
const hostedFields = require('braintree-web/hosted-fields');
let hostedFieldsInstance = null;
const idDivPaymentNumber = 'div-payment-number';
const idDivPaymentExpirationDate = 'div-payment-expirationDate';
const idDivPaymentCVV = 'div-payment-cvv';

export class Renew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinning: false,
            changeLicenceType: (accountData.accountType == 0),   // if free trial you must change the licence type, otherwise initial setting is to keep the same licence
            selectedLicenceType: 2,
            isCheckingDiscountCode: false,
            discountError: false,
            discountFocus: false,
            discountSubmsg: null,
            paymentNumberError: false,
            paymentNumberFocus: false,
            paymentExpirationDateError: false,
            paymentExpirationDateFocus: false,
            paymentCVVError: false,
            paymentCVVFocus: false,
            paymentSubmsg: null
        };
        this.setChangeLicenceType = this.setChangeLicenceType.bind(this);
        this.setSelectedLicenceType = this.setSelectedLicenceType.bind(this);
        this.setDiscountFocus = this.setDiscountFocus.bind(this);
        this.setDiscountSubmsg = this.setDiscountSubmsg.bind(this);
        this.setStateOnHostedFieldFocus = this.setStateOnHostedFieldFocus.bind(this);
        this.setStateOnHostedFieldBlur = this.setStateOnHostedFieldBlur.bind(this);
        this.setPaymentSubmsg = this.setPaymentSubmsg.bind(this);
        this.checkDiscountCode = this.checkDiscountCode.bind(this);
        this.validateAndSubmit = this.validateAndSubmit.bind(this);
    }
    componentDidMount() {
        // payment
        client.create({
            authorization: document.getElementById('input-client-token').value
        })
        .then((clientInstance)=>{
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
                        selector: '#' + idDivPaymentNumber,
                        placeholder: '4111 1111 1111 1111'
                    },
                    expirationDate: {
                        selector: '#' + idDivPaymentExpirationDate,
                        placeholder: 'MM/YYYY'
                    },
                    cvv: {
                        selector: '#' + idDivPaymentCVV,
                        placeholder: 'CVV'
                    }
                }
            };
            return hostedFields.create(options);
        })
        .then((instance)=>{
            hostedFieldsInstance = instance;
            hostedFieldsInstance.on('focus', (event)=>{this.setStateOnHostedFieldFocus(event.emittedBy)});
            hostedFieldsInstance.on('blur', (event)=>{this.setStateOnHostedFieldBlur()});
        })
        .catch((err)=>{
        });
    }
    setStateOnHostedFieldFocus(emittedBy) {
        if (emittedBy == 'number') {
            this.setState({
                paymentNumberError: false,
                paymentNumberFocus: true,
                paymentSubmsg: null
            });
        } else {
            this.setState({
                paymentNumberError: false,
                paymentNumberFocus: false,
                paymentSubmsg: null
            });
        }
        if (emittedBy == 'expirationDate') {
            this.setState({
                paymentExpirationDateError: false,
                paymentExpirationDateFocus: true,
                paymentSubmsg: null
            });
        } else {
            this.setState({
                paymentExpirationDateError: false,
                paymentExpirationDateFocus: false,
                paymentSubmsg: null
            });
        }
        if (emittedBy == 'cvv') {
            this.setState({
                paymentCVVError: false,
                paymentCVVFocus: true,
                paymentSubmsg: null
            });
        } else {
            this.setState({
                paymentCVVError: false,
                paymentCVVFocus: false,
                paymentSubmsg: null
            });
        }
    }
    setStateOnHostedFieldBlur() {
        this.setState({
            paymentNumberError: false,
            paymentNumberFocus: false,
            paymentExpirationDateError: false,
            paymentExpirationDateFocus: false,
            paymentCVVError: false,
            paymentCVVFocus: false,
            paymentSubmsg: null
        });
    }
    setChangeLicenceType(change) {
        this.setState({
            changeLicenceType: change
        });
    }
    setSelectedLicenceType(type) {
        this.setState({
            selectedLicenceType: type
        });
    }
    setDiscountFocus(hasFocus) {
        this.setState({
            discountFocus: hasFocus
        });
    }
    setDiscountSubmsg(msg) {
        this.setState({
            discountSubmsg: msg
        });
    }
    setPaymentSubmsg(msg) {
        this.setState({
            paymentSubmsg: msg
        });
    }
    checkDiscountCode(code) {
        this.setDiscountSubmsg(null);

        if (code.length > 0) {
            this.props.setShowMask(true);
            this.setState({
                isCheckingDiscountCode: true
            });

            const requestObj = requestObjCreate(axios.CancelToken);
            this.props.addServerRequestObj(requestObj);

            let url = api_url_web + 'account-discount';
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
                this.setDiscountSubmsg(msgDiscountInvalid);
            })
            .then(()=>{
                this.props.setShowMask(false);
                this.setState({
                    isCheckingDiscountCode: false
                });
                this.props.deleteServerRequestObj(requestObj);
            });
        }
    }
    validateAndSubmit() {
    }
    render() {
        const diffMinutes = getDiffMinutes(accountData.accountExpiresAt);
        return (
            <div className="content-inner renewupgrade-cont">
                <div className="page-title default">
                    <i className="oln icon-reload-ui"></i><strong>Renew</strong> <span>licence</span>
                </div>
                <br/><br/>
                <CurrentLicence diffMinutes={diffMinutes} />
                <br/><br/>
                <div className="section-cont">
                    <div className="title">
                        Renewal details
                    </div>
                    <CSSTransition in={(!this.state.changeLicenceType)} classNames="renewtype-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                        <div>
                            <div className="para">
                                {(diffMinutes > 0) ? (
                                    <React.Fragment>Renew current licence for an additional 1 year</React.Fragment>
                                ) : (
                                    <React.Fragment>Renew expired licence from today for 1 year</React.Fragment>
                                )}
                            </div>
                            <div className="buttons">
                                <div className="button-word-cont grey active" onClick={() => {this.setChangeLicenceType(true)}}>
                                    <div className="spinner-cont">
                                        <div className="text">CHANGE LICENCE TYPE</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                    <CSSTransition in={(this.state.changeLicenceType)} classNames="renewtype-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                        <div>
                            <div className="para">
                                {(accountData.accountType == 0) ? (
                                    <React.Fragment>Select your licence type:</React.Fragment>
                                ) : (
                                    <React.Fragment>Select new licence type:</React.Fragment>
                                )}
                            </div>
                            <div className="para">
                                <LicenceTypes />
                            </div>
                        </div>
                    </CSSTransition>
                </div>
                <br/><br/>
                <OrderSummary selectedLicenceType={this.state.selectedLicenceType} />
                <br/><br/>
                <Discount discountError={this.state.discountError} discountFocus={this.state.discountFocus} setDiscountFocus={this.setDiscountFocus} checkDiscountCode={this.checkDiscountCode} isCheckingDiscountCode={this.state.isCheckingDiscountCode} discountSubmsg={this.state.discountSubmsg} setDiscountSubmsg={this.setDiscountSubmsg} />
                <br/>
                <Payment
                    selectedLicenceType={this.state.selectedLicenceType}
                    paymentNumberError={this.state.paymentNumberError} 
                    paymentNumberFocus={this.state.paymentNumberFocus}
                    paymentExpirationDateError={this.state.paymentExpirationDateError}
                    paymentExpirationDateFocus={this.state.paymentExpirationDateFocus}
                    paymentCVVError={this.state.paymentCVVError}
                    paymentCVVFocus={this.state.paymentCVVFocus}
                    paymentSubmsg={this.state.paymentSubmsg}
                    setPaymentSubmsg={this.setPaymentSubmsg}
                />
                <br/><br/><br/>
                <Buttons spinning={this.state.spinning} validateAndSubmit={this.validateAndSubmit} setAccountSubpage={this.props.setAccountSubpage} />
            </div>
        );
    }
}

export class Upgrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinning: false
        };
    }
    validateAndSubmit() {
    }
    render() {
        return (
            <div className="content-inner renewupgrade-cont">
                <div className="page-title default">
                    <i className="oln icon-uploading-ui"></i><strong>Upgrade</strong> <span>licence</span>
                </div>
                <br/><br/>
                <CurrentLicence/>
                <br/><br/>
                <div className="section-cont">
                    <div className="title">
                        Upgrade details
                    </div>
                    <div className="para">
                        <div>
                            Select the licence type that you would like to upgrade to. The upgrade will be valid for the remainder of the term of your current licence.
                        </div>
                        <div>
                            <LicenceTypes />
                        </div>
                    </div>
                </div>
                <br/><br/>
                <div className="buttons-cont">
                    buttons
                </div>
            </div>
        );
    }
}

const CurrentLicence = (props) => {
    let title = 'Current licence';
    let label = 'Expires';
    if (props.diffMinutes <= 0) {
        title = 'Expired licence';
        label = 'Expired';
    }
    return (
        <div className="section-cont">
            <div className="title">
                {title}
            </div>
            <div className="para">
                <strong>{label}:</strong> {expiresText(accountData.accountExpiresAt, accountData.accountType)}
            </div>
            <div className="para">
                <strong>Type:</strong> {getLicenceTypeText(accountData.accountType)}
            </div>
        </div>
    );
}

class LicenceTypes extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="licence-cont">
                <div className="labels-cont">
                    <div className="rowtop">
                        <div className="type dummy">
                            &nbsp;
                        </div>
                        <div className="price dummy">
                            &nbsp;
                        </div>
                        <div className="button dummy">
                            Button
                        </div>
                    </div>
                    <div className="row">
                        Licence period
                    </div>
                    <div className="row">
                        All features
                    </div>
                    <div className="row">
                        Number of domains
                    </div>
                    <div className="row">
                        Licence key
                    </div>
                    <div className="row">
                        Tech support
                    </div>
                    <div className="row">
                        Paid web app
                    </div>
                    <div className="row">
                        Reseller
                    </div>
                </div>
                <div className="details-cont">
                    <div className="rowtop">
                        <div className="type">
                            Basic
                        </div>
                        <div className="price">
                            $36
                        </div>
                        <div className="button">
                            Button
                        </div>
                    </div>
                    <div className="row">
                        1 year
                    </div>
                    <div className="row">
                        <i className="sld icon-check-ui"></i>
                    </div>
                    <div className="row">
                        1
                    </div>
                    <div className="row">
                        Per domain
                    </div>
                    <div className="row">
                        <span className="neg">&#9472;</span>
                    </div>
                    <div className="row">
                        <span className="neg">&#9472;</span>
                    </div>
                    <div className="row">
                        <span className="neg">&#9472;</span>
                    </div>
                </div>
                <br className="newline"/>
                <div className="labels-cont xsonly">
                    <div className="rowtop">
                        <div className="type dummy">
                            &nbsp;
                        </div>
                        <div className="price dummy">
                            &nbsp;
                        </div>
                        <div className="button dummy">
                            Button
                        </div>
                    </div>
                    <div className="row">
                        Licence period
                    </div>
                    <div className="row">
                        All features
                    </div>
                    <div className="row">
                        Number of domains
                    </div>
                    <div className="row">
                        Licence key
                    </div>
                    <div className="row">
                        Tech support
                    </div>
                    <div className="row">
                        Paid web app
                    </div>
                    <div className="row">
                        Reseller
                    </div>
                </div>
                <div className="details-cont">
                    <div className="rowtop">
                        <div className="type">
                            Professional
                        </div>
                        <div className="price">
                            $108
                        </div>
                        <div className="button">
                            Button
                        </div>
                    </div>
                    <div className="row">
                        1 year
                    </div>
                    <div className="row">
                        <i className="sld icon-check-ui"></i>
                    </div>
                    <div className="row">
                        5
                    </div>
                    <div className="row">
                        Per domain
                    </div>
                    <div className="row">
                        Standard
                    </div>
                    <div className="row">
                        <i className="sld icon-check-ui"></i>
                    </div>
                    <div className="row">
                        <span className="neg">&#9472;</span>
                    </div>
                </div>
                <br className="newline"/>
                <div className="labels-cont xsonly">
                    <div className="rowtop">
                        <div className="type dummy">
                            &nbsp;
                        </div>
                        <div className="price dummy">
                            &nbsp;
                        </div>
                        <div className="button dummy">
                            Button
                        </div>
                    </div>
                    <div className="row">
                        Licence period
                    </div>
                    <div className="row">
                        All features
                    </div>
                    <div className="row">
                        Number of domains
                    </div>
                    <div className="row">
                        Licence key
                    </div>
                    <div className="row">
                        Tech support
                    </div>
                    <div className="row">
                        Paid web app
                    </div>
                    <div className="row">
                        Reseller
                    </div>
                </div>
                <div className="details-cont">
                    <div className="rowtop">
                        <div className="type">
                            Enterprise
                        </div>
                        <div className="price">
                            $648
                        </div>
                        <div className="button">
                            Button
                        </div>
                    </div>
                    <div className="row">
                        1 year
                    </div>
                    <div className="row">
                        <i className="sld icon-check-ui"></i>
                    </div>
                    <div className="row">
                        35
                    </div>
                    <div className="row">
                        Per account
                    </div>
                    <div className="row">
                        Premium
                    </div>
                    <div className="row">
                        <i className="sld icon-check-ui"></i>
                    </div>
                    <div className="row">
                        <i className="sld icon-check-ui"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const OrderSummary = (props) => {
    const price = '$' + (licenceDetails[props.selectedLicenceType].priceCents / 100).toFixed(2);
    const subtotal = price;
    const taxes = '$0.00';
    const total = price;
    return (
        <div className="section-cont">
            <div className="title">
                Order summary
            </div>
            <div className="">
                <div className="para address">
                    <p>{accountData.name} {accountData.surname}</p>
                    {accountData.companyName != null &&
                        <p>{accountData.companyName}</p>
                    }
                    <p>{accountData.countryName}</p>
                </div>
                <div className="para orderdetails">
                    <table cellPadding="0" cellSpacing="0">
                        <tbody>
                            <tr>
                                <td colSpan="2">&nbsp;</td>
                                <td className="col-right">USD</td>
                            </tr>
                            <tr>
                                <td colSpan="2">{licenceDetails[props.selectedLicenceType].name}<br/>Expires: {moment(accountData.accountExpiresAt).add(1, 'years').format('LL')}</td>
                                <td className="col-right">{price}</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td className="border-top col-mdl">Subtotal</td>
                                <td className="border-top col-right">{subtotal}</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td className="border-btm col-mdl">Taxes</td>
                                <td className="border-btm col-right">{taxes}</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td className="col-mdl"><strong>Total</strong></td>
                                <td className="col-right"><strong>{total}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

class Discount extends React.Component {
    constructor(props) {
        super(props);
    }
    onKeyDown(e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {         // enter key
            e.preventDefault();
            this.props.checkDiscountCode(this.input.value);
        }
    }
    render() {
        const inputClasses = classNames({
            'textentry' : true,
            'error' : this.props.discountError,
            'focus' : this.props.discountFocus
        });
        const spinnerContClasses = classNames({
            'spinner-cont' : true,
            'spinning' : this.props.isCheckingDiscountCode
        });
        const submsgContClasses = classNames({
            'submsg-cont' : true,
            'error' : this.props.discountSubmsg != null && this.props.discountSubmsg.length > 0
        });
        return (
            <div className="section-cont">
                <div className="title">
                    Discount
                </div>
                <div className="para">
                    <input ref={(input) => { this.input = input; }} name="discountcode" className={inputClasses} type="text" placeholder="Discount code" onFocus={() => {this.props.setDiscountSubmsg(null); this.props.setDiscountFocus(true); }} onBlur={() => {this.props.setDiscountSubmsg(null); this.props.setDiscountFocus(false); }} onKeyDown={(e) => this.onKeyDown(e)} />
                </div>
                <div className="buttons">
                    <div className="button-word-cont grey active" onClick={() => {this.props.checkDiscountCode(this.input.value); }}>
                        <div className={spinnerContClasses}>
                            <div className="text">APPLY DISCOUNT</div>
                            <div className="spinner-outer">
                                <div className="spinner-inner">
                                    <div className="rect rect0"></div><div className="rect rect1"></div><div className="rect rect2"></div><div className="rect rect3"></div><div className="rect rect4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={submsgContClasses}>
                    {this.props.discountSubmsg}
                </div>
            </div>
        );
    }
}

class Payment extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const paymentNumberClasses = classNames({
            'hosted-field' : true,
            'error' : this.props.paymentNumberError,
            'focus' : this.props.paymentNumberFocus
        });
        const paymentExpirationDateClasses = classNames({
            'hosted-field' : true,
            'error' : this.props.paymentExpirationDateError,
            'focus' : this.props.paymentExpirationDateFocus
        });
        const paymentCVVClasses = classNames({
            'hosted-field' : true,
            'error' : this.props.paymentCVVError,
            'focus' : this.props.paymentCVVFocus
        });
        const submsgContClasses = classNames({
            'submsg-cont' : true,
            'error' : this.props.paymentSubmsg != null && this.props.paymentSubmsg.length > 0
        });
        return (
            <div className="section-cont">
                <div className="title">
                    Payment
                </div>
                <div className="para">
                    <div id={idDivPaymentNumber} className={paymentNumberClasses}></div>
                </div>
                <div className="para">
                    <div id={idDivPaymentExpirationDate} className={paymentExpirationDateClasses}></div>&nbsp;&nbsp;
                    <div id={idDivPaymentCVV} className={paymentCVVClasses}></div>
                </div>
                <div className={submsgContClasses}>
                    {this.props.paymentSubmsg}
                </div>
                <div className="para">
                    <img width="32" className="payment" src={images_url + 'payment-paypal.png'} title="PayPal" alt="Paypal"/>
                    <img width="32" className="payment" src={images_url + 'payment-visa.png'} title="Visa" alt="Visa"/>
                    <img width="32" className="payment" src={images_url + 'payment-mastercard.png'} title="Mastercard" alt="Mastercard"/>
                    <img width="32" className="payment" src={images_url + 'payment-amex.png'} title="American Express" alt="Amex"/>
                    <img width="32" className="payment" src={images_url + 'payment-discover.png'} title="Discover" alt="Discover"/>
                    <img width="32" className="payment" src={images_url + 'payment-dinersclub.png'} title="Diner's club" alt="Diners"/>
                    <img width="32" className="payment" src={images_url + 'payment-jcb.png'} title="JCB" alt="JCB"/>
                    <img width="32" className="payment" src={images_url + 'payment-maestro.png'} title="Maestro" alt="Maestro"/>
                    <img width="32" className="payment" src={images_url + 'payment-maestrouk.png'} title="Maestro UK" alt="Maestro UK"/>
                </div>
            </div>
        );
    }
}

const Buttons = (props) => {
    const spinnerContClasses = classNames({
        'spinner-cont' : true,
        'spinning' : props.spinning
    });
    return (
        <div className="buttons-cont">
            <div className="button-word-cont darkblue" onClick={() => {props.validateAndSubmit()}} tabIndex="4">
                <div className={spinnerContClasses}>
                    <div className="text">PLACE ORDER</div>
                    <div className="spinner-outer">
                        <div className="spinner-inner">
                            <div className="rect rect0"></div><div className="rect rect1"></div><div className="rect rect2"></div><div className="rect rect3"></div><div className="rect rect4"></div>
                        </div>
                    </div>
                </div>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="button-word-cont grey" onClick={() => {props.setAccountSubpage('Landing') }} tabIndex="5">
                CANCEL
            </div>
        </div>
    );
}