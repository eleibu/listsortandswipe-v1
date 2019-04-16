require('bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { monitorWinWidth } from './monitor-win-width.js';
import classNames from 'classNames/dedupe';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import { Domains } from './console-domains.js';
import { Account } from './console-account.js';
import { isBelowRenewThreshold, domainsMsgText, findIndexById, requestObjCreate, uuidv4, arrayMove } from './utils.js';
import { setMainMsgTimeout, clearMainMsgTimeout, MainMsg } from './console-mainmsg.js';
import update from 'immutability-helper';
import moment from 'moment';

axios.defaults.headers.common = {
    'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute("content"),
    'X-Requested-With': 'XMLHttpRequest'
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountData_name: null,
            accountData_surname: null,
            accountData_email: null,
            accountData_companyName: null,
            accountData_countryName: null,
            accountData_accountType: null,
            accountData_accountLicenceKey: null,
            accountData_accountExpiresAt: null,
            // accountData_hasDomains: null,
            accountData_domainCountBase: null,
            accountData_domainCountAdditional: null,
            tabIndex: 0,
            accountSubpage: 'Landing',
            // tabIndex: 1,
            // accountSubpage: 'Upgrade',
            domainsLoaded: false,
            domainsMsgShow : false,
            domainsMsgText : '',
            domains: [],
            mainMsgShow: false,
            mainMsgChildren: null,
            serverRequestObjs: []
        };
        this.setAccountSubpage = this.setAccountSubpage.bind(this);
        this.tabClick = this.tabClick.bind(this);
        this.setTab = this.setTab.bind(this);
        this.domainsMsgCloseClick = this.domainsMsgCloseClick.bind(this);
        this.addDomain = this.addDomain.bind(this);
        this.updateDomain = this.updateDomain.bind(this);
        this.deleteDomain = this.deleteDomain.bind(this);
        this.undeleteDomain = this.undeleteDomain.bind(this);
        this.showMainMsg = this.showMainMsg.bind(this);
        this.closeMainMsg = this.closeMainMsg.bind(this);
        this.sortEnd = this.sortEnd.bind(this);
        this.leftEnd = this.leftEnd.bind(this);
        this.addServerRequestObj = this.addServerRequestObj.bind(this);
        this.deleteServerRequestObj = this.deleteServerRequestObj.bind(this);
    }
    componentDidMount() {
        const requestObj = requestObjCreate(axios.CancelToken);
        this.addServerRequestObj(requestObj);

        let url = api_url_web + 'console-loadpage';
        axios({
            method: 'get',
            url: url,
            cancelToken: requestObj.source.token
        })
        .then((response)=>{
            this.setState({
                domainsLoaded: true,
                accountData_name: response.data.accountData.name,
                accountData_surname: response.data.accountData.surname,
                accountData_email: response.data.accountData.email,
                accountData_companyName: response.data.accountData.companyName,
                accountData_countryName: response.data.accountData.countryName,
                accountData_accountType: response.data.accountData.accountType,
                accountData_accountLicenceKey: response.data.accountData.accountLicenceKey,
                accountData_accountExpiresAt: response.data.accountData.accountExpiresAt,
                accountData_domainCountBase: response.data.accountData.domainCountBase,
                accountData_domainCountAdditional: response.data.accountData.domainCountAdditional,
                domainsMsgShow : isBelowRenewThreshold(response.data.accountData.accountExpiresAt, response.data.accountData.accountType),
                domainsMsgText : domainsMsgText(response.data.accountData.accountExpiresAt, response.data.accountData.accountType),
                domains: response.data.domains
            });
        })
        .catch((error)=>{
            this.setState({
               domainsLoaded: true
            });
            const children = <table><tbody><tr><td className="left">The server could not be reached. Please try again.</td><td className="right"><div className="button-word-cont mainmsg dummy">&nbsp;</div></td></tr></tbody></table>;
            this.showMainMsg(children);
        })
        .then(()=>{
            this.deleteServerRequestObj(requestObj);
        });
        // if (accountData.hasDomains) {
        //     const requestObj = requestObjCreate(axios.CancelToken);
        //     this.addServerRequestObj(requestObj);

        //     let url = api_url_public + 'domains';
        //     axios({
        //         method: 'get',
        //         url: url,
        //         cancelToken: requestObj.source.token
        //     })
        //     .then((response)=>{
        //         this.setState({
        //            domainsLoaded: true,
        //            domains: response.data.domains
        //         });
        //     })
        //     .catch((error)=>{
        //         this.setState({
        //            domainsLoaded: true
        //         });
        //         const children = <table><tbody><tr><td className="left">The server could not be reached. Please try again.</td><td className="right"><div className="button-word-cont mainmsg dummy">&nbsp;</div></td></tr></tbody></table>;
        //         this.showMainMsg(children);
        //     })
        //     .then(()=>{
        //         this.deleteServerRequestObj(requestObj);
        //     });
        // } else {
        //     this.setState({
        //        domainsLoaded: true
        //     });
        // }
    }
    setAccountSubpage(name) {
        this.setState({
            accountSubpage: name
        });
    }
    addServerRequestObj(requestObj) {
        this.setState({
           serverRequestObjs: update(this.state.serverRequestObjs, {$push: [requestObj]})
        });
    }
    deleteServerRequestObj(requestObj) {
        const index = findIndexById(this.state.serverRequestObjs, requestObj.id);
        if (index != null) {
            this.setState({
               serverRequestObjs: update(this.state.serverRequestObjs, {$splice: [[index, 1]] })
            });
        }
    }
    tabClick(tabIndex) {
        if (this.state.domainsLoaded && this.state.serverRequestObjs.length == 0) {
            if (tabIndex == 1 && this.state.tabIndex != 1) {
                this.setAccountSubpage('Landing');
            }
            this.setTab(tabIndex);
        }
    }
    setTab(tabIndex) {
        this.setState({
           tabIndex: tabIndex
        });
    }
    domainsMsgCloseClick() {
        this.setState({
           domainsMsgShow: false
        });
    }
    addDomain(domain) {
        this.closeMainMsg();

        const newId = uuidv4();
        this.setState({
           domains: update(this.state.domains, {$unshift: [{
            id: newId,
            domain: domain,
            licence_key: null
           }]})
        });

        const requestObj = requestObjCreate(axios.CancelToken);
        this.addServerRequestObj(requestObj);

        let url = api_url_public + 'domains';
        axios({
            method: 'post',
            url: url,
            data: {
                'id' : newId,
                'domain' : domain
            },
            cancelToken: requestObj.source.token
        })
        .then((response)=>{
            const newDomains = [];
            for (var i = 0, len = this.state.domains.length; i < len; i++) {
                if (this.state.domains[i].id == response.data.domain.id) {
                    newDomains.push(response.data.domain);
                } else {
                    newDomains.push(this.state.domains[i]);
                }
            }
            this.setState({
               domains: newDomains
            });
        })
        .catch((error)=>{
            const index = findIndexById(this.state.domains, newId);
            if (index != null) {
                this.setState({
                   domains: update(this.state.domains, {$splice: [[index, 1]] })
                });
            }
            const children = <table><tbody><tr><td className="left">An error occurred. The domain was not added.</td><td className="right"><div className="button-word-cont mainmsg" onClick={() => {this.addDomain(domain);}}>RETRY</div></td></tr></tbody></table>;
            this.showMainMsg(children);
        })
        .then(()=>{
            this.deleteServerRequestObj(requestObj);
        });
    }
    updateDomain(id, domain) {
        const index = findIndexById(this.state.domains, id);
        let origDomain = null;
        if (index != null) {
            origDomain = this.state.domains[index].domain;
        }
        if (index != null && origDomain != null && origDomain != domain) {
            this.closeMainMsg();

            this.setState({
               domains: update(this.state.domains, {[index]: {$set: {
                id: this.state.domains[index].id,
                domain: domain,
                licence_key: this.state.domains[index].licence_key                
               }}})
            });

            const requestObj = requestObjCreate(axios.CancelToken);
            this.addServerRequestObj(requestObj);

            let url = api_url_public + 'domains/' + id;
            axios({
                method: 'put',
                url: url,
                data: {
                    'action' : 'update',
                    'domain' : domain
                },
                cancelToken: requestObj.source.token
            })
            .catch((error)=>{
                this.setState({
                   domains: update(this.state.domains, {[index]: {$set: {
                    id: this.state.domains[index].id,
                    domain: origDomain,
                    licence_key: this.state.domains[index].licence_key
                   }}})
                });

                const children = <table><tbody><tr><td className="left">An error occurred. The domain was not updated. Please try again.</td><td className="right"><div className="button-word-cont mainmsg dummy">&nbsp;</div></td></tr></tbody></table>;
                this.showMainMsg(children);
            })
            .then(()=>{
                this.deleteServerRequestObj(requestObj);
            });
        }
    }
    sortEnd(instance, oldIndex, newIndex) {
        if (oldIndex != newIndex) {
            this.closeMainMsg();
            const id = this.state.domains[oldIndex].id;

            this.setState({
               domains: arrayMove(this.state.domains, oldIndex, newIndex)
            });

            const requestObj = requestObjCreate(axios.CancelToken);
            this.addServerRequestObj(requestObj);

            let url = api_url_public + 'domains/' + id;
            axios({
                method: 'put',
                url: url,
                data: {
                    'action' : 'sort',
                    'new-index' : newIndex
                },
                cancelToken: requestObj.source.token
            })
            .catch((error)=>{
                this.setState({
                   domains: arrayMove(this.state.domains, newIndex, oldIndex)
                });
                let children = <table><tbody><tr><td className="left">An error occurred. The domain was not sorted. Please try again.</td><td className="right"><div className="button-word-cont mainmsg dummy">&nbsp;</div></td></tr></tbody></table>;
                if ((error.response) && (error.response.status) && (error.response.status == 409)) {
                    const errorId = error.response.data.id;
                    if ((errorId) && ((errorId == '46BC692F-02D1-4E52-9A02-DA7DE69937A8') || (errorId == '5B0294D8-B4B4-46EB-8DC2-3F3B190B4CA5'))) {
                        children = <table><tbody><tr><td className="left">The domain could not be sorted because the page is out of date.</td><td className="right"><div className="button-word-cont mainmsg" onClick={() => { window.location.reload(true); }}>REFRESH</div></td></tr></tbody></table>;
                    }
                }
                this.showMainMsg(children);
            })
            .then(()=>{
                this.deleteServerRequestObj(requestObj);
            });
        }
    }
    leftEnd(instance, index, didSlideOut) {
        if (didSlideOut) {
            this.deleteDomain(instance, index);
        }
    }
    deleteDomain(instance, index) {
        this.closeMainMsg();

        let domain = this.state.domains[index].domain;
        if (domain.length > 30) {
            domain = domain.substr(0, 27) + '...';
        }
        const copyDomain = {
            id: this.state.domains[index].id,
            domain: this.state.domains[index].domain,
            licence_key: this.state.domains[index].licence_key
        };

        const listItems = instance.listCont.getElementsByClassName(instance.listItemClass);
        listItems[index].className = listItems[index].className + ' deleting';

        const newDomains = this.state.domains.slice(0);
        newDomains.splice(index, 1);
        this.setState({
           domains: newDomains
        });

        const requestObj = requestObjCreate(axios.CancelToken);
        this.addServerRequestObj(requestObj);

        const children = <table><tbody><tr><td className="left">Deleting domain...</td><td className="right"><div className="button-word-cont mainmsg dummy">&nbsp;</div></td></tr></tbody></table>;
        this.showMainMsg(children, 86400000);

        let url = api_url_public + 'domains/' + copyDomain.id;
        axios({
            method: 'put',
            url: url,
            data: {
                'action' : 'delete'
            },
            cancelToken: requestObj.source.token
        })
        .then((response)=>{
            const children = <table><tbody><tr><td className="left">The domain &#39;{domain}&#39; was deleted.</td><td className="right"><div className="button-word-cont mainmsg" onClick={() => this.undeleteDomain(copyDomain, index)}>UNDO</div></td></tr></tbody></table>;
            this.showMainMsg(children, 12000);
        })
        .catch((error)=>{
            this.setState({
               domains: update(this.state.domains, {$splice: [[index, 0, copyDomain]] })
            });
            const children = <table><tbody><tr><td className="left">An error occurred. The domain was not deleted. Please try again.</td><td className="right"><div className="button-word-cont mainmsg" onClick={() => this.deleteDomain(instance, index)}>RETRY</div></td></tr></tbody></table>;
            this.showMainMsg(children);
        })
        .then(()=>{
            this.deleteServerRequestObj(requestObj);
        });
    }
    undeleteDomain(domain, index) {
        const children = <table><tbody><tr><td className="left">Restoring domain...</td><td className="right"><div className="button-word-cont mainmsg dummy">&nbsp;</div></td></tr></tbody></table>;
        this.showMainMsg(children, 86400000);

        const requestObj = requestObjCreate(axios.CancelToken);
        this.addServerRequestObj(requestObj);

        let url = api_url_public + 'domains/' + domain.id;
        axios({
            method: 'put',
            url: url,
            data: {
                'action' : 'undelete',
                'index' : index
            },
            cancelToken: requestObj.source.token
        })
        .then((response)=>{
            this.closeMainMsg();
            this.setState({
               domains: update(this.state.domains, {$splice: [[index, 0, domain]] })
            });
        })
        .catch((error)=>{
            const children = <table><tbody><tr><td className="left">An error occurred. The domain could not be restored.</td><td className="right"><div className="button-word-cont mainmsg" onClick={() => this.undeleteDomain(domain, index)}>RETRY</div></td></tr></tbody></table>;
            this.showMainMsg(children);
        })
        .then(()=>{
            this.deleteServerRequestObj(requestObj);
        });
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
            'active' : (this.state.domainsLoaded && this.state.serverRequestObjs.length == 0)
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
            'active' : (this.state.domainsLoaded && this.state.serverRequestObjs.length == 0)
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
                                <Domains
                                    accountData_accountType={this.state.accountData_accountType}
                                    accountData_accountLicenceKey={this.state.accountData_accountLicenceKey}
                                    accountData_domainCountBase={this.state.accountData_domainCountBase}
                                    accountData_domainCountAdditional={this.state.accountData_domainCountAdditional}
                                    domains={this.state.domains}
                                    setTab={this.setTab}
                                    setAccountSubpage={this.setAccountSubpage}
                                    domainsMsgShow={this.state.domainsMsgShow}
                                    domainsMsgText={this.state.domainsMsgText}
                                    domainsMsgCloseClick={this.domainsMsgCloseClick}
                                    addDomain={this.addDomain}
                                    updateDomain={this.updateDomain}
                                    sortEnd={this.sortEnd}
                                    leftEnd={this.leftEnd}
                                />
                            </CSSTransition>
                            <CSSTransition in={(this.state.tabIndex == 1)} classNames="account-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                                <Account
                                    accountData_name={this.state.accountData_name}
                                    accountData_surname={this.state.accountData_surname}
                                    accountData_email={this.state.accountData_email}
                                    accountData_companyName={this.state.accountData_companyName}
                                    accountData_countryName={this.state.accountData_countryName}
                                    accountData_accountType={this.state.accountData_accountType}
                                    accountData_accountLicenceKey={this.state.accountData_accountLicenceKey}
                                    accountData_accountExpiresAt={this.state.accountData_accountExpiresAt}
                                    accountData_domainCountBase={this.state.accountData_domainCountBase}
                                    accountData_domainCountAdditional={this.state.accountData_domainCountAdditional}
                                    accountSubpage={this.state.accountSubpage}
                                    setAccountSubpage={this.setAccountSubpage}
                                    domainsUsed={this.state.domains.length}
                                    showMainMsg={this.showMainMsg}
                                    closeMainMsg={this.closeMainMsg}
                                    addServerRequestObj={this.addServerRequestObj}
                                    deleteServerRequestObj={this.deleteServerRequestObj}
                                />
                            </CSSTransition>
                        </div>
                    ) : (
                        <DomainMasksCont />
                    )}
                </div>
                <MainMsg children={this.state.mainMsgChildren} visible={this.state.mainMsgShow} closeClick={this.closeMainMsg} />
                <UploadingIndicator requestCount={this.state.serverRequestObjs.length} />
            </React.Fragment>
        );
    }
}

