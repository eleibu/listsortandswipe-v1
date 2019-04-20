import React from 'react';
import classNames from 'classNames/dedupe';
import { CSSTransition } from 'react-transition-group';
import { requestObjCreate, getLicenceTypeText, getDiffMinutes, expiresText, licenceTypeText } from './utils.js';
import moment from 'moment';
import axios from 'axios';

const client = require('braintree-web/client');
const hostedFields = require('braintree-web/hosted-fields');
let hostedFieldsInstance = null;
const idDivPaymentNumber = 'div-payment-number';
const idDivPaymentExpirationDate = 'div-payment-expirationDate';
const idDivPaymentCVV = 'div-payment-cvv';

function sharedConstructor(obj, context) {
    const state = {
        spinning: false,
        willChangeLicenceType: (obj.props.accountData_accountType == 0),   // if free trial you must change the licence type, otherwise initial setting is to keep the same licence
        selectedLicenceType: ((obj.props.accountData_accountType == 0) ? 2 : obj.props.accountData_accountType),
        upgradePriceMultiplier: 1,
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
        paymentSubmsg: null,
        placeOrderSubmsg: null
    };

    if (context == 'renew') {
        if (obj.props.accountData_accountType == 0) {
            state.selectedLicenceType = 2;
        } else {
            state.selectedLicenceType = obj.props.accountData_accountType;
        }
    } else {
        state.selectedLicenceType = obj.props.accountData_accountType + 1;
    }
    obj.state = state;

    obj.setWillChangeLicenceType = obj.setWillChangeLicenceType.bind(obj);
    obj.setSelectedLicenceType = obj.setSelectedLicenceType.bind(obj);
    obj.setDiscountFocus = obj.setDiscountFocus.bind(obj);
    obj.setDiscountSubmsg = obj.setDiscountSubmsg.bind(obj);
    obj.setStateOnHostedFieldFocus = obj.setStateOnHostedFieldFocus.bind(obj);
    obj.setStateOnHostedFieldBlur = obj.setStateOnHostedFieldBlur.bind(obj);
    obj.setPaymentSubmsg = obj.setPaymentSubmsg.bind(obj);
    obj.getProductName = obj.getProductName.bind(obj);
    if (context == 'renew') {
        obj.getRenewPrice = obj.getRenewPrice.bind(obj);
    } else {
        obj.getUpgradePrice = obj.getUpgradePrice.bind(obj);
    }
    obj.getDaysRemainingText = obj.getDaysRemainingText.bind(obj);
    obj.checkDiscountCode = obj.checkDiscountCode.bind(obj);
    obj.validateAndSubmit = obj.validateAndSubmit.bind(obj);
}

function sharedComponentDidMount(obj) {
    const secsInYear = 31536000;
    const secsRemaining = moment.utc(obj.props.accountData_accountExpiresAt).diff(moment.utc(), 'seconds');
    obj.setState({
        upgradePriceMultiplier: secsRemaining / secsInYear
    });

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
        hostedFieldsInstance.on('focus', (event)=>{obj.setStateOnHostedFieldFocus(event.emittedBy)});
        hostedFieldsInstance.on('blur', (event)=>{obj.setStateOnHostedFieldBlur()});
    })
    .catch((err)=>{
    });
}

function sharedSetStateOnHostedFieldFocus(obj, emittedBy) {
    if (emittedBy == 'number') {
        obj.setState({
            paymentNumberError: false,
            paymentNumberFocus: true,
            paymentSubmsg: null
        });
    } else {
        obj.setState({
            paymentNumberError: false,
            paymentNumberFocus: false,
            paymentSubmsg: null
        });
    }
    if (emittedBy == 'expirationDate') {
        obj.setState({
            paymentExpirationDateError: false,
            paymentExpirationDateFocus: true,
            paymentSubmsg: null
        });
    } else {
        obj.setState({
            paymentExpirationDateError: false,
            paymentExpirationDateFocus: false,
            paymentSubmsg: null
        });
    }
    if (emittedBy == 'cvv') {
        obj.setState({
            paymentCVVError: false,
            paymentCVVFocus: true,
            paymentSubmsg: null
        });
    } else {
        obj.setState({
            paymentCVVError: false,
            paymentCVVFocus: false,
            paymentSubmsg: null
        });
    }
}

