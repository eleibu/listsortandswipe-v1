require('bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { monitorWinWidth } from './monitor-win-width.js';
import classNames from 'classNames/dedupe';
import { CSSTransition } from 'react-transition-group';
import { Domains } from './console-domains.js';
import { Account } from './console-account.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            domainsLoaded: true,
            tabIndex: 0
        };
        this.tabClick = this.tabClick.bind(this);
    }
    tabClick(tabIndex) {
        if (this.state.domainsLoaded) {
            this.setState({
               tabIndex: tabIndex
            });            
        }
    }
    render() {
        const tab0Classes = classNames({
            'tab-cont' : true,
            'selected' : this.state.tabIndex == 0,
            'unselected' : this.state.tabIndex != 0,
            'loaded' : this.state.domainsLoaded
        });
        const icon0Classes = classNames({
            'icon-archive' : true,
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
                                <Domains />
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
            </React.Fragment>
        );
    }
}

ReactDOM.render(
	<App />,
	document.getElementById('div-target')
);