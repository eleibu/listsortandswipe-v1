import React from 'react';
import classNames from 'classNames/dedupe';
import { CSSTransition } from 'react-transition-group';

export class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditContacts: false,
            showChangePwd: false,
            showUpgrade: false,
            showBuyMore: false
        };
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
        const totalHeightPX = 200;
        const usedHeightPX = Math.round((this.props.domainsUsed / accountData.domainCountBase + accountData.domainCountAdditional) * totalHeightPX);
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
        } else if (usedHeightPX < 20) {
            styleLabelRight = {
                transform: 'translate(100%, -100%)'
            };
        } else {
            styleLabelRight = {
                transform: 'translateX(100%)'
            };
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
                            <div className="button-word-cont grey">
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
                            Expires {accountData.accountExpiresAt}
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
                        <div className="">
                            {accountData.domainCountBase + accountData.domainCountAdditional - this.props.domainsUsed}&nbsp;available
                        </div>
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
                <CSSTransition in={(this.state.showEditContacts || this.state.showChangePwd || this.state.showUpgrade || this.state.showBuyMore)} classNames="content-mask-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <div className="content-mask">
                        Mask
                    </div>
                </CSSTransition>
            </React.Fragment>
        );
    }
}