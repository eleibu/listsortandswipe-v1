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
        let totalDomainsText = accountData.domainCountBase;
        if (accountData.domainCountAdditional > 0) {
            totalDomainsText = ' (+' + accountData.domainCountAdditional + ' purchased)';
        }
        const styleChartOuter = {
            height: '200px'
        };
        const styleTotalCont = {
            height: '200px'
        };
        const styleUsedCont = {
            height: '100px'
        };

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
                                        <div className="label">
                                            20 total
                                        </div>
                                    </div>
                                </div>
                                <div style={styleUsedCont} className="bar-cont used">
                                    <div className="bar-outer">
                                        <div className="label">
                                            10 used
                                        </div>
                                    </div>
                                </div>
                            </div>
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