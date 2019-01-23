@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/examples.css')) }}">
@endsection

<br/><br/>
<div id="div-diag">
	<div id="outerCont-buttons" class="outerCont">
	    <div id="listCont-buttons" class="listCont">
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-grab-ui oln"></i>
		            <i class="icon-arrow-right-circle oln"></i>
		            <i class="icon-arrow-left-circle oln"></i>
		            List item
	        	</div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-grab-ui oln"></i>
		            <i class="icon-arrow-right-circle oln"></i>
		            <i class="icon-arrow-left-circle oln"></i>
		            List item
	        	</div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-grab-ui oln"></i>
		            <i class="icon-arrow-right-circle oln"></i>
		            <i class="icon-arrow-left-circle oln"></i>
		            List item
	        	</div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-grab-ui oln"></i>
		            <i class="icon-arrow-right-circle oln"></i>
		            <i class="icon-arrow-left-circle oln"></i>
		            List item
	        	</div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-grab-ui oln"></i>
		            <i class="icon-arrow-right-circle oln"></i>
		            <i class="icon-arrow-left-circle oln"></i>
		            List item
	        	</div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-grab-ui oln"></i>
		            <i class="icon-arrow-right-circle oln"></i>
		            <i class="icon-arrow-left-circle oln"></i>
		            List item
	        	</div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-grab-ui oln"></i>
		            <i class="icon-arrow-right-circle oln"></i>
		            <i class="icon-arrow-left-circle oln"></i>
		            List item
	        	</div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-grab-ui oln"></i>
		            <i class="icon-arrow-right-circle oln"></i>
		            <i class="icon-arrow-left-circle oln"></i>
		            List item
	        	</div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-grab-ui oln"></i>
		            <i class="icon-arrow-right-circle oln"></i>
		            <i class="icon-arrow-left-circle oln"></i>
		            List item
	        	</div>
	        </div>
	        <div class="listItem">
	        	<div class="innerCont">
		            <i class="icon-grab-ui oln"></i>
		            <i class="icon-arrow-right-circle oln"></i>
		            <i class="icon-arrow-left-circle oln"></i>
		            List item
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
	            <i class=\'icon-grab-ui oln\'></i>
	            <i class=\'icon-arrow-right-circle oln\'></i>
	            <i class=\'icon-arrow-left-circle oln\'></i>
	            List item
        	</div>
        </div>
        <div class=\'listItem\'>
        	<div class=\'innerCont\'>
	            <i class=\'icon-grab-ui oln\'></i>
	            <i class=\'icon-arrow-right-circle oln\'></i>
	            <i class=\'icon-arrow-left-circle oln\'></i>
	            List item
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

.innerCont {
	position: relative;
	text-align: center;
}

i {
	position: absolute;
	bottom: 0;
}

i:hover, i:active {
	cursor: pointer;
	font-weight: bold;
}

i.icon-grab-ui {
	left: 0;
}

i.icon-arrow-right-circle {
	left: 2em;
}

i.icon-arrow-left-circle {
	right: 0;
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
    	sortDragHandleClass: &#39;icon-grab-ui&#39;,
    	leftButtonClass: &#39;icon-arrow-left-circle&#39;,
    	rightButtonClass: &#39;icon-arrow-right-circle&#39;
    }
);
</code></pre>
</div>