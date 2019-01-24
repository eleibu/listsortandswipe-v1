@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/examples.css')) }}">
@endsection

<br/><br/>
<div id="div-diag">
	<div class="button-top">
		<a id="a-trigger-left" class="trigger left" title="Trigger left"><i class="icon-arrow-left-circle oln"></i></a>
		<a id="a-trigger-right" class="trigger right" title="Trigger right"><i class="icon-arrow-right-circle oln"></i></a>
		<div class="header-middle">
			List item: 
            <select id="select-listItem">
            	<option value="0" selected="selected">0</option>
            	<option value="1">1</option>
            	<option value="2">2</option>
            	<option value="3">3</option>
            	<option value="4">4</option>
            	<option value="5">5</option>
            	<option value="6">6</option>
            	<option value="7">7</option>
            	<option value="8">8</option>
				<option value="9">9</option>
            </select>
		</div>
	</div>
	<div id="outerCont-trigger-leftandright" class="outerCont">
	    <div id="listCont-trigger-leftandright"  class="listCont">
	        <div data-index="0" class="listItem" style="background-color: #FFFFCC;">
	            List item 0
	        </div>
	        <div data-index="1" class="listItem">
	            List item 1
	        </div>
	        <div data-index="2" class="listItem">
	            List item 2
	        </div>
	        <div data-index="3" class="listItem">
	            List item 3
	        </div>
	        <div data-index="4" class="listItem">
	            List item 4
	        </div>
	        <div data-index="5" class="listItem">
	            List item 5
	        </div>
	        <div data-index="6" class="listItem">
	            List item 6
	        </div>
	        <div data-index="7" class="listItem">
	            List item 7
	        </div>
	        <div data-index="8" class="listItem">
	            List item 8
	        </div>
	        <div data-index="9" class="listItem">
	            List item 9
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
            List item 0
        </div>
        <div class=\'listItem\'>
            List item 1
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
    	leftBySwipe: false,
    	rightBySwipe: false,
    	sortEnabled: false
    }
);

aTriggerLeft.addEventListener(&#39;click&#39;, function() {
	var index = selectListItem.options[selectListItem.selectedIndex].value;
	lithiumlist.triggerLeft(
		document.getElementById(&#39;listCont&#39;),
		index
	);
});

aTriggerRight.addEventListener(&#39;click&#39;, function() {
	var index = selectListItem.options[selectListItem.selectedIndex].value;
	lithiumlist.triggerRight(
		document.getElementById(&#39;listCont&#39;),
		index
	);
});

</code></pre>
</div>