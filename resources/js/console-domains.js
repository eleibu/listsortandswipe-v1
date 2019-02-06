import React from 'react';
import classNames from 'classNames/dedupe';
import { CSSTransition } from 'react-transition-group';

export class Domains extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textboxFocus: false
        };
    }
    render() {
        const textboxClasses = classNames({
            'textentry-cont' : true,
            'focus' : this.state.textboxFocus,
        });
        return (
            <div className="content-inner">
                <div className="add-cont">
                    <CSSTransition in={(this.props.domainsMsgShow)} classNames="message-trans" timeout={{ enter: 0, exit: 200 }} unmountOnExit>
                        <div className="message-outer">
                            <div className="message-inner">
                                <i className="sld icon-cross-ui" onClick={() => {this.props.domainsMsgCloseClick()}}></i>
                                <span>{this.props.domainsMsgText}</span>
                            </div>
                        </div>
                    </CSSTransition>
                    <div className="add-item-outer">
                        <div className="text-cont">
                            <div className={textboxClasses}>
                                <div className="input-cont">
                                    <input placeholder="yourdomain.com" />
                                </div>
                            </div>
                        </div>
                        <div className="button-row">
                            <span>What do I enter here?</span>
                            <div className="button-word-cont clear">
                                ADD DOMAIN
                            </div>
                        </div>
                        <CSSTransition in={(this.props.maxDomains - this.props.domains.length == 0)} classNames="add-item-mask-trans" timeout={{ enter: 200, exit: 0 }} unmountOnExit>
                            <div className="add-item-mask-cont">
                                <div className="add-item-mask-outer">
                                    <div className="add-item-mask-inner">
                                        <div className="title">
                                            Need to use Lithium List in more websites?
                                        </div>
                                        <div className="subtitle">
                                            <div className="button-word-cont grey">Upgrade or buy more domains</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CSSTransition>
                    </div>
                </div>
                <div className="items-cont">
                    {this.props.domains.map((domain, index) => (
                        <CSSTransition key={domain.id} classNames="domain-trans" timeout={{ enter: 200, exit: 200 }}>
                            <Domain domain={domain.domain} licencekey={domain.licencekey} />
                        </CSSTransition>
                    ))}
                </div>
            </div>
        );
    }
}

export class Domain extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="domain-cont">
                <div className="domain-outer">
                    <div className="sort-cont">
                        <i className="oln icon-grab-ui button"></i>
                    </div>
                    <div className="middle-cont">
                        <div className="input-cont">
                            <input value={this.props.domain} />
                        </div>
                        <div className="key-cont">
                            <span className="label">Licence key:</span> <span className="key">{this.props.licencekey}</span>
                        </div>
                    </div>
                    <div className="delete-cont">
                        <i className="oln icon-trash button"></i>
                    </div>
                </div>
            </div>
        );
    }
}



