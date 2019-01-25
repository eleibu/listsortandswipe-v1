@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/examples.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/examples-react.js')) }}"></script>
@endsection

<br/><br/>
<div id="div-diag">
	<div id="reactTarget">
	</div>
</div>
<br/><br/>
<div class="section-cont">
	<div class="title-codeblock">
	    HTML:
	</div>
<pre class="line-numbers"><code class="language-markup">{{'<div id="reactTarget">
</div>
'}}</code></pre>
	</div>
	<br/>
	<div class="section-cont">
	<div class="title-codeblock">
	    CSS:
	</div>
<pre class="line-numbers"><code class="language-css">div.inputCont {
	margin-bottom: 0.4em;
}

div.input {
	box-sizing: border-box;
	width: 100%;
	padding: 0.6em;
	font-size: 100%;
	-webkit-appearance: none;
	outline: none;
	border: 1px solid #AAAAAA;
}

div.button {
	font-size: 80%;
}

div.button-word-cont.grey {
	display: inline-block;
	padding: 0.6em 1em;
	border-radius: 4px;
	text-align: center;
	font-weight: bold;
	color: #666666;
	background-color: #EEEEEE;
	box-shadow: 0 1px 4px 0 #CCCCCC;	
}

div.button-word-cont.grey:hover {
	cursor: pointer;
	background-color: #F2F2F2;
	box-shadow: 0 1px 4px 0 #BBBBBB;
}

#outerCont {
	height: 300px;
	overflow: auto;
	border: 1px solid #777777;
}

#listCont {
	position: relative;
}

.listItem {
	padding: 1.4em;
	background-color: #FFFFFF;
	border-bottom: 1px solid #DDDDDD;
}

.innerCont {
	position: relative;
	padding: 0 2em;
	overflow: hidden;
	text-overflow: ellipsis;
}

i {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
}

i:hover, i:active {
	cursor: pointer;
	font-weight: bold;
}

i.icon-grab-ui {
	left: 0;
}

i.icon-trash {
	right: 0;
}
</code></pre>
	</div>
	<br/>
	<div class="section-cont">
	<div class="title-codeblock">
	    JS:
	</div>
<pre class="line-numbers"><code class="language-js">class OuterCont extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	listItems: [
        		{&#39;title&#39; : &#39;List item 0&#39;},
        		{&#39;title&#39; : &#39;List item 1&#39;},
        		{&#39;title&#39; : &#39;List item 2&#39;},
        		{&#39;title&#39; : &#39;List item 3&#39;},
        		{&#39;title&#39; : &#39;List item 4&#39;},
        		{&#39;title&#39; : &#39;List item 5&#39;}
        	]
        };
        this.onSortEnd = this.onSortEnd.bind(this);
        this.onLeftEnd = this.onLeftEnd.bind(this);
    }
    componentDidMount() {
	    lithiumlist.attachToList(
	        &#39;123456789&#39;,
	        this.outerCont,
	        this.listCont,
	        &#39;listItem&#39;,
	        {
	        	sortDragHandleClass: &#39;icon-grab-ui&#39;,
	        	leftButtonClass: &#39;icon-trash&#39;,
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
			this.input.value = &#39;&#39;;
		}
	}
    render() {
        return (
        	&lt;React.Fragment&gt;
        		&lt;div id=&#39;reactTopCont&#39;&gt;
        			&lt;div className=&#39;inputCont&#39;&gt;
        				&lt;input type=&#39;text&#39; ref={(input) =&gt; { this.input = input; }} onKeyDown={(e) =&gt; this.onKeyDown(e)} placeholder=&#39;New item...&#39; /&gt;
        			&lt;/div&gt;
        			&lt;div className=&#39;button&#39;&gt;
        				&lt;div className=&#39;button-word-cont grey&#39; onClick={() =&gt; this.onAddItemClick()}&gt;
        					ADD ITEM
        				&lt;/div&gt;
        			&lt;/div&gt;
        		&lt;/div&gt;
        		&lt;br/&gt;
	        	&lt;div ref={(div) =&gt; { this.outerCont = div; }} id=&#39;outerCont&#39;&gt;
	        		&lt;div ref={(div) =&gt; { this.listCont = div; }} id=&#39;listCont&#39;&gt;
	        			{this.state.listItems.map((listItem, index) =&gt; (
	        				&lt;ListItem key={index} title={listItem.title} /&gt;
	        			))}
	        		&lt;/div&gt;
	        	&lt;/div&gt;
        	&lt;/React.Fragment&gt;
        );
    }
}

class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            &lt;div className=&#39;listItem&#39;&gt;
                &lt;div className=&#39;innerCont&#39;&gt;
                    &lt;i className=&#39;icon-grab-ui oln&#39;&gt;&lt;/i&gt;
                    &lt;i className=&#39;icon-trash oln&#39;&gt;&lt;/i&gt;
                    {this.props.title}
                &lt;/div&gt;
            &lt;/div&gt;
        );
    }
}

ReactDOM.render(
	&lt;OuterCont /&gt;,
	document.getElementById(&#39;reactTarget&#39;)
);
</code></pre>
</div>