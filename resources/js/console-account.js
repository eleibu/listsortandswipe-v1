import React from 'react';
import classNames from 'classNames/dedupe';
import { CSSTransition } from 'react-transition-group';




export class Account extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <div className="content-inner">
                    <div className="contact-cont">
                        <div className="contact-outer">
                            <p>{accountData.name} {accountData.surname}</p>
                            {(accountData.companyName) &&
                                <p>{accountData.companyName}</p>
                            }
                            <p>{accountData.email}</p>
                        </div>
                    </div>
                </div>
                <div className="content-mask">
                    Mask
                </div>
            </React.Fragment>
        );
    }
}