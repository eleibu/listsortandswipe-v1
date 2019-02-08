import React from 'react';
import classNames from 'classNames/dedupe';
import { CSSTransition } from 'react-transition-group';
import Tooltip from 'tooltip.js';

export class Domains extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputFocus: false,
            inputWarn: false,
            containerFocus: false
        };
        this.ttHoverSpanLarge = null;
        this.ttClickSpanSmall = null;
        this.handleDocClick = this.handleDocClick.bind(this);
        this.setOuterRef = this.setOuterRef.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.windowScroll = this.windowScroll.bind(this);
        this.windowTouchstart = this.windowTouchstart.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleDocClick);

        var templateHover = '<div class=\'tooltip-cont hover\'><div class=\'tooltip-outer\'><div class=\'tooltip-inner\'></div><div class=\'tooltip-arrow\'><img src=\'' + urlArrowImg + '\' alt=\'\' width=\'11\' height=\'8\' /></div></div></div>';
        this.ttHoverSpanLarge = new Tooltip(this.spanLarge, {
            offset: 'popper:0,10,0,0',
            title: function() {
                return this.getAttribute('data-title');
            },
            template: templateHover
        });

        var templateClick = '<div class=\'tooltip-cont click\'><div class=\'tooltip-outer\'><div class=\'tooltip-inner\'></div><div class=\'tooltip-arrow\'><img src=\'' + urlArrowImg + '\' alt=\'\' width=\'11\' height=\'8\' /></div></div></div>';
        this.ttClickSpanSmall = new Tooltip(this.spanSmall, {
            offset: 'popper:0,10,0,0',
            title: function() {
                return this.getAttribute('data-title');
            },
            trigger: 'click',
            template: templateClick,
            container: document.getElementById('pageWrapper')
        });

        window.addEventListener('scroll', this.windowScroll);
        window.addEventListener('touchstart', this.windowTouchstart);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleDocClick);
        window.removeEventListener('scroll', this.windowScroll);
        window.removeEventListener('touchstart', this.windowTouchstart);
    }
    setOuterRef(node) {
        this.outerRef = node;
    }
    windowScroll() {
        if (this.ttClickSpanSmall) {
            this.ttClickSpanSmall.hide();
        }
    }
    windowTouchstart() {
        if (this.ttClickSpanSmall) {
            this.ttClickSpanSmall.hide();
        }
    }
    handleDocClick(e) {
        let contClicked = false;
        if ((this.outerRef) && ((e.target === this.outerRef) || (this.outerRef.contains(e.target)))) {
            contClicked = true;
        }
        let inputClicked = false;
        if ((this.input) && ((e.target === this.input) || (this.input.contains(e.target)))) {
            inputClicked = true;
        }
        if (inputClicked) {
            this.setState({
                inputFocus: true,
                containerFocus: true
            });
        } else if (contClicked) {
            this.setState({
                inputFocus: false
            });
        } else {
            this.setState({
                inputFocus: false,
                containerFocus: false
            });
        }
    }
    onInput(e) {
        if (this.state.inputWarn) {
            this.checkValue();
        }
    }
    checkValue() {
        let valueOk;
        const newDomain = this.input.value.replace(/^\s+|\s+$/g, '');
        if (newDomain.length > 0) {
            if (/^\S+\.\S+$/.test(newDomain)) {
                valueOk = true;
                this.setState({
                    inputWarn: false
                });
            } else {
                valueOk = false;
                this.setState({
                    inputWarn: true
                });
            }
        } else {
            valueOk = false;
            this.setState({
                inputWarn: false
            });
        }
        return valueOk;
    }
    addDomainClick() {
        if (this.checkValue()) {
            let origValue = this.input.value.replace(/^\s+|\s+$/g, '');
            this.createItemAndAdd(origValue);
            this.setState({
                inputFocus: false,
                containerFocus: false
            });
        }
    }
    onKeyDown(e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {         // enter key
            e.preventDefault();
            if (this.checkValue()) {
                let origValue = this.input.value.replace(/^\s+|\s+$/g, '');
                this.createItemAndAdd(origValue);
            }
            this.setState({
                inputFocus: false
            });
        } else if ((e.which && e.which == 9) || (e.keyCode && e.keyCode == 9)) {    // tab key
            this.setState({
                inputFocus: false
            });
        }
    }
    createItemAndAdd(domain) {
        // change pricing page to refer to subdomains!

        // strip:
        // www.
        // http://
        // https:// other?
        // /
        // #
        // ?

        // const newTask = {
        //     id: uuidv4(),
        //     description: origText,
        //     done: false
        // };
        // this.props.addTask(newTask);
        this.input.value = '';
    }
    render() {
        const addItemOuterClasses = classNames({
            'add-item-outer' : true,
            'focus' : this.state.containerFocus
        });
        const textboxClasses = classNames({
            'textentry-cont' : true,
            'focus' : this.state.textboxFocus,
            'warn' : this.state.inputWarn
        });
        const ttText = 'Enter the domain or subdomain of a website you will use Lithium List with. For example: \'example.com\' or \'subdomain.example.com\'';
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
                    <div className={addItemOuterClasses} ref={this.setOuterRef}>
                        <div className="text-cont">
                            <div className={textboxClasses}>
                                <div className="input-cont">
                                    <input type="text" placeholder="yourdomain.com" ref={(input) => { this.input = input; }} onKeyDown={(e) => this.onKeyDown(e)} onInput={(e) => this.onInput(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="button-row">
                            <span className="large" ref={(span) => { this.spanLarge = span; }} data-title={ttText}>What do I enter here?</span>
                            <span className="small" ref={(span) => { this.spanSmall = span; }} data-title={ttText}>What do I enter here?</span>
                            <div className="button-word-cont clear" onClick={() => {this.addDomainClick()}}>
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
        this.state = {
            copying: false
        };
        this.copyClick = this.copyClick.bind(this);
        this.copyingEnd = this.copyingEnd.bind(this);
    }
    copyClick() {
        this.setState({
            copying: true
        });
        this.input.select();
        document.execCommand("copy");
        setTimeout(this.copyingEnd, 200);
    }
    copyingEnd() {
        this.setState({
            copying: false
        });
    }
    render() {
        const inputStyle = {
            fontSize: '20px',
            position: 'fixed',
            top: '-100000px',
            left: 0
        };
        const spanClasses = classNames({
            'key' : true,
            'default' : !this.state.copying,
            'copying' : this.state.copying
        });
        return (
            <div className="domain-cont">
                <div className="domain-outer">
                    <div className="sort-cont">
                        <i className="oln icon-grab-ui button"></i>
                    </div>
                    <div className="middle-cont">
                        <div className="input-cont">
                            <input type="text" value={this.props.domain} />
                        </div>
                        <div className="key-cont">
                            <input type="text" readOnly={true} ref={(input) => { this.input = input; }} style={inputStyle} value={this.props.licencekey} />
                            <span className="label">Licence key:</span>
                            <span className={spanClasses}>{this.props.licencekey}</span>
                            <span className="copy-cont">
                                <span className="copy-outer" title="Copy to clipboard" onClick={() => {this.copyClick()}}>
                                    <i className="oln icon-clipboard"></i>
                                </span>
                                &nbsp;
                            </span>
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



