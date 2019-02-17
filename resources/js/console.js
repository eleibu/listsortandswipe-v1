require('bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { monitorWinWidth } from './monitor-win-width.js';
import classNames from 'classNames/dedupe';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import { Domains } from './console-domains.js';
import { Account } from './console-account.js';
import { findIndexById, requestObjCreate, uuidv4 } from './utils.js';
import { setMainMsgTimeout, clearMainMsgTimeout, MainMsg } from './console-mainmsg.js';
import update from 'immutability-helper';

axios.defaults.headers.common = {
    'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute("content"),
    'X-Requested-With': 'XMLHttpRequest'
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            domainsLoaded: false,
            domainsMsgShow : false,
            domainsMsgText : 'You have 1 product expiring in 28 days',
            domains: [],
            mainMsgShow: false,
            mainMsgChildren: null,
            serverRequestObjs: []
        };
        this.tabClick = this.tabClick.bind(this);
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
        if (accountData.hasDomains) {
            const requestObj = requestObjCreate(axios.CancelToken);
            this.addServerRequestObj(requestObj);

            let url = api_url_public + 'domains';
            axios({
                method: 'get',
                url: url,
                cancelToken: requestObj.source.token
            })
            .then((response)=>{
                this.setState({
                   domainsLoaded: true,
                   domains: response.data.domains
                });
            })
            .catch((error)=>{
                this.setState({
                   domainsLoaded: true
                });
                const children = <table><tbody><tr><td className="left">The server could not be reached. Please try again.</td><td className="right"></td></tr></tbody></table>;
                this.showMainMsg(children);
            })
            .then(()=>{
                this.deleteServerRequestObj(requestObj);
            });
        } else {
            this.setState({
               domainsLoaded: true
            });
        }
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

                const children = <table><tbody><tr><td className="left">An error occurred. The domain was not updated. Please try again.</td><td className="right"></td></tr></tbody></table>;
                this.showMainMsg(children);
            })
            .then(()=>{
                this.deleteServerRequestObj(requestObj);
            });
        }
    }
    sortEnd(instance, oldIndex, newIndex) {
        if (oldIndex != newIndex) {
            const newDomains = this.state.domains.slice(0);
            if (newIndex >= newDomains.length) {
                let i = newIndex - newDomains.length;
                while (i-- + 1) {
                    newDomains.push(undefined);
                }
            }
            newDomains.splice(newIndex, 0, newDomains.splice(oldIndex, 1)[0]);
            this.setState({
               domains: newDomains
            });
        }
    }
    // deleteTask(index) {
    //     this.props.hideMainError();

    //     const task = this.props.tasks[index];
    //     this.props.deleteTask(this.props.currentContextId, index, task);

    //     const requestObj = requestObjCreate(axios.CancelToken);
    //     this.props.addServerRequestObj(requestObj);

    //     const url = API_URL_Public + 'tasks/' + task.id;
    //     axios({
    //         method: 'put',
    //         url: url,
    //         data: {
    //             'action': 'delete',
    //             'context-id': this.props.currentContextId
    //         },
    //         cancelToken: requestObj.source.token
    //     })
    //     .catch((error)=>{
    //         if (requestObjExists(this.props.serverRequestObjs, requestObj)) {
    //             let children = <table><tbody><tr><td className="left">Oops, your task could not be deleted.</td><td className="right"><div className="button-word-cont errormsg invisible">&nbsp;</div></td></tr></tbody></table>;
    //             if ((error.response) && (error.response.status) && (error.response.status == 409)) {
    //                 const errorId = error.response.data.id;
    //                 if ((errorId) && (errorId == '7CF9234F-36ED-4EA8-976C-E77BFAB27DF7')) {
    //                     children = <table><tbody><tr><td className="left">Oops, your task could not be deleted. Please try again.</td><td className="right"><div className="button-word-cont errormsg" onClick={() => this.deleteTask(index)}>RETRY</div></td></tr></tbody></table>;
    //                 }
    //             }
    //             this.props.showMainError(children);
    //         }
    //     })
    //     .then(()=>{
    //         this.props.deleteServerRequestObj(requestObj);
    //     });
    // }
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

        const children = <table><tbody><tr><td className="left">Deleting domain...</td><td className="right"><div className="button-word-cont mainmsg dummy">&nbsp;</div></td></tr></tbody></table>;
        this.showMainMsg(children, 86400000);

        const requestObj = requestObjCreate(axios.CancelToken);
        this.addServerRequestObj(requestObj);

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
            const children = <table><tbody><tr><td className="left">The domain &#39;{domain}&#39; was deleted.</td><td className="right"><div className="button-word-cont mainmsg" onClick={() => {this.undeleteDomain(copyDomain, index);}}>UNDO</div></td></tr></tbody></table>;
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
                                <Domains domains={this.state.domains} domainsMsgShow={this.state.domainsMsgShow} domainsMsgText={this.state.domainsMsgText} domainsMsgCloseClick={this.domainsMsgCloseClick} addDomain={this.addDomain} updateDomain={this.updateDomain} sortEnd={this.sortEnd} leftEnd={this.leftEnd} />
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