require('bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { monitorWinWidth } from './monitor-win-width.js';
import { pageMenuShowHide } from './page-menu-show-hide.js';
import { lithiumlist } from './lithiumlist-1.0.0.js';

import Prism from 'prismjs';
Prism.highlightAll();

class OuterCont extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	listItems: [
        		{'title' : 'List item 0'},
        		{'title' : 'List item 1'},
        		{'title' : 'List item 2'},
        		{'title' : 'List item 3'},
        		{'title' : 'List item 4'},
        		{'title' : 'List item 5'}
        	]
        };
        this.onSortEnd = this.onSortEnd.bind(this);
        this.onLeftEnd = this.onLeftEnd.bind(this);
    }
    componentDidMount() {
	    lithiumlist.attachToList(
	        '123456789',
	        this.outerCont,
	        this.listCont,
	        'listItem',
	        {
	        	sortDragHandleClass: 'icon-grab-ui',
	        	leftButtonClass: 'icon-trash',
	        	rightEnabled: false,
	        	onSortEnd: this.onSortEnd,
	        	onLeftEnd: this.onLeftEnd
	        }
	    );
    }
	componentWillUnmount() {
		lithiumlist.detachFromList(this.listCont);
	}
	onSortEnd(instance, oldIndex, newIndex) {
        if (oldIndex != newIndex) {
        	const newListItems = this.state.listItems.slice(0);
        	if (newIndex >= newListItems.length) {
        		let i = newIndex - newListItems.length;
        		while (i-- + 1) {
        			newListItems.push(undefined);
        		}
        	}
        	newListItems.splice(newIndex, 0, newListItems.splice(oldIndex, 1)[0]);
	        this.setState({
	           listItems: newListItems
	        });
        }
	}
	onLeftEnd(instance, index, didSlideOut) {
		if (didSlideOut) {
			const newListItems = this.state.listItems.slice(0);
			newListItems.splice(index, 1);
	        this.setState({
	           listItems: newListItems
	        });
		}
	}
    onKeyDown(e) {
    	if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {	// enter key
    		this.addListItem();
    	}
    }
    onAddItemClick() {
    	this.addListItem();
    }
	addListItem() {
		if (this.input.value && this.input.value.length > 0) {
			const newListItems = this.state.listItems.slice(0);
			newListItems.unshift({'title' : this.input.value});
	        this.setState({
	           listItems: newListItems
	        });
			this.input.value = '';
		}
	}
    render() {
        return (
        	<React.Fragment>
        		<div id="reactTopCont">
        			<div className="inputCont">
        				<input type="text" ref={(input) => { this.input = input; }} onKeyDown={(e) => this.onKeyDown(e)} placeholder="New item..." />
        			</div>
        			<div className="button">
        				<div className="button-word-cont grey" onClick={() => this.onAddItemClick()}>
        					ADD ITEM
        				</div>
        			</div>
        		</div>
        		<br/>
	        	<div ref={(div) => { this.outerCont = div; }} id="outerCont-react" className="outerCont">
	        		<div ref={(div) => { this.listCont = div; }} id="listCont-react" className="listCont">
	        			{this.state.listItems.map((listItem, index) => (
	        				<ListItem key={index} title={listItem.title} />
	        			))}
	        		</div>
	        	</div>        		
        	</React.Fragment>
        );
    }
}

class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        	<div className="listItem">
	        	<div className="innerCont">
		            <i className="icon-grab-ui oln"></i>
		            <i className="icon-trash oln"></i>
		            {this.props.title}
	        	</div>
        	</div>
        );
    }
}

ReactDOM.render(
	<OuterCont />,
	document.getElementById('reactTarget')
);