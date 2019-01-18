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
        'onrightEnd' => array(
            'aref' => 'ref-onrightEnd',
            'title' => 'onrightEnd'
        ),
        'onrightSlideBackStart' => array(
            'aref' => 'ref-onrightSlideBackStart',
            'title' => 'onrightSlideBackStart'
        ),
        'onrightSlideOutStart' => array(
            'aref' => 'ref-onrightSlideOutStart',
            'title' => 'onrightSlideOutStart'
        ),
        'onrightStart' => array(
            'aref' => 'ref-onrightStart',
            'title' => 'onrightStart'
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

        // DONE onLeftEnd: null,
        // DONE onLeftSlideBackStart: null,
        // DONE onLeftSlideOutStart: null,
        // DONE onLeftStart: null,

        // onRightEnd: null,
        // onRightSlideBackStart: null,
        // onRightSlideOutStart: null,
        // onRightStart: null,

        // onSortAutoScrollEnd: null,
        // onSortAutoScrollStart: null,
        // onSortEnd: null,
        // onSortStart: null,

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
                <code class="language-js">True</code> if the slide finished with the <a href="{{$subpages['overview-of-functionality']['url'] . '#ref-clone'}}" title="clone">clone</a> sliding out of the list. <code class="language-js">False</code> if the <a href="{{$subpages['overview-of-functionality']['url'] . '#ref-clone'}}" title="clone">clone</a> slid back to its starting position.
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



