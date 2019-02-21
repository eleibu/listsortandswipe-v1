import React from 'react';
import classNames from 'classNames/dedupe';
import { CSSTransition } from 'react-transition-group';
import moment from 'moment';

export class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMask: null
        };
    }
    editDetailsClick() {
        this.setState({
            contentMask: <EditContacts />
        });
    }
    contentMaskCloseClick() {
        this.setState({
            contentMask: null
        });        
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
            <React.Fragment>
                <div className="content-inner">
                    <div className="contact-cont">
                        <p className="name">{accountData.name} {accountData.surname}</p>
                        {(accountData.companyName) &&
                            <p className="coname">{accountData.companyName}</p>
                        }
                        <p className="email">{accountData.email}</p>
                        <div className="buttons-cont">
                            <div className="button-word-cont grey" onClick={() => {this.editDetailsClick() }}>
                                EDIT DETAILS
                            </div>&nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="button-word-cont grey">
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
                            <div className="button-word-cont darkblue">
                                UPGRADE
                            </div>&nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="button-word-cont grey">
                                BUY MORE DOMAINS
                            </div>
                        </div>
                    </div>
                </div>
                <CSSTransition in={(this.state.contentMask != null)} classNames="content-mask-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <div className="content-mask-cont">
                        <div className="content-mask-outer">
                            {this.state.contentMask}
                            <i className="sld icon-cross-ui" onClick={() => {this.contentMaskCloseClick()}}></i>
                        </div>
                    </div>
                </CSSTransition>
            </React.Fragment>
        );
    }
}

class EditContacts extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                EDIT DETAILS
            </div>
        );
    }
}

class ChangePwd extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                Change password
            </div>
        );
    }
}

class Upgrade extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                Upgrade
            </div>
        );
    }
}

class BuyMore extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                Buy more
            </div>
        );
    }
}