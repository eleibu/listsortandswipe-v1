import React from 'react';
import classNames from 'classNames/dedupe';
import { CSSTransition } from 'react-transition-group';
import moment from 'moment';

export class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subpage: 'ChangePwdLanding'
        };
        this.setSubpage = this.setSubpage.bind(this);
    }
    setSubpage(name) {
        this.setState({
            subpage: name
        });
    }
    render() {
        return (
            <React.Fragment>
                <CSSTransition in={(this.state.subpage == 'AccountLanding')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <AccountLanding domainsUsed={this.props.domainsUsed} setSubpage={this.setSubpage} />
                </CSSTransition>
                <CSSTransition in={(this.state.subpage == 'EditDetailsLanding')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <EditDetailsLanding  setSubpage={this.setSubpage} />
                </CSSTransition>
                <CSSTransition in={(this.state.subpage == 'ChangePwdLanding')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <ChangePwdLanding  setSubpage={this.setSubpage} />
                </CSSTransition>
                <CSSTransition in={(this.state.subpage == 'ChangePwdSuccess')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <ChangePwdSuccess  setSubpage={this.setSubpage} />
                </CSSTransition>
                <CSSTransition in={(this.state.subpage == 'UpgradeLanding')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <UpgradeLanding  setSubpage={this.setSubpage} />
                </CSSTransition>
                <CSSTransition in={(this.state.subpage == 'BuyMoreLanding')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <BuyMoreLanding  setSubpage={this.setSubpage} />
                </CSSTransition>
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
            oldPwdError: null,
            newPwdError: null,
            confirmNewPwdError: null
        };
    }
    render() {
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
                <div className="text-cont">
                    <div className="textentry-cont">
                        <i className="oln icon-lock"></i>
                        <div className="textentry-outer">
                            <input name="oldpassword" className="textentry" type="password" placeholder="Old password" tabIndex="1" />
                        </div>
                    </div>
                    <div id="div-password-submsg" className="submsg-cont">
                        {(this.state.oldPwdError != null && this.state.oldPwdError.length > 0) ? (
                            <span dangerouslySetInnerHTML={{__html: this.state.oldPwdError}} />
                        ) : (
                            <span>&nbsp;</span>
                        )}
                    </div>
                </div>
                <div className="text-cont">
                    <div className="textentry-cont">
                        <i className="oln icon-lock"></i>
                        <div className="textentry-outer">
                            <input name="newpassword" className="textentry" type="password" placeholder="New password" tabIndex="2" />
                        </div>
                    </div>
                    <div id="div-password-submsg" className="submsg-cont">
                        {(this.state.newPwdError != null && this.state.newPwdError.length > 0) ? (
                            <span dangerouslySetInnerHTML={{__html: this.state.newPwdError}} />
                        ) : (
                            <span>&nbsp;</span>
                        )}
                    </div>
                </div>
                <div className="text-cont">
                    <div className="textentry-cont">
                        <i className="oln icon-lock"></i>
                        <div className="textentry-outer">
                            <input name="confirmnewpassword" className="textentry" type="password" placeholder="Confirm new password" tabIndex="3" />
                        </div>
                    </div>
                    <div id="div-password-submsg" className="submsg-cont">
                        {(this.state.confirmNewPwdError != null && this.state.confirmNewPwdError.length > 0) ? (
                            <span dangerouslySetInnerHTML={{__html: this.state.confirmNewPwdError}} />
                        ) : (
                            <span>&nbsp;</span>
                        )}
                    </div>
                </div>
                <div className="buttons-cont">
                    <div className="buttons-outer">
                        <div className="button-word-cont darkblue" onClick={() => {this.props.setSubpage('ChangePwdSuccess') }} tabIndex="4">
                            CHANGE PASSWORD
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

class ChangePwdSuccess extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="content-inner account-cont">
                <div className="bigmsg-cont">
                    <span>Success!</span>
                </div>
                <div className="smallmsg-cont">
                    <span>Your password has been changed.</span>
                </div>
                <div className="buttons-cont">
                    <div className="buttons-outer">
                        <div className="button-word-cont grey" onClick={() => {this.props.setSubpage('AccountLanding') }} tabIndex="5">
                            RETURN TO ACCOUNT PAGE
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