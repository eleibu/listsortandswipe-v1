@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/examples.css')) }}">
@endsection

<br/><br/>
<div id="div-diag">
	<div class="button-top">
		<a id="a-delete-item-refresh" title="Refresh">Refresh</a>
	</div>
	<div id="outerCont-delete-item" class="outerCont">
	    <div id="listCont-delete-item" class="listCont">
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-trash oln"></i>
		            List item 0
	        	</div>
	            <div class="innerMask">
	            </div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-trash oln"></i>
		            List item 1
	        	</div>
	            <div class="innerMask">
	            </div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-trash oln"></i>
		            List item 2
	        	</div>
	            <div class="innerMask">
	            </div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-trash oln"></i>
		            List item 3
	        	</div>
	            <div class="innerMask">
	            </div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-trash oln"></i>
		            List item 4
	        	</div>
	            <div class="innerMask">
	            </div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-trash oln"></i>
		            List item 5
	        	</div>
	            <div class="innerMask">
	            </div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-trash oln"></i>
		            List item 6
	        	</div>
	            <div class="innerMask">
	            </div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-trash oln"></i>
		            List item 7
	        	</div>
	            <div class="innerMask">
	            </div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-trash oln"></i>
		            List item 8
	        	</div>
	            <div class="innerMask">
	            </div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-trash oln"></i>
		            List item 9
	        	</div>
	            <div class="innerMask">
	            </div>
	        </div>
	    </div>
	</div>
</div>
<br/><br/>
<div class="section-cont">
	<div class="title-codeblock">
	    HTML:
	</div>
<pre class="line-numbers"><code class="language-markup">{{'<div id=\'outerCont\'>
    <div id=\'listCont\'>
        <div class=\'listItem\'>
        	<div class=\'innerCont\'>
	            <i class=\'icon-trash oln\'></i>
	            List item 0
        	</div>
            <div class=\'innerMask\'>
            </div>
        </div>
        <div class=\'listItem\'>
        	<div class=\'innerCont\'>
	            <i class=\'icon-trash oln\'></i>
	            List item 1
        	</div>
            <div class=\'innerMask\'>
            </div>
        </div>
        ...
    </div>
</div>'}}</code></pre>
	</div>
	<br/>
	<div class="section-cont">
	<div class="title-codeblock">
	    CSS:
	</div>
<pre class="line-numbers"><code class="language-css">#outerCont {
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
	position: relative;
	max-height: 4em;
}

.innerCont {
	position: relative;
}

i {
	position: absolute;
	bottom: 0;
}

i:hover, i:active {
	cursor: pointer;
	font-weight: bold;
}

i.icon-trash {
	right: 0;
}

.innerMask {
	display: none;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	box-shadow: inset 0 0 4px rgba(0,0,0,0.8);
	background-color: red;
}

.listItem.left-item-active .innerMask, .listItem.deleting .innerMask {
	display: block;
}

.listItem.deleting {
	transition: max-height 200ms ease;
	max-height: 0;
}
</code></pre>
	</div>
	<br/>
	<div class="section-cont">
	<div class="title-codeblock">
	    JS:
	</div>
<pre class="line-numbers"><code class="language-js">lithiumlist.attachToList(
    &#39;123456789&#39;,
    document.getElementById(&#39;outerCont&#39;),
    document.getElementById(&#39;listCont&#39;),
    &#39;listItem&#39;,
    {
    	sortEnabled: false,
    	rightEnabled: false,
    	leftButtonClass: &#39;icon-trash&#39;,
	    leftMasks: [],
    	onLeftEnd: function(instance, index, didSlideOut) {
    		if (didSlideOut) {
	    		var items = instance.listCont.getElementsByClassName(instance.listItemClass);
	    		items[index].className = items[index].className + &#39; deleting&#39;;
	    		setTimeout(function() {
	    			instance.listCont.removeChild(items[index]);
	    		}, 200);
    		}
    	}
    }
);
</code></pre>
</div>