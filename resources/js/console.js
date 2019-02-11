require('bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { monitorWinWidth } from './monitor-win-width.js';
import classNames from 'classNames/dedupe';
import { CSSTransition } from 'react-transition-group';
import { Domains } from './console-domains.js';
import { Account } from './console-account.js';
import { uuidv4 } from './utils.js';
import { setMainMsgTimeout, clearMainMsgTimeout, MainMsg } from './console-mainmsg.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            domainsLoaded: true,
            domainsMsgShow : false,
            domainsMsgText : 'You have 1 product expiring in 28 days',
            domains: [
                {
                    id: '123456789',
                    domain: 'syndeal.com',
                    licencekey: '123456789'
                }
            ],
            maxDomains: 2,
            mainMsgShow: false,
            mainMsgChildren: null
        };
        this.tabClick = this.tabClick.bind(this);
        this.domainsMsgCloseClick = this.domainsMsgCloseClick.bind(this);
        this.addDomain = this.addDomain.bind(this);
        this.editDomain = this.editDomain.bind(this);
        this.showMainMsg = this.showMainMsg.bind(this);
        this.closeMainMsg = this.closeMainMsg.bind(this);
    }
    tabClick(tabIndex) {
        if (this.state.domainsLoaded) {
            this.setState({
               tabIndex: tabIndex
            });
        }
    }
    domainsMsgCloseClick() {
        this.setState({
           domainsMsgShow: false
        });
    }
    addDomain(domain) {
        var domainsCopy = this.state.domains.slice();
        domainsCopy.unshift({
            id: uuidv4(),
            domain: domain,
            licencekey: 'temp'            
        });
        this.setState({
           domains: domainsCopy
        });
    }
    editDomain(id, domain) {
        console.log(domain);
        const children = <table><tbody><tr><td className="left">The server could not be reached. Please try again.</td><td className="right"><div className="button-word-cont mainmsg" onClick={() => {this.props.hideMainError(); this.getData();}}>RETRY</div></td></tr></tbody></table>;
        this.showMainMsg(children, 12000);
    }
    showMainMsg(children, duration) {
        let delay = 8000;
        if (typeof duration !== 'undefined' && duration != null) {
            delay = duration;
        }
        setMainMsgTimeout(() => {this.setState({ mainMsgShow: false }); }, delay);
        this.setState({
           mainMsgChildren: children, 
           mainMsgShow: true
        });
    }
    closeMainMsg() {
        clearMainMsgTimeout();
        this.setState({
           mainMsgShow: false
        });
    }
    render() {
        const tab0Classes = classNames({
            'tab-cont' : true,
            'selected' : this.state.tabIndex == 0,
            'unselected' : this.state.tabIndex != 0,
            'loaded' : this.state.domainsLoaded
        });
        const icon0Classes = classNames({
            'icon-world-network' : true,
            'sld' : this.state.tabIndex == 0,
            'oln' : this.state.tabIndex != 0
        });
        const tab1Classes = classNames({
            'tab-cont' : true,
            'selected' : this.state.tabIndex == 1,
            'unselected' : this.state.tabIndex != 1,
            'loaded' : this.state.domainsLoaded
        });
        const icon1Classes = classNames({
            'icon-profile-picture' : true,
            'sld' : this.state.tabIndex == 1,
            'oln' : this.state.tabIndex != 1
        });
        return (
            <React.Fragment>
                <div className="tabs-cont">
                    <div className={tab0Classes} onClick={() => {this.tabClick(0)}}>
                        <i className={icon0Classes}></i>&nbsp;Domains
                    </div>
                    <div className={tab1Classes} onClick={() => {this.tabClick(1)}}>
                        <i className={icon1Classes}></i>&nbsp;Account
                    </div>
                </div>
                <div className="content-cont">
                    {(this.state.domainsLoaded) ? (
                        <div className="content-outer">
                            <CSSTransition in={(this.state.tabIndex == 0)} classNames="domains-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                                <Domains domains={this.state.domains} maxDomains={this.state.maxDomains} domainsMsgShow={this.state.domainsMsgShow} domainsMsgText={this.state.domainsMsgText} domainsMsgCloseClick={this.domainsMsgCloseClick} addDomain={this.addDomain} editDomain={this.editDomain} />
                            </CSSTransition>
                            <CSSTransition in={(this.state.tabIndex == 1)} classNames="account-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                                <Account />
                            </CSSTransition>
                        </div>
                    ) : (
                        <div className="content-outer">
                            Loading domains...
                        </div>
                    )}
                </div>
                <MainMsg children={this.state.mainMsgChildren} visible={this.state.mainMsgShow} closeClick={this.closeMainMsg} />
            </React.Fragment>
        );
    }
}

ReactDOM.render(
	<App />,
	document.getElementById('div-target')
);