@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/examples.css')) }}">
@endsection

<br/><br/>
<div id="div-diag">
	<div class="button-top">
		<span id="span-enabled">Left/right sliding is enabled (<a id="a-turn-off" title="turn off">turn off</a>)</span>
		<span id="span-disabled" style="display: none;">Left/right sliding is disabled (<a id="a-turn-on" title="turn on">turn on</a>)</span>
	</div>
	<div id="outerCont-set-list-properties" class="outerCont">
	    <div id="listCont-set-list-properties"  class="listCont">
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
    	leftEnabled: true,
    	rightEnabled: true,
    	sortEnabled: false
    }
);

var aTurnOff = document.getElementById(&#39;a-turn-off&#39;);
aTurnOff.addEventListener(&#39;click&#39;, function() {
	lithiumlist.setListProperties(
		listContSetListProperties,
		{
	    	leftEnabled: false,
	    	rightEnabled: false,
		}
	);
});

var aTurnOn = document.getElementById(&#39;a-turn-on&#39;);
aTurnOn.addEventListener(&#39;click&#39;, function() {
	lithiumlist.setListProperties(
		listContSetListProperties,
		{
	    	leftEnabled: true,
	    	rightEnabled: true,
		}
	);
});
</code></pre>
</div>