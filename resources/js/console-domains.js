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
                                    <input className="textentry" placeholder="Domain..." />
                                </div>
                            </div>
                        </div>
                        <div className="button-row">
                            <span>What do I enter here?</span>
                            <div className="button-word-cont clear">
                                ADD DOMAIN
                            </div>
                        </div>
                    </div>
                </div>
                <div className="items-cont">
                    Items
                </div>
            </div>
        );
    }
}