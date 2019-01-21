@php
    $refs_events = array(
        'onLeftEnd' => array(
            'aref' => 'ref-onLeftEnd',
            'title' => 'onLeftEnd'
        ),
        'onLeftSlideBackStart' => array(
            'aref' => 'ref-onLeftSlideBackStart',
            'title' => 'onLeftSlideBackStart'
        ),
        'onLeftSlideOutStart' => array(
            'aref' => 'ref-onLeftSlideOutStart',
            'title' => 'onLeftSlideOutStart'
        ),
        'onLeftStart' => array(
            'aref' => 'ref-onLeftStart',
            'title' => 'onLeftStart'
        ),
        'onRightEnd' => array(
            'aref' => 'ref-onRightEnd',
            'title' => 'onRightEnd'
        ),
        'onRightSlideBackStart' => array(
            'aref' => 'ref-onRightSlideBackStart',
            'title' => 'onRightSlideBackStart'
        ),
        'onRightSlideOutStart' => array(
            'aref' => 'ref-onRightSlideOutStart',
            'title' => 'onRightSlideOutStart'
        ),
        'onRightStart' => array(
            'aref' => 'ref-onRightStart',
            'title' => 'onRightStart'
        ),
        'onSortAutoScrollEnd' => array(
            'aref' => 'ref-onSortAutoScrollEnd',
            'title' => 'onSortAutoScrollEnd'
        ),
        'onSortAutoScrollStart' => array(
            'aref' => 'ref-onSortAutoScrollStart',
            'title' => 'onSortAutoScrollStart'
        ),
        'onSortEnd' => array(
            'aref' => 'ref-onSortEnd',
            'title' => 'onSortEnd'
        ),
        'onSortStart' => array(
            'aref' => 'ref-onSortStart',
            'title' => 'onSortStart'
        ),
    );
@endphp
<a id="{{$refs['events']['aref']}}" class="title-section">
    {{$refs['events']['title']}}
</a>
<div class="subsection-links">
    @foreach ($refs_events as $ref_event)
        <a class="button-word-cont" href="{{ url($selectedpage['url'] . '#' . $ref_event['aref']) }}" title="{{$ref_event['title']}}">{{$ref_event['title']}}</a>
    @endforeach