function sharedSetStateOnHostedFieldBlur(obj) {
    obj.setState({
        paymentNumberError: false,
        paymentNumberFocus: false,
        paymentExpirationDateError: false,
        paymentExpirationDateFocus: false,
        paymentCVVError: false,
        paymentCVVFocus: false,
        paymentSubmsg: null
    });
}

function sharedSetWillChangeLicenceType(obj, change) {
    obj.setState({
        willChangeLicenceType: change
    });
}

function sharedSetSelectedLicenceType(obj, type) {
    if (obj.state.selectedLicenceType != type) {
        obj.setState({
            selectedLicenceType: type
        });
    }
}

function sharedSetDiscountFocus(obj, hasFocus) {
    obj.setState({
        discountFocus: hasFocus
    });
}

function sharedSetDiscountSubmsg(obj, msg) {
    obj.setState({
        discountSubmsg: msg
    });
}

function sharedSetPaymentSubmsg(obj, msg) {
    obj.setState({
        paymentSubmsg: msg
    });
}

function sharedGetProductName(obj, context) {
    if (context == 'renew') {
        return licenceDetails[obj.state.selectedLicenceType].name + ' - 12 month licence';
    } else {
        return licenceDetails[obj.state.selectedLicenceType].name + ' - ' + obj.getDaysRemainingText(obj);
    }
}

function sharedGetRenewPrice(obj, type) {
    return (licenceDetails[type].priceCents / 100).toFixed(2);
}

function sharedGetUpgradePrice(obj, type) {
    const priceDollars = (licenceDetails[type].priceCents * obj.state.upgradePriceMultiplier) / 100;
    const priceOneSF = Math.round(priceDollars * 10) / 10;
    let priceTwoSF = priceOneSF.toFixed(2);
    if (priceTwoSF == 0) {
        priceTwoSF = (0.1).toFixed(2);
    }
    return priceTwoSF;
}

function sharedGetDaysRemainingText(obj) {
    const days = moment.utc(obj.props.accountData_accountExpiresAt).diff(moment.utc(), 'days');
    if (days == 1) {
        return '1 day';
    }
    return days + ' days';
}

function sharedCheckDiscountCode(obj, code) {
    obj.setDiscountSubmsg(null);

    if (code.length > 0) {
        obj.props.setShowMask(true);
        obj.setState({
            isCheckingDiscountCode: true
        });

        const requestObj = requestObjCreate(axios.CancelToken);
        obj.props.addServerRequestObj(requestObj);

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
            obj.setDiscountSubmsg(msgDiscountInvalid);
        })
        .then(()=>{
            obj.props.setShowMask(false);
            obj.setState({
                isCheckingDiscountCode: false
            });
            obj.props.deleteServerRequestObj(requestObj);
        });
    }
}

