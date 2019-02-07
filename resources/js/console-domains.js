import React from 'react';
import classNames from 'classNames/dedupe';
import { CSSTransition } from 'react-transition-group';

export class Domains extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputFocus: false,
            inputWarn: false,
            containerFocus: false
        };
        this.handleDocClick = this.handleDocClick.bind(this);
        this.setOuterRef = this.setOuterRef.bind(this);
        this.checkValue = this.checkValue.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleDocClick);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleDocClick);
    }
    setOuterRef(node) {
        this.outerRef = node;
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
            // this.checkValue();
            this.setState({
                inputFocus: true,
                containerFocus: true
            });
        } else if (contClicked) {
            // this.checkValue();
            this.setState({
                inputFocus: false
            });
        } else {
            // this.checkValue();
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
            // this.checkValue();
            this.setState({
                inputFocus: false
            });
        }
    }
    createItemAndAdd(domain) {
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
                                    <input placeholder="yourdomain.com" ref={(input) => { this.input = input; }} onKeyDown={(e) => this.onKeyDown(e)} onInput={(e) => this.onInput(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="button-row">
                            <span>What do I enter here?</span>
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
                            <span className="label">Licence key:</span><span className="key">{this.props.licencekey}</span><span className="copy">COPY</span>
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



