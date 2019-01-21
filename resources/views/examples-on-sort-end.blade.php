@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/examples.css')) }}">
@endsection

<br/><br/>
<div id="div-diag">
	<div id="outerCont-on-sort-end">
	    <div id="listCont-on-sort-end">
	        <div class="listItem">
	            List item 1
	        </div>
	        <div class="listItem">
	            List item 2
	        </div>
	        <div class="listItem">
	            List item 3
	        </div>
	        <div class="listItem">
	            List item 4
	        </div>
	        <div class="listItem">
	            List item 5
	        </div>
	        <div class="listItem">
	            List item 6
	        </div>
	        <div class="listItem">
	            List item 7
	        </div>
	        <div class="listItem">
	            List item 8
	        </div>
	        <div class="listItem">
	            List item 9
	        </div>
	        <div class="listItem">
	            List item 10
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
            List item 1
        </div>
        <div class=\'listItem\'>
            List item 2
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
    	leftEnabled: false,
    	rightEnabled: false,
    	onSortEnd: function(instance, oldIndex, newIndex) {
	        if (oldIndex != newIndex) {
	            var items = instance.listCont.getElementsByClassName(instance.listItemClass);
	            var oldItem = items[oldIndex];
	            var newItem = items[newIndex];

	            instance.listCont.removeChild(oldItem);    
	            if (newIndex > oldIndex) {
	                instance.listCont.insertBefore(oldItem, newItem.nextSibling);
	            } else {
	                instance.listCont.insertBefore(oldItem, newItem);
	            }
	        }
    	}
    }
);
</code></pre>
</div>