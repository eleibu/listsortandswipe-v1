import React from 'react';
import classNames from 'classNames/dedupe';
import { CSSTransition } from 'react-transition-group';
import { getLicenceTypeText, getDiffMinutes, expiresText, licenceTypeText } from './utils.js';
import moment from 'moment';
import axios from 'axios';
import { requestObjCreate } from './utils.js';

export class Renew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinning: false,
            changeLicenceType: (accountData.accountType == 0),   // if free trial you must change the licence type, otherwise initial setting is to keep the same licence
            selectedLicenceType: 2,
            inputDiscountError: false,
            inputDiscountFocus: false,
            isCheckingDiscountCode: false,
            discountSubmsg: null
        };
        this.setChangeLicenceType = this.setChangeLicenceType.bind(this);
        this.setSelectedLicenceType = this.setSelectedLicenceType.bind(this);
        this.setInputDiscountFocus = this.setInputDiscountFocus.bind(this);
        this.setDiscountSubmsg = this.setDiscountSubmsg.bind(this);
        this.checkDiscountCode = this.checkDiscountCode.bind(this);
    }
    validateAndSubmit() {
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
    setInputDiscountFocus(hasFocus) {
        this.setState({
            inputDiscountFocus: hasFocus
        });
    }
    setDiscountSubmsg(msg) {
        this.setState({
            discountSubmsg: msg
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
    render() {
        const diffMinutes = getDiffMinutes(accountData.accountExpiresAt);
        const spinnerContClasses = classNames({
            'spinner-cont' : true,
            'spinning' : this.state.spinning
        });
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
                <Discount inputDiscountError={this.state.inputDiscountError} inputDiscountFocus={this.state.inputDiscountFocus} setInputDiscountFocus={this.setInputDiscountFocus} checkDiscountCode={this.checkDiscountCode} isCheckingDiscountCode={this.state.isCheckingDiscountCode} discountSubmsg={this.state.discountSubmsg} setDiscountSubmsg={this.setDiscountSubmsg} />
                <br/><br/>
                <Payment selectedLicenceType={this.state.selectedLicenceType} />
                <br/><br/>
                <div className="buttons-cont">
                    buttons
                </div>
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

const LicenceTypes = (props) => {
    return (
        <div>Licence types</div>
    );
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
                                <td colSpan="2">{licenceDetails[props.selectedLicenceType].name}</td>
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
            'error' : this.props.inputDiscountError,
            'focus' : this.props.inputDiscountFocus
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
                    <input ref={(input) => { this.input = input; }} name="discountcode" className={inputClasses} type="text" placeholder="Discount code" onFocus={() => {this.props.setDiscountSubmsg(null); this.props.setInputDiscountFocus(true); }} onBlur={() => {this.props.setDiscountSubmsg(null); this.props.setInputDiscountFocus(false); }} onKeyDown={(e) => this.onKeyDown(e)} />
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

const Payment = (props) => {
    return (
        <div className="section-cont">
            <div className="title">
                Payment
            </div>
        </div>
    );
}