</div>
<div class="subsection-cont">
    <a id="{{$refs_events['onLeftEnd']['aref']}}" class="title-subsection">
        {{$refs_events['onLeftEnd']['title']}}
    </a>
    <p>
        Triggered at the completion of a left slide.
    </p>
    <div class="function">
        onLeftEnd(instance, index, didSlideOut)
    </div>
    <div class="params-cont">
        <div class="param">
            <strong>instance</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Object
            </div>
            <div class="sub-param">
                The Lithium List <a href="{{ url($selectedpage['url'] . '#' . $refs_objects['instance']['aref']) }}" title="{{$refs_objects['instance']['title']}}">{{$refs_objects['instance']['title']}}</a> object.
            </div>
        </div>
        <div class="param">
            <strong>index</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Integer
            </div>
            <div class="sub-param">
                The index of the active list item.
            </div>
        </div>
        <div class="param">
            <strong>didSlideOut</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Boolean
            </div>
            <div class="sub-param">
                <code class="language-js">True</code> if the slide finished with the <a href="{{$subpages['concepts']['url'] . '#ref-clone'}}" title="clone">clone</a> sliding out of the list. <code class="language-js">False</code> if the <a href="{{$subpages['concepts']['url'] . '#ref-clone'}}" title="clone">clone</a> slid back to its starting position.
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    onLeftEnd: function(instance, index, didSlideOut) {
        if (didSlideOut) {
            console.log(&#39;List item &#39; + index + &#39; slid out of the list&#39;);
        } else {
            console.log(&#39;List item &#39; + index + &#39; slid back to its starting position&#39;);
        }
    }
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="subsection-cont">
    <a id="{{$refs_events['onLeftSlideBackStart']['aref']}}" class="title-subsection">
        {{$refs_events['onLeftSlideBackStart']['title']}}
    </a>
    <p>
        Triggered when a list item starts sliding back to its starting position after being swiped to the left.
    </p>
    <div class="function">
        onLeftSlideBackStart(instance, index)
    </div>
    <div class="params-cont">
        <div class="param">
            <strong>instance</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Object
            </div>
            <div class="sub-param">
                The Lithium List <a href="{{ url($selectedpage['url'] . '#' . $refs_objects['instance']['aref']) }}" title="{{$refs_objects['instance']['title']}}">{{$refs_objects['instance']['title']}}</a> object.
            </div>
        </div>
        <div class="param">
            <strong>index</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Integer
            </div>
            <div class="sub-param">
                The index of the active list item.
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    onLeftSlideBackStart: function(instance, index) {
        console.log(&#39;List item &#39; + index + &#39; is starting to slide back to its starting position&#39;);
    }
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="subsection-cont">
    <a id="{{$refs_events['onLeftSlideOutStart']['aref']}}" class="title-subsection">
        {{$refs_events['onLeftSlideOutStart']['title']}}
    </a>
    <p>
        Triggered when a list item starts sliding out of the list after being swiped to the left.
    </p>
    <div class="function">
        onLeftSlideOutStart(instance, index)
    </div>
    <div class="params-cont">
        <div class="param">
            <strong>instance</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Object
            </div>
            <div class="sub-param">
                The Lithium List <a href="{{ url($selectedpage['url'] . '#' . $refs_objects['instance']['aref']) }}" title="{{$refs_objects['instance']['title']}}">{{$refs_objects['instance']['title']}}</a> object.
            </div>
        </div>
        <div class="param">
            <strong>index</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Integer
            </div>
            <div class="sub-param">
                The index of the active list item.
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    onLeftSlideOutStart: function(instance, index) {
        console.log(&#39;List item &#39; + index + &#39; is starting to slide out of the list&#39;);
    }
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="subsection-cont">
    <a id="{{$refs_events['onLeftStart']['aref']}}" class="title-subsection">
        {{$refs_events['onLeftStart']['title']}}
    </a>
    <p>
        Triggered at the start of a left slide.
    </p>
    <div class="function">
        onLeftStart(instance, index)
    </div>
    <div class="params-cont">
        <div class="param">
            <strong>instance</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Object
            </div>
            <div class="sub-param">
                The Lithium List <a href="{{ url($selectedpage['url'] . '#' . $refs_objects['instance']['aref']) }}" title="{{$refs_objects['instance']['title']}}">{{$refs_objects['instance']['title']}}</a> object.
            </div>
        </div>
        <div class="param">
            <strong>index</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Integer
            </div>
            <div class="sub-param">
                The index of the active list item.
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    onLeftStart: function(instance, index) {
        console.log(&#39;List item &#39; + index + &#39; is starting to slide left&#39;);
    }
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="subsection-cont">
    <a id="{{$refs_events['onRightEnd']['aref']}}" class="title-subsection">
        {{$refs_events['onRightEnd']['title']}}
    </a>
    <p>
        Triggered at the completion of a right slide.
    </p>
    <div class="function">
        onRightEnd(instance, index, didSlideOut)
    </div>
    <div class="params-cont">
        <div class="param">
            <strong>instance</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Object
            </div>
            <div class="sub-param">
                The Lithium List <a href="{{ url($selectedpage['url'] . '#' . $refs_objects['instance']['aref']) }}" title="{{$refs_objects['instance']['title']}}">{{$refs_objects['instance']['title']}}</a> object.
            </div>
        </div>
        <div class="param">
            <strong>index</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Integer
            </div>
            <div class="sub-param">
                The index of the active list item.
            </div>
        </div>
        <div class="param">
            <strong>didSlideOut</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Boolean
            </div>
            <div class="sub-param">
                <code class="language-js">True</code> if the slide finished with the <a href="{{$subpages['concepts']['url'] . '#ref-clone'}}" title="clone">clone</a> sliding out of the list. <code class="language-js">False</code> if the <a href="{{$subpages['concepts']['url'] . '#ref-clone'}}" title="clone">clone</a> slid back to its starting position.
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    onRightEnd: function(instance, index, didSlideOut) {
        if (didSlideOut) {
            console.log(&#39;List item &#39; + index + &#39; slid out of the list&#39;);
        } else {
            console.log(&#39;List item &#39; + index + &#39; slid back to its starting position&#39;);
        }
    }
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="subsection-cont">
    <a id="{{$refs_events['onRightSlideBackStart']['aref']}}" class="title-subsection">
        {{$refs_events['onRightSlideBackStart']['title']}}
    </a>
    <p>
        Triggered when a list item starts sliding back to its starting position after being swiped to the right.
    </p>
    <div class="function">
        onRightSlideBackStart(instance, index)
    </div>
    <div class="params-cont">
        <div class="param">
            <strong>instance</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Object
            </div>
            <div class="sub-param">
                The Lithium List <a href="{{ url($selectedpage['url'] . '#' . $refs_objects['instance']['aref']) }}" title="{{$refs_objects['instance']['title']}}">{{$refs_objects['instance']['title']}}</a> object.
            </div>
        </div>
        <div class="param">
            <strong>index</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Integer
            </div>
            <div class="sub-param">
                The index of the active list item.
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    onRightSlideBackStart: function(instance, index) {
        console.log(&#39;List item &#39; + index + &#39; is starting to slide back to its starting position&#39;);
    }
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="subsection-cont">
    <a id="{{$refs_events['onRightSlideOutStart']['aref']}}" class="title-subsection">
        {{$refs_events['onRightSlideOutStart']['title']}}
    </a>
    <p>
        Triggered when a list item starts sliding out of the list after being swiped to the right.
    </p>
    <div class="function">
        onRightSlideOutStart(instance, index)
    </div>
    <div class="params-cont">
        <div class="param">
            <strong>instance</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Object
            </div>
            <div class="sub-param">
                The Lithium List <a href="{{ url($selectedpage['url'] . '#' . $refs_objects['instance']['aref']) }}" title="{{$refs_objects['instance']['title']}}">{{$refs_objects['instance']['title']}}</a> object.
            </div>
        </div>
        <div class="param">
            <strong>index</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Integer
            </div>
            <div class="sub-param">
                The index of the active list item.
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    onRightSlideOutStart: function(instance, index) {
        console.log(&#39;List item &#39; + index + &#39; is starting to slide out of the list&#39;);
    }
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="subsection-cont">
    <a id="{{$refs_events['onRightStart']['aref']}}" class="title-subsection">
        {{$refs_events['onRightStart']['title']}}
    </a>
    <p>
        Triggered at the start of a right slide.
    </p>
    <div class="function">
        onRightStart(instance, index)
    </div>
    <div class="params-cont">
        <div class="param">
            <strong>instance</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Object
            </div>
            <div class="sub-param">
                The Lithium List <a href="{{ url($selectedpage['url'] . '#' . $refs_objects['instance']['aref']) }}" title="{{$refs_objects['instance']['title']}}">{{$refs_objects['instance']['title']}}</a> object.
            </div>
        </div>
        <div class="param">
            <strong>index</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Integer
            </div>
            <div class="sub-param">
                The index of the active list item.
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    onRightStart: function(instance, index) {
        console.log(&#39;List item &#39; + index + &#39; is starting to slide right&#39;);
    }
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="subsection-cont">
    <a id="{{$refs_events['onSortAutoScrollEnd']['aref']}}" class="title-subsection">
        {{$refs_events['onSortAutoScrollEnd']['title']}}
    </a>
    <p>
        Triggered when automatic scrolling stops.
    </p>
    <div class="function">
        onSortAutoScrollEnd(instance, index)
    </div>
    <div class="params-cont">
        <div class="param">
            <strong>instance</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Object
            </div>
            <div class="sub-param">
                The Lithium List <a href="{{ url($selectedpage['url'] . '#' . $refs_objects['instance']['aref']) }}" title="{{$refs_objects['instance']['title']}}">{{$refs_objects['instance']['title']}}</a> object.
            </div>
        </div>
        <div class="param">
            <strong>index</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Integer
            </div>
            <div class="sub-param">
                The index of the active list item.
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    onSortAutoScrollEnd: function(instance, index) {
        console.log(&#39;Automatic scrolling stopped and list item &#39; + index + &#39; was sorted&#39;);
    }
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="subsection-cont">
    <a id="{{$refs_events['onSortAutoScrollStart']['aref']}}" class="title-subsection">
        {{$refs_events['onSortAutoScrollStart']['title']}}
    </a>
    <p>
        Triggered when automatic scrolling starts.
    </p>
    <div class="function">
        onSortAutoScrollStart(instance, index, scrollingUp)
    </div>
    <div class="params-cont">
        <div class="param">
            <strong>instance</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Object
            </div>
            <div class="sub-param">
                The Lithium List <a href="{{ url($selectedpage['url'] . '#' . $refs_objects['instance']['aref']) }}" title="{{$refs_objects['instance']['title']}}">{{$refs_objects['instance']['title']}}</a> object.
            </div>
        </div>
        <div class="param">
            <strong>index</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Integer
            </div>
            <div class="sub-param">
                The index of the active list item.
            </div>
        </div>
        <div class="param">
            <strong>scrollingUp</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Boolean
            </div>
            <div class="sub-param">
                <code class="language-js">True</code> if the list is scrolling up and <code class="language-js">false</code> if it is scrolling down.
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    onSortAutoScrollStart: function(instance, index, scrollingUp) {
        if (scrollingUp) {
            console.log(&#39;Automatic up-scrolling started and list item &#39; + index + &#39; is being sorted&#39;);
        } else {
            console.log(&#39;Automatic down-scrolling started and list item &#39; + index + &#39; is being sorted&#39;);
        }
    }
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>


<div class="subsection-cont">
    <a id="{{$refs_events['onSortEnd']['aref']}}" class="title-subsection">
        {{$refs_events['onSortEnd']['title']}}
    </a>
    <p>
        Triggered when sorting stops.
    </p>
    <div class="function">
        onSortEnd(instance, oldIndex, newIndex)
    </div>
    <div class="params-cont">
        <div class="param">
            <strong>instance</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Object
            </div>
            <div class="sub-param">
                The Lithium List <a href="{{ url($selectedpage['url'] . '#' . $refs_objects['instance']['aref']) }}" title="{{$refs_objects['instance']['title']}}">{{$refs_objects['instance']['title']}}</a> object.
            </div>
        </div>
        <div class="param">
            <strong>oldIndex</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Integer
            </div>
            <div class="sub-param">
                The old index of the active list item.
            </div>
        </div>
        <div class="param">
            <strong>newIndex</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Integer
            </div>
            <div class="sub-param">
                The new index of the active list item.
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
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
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="subsection-cont">
    <a id="{{$refs_events['onSortStart']['aref']}}" class="title-subsection">
        {{$refs_events['onSortStart']['title']}}
    </a>
    <p>
        Triggered when sorting starts.
    </p>
    <div class="function">
        onSortStart(instance, index)
    </div>
    <div class="params-cont">
        <div class="param">
            <strong>instance</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Object
            </div>
            <div class="sub-param">
                The Lithium List <a href="{{ url($selectedpage['url'] . '#' . $refs_objects['instance']['aref']) }}" title="{{$refs_objects['instance']['title']}}">{{$refs_objects['instance']['title']}}</a> object.
            </div>
        </div>
        <div class="param">
            <strong>index</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Integer
            </div>
            <div class="sub-param">
                The index of the active list item.
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    onSortStart: function(instance, index) {
        console.log(&#39;Sorting of list item &#39; + index + &#39; started&#39;);
    }
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>