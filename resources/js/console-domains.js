import React from 'react';
import classNames from 'classNames/dedupe';

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
            'focus' : this.state.textboxFocus
        });

        return (
            <div className="content-inner">
                <div className="add-cont">
                    <div className="message-outer">
                        <div className="message-inner">
                            <i className="sld icon-cross-ui"></i>
                            <span>You have 1 product expiring in 28 days</span>
                        </div>
                    </div>
                    <div className="add-item-outer">
                        <div className="text-cont">
                            <div className={textboxClasses}>
                                <div className="input-cont">
                                    <input className="textentry" placeholder="Domain..." />
                                </div>
                                <div className="count-cont">
                                    <div className="count-outer">
                                        <div className="count-text">
                                            1 left
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="button-row">
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