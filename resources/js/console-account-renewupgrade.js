import React from 'react';
import classNames from 'classNames/dedupe';
// import moment from 'moment';
// import axios from 'axios';
// import { requestObjCreate } from './utils.js';

export class RenewUpgrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinning: false
        };
    }
    validateAndSubmit() {

    }
    render() {
        const spinnerContClasses = classNames({
            'spinner-cont' : true,
            'spinning' : this.state.spinning
        });
        return (
            <div className="content-inner renewupgrade-cont">
                <div className="title-main">
                    <span><i className="sld icon-lock"></i>&nbsp;RENEW</span>
                </div>
                <div className="subtitle-main">
                    <span>Hahahahaha</span>
                </div>
                <br/><br/>
                <div className="buttons-cont">
                    <div className="buttons-outer">
                        <div className="button-word-cont darkblue" onClick={() => {this.validateAndSubmit()}} tabIndex="4">
                            <div className={spinnerContClasses}>
                                <div className="text">PLACE ORDER</div>
                                <div className="spinner-outer">
                                    <div className="spinner-inner">
                                        <div className="rect rect0"></div><div className="rect rect1"></div><div className="rect rect2"></div><div className="rect rect3"></div><div className="rect rect4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="button-word-cont grey" onClick={() => {this.props.setAccountSubpage('Landing') }} tabIndex="5">
                            CANCEL
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}