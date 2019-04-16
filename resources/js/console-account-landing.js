import React from 'react';
import classNames from 'classNames/dedupe';
import moment from 'moment';
import { getLicenceTypeText, getDiffMinutes, isBelowRenewThreshold, expiresText } from './utils.js';

export class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copying: false
        };
        this.copyClick = this.copyClick.bind(this);
        this.copyingEnd = this.copyingEnd.bind(this);
    }
    copyClick() {
        this.setState({
            copying: true
        });
        this.inputCopy.select();
        document.execCommand("copy");
        setTimeout(this.copyingEnd, 200);
    }
    copyingEnd() {
        this.setState({
            copying: false
        });
    }
    render() {
        let totalDomainsText = 'domains maximum';
        if (this.props.accountData_domainCountBase + this.props.accountData_domainCountAdditional == 1) {
            totalDomainsText = 'domain maximum';
        }
        const totalHeightPX = 160;
        const usedHeightPX = Math.round((this.props.domainsUsed / (this.props.accountData_domainCountBase + this.props.accountData_domainCountAdditional)) * totalHeightPX);
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
        const domainsAvailable = this.props.accountData_domainCountBase + this.props.accountData_domainCountAdditional - this.props.domainsUsed;
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
        const inputStyle = {
            fontSize: '20px',
            position: 'fixed',
            top: '-100000px',
            left: 0
        };
        const spanClasses = classNames({
            'key' : true,
            'default' : !this.state.copying,
            'copying' : this.state.copying
        });
        return (
            <div className="content-inner">
                <div className="contact-cont">
                    <p className="name">{this.props.accountData_name} {this.props.accountData_surname}</p>
                    {(this.props.accountData_companyName) &&
                        <p className="coname">{this.props.accountData_companyName}</p>
                    }
                    <p className="email">{this.props.accountData_email}</p>
                    <div className="buttons-cont">
                        <span className="textlink" onClick={() => {this.props.setAccountSubpage('ChangePwd') }}>CHANGE PASSWORD</span>
                    </div>
                </div>
                <div className="avail-cont">
                    <div className="plan">
                        <strong>{getLicenceTypeText(this.props.accountData_accountType)}</strong> <span className="plan">plan</span>
                        {(getDiffMinutes(this.props.accountData_accountExpiresAt) > 0 && this.props.accountData_accountType < 3) &&
                            <React.Fragment>
                                &nbsp;&nbsp;&nbsp;<span className="textlink" onClick={() => {this.props.setAccountSubpage('Upgrade') }}>UPGRADE</span>
                            </React.Fragment>
                        }
                    </div>
                    <div className="expires">
                        {(getDiffMinutes(this.props.accountData_accountExpiresAt) > 0) ? (
                            <React.Fragment>
                                Expires: {expiresText(this.props.accountData_accountExpiresAt, this.props.accountData_accountType)}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                Your licence has expired
                            </React.Fragment>
                        )}
                    </div>
                    {(isBelowRenewThreshold(this.props.accountData_accountExpiresAt, this.props.accountData_accountType)) &&
                        <div className="buttons-cont">
                            <div className="button-word-cont renew" onClick={() => {this.props.setAccountSubpage('Renew') }}>
                                RENEW
                            </div>
                        </div>    
                    }
                    {(getDiffMinutes(this.props.accountData_accountExpiresAt) > 0 && this.props.accountData_accountType == 3 && this.props.accountData_accountLicenceKey != null) &&
                        <div className="key-cont">
                            <input type="text" readOnly={true} ref={(input) => { this.inputCopy = input; }} style={inputStyle} value={this.props.accountData_accountLicenceKey} />
                            <span className="label">Licence key:</span>
                            <span className={spanClasses}>{this.props.accountData_accountLicenceKey}</span>
                            <span className="copy-cont">
                                <span className="copy-outer" title="Copy to clipboard" onClick={() => {this.copyClick()}}>
                                    <i className="oln icon-clipboard"></i>
                                </span>
                                &nbsp;
                            </span>
                        </div>
                    }
                    {(getDiffMinutes(this.props.accountData_accountExpiresAt) > 0) &&
                        <React.Fragment>
                            <div className="chart-cont">
                                <div style={styleChartOuter} className="chart-outer">
                                    <div style={styleTotalCont} className="bar-cont total">
                                        <div className="bar-outer">
                                            <div className="label left">
                                                <div className="count">{this.props.accountData_domainCountBase + this.props.accountData_domainCountAdditional}</div>
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
                        </React.Fragment>
                    }
                </div>
            </div>
        );
    }
}