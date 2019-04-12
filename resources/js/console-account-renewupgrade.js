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

function sharedConstructor(obj, context) {
    const state = {
        spinning: false,
        willChangeLicenceType: (accountData.accountType == 0),   // if free trial you must change the licence type, otherwise initial setting is to keep the same licence
        selectedLicenceType: ((accountData.accountType == 0) ? 2 : accountData.accountType),
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
    if (context == 'renew') {
        if (accountData.accountType == 0) {
            state.selectedLicenceType = 2;
        } else {
            state.selectedLicenceType = accountData.accountType;
        }
    } else {
        state.selectedLicenceType = accountData.accountType + 1;
    }
    obj.state = state;

    obj.setWillChangeLicenceType = obj.setWillChangeLicenceType.bind(obj);
    obj.setSelectedLicenceType = obj.setSelectedLicenceType.bind(obj);
    obj.setDiscountFocus = obj.setDiscountFocus.bind(obj);
    obj.setDiscountSubmsg = obj.setDiscountSubmsg.bind(obj);
    obj.setStateOnHostedFieldFocus = obj.setStateOnHostedFieldFocus.bind(obj);
    obj.setStateOnHostedFieldBlur = obj.setStateOnHostedFieldBlur.bind(obj);
    obj.setPaymentSubmsg = obj.setPaymentSubmsg.bind(obj);
    obj.checkDiscountCode = obj.checkDiscountCode.bind(obj);
    obj.validateAndSubmit = obj.validateAndSubmit.bind(obj);
}

function sharedComponentDidMount(obj) {
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
    //@@
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
    checkDiscountCode(code) {
        sharedCheckDiscountCode(this, code);
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
                    <CSSTransition in={(!this.state.willChangeLicenceType)} classNames="renewtype-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                        <div>
                            <div className="para">
                                {(diffMinutes > 0) ? (
                                    <React.Fragment>Renew current licence for an additional 1 year</React.Fragment>
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
                                {(accountData.accountType == 0) ? (
                                    <React.Fragment>Select your licence type:</React.Fragment>
                                ) : (
                                    <React.Fragment>Select new licence type:</React.Fragment>
                                )}
                            </div>
                            <div className="para">
                                <LicenceTypes context={'renew'} selectedLicenceType={this.state.selectedLicenceType} setSelectedLicenceType={this.setSelectedLicenceType} />
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
                <br/><br/>
                <Buttons spinning={this.state.spinning} validateAndSubmit={this.validateAndSubmit} setAccountSubpage={this.props.setAccountSubpage} />
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
    checkDiscountCode(code) {
        sharedCheckDiscountCode(this, code);
    }
    validateAndSubmit() {
    }
    render() {
        const diffMinutes = getDiffMinutes(accountData.accountExpiresAt);
        return (
            <div className="content-inner renewupgrade-cont">
                <div className="page-title default">
                    <i className="oln icon-uploading-ui"></i><strong>Upgrade</strong> <span>licence</span>
                </div>
                <br/><br/>
                <CurrentLicence diffMinutes={diffMinutes} />
                <br/><br/>
                <div className="section-cont">
                    <div className="title">
                        Upgrade details
                    </div>
                    <div className="para">
                        <div>
                            Select your licence type:
                        </div>
                        <div>
                            <LicenceTypes context={'upgrade'} selectedLicenceType={this.state.selectedLicenceType} setSelectedLicenceType={this.setSelectedLicenceType} />
                        </div>
                    </div>
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
                <br/><br/>
                <Buttons spinning={this.state.spinning} validateAndSubmit={this.validateAndSubmit} setAccountSubpage={this.props.setAccountSubpage} />
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
                if (type > accountData.accountType) {
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
                'active' : accountData.accountType < 1
            });
            basicDetailsContClasses = classNames({
                'details-cont' : true,
                'active' : accountData.accountType < 1,
                'selected' : this.props.selectedLicenceType == 1,
                'hover' : this.state.basicHover
            });
            professionalLabelsContClasses = classNames({
                'labels-cont' : true,
                'xsonly' : true,
                'active' : accountData.accountType < 2
            });
            professionalDetailsContClasses = classNames({
                'details-cont' : true,
                'active' : accountData.accountType < 2,
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
                            &nbsp;
                        </div>
                        <div className="button dummy">
                            <div className="button-word-cont grey active">&nbsp;</div>
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
                <div className={basicLabelsContClasses}>
                    <div className="lbltop">
                        &nbsp;
                    </div>
                    <div className="titlerow">
                        <div className="type dummy">
                            &nbsp;
                        </div>
                        <div className="price dummy">
                            &nbsp;
                        </div>
                        <div className="button dummy">
                            <div className="button-word-cont grey active">&nbsp;</div>
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
                            (accountData.accountType == 1) ? (
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
                            $36
                        </div>
                        <div className="button">
                            <div className="button-word-cont grey active" onClick={()=>{this.props.setSelectedLicenceType(1)}}>Select</div>
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
                <div className={professionalLabelsContClasses}>
                    <div className="lbltop">
                        &nbsp;
                    </div>
                    <div className="titlerow">
                        <div className="type dummy">
                            &nbsp;
                        </div>
                        <div className="price dummy">
                            &nbsp;
                        </div>
                        <div className="button dummy">
                            <div className="button-word-cont grey active">&nbsp;</div>
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
                            (accountData.accountType == 2) ? (
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
                            $108
                        </div>
                        <div className="button">
                            <div className="button-word-cont grey active" onClick={()=>{this.props.setSelectedLicenceType(2)}}>Select</div>
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
                <div className={enterpriseLabelsContClasses}>
                    <div className="lbltop">
                        &nbsp;
                    </div>
                    <div className="titlerow">
                        <div className="type dummy">
                            &nbsp;
                        </div>
                        <div className="price dummy">
                            &nbsp;
                        </div>
                        <div className="button dummy">
                            <div className="button-word-cont grey active">&nbsp;</div>
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
                            (accountData.accountType == 3) ? (
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
                            $648
                        </div>
                        <div className="button">
                            <div className="button-word-cont grey active" onClick={()=>{this.props.setSelectedLicenceType(3)}}>Select</div>
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
        <div className="section-cont">
            <div className="buttons">
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
        </div>
    );
}