function sharedValidateAndSubmit(obj, context) {
    if (hostedFieldsInstance != null) {
        obj.props.setShowMask(true);
        obj.setState({
            spinning: true,
            placeOrderSubmsg: 'Your order is processing. Please do not refresh or use the back button.'
        });
        hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
            if (tokenizeErr) {
                obj.props.setShowMask(false);
                obj.setState({
                    spinning: false,
                    placeOrderSubmsg: null
                });
                switch (tokenizeErr.code) {
                    case 'HOSTED_FIELDS_FIELDS_EMPTY':
                        obj.setState({
                            paymentNumberError: true,
                            paymentExpirationDateError: true,
                            paymentCVVError: true,
                            paymentSubmsg: 'Payment details can&#39;t be blank.'
                        });
                        break;
                    case 'HOSTED_FIELDS_FIELDS_INVALID':
                        if (tokenizeErr.details.invalidFieldKeys.includes('number')) {
                            obj.setState({
                                paymentNumberError: true
                            });
                        }
                        if (tokenizeErr.details.invalidFieldKeys.includes('expirationDate')) {
                            obj.setState({
                                paymentExpirationDateError: true
                            });
                        }
                        if (tokenizeErr.details.invalidFieldKeys.includes('cvv')) {
                            obj.setState({
                                paymentCVVError: true
                            });
                        }
                        obj.setState({
                            paymentSubmsg: 'The supplied credit card details are invalid.'
                        });
                        break;
                    case 'HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED':
                        obj.setState({
                            paymentCVVError: true,
                            paymentSubmsg: 'The credit card CVV is invalid.'
                        });
                        break;
                    case 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR':
                        obj.setState({
                            paymentSubmsg: 'Can&#39;t connect to payment server, please try again.'
                        });
                        break;
                    default:
                        obj.setState({
                            paymentSubmsg: 'A payment error occurred, please try again.'
                        });
                }
                return;
            }

            const requestObj = requestObjCreate(axios.CancelToken);
            obj.props.addServerRequestObj(requestObj);

            let amount;
            if (context == 'renew') {
                amount = obj.getRenewPrice(obj.state.selectedLicenceType);
            } else {
                amount = obj.getUpgradePrice(obj.state.selectedLicenceType);
            }

            const url = api_url_web + 'account-' + context;
            axios({
                method: 'post',
                url: url,
                data: {
                    'type' : obj.state.selectedLicenceType,
                    'productName' : obj.getProductName(),
                    'amount' : amount,
                    'nonce' : payload.nonce
                }
            })
            .then((response)=>{
                let accountLicenceKey = null;
                if (response.data.accountData.accountLicenceKey) {
                    accountLicenceKey = response.data.accountData.accountLicenceKey;
                }

                let msg = '';
                if (context == 'renew') {
                    obj.props.setAccountData(
                        response.data.accountData.accountType,
                        accountLicenceKey,
                        response.data.accountData.accountExpiresAt,
                        parseInt(response.data.accountData.domainCountBase),
                        obj.props.accountData_domainCountAdditional,
                        response.data.domains
                    );
                    msg = 'Your licence has been renewed. Thanks for supporting Lithium List.';
                } else {
                    obj.props.setAccountData(
                        response.data.accountData.accountType,
                        accountLicenceKey,
                        obj.props.accountData_accountExpiresAt,
                        parseInt(response.data.accountData.domainCountBase),
                        obj.props.accountData_domainCountAdditional,
                        null
                    );
                    msg = 'Your licence has been upgraded. Thanks for supporting Lithium List.';
                }

                obj.props.setAccountSubpage('Landing');
                const children = <table><tbody><tr><td className="left">{msg}</td><td className="right"><div className="button-word-cont mainmsg dummy">&nbsp;</div></td></tr></tbody></table>;
                obj.props.showMainMsg(children);
            })
            .catch((error)=>{
                obj.setState({
                    paymentSubmsg: 'An error occurred, please try again.'
                });
            })
            .then(()=>{
                obj.props.setShowMask(false);
                obj.setState({
                    spinning: false,
                    placeOrderSubmsg: null
                });
                obj.props.deleteServerRequestObj(requestObj);
            });
        });
    }
}

