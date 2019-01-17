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
        // onLeftSlideBackStart: null,
        // onLeftSlideOutStart: null,
        // onLeftStart: null,

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
            <strong>listCont</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Element
            </div>
            <div class="sub-param">
                The <strong><span class="list-cont">listCont</span></strong> in which the event occurred.
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
    onLeftEnd: function(listCont, index, didSlideOut) {
        if (didSlideOut) {
            var items = listCont.getElementsByClassName(&#39;list-item&#39;);
            listCont.removeChild(items[index]);
        }
    }
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>







