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
<!--
        DONE ignoreOnClick: ['input', 'textarea', 'select', 'option', 'button']

        DONE leftButtonClass: 'left-button',
        DONE leftBySwipe
        leftCloneClass: 'left-clone',
        leftCloneSlideBackClass: 'left-clone-slide-back',
        leftCloneSlideOutClass: 'left-clone-slide-out',
        leftEnabled
        leftItemActiveClass: 'left-item-active',
        leftListClass: 'left-list',
        leftMasks: [{
            background: 'rgba(252, 13, 27, 1)',                                             // not validated (other than string of length >0)
            classNameDefault: 'left-mask',
            classNameSlideOut: 'left-mask-slide-out',
            classNameSlideBack: 'left-mask-slide-back',
            childNode: null
        }],
        leftOuterClass: 'left-outer',
        leftSlideBackDuration: 200,
        leftSlideOutDuration: 300,
        leftSwipeEndThreshold: '30%',
        leftSwipeStartThreshold: '10px',


        rightEnabled: true,
        rightBySwipe: true,
        rightOuterClass: 'right-outer',
        rightListClass: 'right-list',
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
        rightButtonClass: 'right-button',
        rightSwipeStartThreshold: '10px',
        rightSwipeEndThreshold: '30%',
        rightSlideOutDuration: 300,
        rightSlideBackDuration: 200,

        sortEnabled: true,
        sortByDrag: true,
        sortStartDuration: 300,
        sortEndDuration: 300,
        sortOuterClass: 'sort-outer',
        sortCloneClass: 'sort-clone',
        sortListClass: 'sort-list',
        sortCloneBoxShadow: '0 5px 14px rgba(0,0,0,0.15), 0 6px 6px rgba(0,0,0,0.12)',      // not validated (other than string of length >0)
        sortCloneScale: '1.02',                                                             // not validated (other than string of length >0)
        sortItemActiveHide: true,
        sortItemActiveClass: 'sort-item-active',
        sortDragHandleClass: 'sort-drag-handle',
        sortMoveStartDelay: 400,
        sortReorderDuration: 200,
        sortScrollEnabled: true,
        sortScrollSpeed: 3,
        safariBodyUnselectable: true,                                                       // applies only to Safari on MacOS
        safariAutoOuterOverflow: true,                                                     // applies only to Safari on MacOS

-->
 @php
    $refs_options = array(
        'ignoreOnClick' => array(
            'aref' => 'ref-ignoreOnClick',
            'title' => 'ignoreOnClick'
        ),
        'leftButtonClass' => array(
            'aref' => 'ref-leftButtonClass',
            'title' => 'leftButtonClass'
        ),
        'leftBySwipe' => array(
            'aref' => 'ref-leftBySwipe',
            'title' => 'leftBySwipe'
        ),
        'leftCloneClass' => array(
            'aref' => 'ref-leftCloneClass',
            'title' => 'leftCloneClass'
        ),



        'leftEnabled' => array(
            'aref' => 'ref-leftEnabled',
            'title' => 'leftEnabled'
        ),
        'leftListClass' => array(
            'aref' => 'ref-leftListClass',
            'title' => 'leftListClass'
        ),
        'leftOuterClass' => array(
            'aref' => 'ref-leftOuterClass',
            'title' => 'leftOuterClass'
        ),
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
        <a id="{{$refs_options['ignoreOnClick']['aref']}}" class="title-subsection">
            {{$refs_options['ignoreOnClick']['title']}}
        </a>
        <div class="params-cont">
            <div class="param">
                <strong>Type:</strong> Array
            </div>
            <div class="param">
                <strong>Default:</strong> <code class="language-js">[&#39;input&#39;, &#39;textarea&#39;, &#39;select&#39;, &#39;option&#39;, &#39;button&#39;]</code>
            </div>
        </div>
        <p>
            The names of DOM elements to ignore when clicked/tapped.
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var options = {
    ignoreOnClick: [&#39;input&#39;, &#39;textarea&#39;, &#39;select&#39;, &#39;option&#39;, &#39;button&#39;]
};
lithiumlist.attachToList(
    ...,
    options
);
</code></pre>
    </div>
    <div class="subsection-cont">
        <a id="{{$refs_options['leftButtonClass']['aref']}}" class="title-subsection">
            {{$refs_options['leftButtonClass']['title']}}
        </a>
        <div class="params-cont">
            <div class="param">
                <strong>Type:</strong> String
            </div>
            <div class="param">
                <strong>Default:</strong> <code class="language-js">&#39;left-button&#39;</code>
            </div>
        </div>
        <p>
            The class name of DOM elements that will act as buttons to trigger an automatic full left swipe of the list item.
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var options = {
    leftButon: &#39;left-button&#39;
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
            Enable or disable swiping list items to the left.
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
        <a id="{{$refs_options['leftCloneClass']['aref']}}" class="title-subsection">
            {{$refs_options['leftCloneClass']['title']}}
        </a>
        <div class="params-cont">
            <div class="param">
                <strong>Type:</strong> String
            </div>
            <div class="param">
                <strong>Default:</strong> <code class="language-js">&#39;left-clone&#39;</code>
            </div>
        </div>
        <p>
            The class name added to the [ACTIVE ITEM CLONE - make this a link] during left sliding.
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var options = {
    leftCloneClass: &#39;left-clone&#39;
};
lithiumlist.attachToList(
    ...,
    options
);
</code></pre>
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
            Enable or disable sliding list items to the left. If set to <code class="language-js">false</code>, swiping a list item to the left or clicking/tapping a left button will do nothing.
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
        <a id="{{$refs_options['leftListClass']['aref']}}" class="title-subsection">
            {{$refs_options['leftListClass']['title']}}
        </a>
        <div class="params-cont">
            <div class="param">
                <strong>Type:</strong> String
            </div>
            <div class="param">
                <strong>Default:</strong> <code class="language-js">&#39;left-list&#39;</code>
            </div>
        </div>
        <p>
            A class that is added to <strong><span class="list-cont">listCont</span></strong> when a list item begins sliding to the left (either via a swipe or because a left button was clicked/tapped).
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var options = {
    leftListClass: 'left-list'
};
lithiumlist.attachToList(
    ...,
    options
);
</code></pre>
    </div>
    <div class="subsection-cont">
        <a id="{{$refs_options['leftOuterClass']['aref']}}" class="title-subsection">
            {{$refs_options['leftOuterClass']['title']}}
        </a>
        <div class="params-cont">
            <div class="param">
                <strong>Type:</strong> String
            </div>
            <div class="param">
                <strong>Default:</strong> <code class="language-js">&#39;left-outer&#39;</code>
            </div>
        </div>
        <p>
            A class that is added to <strong><span class="outer-cont">outerCont</span></strong> when a list item begins sliding to the left (either via a swipe or because a left button was clicked/tapped).
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var options = {
    leftOuterClass: 'left-outer'
};
lithiumlist.attachToList(
    ...,
    options
);
</code></pre>
    </div>

</div>