export class Renew extends React.Component {
    constructor(props) {
        super(props);
        sharedConstructor(this, 'renew');
    }
    componentDidMount() {
        sharedComponentDidMount(this);
    }
    setStateOnHostedFieldFocus(emittedBy) {
        sharedSetStateOnHostedFieldFocus(this, emittedBy);
    }
    setStateOnHostedFieldBlur() {
        sharedSetStateOnHostedFieldBlur(this);
    }
    setWillChangeLicenceType(change) {
        sharedSetWillChangeLicenceType(this, change);
    }
    setSelectedLicenceType(type) {
        sharedSetSelectedLicenceType(this, type);
    }
    setDiscountFocus(hasFocus) {
        sharedSetDiscountFocus(this, hasFocus);
    }
    setDiscountSubmsg(msg) {
        sharedSetDiscountSubmsg(this, msg);
    }
    setPaymentSubmsg(msg) {
        sharedSetPaymentSubmsg(this, msg);
    }
    getProductName() {
        return sharedGetProductName(this, 'renew');
    }
    getRenewPrice(type) {
        return sharedGetRenewPrice(this, type);
    }
    getDaysRemainingText() {
        return sharedGetDaysRemainingText(this);
    }
    checkDiscountCode(code) {
        sharedCheckDiscountCode(this, code);
    }
    validateAndSubmit(context) {
        sharedValidateAndSubmit(this, context);
    }
    render() {
        const diffMinutes = getDiffMinutes(this.props.accountData_accountExpiresAt);
        const deleteDomainsCount = (licenceDetails[this.state.selectedLicenceType].maxDomains + this.props.accountData_domainCountAdditional) - this.props.domainsUsed;
        const warnDeleteClasses = classNames({
            'warndelete' : true,
            'show' : deleteDomainsCount < 0
        });
        return (
            <div className="content-inner renewupgrade-cont">
                <div className="page-title default">
                    <i className="oln icon-reload-ui"></i><strong>Renew</strong> <span>licence</span>
                </div>
                <br/><br/>
                <CurrentLicence diffMinutes={diffMinutes} accountData_accountExpiresAt={this.props.accountData_accountExpiresAt} accountData_accountType={this.props.accountData_accountType} />
                <br/><br/>
                <div className="section-cont">
                    <div className="title">
                        Renewal
                    </div>
                    <CSSTransition in={(!this.state.willChangeLicenceType)} classNames="renewtype-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                        <div>
                            <div className="para">
                                {(diffMinutes > 0) ? (
                                    <React.Fragment>Renew current licence for 1 year</React.Fragment>
                                ) : (
                                    <React.Fragment>Renew expired licence from today for 1 year</React.Fragment>
                                )}
                            </div>
                            <div className="buttons">
                                <div className="button-word-cont grey active" onClick={() => {this.setWillChangeLicenceType(true)}}>
                                    <div className="spinner-cont">
                                        <div className="text">CHANGE LICENCE TYPE</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                    <CSSTransition in={(this.state.willChangeLicenceType)} classNames="renewtype-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                        <div>
                            <div className="para">
                                {(this.props.accountData_accountType == 0) ? (
                                    <React.Fragment>Select your licence type:</React.Fragment>
                                ) : (
                                    <React.Fragment>Select new licence type:</React.Fragment>
                                )}
                            </div>
                            <div className="para">
                                <div className={warnDeleteClasses}>
                                    <strong>WARNING:</strong> Selecting this licence will delete {Math.abs(deleteDomainsCount)} of your licence keys
                                </div>
                            </div>
                            <div className="para">
                                <LicenceTypes context={'renew'} accountData_accountType={this.props.accountData_accountType} selectedLicenceType={this.state.selectedLicenceType} setSelectedLicenceType={this.setSelectedLicenceType} getUpgradePrice={this.getUpgradePrice} getDaysRemainingText={this.getDaysRemainingText} />
                            </div>
                        </div>
                    </CSSTransition>
                </div>
                <br/><br/>
                <OrderSummary
                    context={'renew'}
                    accountData_accountExpiresAt={this.props.accountData_accountExpiresAt}
                    accountData_name={this.props.accountData_name}
                    accountData_surname={this.props.accountData_surname}
                    accountData_companyName={this.props.accountData_companyName}
                    accountData_countryName={this.props.accountData_countryName}
                    getProductName={this.getProductName}
                    selectedLicenceType={this.state.selectedLicenceType}
                    getRenewPrice={this.getRenewPrice}
                    getDaysRemainingText={this.getDaysRemainingText}
                />
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
                <br/><br/>
                <Buttons context={'renew'} spinning={this.state.spinning} validateAndSubmit={this.validateAndSubmit} setAccountSubpage={this.props.setAccountSubpage} placeOrderSubmsg={this.state.placeOrderSubmsg} />
            </div>
        );
    }
}

