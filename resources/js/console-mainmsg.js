import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classNames/dedupe';

let mainMsgTimeout;

export function setMainMsgTimeout(callback, delay) {
    if (mainMsgTimeout) {
        clearTimeout(mainMsgTimeout);
    }
    let millisecs = 8000;
    if (delay) {
        millisecs = delay;
    }
    mainMsgTimeout = setTimeout(callback, millisecs);
}

export function clearMainMsgTimeout() {
    if (mainMsgTimeout) {
        clearTimeout(mainMsgTimeout);
        mainMsgTimeout = null;
    }
}

export class MainMsg extends React.Component {
    render() {
        let contClasses = classNames({
            isup: this.props.visible,
            isdown: !this.props.visible
        });
        return (
            ReactDOM.createPortal(
                <div id="div-mainmsg-cont" className={contClasses}>
                    <div className="mainmsg-outer">
                        <div className="mainmsg-inner">
                            {this.props.children}
                        </div>
                        <div className="mainmsg-close-cont">
                            <div className="mainmsg-close-outer">
                                <i className="oln icon-cross-ui" onClick={this.props.closeClick} ></i>
                            </div>
                        </div>
                    </div>
                </div>,
                document.getElementById('pageWrapper')
            )
        );
    }
}