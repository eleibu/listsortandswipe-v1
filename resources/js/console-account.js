import React from 'react';
import classNames from 'classNames/dedupe';
import { CSSTransition } from 'react-transition-group';
import moment from 'moment';
import axios from 'axios';
import { requestObjCreate } from './utils.js';

export class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subpage: 'AccountLanding',
            showMask: false
        };
        this.setSubpage = this.setSubpage.bind(this);
        this.setShowMask = this.setShowMask.bind(this);
    }
    setSubpage(name) {
        this.setState({
            subpage: name
        });
    }
    setShowMask(show) {
        this.setState({
            showMask: show
        });
    }
    render() {
        let maskStyle;
        if (this.state.showMask) {
            maskStyle = {display: 'block'};
        } else {
            maskStyle = {display: 'none'};
        }
        return (
            <React.Fragment>
                <CSSTransition in={(this.state.subpage == 'AccountLanding')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <AccountLanding domainsUsed={this.props.domainsUsed} setSubpage={this.setSubpage} />
                </CSSTransition>
                <CSSTransition in={(this.state.subpage == 'EditDetailsLanding')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <EditDetailsLanding setSubpage={this.setSubpage} />
                </CSSTransition>
                <CSSTransition in={(this.state.subpage == 'ChangePwdLanding')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <ChangePwdLanding setShowMask={this.setShowMask} setSubpage={this.setSubpage} showMainMsg={this.props.showMainMsg} closeMainMsg={this.props.closeMainMsg} addServerRequestObj={this.props.addServerRequestObj} deleteServerRequestObj={this.props.deleteServerRequestObj} />
                </CSSTransition>
                <CSSTransition in={(this.state.subpage == 'UpgradeLanding')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <UpgradeLanding setSubpage={this.setSubpage} />
                </CSSTransition>
                <CSSTransition in={(this.state.subpage == 'BuyMoreLanding')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <BuyMoreLanding setSubpage={this.setSubpage} />
                </CSSTransition>
                <div style={maskStyle} className="account-mask">
                </div>
            </React.Fragment>
        );
    }
}

class AccountLanding extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let accountTypeText;
        switch (accountData.accountType) {
            case 1:
                accountTypeText = "Basic";
            break;
            case 2:
                accountTypeText = "Professional";
            break;
            case 3:
                accountTypeText = "Enterprise";
            break;
            default:
                accountTypeText = "Free trial";
        }
        let totalDomainsText = 'domains maximum';
        if (accountData.domainCountBase + accountData.domainCountAdditional == 1) {
            totalDomainsText = 'domain maximum';
        }
        const totalHeightPX = 160;
        const usedHeightPX = Math.round((this.props.domainsUsed / (accountData.domainCountBase + accountData.domainCountAdditional)) * totalHeightPX);
        const styleChartOuter = {
            height: totalHeightPX + 'px'
        };
        const styleTotalCont = {
            height: totalHeightPX + 'px'
        };
        const styleUsedCont = {
            height: usedHeightPX + 'px'
        };
        let styleLabelRight;

        if (usedHeightPX == 0) {
            styleLabelRight = {
                transform: 'translate(100%, -120%)'
            };
        } else if (usedHeightPX < 24) {
            styleLabelRight = {
                transform: 'translate(100%, -100%)'
            };
        } else {
            styleLabelRight = {
                transform: 'translateX(100%)'
            };
        }
        const domainsAvailable = accountData.domainCountBase + accountData.domainCountAdditional - this.props.domainsUsed;
        let domainsAvailableText;
        switch (domainsAvailable) {
            case 0:
                domainsAvailableText = 'You have no domains available. Consider upgrading your account or buying more.';
            break;
            case 1:
                domainsAvailableText = 'You have <strong>1 domain</strong> still available.';
            break;
            default:
                domainsAvailableText = 'You have <strong>' + domainsAvailable + ' domains</strong> still available.';
        }
        return (
            <div className="content-inner">
                <div className="contact-cont">
                    <p className="name">{accountData.name} {accountData.surname}</p>
                    {(accountData.companyName) &&
                        <p className="coname">{accountData.companyName}</p>
                    }
                    <p className="email">{accountData.email}</p>
                    <div className="buttons-cont">
                        <div className="button-word-cont grey" onClick={() => {this.props.setSubpage('EditDetailsLanding') }}>
                            EDIT DETAILS
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="button-word-cont grey" onClick={() => {this.props.setSubpage('ChangePwdLanding') }}>
                            CHANGE PASSWORD
                        </div>
                    </div>
                </div>
                <div className="avail-cont">
                    <div className="plan">
                        <strong>{accountTypeText}</strong> <span>plan</span>
                    </div>
                    <div className="expires">
                        Expires {moment(accountData.accountExpiresAt).format('LL')}
                    </div>
                    <div className="chart-cont">
                        <div style={styleChartOuter} className="chart-outer">
                            <div style={styleTotalCont} className="bar-cont total">
                                <div className="bar-outer">
                                    <div className="label left">
                                        <div className="count">{accountData.domainCountBase + accountData.domainCountAdditional}</div>
                                        <div className="text">{totalDomainsText}</div>
                                    </div>
                                </div>
                            </div>
                            <div style={styleUsedCont} className="bar-cont used">
                                <div className="bar-outer">
                                    <div style={styleLabelRight} className="label right">
                                        {this.props.domainsUsed}&nbsp;used
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="avail-text" dangerouslySetInnerHTML={{__html: domainsAvailableText}} />
                    <div className="buttons-cont">
                        <div className="button-word-cont darkblue" onClick={() => {this.props.setSubpage('UpgradeLanding') }}>
                            UPGRADE
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="button-word-cont grey" onClick={() => {this.props.setSubpage('BuyMoreLanding') }}>
                            BUY MORE DOMAINS
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class EditDetailsLanding extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="content-inner account-cont">
                <div>
                    EDIT DETAILS
                </div>
                <i className="sld icon-cross-ui account-close" onClick={() => {this.props.setSubpage('AccountLanding') }}></i>
            </div>
        );
    }
}

class ChangePwdLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainError: null,
            currentPwdFocus: false,
            currentPwdError: false,
            currentPwdSubtext: '',
            newPwdFocus: false,
            newPwdError: false,
            newPwdSubtext: msgPasswordDefault,
            spinning: false
        };
    }
    currentPwdOnFocus() {
        this.setState({
            mainError: null,
            currentPwdFocus: true,
            currentPwdError: false,
            currentPwdSubtext: '',
        });
    }
    currentPwdOnBlur() {
        this.setState({
            mainError: null,
            currentPwdFocus: false,
            currentPwdError: false,
            currentPwdSubtext: '',
        });
    }
    currentPwdOnKeyPress(e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            e.preventDefault();
            this.inputNewPwd.focus();
            this.inputNewPwd.select();
        }
    }
    newPwdOnFocus() {
        this.setState({
            mainError: null,
            newPwdFocus: true,
            newPwdError: false,
            newPwdSubtext: msgPasswordDefault
        });
    }
    newPwdOnBlur() {
        this.setState({
            mainError: null,
            newPwdFocus: false,
            newPwdError: false,
            newPwdSubtext: msgPasswordDefault
        });
    }
    newPwdOnKeyPress(e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            e.preventDefault();
            this.validateAndSubmit();
        }
    }
    validateAndSubmit() {
        let currentPwdOk = false;
        if (this.inputCurrentPwd.value.length > 0) {
            currentPwdOk = true;
            this.setState({
                mainError: null,
                currentPwdError: false,
                currentPwdSubtext: ''
            });
        } else {
            this.setState({
                mainError: null,
                currentPwdError: true,
                currentPwdSubtext: msgPasswordNoBlank
            });
        }

        let newPwdOk = false;
        if (this.inputNewPwd.value.length > 0) {
            if (this.inputNewPwd.value.length >= 6) {
                newPwdOk = true;
                this.setState({
                    mainError: null,
                    newPwdError: false,
                    newPwdSubtext: msgPasswordDefault
                });
            } else {
                this.setState({
                    mainError: null,
                    newPwdError: true,
                    newPwdSubtext: msgPasswordInvalid
                });
            }
        } else {
            this.setState({
                mainError: null,
                newPwdError: true,
                newPwdSubtext: msgPasswordNoBlank
            });
        }
        if (currentPwdOk && newPwdOk) {
            this.props.setShowMask(true);
            this.setState({
                spinning: true
            });

            this.props.closeMainMsg();

            const requestObj = requestObjCreate(axios.CancelToken);
            this.props.addServerRequestObj(requestObj);

            let url = api_url_public + 'users/' + accountData.email;
            axios({
                method: 'put',
                url: url,
                data: {
                    'action' : 'change-password',
                    'currentpassword' : this.inputCurrentPwd.value,
                    'newpassword' : this.inputNewPwd.value
                },
                cancelToken: requestObj.source.token
            })
            .then((response)=>{
                this.props.setSubpage('AccountLanding');
                const children = <table><tbody><tr><td className="left">Your password was successfully changed.</td><td className="right"><div className="button-word-cont mainmsg dummy">&nbsp;</div></td></tr></tbody></table>;
                this.props.showMainMsg(children);
            })
            .catch((error)=>{
                let invalidPassword = false;
                if ((error.response) && (error.response.status) && (error.response.status == 403)) {
                    const errorId = error.response.data.id;
                    if ((errorId) && (errorId == '6D487B0F-8C3E-4CF2-8D0B-9223A53C5673')) {
                        invalidPassword = true;
                    }
                }
                if (invalidPassword) {
                    this.inputCurrentPwd.focus();
                    this.inputCurrentPwd.select();
                    this.setState({
                        mainError: 'The current password is not valid. Please try again.'
                    });
                } else {
                    const children = <table><tbody><tr><td className="left">An error occurred. Your password was not changed. Please try again.</td><td className="right"><div className="button-word-cont mainmsg dummy">&nbsp;</div></td></tr></tbody></table>;
                    this.props.showMainMsg(children);
                }
            })
            .then(()=>{
                this.props.setShowMask(false);
                this.setState({
                    spinning: false
                });
                this.props.deleteServerRequestObj(requestObj);
            });
        }
    }
    render() {
        const currentPwdClasses = classNames({
            'text-cont' : true,
            'error' : this.state.currentPwdError,
            'focus' : this.state.currentPwdFocus
        });
        const newPwdClasses = classNames({
            'text-cont' : true,
            'error' : this.state.newPwdError,
            'focus' : this.state.newPwdFocus
        });
        const spinnerContClasses = classNames({
            'spinner-cont' : true,
            'spinning' : this.state.spinning
        });
        return (
            <div className="content-inner account-cont">
                <div className="title-main">
                    <span><i className="sld icon-lock"></i>&nbsp;CHANGE PASSWORD</span>
                </div>
                <div className="subtitle-main">
                    <span>Enter the details below to change your password</span>
                </div>
                <div className="mainmsg-cont">
                    {(this.state.mainError != null && this.state.mainError.length > 0) ? (
                        <span dangerouslySetInnerHTML={{__html: this.state.mainError}} />
                    ) : (
                        <span>&nbsp;</span>
                    )}
                </div>
                <div className={currentPwdClasses}>
                    <div className="textentry-cont">
                        <i className="oln icon-lock"></i>
                        <div className="textentry-outer">
                            <input ref={(input) => { this.inputCurrentPwd = input; }} name="currentpassword" className="textentry" type="password" placeholder="Current password" tabIndex="1" onFocus={() => {this.currentPwdOnFocus()}} onBlur={() => {this.currentPwdOnBlur()}} onKeyPress={(e) => {this.currentPwdOnKeyPress(e)}} />
                        </div>
                    </div>
                    <div id="div-password-submsg" className="submsg-cont">
                        {(this.state.currentPwdSubtext != null && this.state.currentPwdSubtext.length > 0) ? (
                            <span dangerouslySetInnerHTML={{__html: this.state.currentPwdSubtext}} />
                        ) : (
                            <span>&nbsp;</span>
                        )}
                    </div>
                </div>
                <div className={newPwdClasses}>
                    <div className="textentry-cont">
                        <i className="oln icon-lock"></i>
                        <div className="textentry-outer">
                            <input ref={(input) => { this.inputNewPwd = input; }} name="newpassword" className="textentry" type="password" placeholder="New password" tabIndex="2" onFocus={() => {this.newPwdOnFocus()}} onBlur={() => {this.newPwdOnBlur()}} onKeyPress={(e) => {this.newPwdOnKeyPress(e)}} />
                        </div>
                    </div>
                    <div id="div-password-submsg" className="submsg-cont">
                        {(this.state.newPwdSubtext != null && this.state.newPwdSubtext.length > 0) ? (
                            <span dangerouslySetInnerHTML={{__html: this.state.newPwdSubtext}} />
                        ) : (
                            <span>&nbsp;</span>
                        )}
                    </div>
                </div>
                <br/><br/>
                <div className="buttons-cont">
                    <div className="buttons-outer">
                        <div className="button-word-cont darkblue" onClick={() => {this.validateAndSubmit()}} tabIndex="4">
                            <div className={spinnerContClasses}>
                                <div className="text">CHANGE PASSWORD</div>
                                <div className="spinner-outer">
                                    <div className="spinner-inner">
                                        <div className="rect rect0"></div><div className="rect rect1"></div><div className="rect rect2"></div><div className="rect rect3"></div><div className="rect rect4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="button-word-cont grey" onClick={() => {this.props.setSubpage('AccountLanding') }} tabIndex="5">
                            CANCEL
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class UpgradeLanding extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="content-inner account-cont">
                <div>
                    UPGRADE
                </div>
                <i className="sld icon-cross-ui account-close" onClick={() => {this.props.setSubpage('AccountLanding') }}></i>
            </div>
        );
    }
}

class BuyMoreLanding extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="content-inner account-cont">
                <div>
                    BUY MORE
                </div>
                <i className="sld icon-cross-ui account-close" onClick={() => {this.props.setSubpage('AccountLanding') }}></i>
            </div>
        );
    }
}