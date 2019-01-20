@section('jsLinks')
    <script defer src="{{ url(mix('/js/demos.js')) }}"></script>
    <script src="{{ url('/js/lithiumlist-1.0.0.js') }}"></script>
@endsection

@section('pageStyle')
	<style>
		#div-diag {
			max-width: 300px;
			margin: 0 auto;
		}

		#outerCont {
			height: 300px;
			overflow: auto;
			border: 1px solid red;
		}

		#listCont {
			position: relative;
		}

		.listItem {
			padding: 1.4em;
			background-color: #FFFFFF;
			border-bottom: 1px solid #DDDDDD;
		}

		.unselectable {
			-webkit-touch-callout: none;
		    -webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;			
		}
	</style>
@endsection
<br/><br/>
<div id="div-diag">
	<div id='outerCont'>
	    <div id='listCont'>
	        <div class='listItem unselectable'>
	            List item
	        </div>
	        <div class='listItem unselectable'>
	            List item
	        </div>
	        <div class='listItem unselectable'>
	            List item
	        </div>
	        <div class='listItem unselectable'>
	            List item
	        </div>
	        <div class='listItem unselectable'>
	            List item
	        </div>
	        <div class='listItem unselectable'>
	            List item
	        </div>
	        <div class='listItem unselectable'>
	            List item
	        </div>
	        <div class='listItem unselectable'>
	            List item
	        </div>
	        <div class='listItem unselectable'>
	            List item
	        </div>
	        <div class='listItem unselectable'>
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
        <div class=\'listItem  unselectable\'>
            List item
        </div>
        ...
        <div class=\'listItem  unselectable\'>
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
	border: 1px solid red;
}

#listCont {
	position: relative;
}

.listItem {
	padding: 1.4em;
	background-color: #FFFFFF;
	border-bottom: 1px solid #DDDDDD;
}

.unselectable {
	-webkit-touch-callout: none;
    -webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
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
        lithiumlist.attachToList(
            '123456789',
            document.getElementById('outerCont'),
            document.getElementById('listCont'),
            'listItem'
        );
    </script>
@endsection