@php
    $refs = array(
        'options' => array(
            'aref' => 'ref-options',
            'title' => 'Options'
        ),
        'events' => array(
            'aref' => 'ref-events',
            'title' => 'Events'
        ),
        'methods' => array(
            'aref' => 'ref-methods',
            'title' => 'Methods'
        )
    );
@endphp
<div class="pagelinks">
    @foreach ($refs as $ref)
        <a class="button-word-cont" href="{{ url($selectedpage['url'] . '#' . $ref['aref']) }}" title="{{$ref['title']}}">{{$ref['title']}}</a>
    @endforeach
</div>
<div class="section-cont">
<!--         sortEnabled: true,
        sortByDrag: true,
        sortStartDuration: 300,
        sortEndDuration: 300,
        sortScrollClass: 'sort-scroll',
        sortCloneClass: 'sort-clone',
        sortCloneBoxShadow: '0 5px 14px rgba(0,0,0,0.15), 0 6px 6px rgba(0,0,0,0.12)',      // not validated (other than string of length >0)
        sortCloneScale: '1.02',                                                             // not validated (other than string of length >0)
        sortItemActiveHide: true,
        sortItemActiveClass: 'sort-item-active',
        sortDragHandleClass: 'sort-drag-handle',
        sortMoveStartDelay: 400,
        sortReorderDuration: 200,
        sortScrollSpeed: 3,
        safariBodyUnselectable: true,                                                       // applies only to Safari on MacOS
        safariAutoScrollOverflow: true,                                                     // applies only to Safari on MacOS


        leftScrollClass: 'left-scroll',
        leftCloneClass: 'left-clone',
        leftCloneSlideOutClass: 'left-clone-slide-out',
        leftCloneSlideBackClass: 'left-clone-slide-back',
        leftItemActiveClass: 'left-item-active',
        leftMasks: [{
            background: 'rgba(252, 13, 27, 1)',                                             // not validated (other than string of length >0)
            classNameDefault: 'left-mask',
            classNameSlideOut: 'left-mask-slide-out',
            classNameSlideBack: 'left-mask-slide-back',
            childNode: null
        }],
        leftDragHandleClass: 'left-drag-handle',
        leftDragStartThreshold: '10px',
        leftDragEndThreshold: '30%',
        leftSlideOutDuration: 300,
        leftSlideBackDuration: 200,
        rightEnabled: true,
        rightBySwipe: true,
        rightScrollClass: 'right-scroll',
        rightCloneClass: 'right-clone',
        rightCloneSlideOutClass: 'right-clone-slide-out',
        rightCloneSlideBackClass: 'right-clone-slide-back',
        rightItemActiveClass: 'right-item-active',
        rightMasks: [{
            background: 'rgba(15, 127, 18, 1)',                                             // not validated (other than string of length >0)
            classNameDefault: 'right-mask',
            classNameSlideOut: 'right-mask-slide-out',
            classNameSlideBack: 'right-mask-slide-back',
            childNode: null
        }],
        rightDragHandleClass: 'right-drag-handle',
        rightDragStartThreshold: '10px',
        rightDragEndThreshold: '30%',
        rightSlideOutDuration: 300,
        rightSlideBackDuration: 200,
        ignoreOnClick: ['input', 'textarea', 'select', 'option', 'button'] -->
 @php
    $refs_options = array(
        'leftEnabled' => array(
            'aref' => 'ref-leftEnabled',
            'title' => 'leftEnabled'
        ),
        'leftBySwipe' => array(
            'aref' => 'ref-leftBySwipe',
            'title' => 'leftBySwipe'
        ),
        'leftScrollClass' => array(
            'aref' => 'ref-leftScrollClass',
            'title' => 'leftScrollClass'
        ),
        'leftCloneClass' => array(
            'aref' => 'ref-leftCloneClass',
            'title' => 'leftCloneClass'
        )
    );
@endphp
    <a id="{{$refs['options']['aref']}}" class="title-section">
        {{$refs['options']['title']}}
    </a>
    <div class="subsection-links">
        @foreach ($refs_options as $ref_option)
            <a class="button-word-cont" href="{{ url($selectedpage['url'] . '#' . $ref_option['aref']) }}" title="{{$ref_option['title']}}">{{$ref_option['title']}}</a>
        @endforeach
    </div>
    <div class="subsection-cont">
        <a id="{{$refs_options['leftEnabled']['aref']}}" class="title-subsection">
            {{$refs_options['leftEnabled']['title']}}
        </a>
        <div class="params-cont">
            <div class="param">
                <strong>Type:</strong> Boolean
            </div>
            <div class="param">
                <strong>Default:</strong> <code class="language-js">true</code>
            </div>
        </div>
        <p>
            Enable or disable sliding items to the left. If set to <code class="language-js">false</code>, swiping an item to the left or clicking/tapping its left drag handle will do nothing.
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var options = {
    leftEnabled: false
};
lithiumlist.attachToList(
    ...,
    options
);
</code></pre>
    </div>
    <div class="subsection-cont">
        <a id="{{$refs_options['leftBySwipe']['aref']}}" class="title-subsection">
            {{$refs_options['leftBySwipe']['title']}}
        </a>
        <div class="params-cont">
            <div class="param">
                <strong>Type:</strong> Boolean
            </div>
            <div class="param">
                <strong>Default:</strong> <code class="language-js">true</code>
            </div>
        </div>
        <p>
            Enable or disable swiping items to the left.
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var options = {
    leftBySwipe: false
};
lithiumlist.attachToList(
    ...,
    options
);
</code></pre>
    </div>
    <div class="subsection-cont">
        <a id="{{$refs_options['leftScrollClass']['aref']}}" class="title-subsection">
            {{$refs_options['leftScrollClass']['title']}}
        </a>
        <div class="params-cont">
            <div class="param">
                <strong>Type:</strong> String
            </div>
            <div class="param">
                <strong>Default:</strong> <code class="language-js">&#39;left-scroll&#39;</code>
            </div>
        </div>
        <p>
            []
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var options = {
    leftScrollClass: 'left-scroll'
};
lithiumlist.attachToList(
    ...,
    options
);
</code></pre>
    </div>
</div>