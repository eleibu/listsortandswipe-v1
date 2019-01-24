@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/examples.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/examples.js')) }}"></script>
@endsection

<br/><br/>
<div id="div-diag">
	<div id="outerCont-no-masks" class="outerCont">
	    <div id="listCont-no-masks" class="listCont">
	        <div class="listItem">
	            List item
	            <div class="innerMask left">
	            </div>
	            <div class="innerMask right">
	            </div>
	        </div>
	        <div class="listItem">
	            List item
	            <div class="innerMask left">
	            </div>
	            <div class="innerMask right">
	            </div>
	        </div>
	        <div class="listItem">
	            List item
	            <div class="innerMask left">
	            </div>
	            <div class="innerMask right">
	            </div>
	        </div>
	        <div class="listItem">
	            List item
	            <div class="innerMask left">
	            </div>
	            <div class="innerMask right">
	            </div>
	        </div>
	        <div class="listItem">
	            List item
	            <div class="innerMask left">
	            </div>
	            <div class="innerMask right">
	            </div>
	        </div>
	        <div class="listItem">
	            List item
	            <div class="innerMask left">
	            </div>
	            <div class="innerMask right">
	            </div>
	        </div>
	        <div class="listItem">
	            List item
	            <div class="innerMask left">
	            </div>
	            <div class="innerMask right">
	            </div>
	        </div>
	        <div class="listItem">
	            List item
	            <div class="innerMask left">
	            </div>
	            <div class="innerMask right">
	            </div>
	        </div>
	        <div class="listItem">
	            List item
	            <div class="innerMask left">
	            </div>
	            <div class="innerMask right">
	            </div>
	        </div>
	        <div class="listItem">
	            List item
	            <div class="innerMask left">
	            </div>
	            <div class="innerMask right">
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
            List item
            <div class=\'innerMask left\'>
            </div>
            <div class=\'innerMask right\'>
            </div>
        </div>
        <div class=\'listItem\'>
            List item
            <div class=\'innerMask left\'>
            </div>
            <div class=\'innerMask right\'>
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
}

.listItem .innerMask {
	display: none;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	box-shadow: inset 0 0 4px rgba(0,0,0,0.8);
}

.listItem.left-item-active .innerMask.left {
	display: block;
	background-color: red;
}

.listItem.right-item-active .innerMask.right {
	display: block;
	background-color: green;
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
	    leftMasks: [],
	    rightMasks: []
    }
);
</code></pre>
</div>