export const DomainMasksCont = ({}) => {
    const addHeight = '7.2em';
    return (
        <div className="content-outer">
            <div className="shimmer">
                <div style={{position: 'relative'}}>
                    <div style={{position: 'absolute', left: '0', top: '0', width: '1.4em', height: addHeight, backgroundColor: '#FFFFFF'}}>
                    </div>
                    <div style={{position: 'relative', height: addHeight, margin: '0 1.4em 0 1.4em'}}>
                        <div style={{height: '2.4em', backgroundColor: '#FFFFFF'}}>
                        </div>
                        <div style={{height: '2.4em'}}>
                        </div>
                        <div style={{height: '2.4em', backgroundColor: '#FFFFFF'}}>
                        </div>
                    </div>
                    <div style={{position: 'absolute', right: '0', top: '0', width: '1.4em', height: addHeight, backgroundColor: '#FFFFFF'}}>
                    </div>
                </div>
                <DomainMask />
                <DomainMask />
                <DomainMask />
            </div>
        </div>
    );
}

export const DomainMask = ({}) => {
    const domainHeight = '4.8em';
    return (
        <div style={{position: 'relative'}}>
            <div style={{position: 'absolute', left: '0', top: '0', width: '4em', height: domainHeight, backgroundColor: '#FFFFFF'}}>
            </div>
            <div style={{position: 'relative', height: domainHeight, margin: '0 1.4em 0 4em'}}>
                <div style={{height: '1.4em', backgroundColor: '#FFFFFF'}}>
                </div>
                <div style={{height: '2em'}}>
                </div>
                <div style={{height: '1.4em', backgroundColor: '#FFFFFF'}}>
                </div>
            </div>
            <div style={{position: 'absolute', right: '0', top: '0', width: '1.4em', height: domainHeight, backgroundColor: '#FFFFFF'}}>
            </div>
        </div>
    );
}

const UploadingIndicator = (props) => {
    let show = false;
    if (props.requestCount > 0) {
        show = true;
    }
    return (
        ReactDOM.createPortal(
            <React.Fragment>
                &nbsp;
                <CSSTransition in={show} classNames="upindicator-trans" timeout={{ exit: 2000 }} unmountOnExit>
                    <div className="upindicator-outer">
                        <div className="upindicator-inner">
                            <i className="cloud oln icon-cloud" />
                            {(show) ? (
                                <div className="spinner-outer">
                                    <div className="spinner-inner">
                                        <div className="rect rect0"></div><div className="rect rect1"></div><div className="rect rect2"></div><div className="rect rect3"></div><div className="rect rect4"></div>
                                    </div>
                                </div>
                            ) : (
                                <i className="check sld icon-check-ui" />
                            )}
                        </div>
                    </div>
                </CSSTransition>
            </React.Fragment>,
            document.getElementById('div-upindicator-cont')
        )
    );
}

ReactDOM.render(
	<App />,
	document.getElementById('div-target')
);