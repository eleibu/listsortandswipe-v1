@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/examples.css')) }}">
	<style>
		#pageWrapper {
			height: 100%;
			overflow: auto;
		}
	</style>
@endsection

<br/><br/>
<div id="div-diag">
	<div id="outerCont-full-page-scrolling">
	    <div id="listCont-full-page-scrolling">
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
<pre class="line-numbers"><code class="language-markup">{{'<body>
	<div id=\'pageWrapper\'>
		<div>
			...
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
		</div>
		<div>
			...
		</div>
	</div>
</body>'}}</code></pre>
	</div>
	<br/>
	<div class="section-cont">
	<div class="title-codeblock">
	    CSS:
	</div>
<pre class="line-numbers"><code class="language-css">#pageWrapper {
	height: 100%;
	overflow: auto;
}

#outerCont {
	border: 1px solid #444444;
}

#listCont {
	position: relative;
}

#listCont.left-list, #listCont.right-list {
	overflow-x: hidden;
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
    document.getElementById(&#39;pageWrapper&#39;),
    document.getElementById(&#39;listCont&#39;),
    &#39;listItem&#39;
);
</code></pre>
</div>