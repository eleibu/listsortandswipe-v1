import React from 'react';
import classNames from 'classNames/dedupe';
import { CSSTransition } from 'react-transition-group';
import { getLicenceTypeText, getDiffMinutes, expiresText, licenceTypeText } from './utils.js';
import moment from 'moment';
// import axios from 'axios';
// import { requestObjCreate } from './utils.js';

export class Renew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinning: false,
            changeLicenceType: false
        };
    }
    validateAndSubmit() {
    }
    render() {
        let currentExpired = 'current';
        if (getDiffMinutes(accountData.accountExpiresAt) <= 0) {
            currentExpired = 'expired';
        }

        const spinnerContClasses = classNames({
            'spinner-cont' : true,
            'spinning' : this.state.spinning
        });
        return (
            <div className="content-inner renewupgrade-cont">
                <div className="page-title default">
                    <i className="oln icon-lock"></i><strong>Renew</strong> <span>licence</span>
                </div>
                <CurrentLicence/>
                <div className="section-cont">
                    <div className="title">
                        Renewal details
                    </div>
                    <CSSTransition in={(!this.state.changeLicenceType)} classNames="renewtype-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                        <div className="para">
                            <div>
                                Renew your {currentExpired} licence from now until {moment().add(12, 'months').format('LL')}
                            </div>
                            <div>
                                Button
                            </div>
                        </div>
                    </CSSTransition>
                    <CSSTransition in={(this.state.changeLicenceType)} classNames="renewtype-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                        <div className="para">
                            <div>
                                Select the licence type for your renewal from now until {moment().add(12, 'months').format('LL')}
                            </div>
                            <div>
                                <LicenceTypes />
                            </div>
                        </div>
                        
                    </CSSTransition>
                </div>
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
                    <i className="oln icon-lock"></i><strong>Upgrade</strong> <span>licence</span>
                </div>
                <CurrentLicence/>
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
    if (getDiffMinutes(accountData.accountExpiresAt) <= 0) {
        title = 'Expired licence';
        label = 'Expired';
    }
    return (
        <div className="section-cont">
            <div className="title">
                {title}
            </div>
            <div className="para">
                <strong>Type:</strong> {getLicenceTypeText(accountData.accountType)}
            </div>
            <div className="para">
                <strong>{label}:</strong> {expiresText(accountData.accountExpiresAt, accountData.accountType)}
            </div>
        </div>
    );
}

const LicenceTypes = (props) => {
    return (
        <div>Licence types</div>
    );
}