export class Upgrade extends React.Component {
    constructor(props) {
        super(props);
        sharedConstructor(this, 'upgrade');
    }
    componentDidMount() {
        sharedComponentDidMount(this);
    }
    setStateOnHostedFieldFocus(emittedBy) {
        sharedSetStateOnHostedFieldFocus(this, emittedBy);
    }
    setStateOnHostedFieldBlur() {
        sharedSetStateOnHostedFieldBlur(this);
    }
    setWillChangeLicenceType(change) {
        sharedSetWillChangeLicenceType(this, change);
    }
    setSelectedLicenceType(type) {
        sharedSetSelectedLicenceType(this, type);
    }
    setDiscountFocus(hasFocus) {
        sharedSetDiscountFocus(this, hasFocus);
    }
    setDiscountSubmsg(msg) {
        sharedSetDiscountSubmsg(this, msg);
    }
    setPaymentSubmsg(msg) {
        sharedSetPaymentSubmsg(this, msg);
    }
    getProductName() {
        return sharedGetProductName(this, 'upgrade');
    }
    getUpgradePrice(type) {
        return sharedGetUpgradePrice(this, type);
    }
    getDaysRemainingText() {
        return sharedGetDaysRemainingText(this);
    }
    checkDiscountCode(code) {
        sharedCheckDiscountCode(this, code);
    }
    validateAndSubmit(context) {
        sharedValidateAndSubmit(this, context);
    }
    render() {
        const diffMinutes = getDiffMinutes(this.props.accountData_accountExpiresAt);
        return (
            <div className="content-inner renewupgrade-cont">
                <div className="page-title default">
                    <i className="oln icon-uploading-ui"></i><strong>Upgrade</strong> <span>licence</span>
                </div>
                <br/><br/>
                <CurrentLicence diffMinutes={diffMinutes} accountData_accountExpiresAt={this.props.accountData_accountExpiresAt} accountData_accountType={this.props.accountData_accountType} />
                <br/><br/>
                <div className="section-cont">
                    <div className="title">
                        Upgrade
                    </div>
                    <div className="para">
                        <div>
                            Select your new licence type:
                        </div>
                        <div>
                            <LicenceTypes context={'upgrade'} accountData_accountType={this.props.accountData_accountType} selectedLicenceType={this.state.selectedLicenceType} setSelectedLicenceType={this.setSelectedLicenceType} getUpgradePrice={this.getUpgradePrice} getDaysRemainingText={this.getDaysRemainingText} />
                        </div>
                    </div>
                </div>
                <br/><br/>
                <OrderSummary
                    context={'upgrade'}
                    accountData_accountExpiresAt={this.props.accountData_accountExpiresAt}
                    accountData_name={this.props.accountData_name}
                    accountData_surname={this.props.accountData_surname}
                    accountData_companyName={this.props.accountData_companyName}
                    accountData_countryName={this.props.accountData_countryName}
                    getProductName={this.getProductName}
                    selectedLicenceType={this.state.selectedLicenceType}
                    getUpgradePrice={this.getUpgradePrice}
                    getDaysRemainingText={this.getDaysRemainingText}
                />
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
                <br/><br/>
                <Buttons context={'upgrade'} spinning={this.state.spinning} validateAndSubmit={this.validateAndSubmit} setAccountSubpage={this.props.setAccountSubpage} placeOrderSubmsg={this.state.placeOrderSubmsg} />
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
                <strong>{label}:</strong> {expiresText(props.accountData_accountExpiresAt, props.accountData_accountType)}
            </div>
            <div className="para">
                <strong>Type:</strong> {getLicenceTypeText(props.accountData_accountType)}
            </div>
        </div>
    );
}

class LicenceTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basicHover: false,
            professionalHover: false,
            enterpriseHover: false
        };
        this.setSelectedLicenceType = this.setSelectedLicenceType.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }
    setSelectedLicenceType(type) {
        if (type != this.props.selectedLicenceType) {
            if (this.props.context == 'renew') {
                this.props.setSelectedLicenceType(type);
            } else {
                if (type > this.props.accountData_accountType) {
                    this.props.setSelectedLicenceType(type);
                }
            }
        }
    }
    mouseEnter(type) {
        if (type == 'basic') {
            this.setState({
                basicHover: true
            });
        } else if (type == 'professional') {
            this.setState({
                professionalHover: true
            });
        } else if (type == 'enterprise') {
            this.setState({
                enterpriseHover: true
            });
        }
    }
    mouseLeave(type) {
        if (type == 'basic') {
            this.setState({
                basicHover: false
            });
        } else if (type == 'professional') {
            this.setState({
                professionalHover: false
            });
        } else if (type == 'enterprise') {
            this.setState({
                enterpriseHover: false
            });
        }
    }
    render() {
        let basicLabelsContClasses;
        let basicDetailsContClasses;
        let professionalLabelsContClasses;
        let professionalDetailsContClasses;
        let enterpriseLabelsContClasses;
        let enterpriseDetailsContClasses;
        if (this.props.context == 'renew') {
            basicLabelsContClasses = classNames({
                'labels-cont' : true,
                'xsonly' : true,
                'active' : true
            });
            basicDetailsContClasses = classNames({
                'details-cont' : true,
                'active' : true,
                'selected' : this.props.selectedLicenceType == 1,
                'hover' : this.state.basicHover
            });
            professionalLabelsContClasses = classNames({
                'labels-cont' : true,
                'xsonly' : true,
                'active' : true
            });
            professionalDetailsContClasses = classNames({
                'details-cont' : true,
                'active' : true,
                'selected' : this.props.selectedLicenceType == 2,
                'hover' : this.state.professionalHover
            });
            enterpriseLabelsContClasses = classNames({
                'labels-cont' : true,
                'xsonly' : true,
                'active' : true
            });
            enterpriseDetailsContClasses = classNames({
                'details-cont' : true,
                'active' : true,
                'selected' : this.props.selectedLicenceType == 3,
                'hover' : this.state.enterpriseHover
            });
        } else {
            basicLabelsContClasses = classNames({
                'labels-cont' : true,
                'xsonly' : true,
                'active' : this.props.accountData_accountType < 1
            });
            basicDetailsContClasses = classNames({
                'details-cont' : true,
                'active' : this.props.accountData_accountType < 1,
                'selected' : this.props.selectedLicenceType == 1,
                'hover' : this.state.basicHover
            });
            professionalLabelsContClasses = classNames({
                'labels-cont' : true,
                'xsonly' : true,
                'active' : this.props.accountData_accountType < 2
            });
            professionalDetailsContClasses = classNames({
                'details-cont' : true,
                'active' : this.props.accountData_accountType < 2,
                'selected' : this.props.selectedLicenceType == 2,
                'hover' : this.state.professionalHover
            });
            enterpriseLabelsContClasses = classNames({
                'labels-cont' : true,
                'xsonly' : true,
                'active' : true
            });
            enterpriseDetailsContClasses = classNames({
                'details-cont' : true,
                'active' : true,
                'selected' : this.props.selectedLicenceType == 3,
                'hover' : this.state.enterpriseHover
            });
        }
        return (
            <div className="licence-cont">
                <div className="labels-cont notxs active">
                    <div className="lbltop">
                        &nbsp;
                    </div>
                    <div className="titlerow">
                        <div className="type dummy">
                            &nbsp;
                        </div>
                        <div className="price dummy">
                            {(this.props.context == 'renew') ? (
                                <div className="text">
                                    &nbsp;
                                </div>
                            ) : (
                                <React.Fragment>
                                    <div className="text">
                                        &nbsp;
                                    </div>
                                    <div className="subtext">
                                        &nbsp;
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                        <div className="button dummy">
                            <div className="button-word-cont grey active">&nbsp;</div>
                        </div>
                    </div>
                    <div className="row">
                        {(this.props.context == 'renew') ? (
                            <React.Fragment>
                                Licence period
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                Remaining period
                            </React.Fragment>
                        )}
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
                <div className={basicLabelsContClasses}>
                    <div className="lbltop">
                        &nbsp;
                    </div>
                    <div className="titlerow">
                        <div className="type dummy">
                            &nbsp;
                        </div>
                        <div className="price dummy">
                            {(this.props.context == 'renew') ? (
                                <div className="text">
                                    &nbsp;
                                </div>
                            ) : (
                                <React.Fragment>
                                    <div className="text">
                                        &nbsp;
                                    </div>
                                    <div className="subtext">
                                        &nbsp;
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                        <div className="button dummy">
                            <div className="button-word-cont grey active">&nbsp;</div>
                        </div>
                    </div>
                    <div className="row">
                        {(this.props.context == 'renew') ? (
                            <React.Fragment>
                                Licence period
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                Remaining period
                            </React.Fragment>
                        )}
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
                <div className={basicDetailsContClasses} onMouseEnter={()=>{this.mouseEnter('basic')}} onMouseLeave={()=>{this.mouseLeave('basic')}} onClick={()=>{this.setSelectedLicenceType(1)}}>
                    {(this.props.selectedLicenceType == 1) ? (
                        <div className="lbltop selected">
                            SELECTED
                        </div>
                    ) : (
                        (this.props.context == 'renew') ? (
                            <div className="lbltop">
                                &nbsp;
                            </div>
                        ) : (
                            (this.props.accountData_accountType == 1) ? (
                                <div className="lbltop current">
                                    CURRENT
                                </div>
                            ) : (
                                <div className="lbltop">
                                    &nbsp;
                                </div>
                            )
                        )
                    )}
                    <div className="titlerow">
                        <div className="type">
                            Basic
                        </div>
                        <div className="price">
                            {(this.props.context == 'renew') ? (
                                <div className="text">
                                    ${licenceDetails['1'].priceCents / 100}
                                </div>
                            ) : (
                                <React.Fragment>
                                    <div className="text">
                                        ${this.props.getUpgradePrice(1)}
                                    </div>
                                    <div className="subtext">
                                        ${licenceDetails['1'].priceCents / 100} / year
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                        <div className="button">
                            <div className="button-word-cont grey active" onClick={()=>{this.props.setSelectedLicenceType(1)}}>SELECT</div>
                        </div>
                    </div>
                    <div className="row">
                        {(this.props.context == 'renew') ? (
                            <React.Fragment>
                                1 year
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {this.props.getDaysRemainingText()}
                            </React.Fragment>
                        )}
                    </div>
                    <div className="row">
                        <i className="sld icon-check-ui"></i>
                    </div>
                    <div className="row">
                        {licenceDetails['1'].maxDomains}
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
                <div className={professionalLabelsContClasses}>
                    <div className="lbltop">
                        &nbsp;
                    </div>
                    <div className="titlerow">
                        <div className="type dummy">
                            &nbsp;
                        </div>
                        <div className="price dummy">
                            {(this.props.context == 'renew') ? (
                                <div className="text">
                                    &nbsp;
                                </div>
                            ) : (
                                <React.Fragment>
                                    <div className="text">
                                        &nbsp;
                                    </div>
                                    <div className="subtext">
                                        &nbsp;
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                        <div className="button dummy">
                            <div className="button-word-cont grey active">&nbsp;</div>
                        </div>
                    </div>
                    <div className="row">
                        {(this.props.context == 'renew') ? (
                            <React.Fragment>
                                Licence period
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                Remaining period
                            </React.Fragment>
                        )}
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
                <div className={professionalDetailsContClasses} onMouseEnter={()=>{this.mouseEnter('professional')}} onMouseLeave={()=>{this.mouseLeave('professional')}} onClick={()=>{this.setSelectedLicenceType(2)}}>
                    {(this.props.selectedLicenceType == 2) ? (
                        <div className="lbltop selected">
                            SELECTED
                        </div>
                    ) : (
                        (this.props.context == 'renew') ? (
                            <div className="lbltop recommended">
                                RECOMMENDED<img src={images_url + 'recommended-arrow.png'} alt="" width="40" height="8"/>
                            </div>
                        ) : (
                            (this.props.accountData_accountType == 2) ? (
                                <div className="lbltop current">
                                    CURRENT
                                </div>
                            ) : (
                                <div className="lbltop">
                                    &nbsp;
                                </div>
                            )
                        )
                    )}
                    <div className="titlerow">
                        <div className="type">
                            Professional
                        </div>
                        <div className="price">
                            {(this.props.context == 'renew') ? (
                                <div className="text">
                                    ${licenceDetails['2'].priceCents / 100}
                                </div>
                            ) : (
                                <React.Fragment>
                                    <div className="text">
                                        ${this.props.getUpgradePrice(2)}
                                    </div>
                                    <div className="subtext">
                                        ${licenceDetails['2'].priceCents / 100} / year
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                        <div className="button">
                            <div className="button-word-cont grey active" onClick={()=>{this.props.setSelectedLicenceType(2)}}>SELECT</div>
                        </div>
                    </div>
                    <div className="row">
                        {(this.props.context == 'renew') ? (
                            <React.Fragment>
                                1 year
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {this.props.getDaysRemainingText()}
                            </React.Fragment>
                        )}
                    </div>
                    <div className="row">
                        <i className="sld icon-check-ui"></i>
                    </div>
                    <div className="row">
                        {licenceDetails['2'].maxDomains}
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
                <div className={enterpriseLabelsContClasses}>
                    <div className="lbltop">
                        &nbsp;
                    </div>
                    <div className="titlerow">
                        <div className="type dummy">
                            &nbsp;
                        </div>
                        <div className="price dummy">
                            {(this.props.context == 'renew') ? (
                                <div className="text">
                                    &nbsp;
                                </div>
                            ) : (
                                <React.Fragment>
                                    <div className="text">
                                        &nbsp;
                                    </div>
                                    <div className="subtext">
                                        &nbsp;
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                        <div className="button dummy">
                            <div className="button-word-cont grey active">&nbsp;</div>
                        </div>
                    </div>
                    <div className="row">
                        {(this.props.context == 'renew') ? (
                            <React.Fragment>
                                Licence period
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                Remaining period
                            </React.Fragment>
                        )}
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
                <div className={enterpriseDetailsContClasses} onMouseEnter={()=>{this.mouseEnter('enterprise')}} onMouseLeave={()=>{this.mouseLeave('enterprise')}} onClick={()=>{this.setSelectedLicenceType(3)}}>
                    {(this.props.selectedLicenceType == 3) ? (
                        <div className="lbltop selected">
                            SELECTED
                        </div>
                    ) : (
                        (this.props.context == 'renew') ? (
                            <div className="lbltop">
                                &nbsp;
                            </div>
                        ) : (
                            (this.props.accountData_accountType == 3) ? (
                                <div className="lbltop current">
                                    CURRENT
                                </div>
                            ) : (
                                <div className="lbltop">
                                    &nbsp;
                                </div>
                            )
                        )
                    )}
                    <div className="titlerow">
                        <div className="type">
                            Enterprise
                        </div>
                        <div className="price">
                            {(this.props.context == 'renew') ? (
                                <div className="text">
                                    ${licenceDetails['3'].priceCents / 100}
                                </div>
                            ) : (
                                <React.Fragment>
                                    <div className="text">
                                        ${this.props.getUpgradePrice(3)}
                                    </div>
                                    <div className="subtext">
                                        ${licenceDetails['3'].priceCents / 100} / year
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                        <div className="button">
                            <div className="button-word-cont grey active" onClick={()=>{this.props.setSelectedLicenceType(3)}}>SELECT</div>
                        </div>
                    </div>
                    <div className="row">
                        {(this.props.context == 'renew') ? (
                            <React.Fragment>
                                1 year
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {this.props.getDaysRemainingText()}
                            </React.Fragment>
                        )}
                    </div>
                    <div className="row">
                        <i className="sld icon-check-ui"></i>
                    </div>
                    <div className="row">
                        {licenceDetails['3'].maxDomains}
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
    let price;
    if (props.context == 'renew') {
        price = '$' + props.getRenewPrice(props.selectedLicenceType);
    } else {
        price = '$' + props.getUpgradePrice(props.selectedLicenceType);
    }
    const subtotal = price;
    const taxes = '$0.00';
    const total = price;

    let expires = moment(props.accountData_accountExpiresAt).add(1, 'years').format('LL');
    if (getDiffMinutes(props.accountData_accountExpiresAt) <= 0) {
        expires = moment().add(1, 'years').format('LL');
    }
    return (
        <div className="section-cont">
            <div className="title">
                Order summary
            </div>
            <div className="">
                <div className="para address">
                    <p>{props.accountData_name} {props.accountData_surname}</p>
                    {props.accountData_companyName != null &&
                        <p>{props.accountData_companyName}</p>
                    }
                    <p>{props.accountData_countryName}</p>
                </div>
                <div className="para orderdetails">
                    <table cellPadding="0" cellSpacing="0">
                        <tbody>
                            <tr>
                                <td colSpan="2">&nbsp;</td>
                                <td className="col-right">USD</td>
                            </tr>
                            <tr>
                                <td colSpan="2">{props.getProductName()}<br/>Expires: {expires}</td>
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
                <div className={submsgContClasses} dangerouslySetInnerHTML={{__html: this.props.discountSubmsg}} />
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
                <div className={submsgContClasses} dangerouslySetInnerHTML={{__html: this.props.paymentSubmsg}} />
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
        <div className="section-cont">
            <div className="buttons">
                <div className="button-word-cont darkblue" onClick={() => {props.validateAndSubmit(props.context)}} tabIndex="4">
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
            {(props.placeOrderSubmsg != null && props.placeOrderSubmsg.length > 0) ? (
                <div class="submsg-cont">
                    {props.placeOrderSubmsg}
                </div>
            ) : (
                <div class="submsg-cont">
                    &nbsp;
                </div>
            )}
        </div>
    );
}