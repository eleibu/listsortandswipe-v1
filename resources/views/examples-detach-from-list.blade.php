@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/examples.css')) }}">
@endsection

<br/><br/>
<div id="div-diag">
	<div class="button-top">
		<a id="a-detach" title="Detach">Detach</a>
		<a id="a-attach" title="Attach" style="display: none;">Attach</a>
	</div>
	<div id="outerCont-detach-from-list" class="outerCont">
	    <div id="listCont-detach-from-list"  class="listCont">
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
<pre class="line-numbers"><code class="language-markup">{{'<div>
	<a id=\'a-detach\' title=\'Detach\'>Detach</a>
	<a id=\'a-attach\' title=\'Attach\' style=\'display: none;\'>Attach</a>
</div>
<div id=\'outerCont\'>
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
<pre class="line-numbers"><code class="language-js">function attachToList() {
    lithiumlist.attachToList(
	    &#39;123456789&#39;,
	    document.getElementById(&#39;outerCont&#39;),
	    document.getElementById(&#39;listCont&#39;),
	    &#39;listItem&#39;
    );
}

function detachFromList() {
	lithiumlist.detachFromList(document.getElementById(&#39;listCont&#39;));
}

attachToList();

var aDetach = document.getElementById('a-detach');
aDetach.addEventListener(&#39;click&#39;, function() {
	detachFromList();
	aDetach.style.display = &#39;none&#39;;
	aAttach.style.display = &#39;inline&#39;;
});

var aAttach = document.getElementById('a-attach');
aAttach.addEventListener(&#39;click&#39;, function() {
	attachToList();
	aDetach.style.display = &#39;inline&#39;;
	aAttach.style.display = &#39;none&#39;;
});
</code></pre>
</div>