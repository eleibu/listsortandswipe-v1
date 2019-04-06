import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Landing } from './console-account-landing.js';
import { ChangePwd } from './console-account-changepwd.js';
import { Renew } from './console-account-renewupgrade.js';

export class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMask: false
        };
        this.setShowMask = this.setShowMask.bind(this);
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
                <CSSTransition in={(this.props.accountSubpage == 'Landing')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <Landing domainsUsed={this.props.domainsUsed} setAccountSubpage={this.props.setAccountSubpage} />
                </CSSTransition>
                <CSSTransition in={(this.props.accountSubpage == 'ChangePwd')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <ChangePwd setShowMask={this.setShowMask} setAccountSubpage={this.props.setAccountSubpage} showMainMsg={this.props.showMainMsg} closeMainMsg={this.props.closeMainMsg} addServerRequestObj={this.props.addServerRequestObj} deleteServerRequestObj={this.props.deleteServerRequestObj} />
                </CSSTransition>
                <CSSTransition in={(this.props.accountSubpage == 'Renew')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <Renew setShowMask={this.setShowMask} setAccountSubpage={this.props.setAccountSubpage} showMainMsg={this.props.showMainMsg} closeMainMsg={this.props.closeMainMsg} addServerRequestObj={this.props.addServerRequestObj} deleteServerRequestObj={this.props.deleteServerRequestObj} />
                </CSSTransition>
                <div style={maskStyle} className="account-mask">
                </div>
            </React.Fragment>
        );
    }
}