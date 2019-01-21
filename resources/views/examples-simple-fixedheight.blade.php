@section('jsLinks')
    <script defer src="{{ url(mix('/js/examples.js')) }}"></script>
@endsection

@section('pageStyle')
	<style>

	</style>
@endsection
<br/><br/>
<div id="div-diag">
	<div id="outerCont-simple-fixedheight">
	    <div id="listCont-simple-fixedheight">
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
<br/><br/><br/><br/>
<div class="section-cont">
<div class="title-codeblock">
    HTML:
</div>
<pre class="line-numbers"><code class="language-markup">{{'<div id=\'outerCont\'>
    <div id=\'listCont\'>
        <div class=\'listItem\'>
            List item
        </div>
        ...
        <div class=\'listItem\'>
            List item
        </div>        
    </div>
</div>'}}</code></pre>
</div>
<br/><br/>
<div class="section-cont">
<div class="title-codeblock">
    CSS:
</div>
<pre class="line-numbers"><code class="language-css">#outerCont {
	height: 300px;
	overflow: auto;
	border: 1px solid #444444;
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
<br/><br/>
<div class="section-cont">
<div class="title-codeblock">
    JS:
</div>
<pre class="line-numbers"><code class="language-js">lithiumlist.attachToList(
    '123456789',
    document.getElementById('outerCont'),
    document.getElementById('listCont'),
    'listItem'
);
</code></pre>
</div>

@section('scriptBottom')
    <script>
    </script>
@endsection