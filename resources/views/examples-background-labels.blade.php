@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/examples.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/examples.js')) }}"></script>
@endsection

<br/><br/>
<div id="div-diag">
	<div id="outerCont-background-labels" class="outerCont">
	    <div id="listCont-background-labels" class="listCont">
	        <div class="listItem">
	            List item
	        </div>
	        <div class="listItem">
	            List item
	        </div>
	        <div class="listItem">
	            List item
	        </div>
	        <div class="listItem">
	            List item
	        </div>
	        <div class="listItem">
	            List item
	        </div>
	        <div class="listItem">
	            List item
	        </div>
	        <div class="listItem">
	            List item
	        </div>
	        <div class="listItem">
	            List item
	        </div>
	        <div class="listItem">
	            List item
	        </div>
	        <div class="listItem">
	            List item
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
            List item
        </div>
        <div class=\'listItem\'>
            List item
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
}

.mask div {
	position: relative;
	width: 100%;
	height: 100%;
}

.mask div span {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	color: white;
}

.mask div span.left {
	right: 0.6em;
}

.mask div span.right {
	left: 0.6em;
}
</code></pre>
	</div>
	<br/>
	<div class="section-cont">
	<div class="title-codeblock">
	    JS:
	</div>
<pre class="line-numbers"><code class="language-js">var labelLeft = document.createElement(&#39;div&#39;);
labelLeft.innerHTML = &#39;&lt;span class=\&#39;left\&#39;&gt;Delete&lt;/span&gt;&#39;;

var labelRight = document.createElement(&#39;div&#39;);
labelRight.innerHTML = &#39;&lt;span class=\&#39;right\&#39;&gt;Archive&lt;/span&gt;&#39;;

lithiumlist.attachToList(
    &#39;123456789&#39;,
    document.getElementById(&#39;outerCont&#39;),
    document.getElementById(&#39;listCont&#39;),
    &#39;listItem&#39;,
    {
    	sortEnabled: false,
	    leftMasks: [{
	    	background: &#39;red&#39;,
	    	classNameDefault: &#39;mask&#39;,
			childNode: labelLeft
	    }],
	    rightMasks: [{
	    	background: &#39;green&#39;,
	    	classNameDefault: &#39;mask&#39;,
			childNode: labelRight
	    }]
    }
);
</code></pre>
</div>