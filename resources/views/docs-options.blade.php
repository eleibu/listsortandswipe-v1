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
    $overviewUrl = '/docs/options-events-and-methods#ref-';
@endphp
<div class="pagelinks">
    @foreach ($refs as $ref)
        <a class="button-word-cont" href="{{ url($selectedpage['url'] . '#' . $ref['aref']) }}" title="{{$ref['title']}}">{{$ref['title']}}</a>
    @endforeach
</div>
<div class="section-cont">
<!--
DONE safariAutoOuterOverflow: true,                                                     // applies only to Safari on MacOS
DONE safariBodyUnselectable: true,                                                       // applies only to Safari on MacOS
sortByDrag: true,
sortCloneBoxShadow: '0 5px 14px rgba(0,0,0,0.15), 0 6px 6px rgba(0,0,0,0.12)',      // not validated (other than string of length >0)
sortCloneClass: 'sort-clone',
sortCloneScale: '1.02',                                                             // not validated (other than string of length >0)
sortDragHandleClass: 'sort-drag-handle',
sortEnabled: true,
sortEndDuration: 300,
sortItemActiveHide: true,
sortItemActiveClass: 'sort-item-active',
sortListClass: 'sort-list',
sortMoveStartDelay: 400,
sortOuterClass: 'sort-outer',
sortScrollEnabled: true,
sortScrollSpeed: 3,
sortStartDuration: 300,
sortReorderDuration: 200,
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
        'leftCloneSlideBackClass' => array(
            'aref' => 'ref-leftCloneSlideBackClass',
            'title' => 'leftCloneSlideBackClass'
        ),
        'leftCloneSlideOutClass' => array(
            'aref' => 'ref-leftCloneSlideOutClass',
            'title' => 'leftCloneSlideOutClass'
        ),
        'leftEnabled' => array(
            'aref' => 'ref-leftEnabled',
            'title' => 'leftEnabled'
        ),
        'leftItemActiveClass' => array(
            'aref' => 'ref-leftItemActiveClass',
            'title' => 'leftItemActiveClass'
        ),
        'leftListClass' => array(
            'aref' => 'ref-leftListClass',
            'title' => 'leftListClass'
        ),
        'leftMasks' => array(
            'aref' => 'ref-leftMasks',
            'title' => 'leftMasks'
        ),
        'leftOuterClass' => array(
            'aref' => 'ref-leftOuterClass',
            'title' => 'leftOuterClass'
        ),
        'leftSlideBackDuration' => array(
            'aref' => 'ref-leftSlideBackDuration',
            'title' => 'leftSlideBackDuration'
        ),
        'leftSlideOutDuration' => array(
            'aref' => 'ref-leftSlideOutDuration',
            'title' => 'leftSlideOutDuration'
        ),
        'leftSwipeEndThreshold' => array(
            'aref' => 'ref-leftSwipeEndThreshold',
            'title' => 'leftSwipeEndThreshold'
        ),
        'leftSwipeStartThreshold' => array(
            'aref' => 'ref-leftSwipeStartThreshold',
            'title' => 'leftSwipeStartThreshold'
        ),

        'safariAutoOuterOverflow' => array(
            'aref' => 'ref-safariAutoOuterOverflow',
            'title' => 'safariAutoOuterOverflow'
        ),
        'safariBodyUnselectable' => array(
            'aref' => 'ref-safariBodyUnselectable',
            'title' => 'safariBodyUnselectable'
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
<pre class="line-numbers"><code class="language-js">var props = {
    ignoreOnClick: [&#39;input&#39;, &#39;textarea&#39;, &#39;select&#39;, &#39;option&#39;, &#39;button&#39;]
};
lithiumlist.attachToList(
    ...,
    props
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
<pre class="line-numbers"><code class="language-js">var props = {
    leftButon: &#39;left-button&#39;
};
lithiumlist.attachToList(
    ...,
    props
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
<pre class="line-numbers"><code class="language-js">var props = {
    leftBySwipe: false
};
lithiumlist.attachToList(
    ...,
    props
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
            A class name that is added to the <a href="{{$subpages['overview-of-functionality']['url'] . '#ref-clone'}}" title="clone">clone</a> during left sliding.
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftCloneClass: &#39;left-clone&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
    </div>

    <div class="subsection-cont">
        <a id="{{$refs_options['leftCloneSlideBackClass']['aref']}}" class="title-subsection">
            {{$refs_options['leftCloneSlideBackClass']['title']}}
        </a>
        <div class="params-cont">
            <div class="param">
                <strong>Type:</strong> String
            </div>
            <div class="param">
                <strong>Default:</strong> <code class="language-js">&#39;left-clone-slide-back&#39;</code>
            </div>
        </div>
        <p>
            A class name that is added to the <a href="{{$subpages['overview-of-functionality']['url'] . '#ref-clone'}}" title="clone">clone</a> for left sliding while it is sliding back to its starting position.
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftCloneSlideBackClass: &#39;left-clone-slide-back&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
    </div>

    <div class="subsection-cont">
        <a id="{{$refs_options['leftCloneSlideOutClass']['aref']}}" class="title-subsection">
            {{$refs_options['leftCloneSlideOutClass']['title']}}
        </a>
        <div class="params-cont">
            <div class="param">
                <strong>Type:</strong> String
            </div>
            <div class="param">
                <strong>Default:</strong> <code class="language-js">&#39;left-clone-slide-out&#39;</code>
            </div>
        </div>
        <p>
            A class name that is added to the <a href="{{$subpages['overview-of-functionality']['url'] . '#ref-clone'}}" title="clone">clone</a> for left sliding while it is sliding out of the list.
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftCloneSlideOutClass: &#39;left-clone-slide-out&#39;
};
lithiumlist.attachToList(
    ...,
    props
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
<pre class="line-numbers"><code class="language-js">var props = {
    leftEnabled: false
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
    </div>

    <div class="subsection-cont">
        <a id="{{$refs_options['leftItemActiveClass']['aref']}}" class="title-subsection">
            {{$refs_options['leftItemActiveClass']['title']}}
        </a>
        <div class="params-cont">
            <div class="param">
                <strong>Type:</strong> String
            </div>
            <div class="param">
                <strong>Default:</strong> <code class="language-js">&#39;left-item-active&#39;</code>
            </div>
        </div>
        <p>
            A class name that is added to the active list item during left sliding.
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftItemActiveClass: 'left-item-active'
};
lithiumlist.attachToList(
    ...,
    props
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
<pre class="line-numbers"><code class="language-js">var props = {
    leftListClass: 'left-list'
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
    </div>

    <div class="subsection-cont">
        <a id="{{$refs_options['leftMasks']['aref']}}" class="title-subsection">
            {{$refs_options['leftMasks']['title']}}
        </a>
        <div class="params-cont">
            <div class="param">
                <strong>Type:</strong> Array
            </div>
            <div class="param">
                <strong>Default:</strong>
                <pre><code class="language-js">[{
    background: &#39;rgba(252, 13, 27, 1)&#39;,
    classNameDefault: &#39;left-mask&#39;,
    classNameSlideOut: &#39;left-mask-slide-out&#39;,
    classNameSlideBack: &#39;left-mask-slide-back&#39;,
    childNode: null
}]</code></pre>
            </div>
        </div>
        <p>
            An array of objects, each of which contains the properties of a <a href="{{$subpages['overview-of-functionality']['url'] . '#ref-masks'}}" title="mask">mask</a> that will cover the active list item during left sliding. Currently, only the first element in the array is used. All others are ignored. If the array is empty, no <a href="{{$subpages['overview-of-functionality']['url'] . '#ref-masks'}}" title="mask">mask</a> will appear during left sliding.
        </p>
        <p>
            Each object must have the following properties:
        </p>
        <div class="params-cont">
            <div class="param">
                <strong>background</strong>
            </div>
            <div class="sub-params-cont">
                <div class="sub-param">
                    Type: String
                </div>
                <div class="sub-param">
                    A value that is set as the <a href="{{$subpages['overview-of-functionality']['url'] . '#ref-masks'}}" title="mask">mask&#39;s</a> &#39;background&#39; style.
                </div>
            </div>
            <div class="param">
                <strong>classNameDefault</strong>
            </div>
            <div class="sub-params-cont">
                <div class="sub-param">
                    Type: String
                </div>
                <div class="sub-param">
                    A class name that is added to the <a href="{{$subpages['overview-of-functionality']['url'] . '#ref-masks'}}" title="mask">mask</a>.
                </div>
            </div>
            <div class="param">
                <strong>classNameSlideOut</strong>
            </div>
            <div class="sub-params-cont">
                <div class="sub-param">
                    Type: String
                </div>
                <div class="sub-param">
                    A class name that is added to the <a href="{{$subpages['overview-of-functionality']['url'] . '#ref-masks'}}" title="mask">mask</a> while the <a href="{{$subpages['overview-of-functionality']['url'] . '#ref-clone'}}" title="clone">clone</a> is sliding out of the list.
                </div>
            </div>
            <div class="param">
                <strong>classNameSlideBack</strong>
            </div>
            <div class="sub-params-cont">
                <div class="sub-param">
                    Type: String
                </div>
                <div class="sub-param">
                    A class name that is added to the <a href="{{$subpages['overview-of-functionality']['url'] . '#ref-masks'}}" title="mask">mask</a> while the <a href="{{$subpages['overview-of-functionality']['url'] . '#ref-clone'}}" title="clone">clone</a> is sliding back to its starting position.
                </div>
            </div>
            <div class="param">
                <strong>childNode</strong>
            </div>
            <div class="sub-params-cont">
                <div class="sub-param">
                    Type: Element
                </div>
                <div class="sub-param">
                    An HTML element (which way contain child elements) that is appended to the <a href="{{$subpages['overview-of-functionality']['url'] . '#ref-masks'}}" title="mask">mask</a>. Useful for inserting an icon or label indicating to the user what left sliding will do.
                </div>
            </div>
        </div>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftMasks: [{
        background: &#39;rgba(252, 13, 27, 1)&#39;,
        classNameDefault: &#39;left-mask&#39;,
        classNameSlideOut: &#39;left-mask-slide-out&#39;,
        classNameSlideBack: &#39;left-mask-slide-back&#39;,
        childNode: null
    }]
};
lithiumlist.attachToList(
    ...,
    props
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
            A class that is added to <strong><span class="outer-cont">outerCont</span></strong> when a list item begins sliding to the left (either via a swipe or because a left button was clicked/tapped). Has no effect if <strong><span class="outer-cont">outerCont</span></strong> is <code class="language-js">window</code>.
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftOuterClass: 'left-outer'
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
    </div>

    <div class="subsection-cont">
        <a id="{{$refs_options['leftSlideBackDuration']['aref']}}" class="title-subsection">
            {{$refs_options['leftSlideBackDuration']['title']}}
        </a>
        <div class="params-cont">
            <div class="param">
                <strong>Type:</strong> Integer
            </div>
            <div class="param">
                <strong>Default:</strong> <code class="language-js">200</code>
            </div>
        </div>
        <p>
            The duration, in milliseconds, of the left slide back animation.
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftSlideBackDuration: 200
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
    </div>

    <div class="subsection-cont">
        <a id="{{$refs_options['leftSlideOutDuration']['aref']}}" class="title-subsection">
            {{$refs_options['leftSlideOutDuration']['title']}}
        </a>
        <div class="params-cont">
            <div class="param">
                <strong>Type:</strong> Integer
            </div>
            <div class="param">
                <strong>Default:</strong> <code class="language-js">300</code>
            </div>
        </div>
        <p>
            The duration, in milliseconds, of the left slide out animation.
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftSlideOutDuration: 300
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
    </div>

    <div class="subsection-cont">
        <a id="{{$refs_options['leftSwipeEndThreshold']['aref']}}" class="title-subsection">
            {{$refs_options['leftSwipeEndThreshold']['title']}}
        </a>
        <div class="params-cont">
            <div class="param">
                <strong>Type:</strong> String
            </div>
            <div class="param">
                <strong>Default:</strong> <code class="language-js">&#39;30%&#39;</code>
            </div>
        </div>
        <p>
            The threshold at which a left swipe will, when released, slide out. Must be a percentage (for example, &#39;30%&#39;) or a number of pixels (for example, &#39;20px&#39;). In either case, it is measured from the right edge of <strong><span class="list-cont">listCont</span></strong>.
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftSwipeEndThreshold: &#39;30%&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
    </div>

    <div class="subsection-cont">
        <a id="{{$refs_options['leftSwipeStartThreshold']['aref']}}" class="title-subsection">
            {{$refs_options['leftSwipeStartThreshold']['title']}}
        </a>
        <div class="params-cont">
            <div class="param">
                <strong>Type:</strong> String
            </div>
            <div class="param">
                <strong>Default:</strong> <code class="language-js">&#39;10px&#39;</code>
            </div>
        </div>
        <p>
            The threshold at which a left swipe will start moving the item. Must be a percentage (for example, &#39;5%&#39;) or a number of pixels (for example, &#39;10px&#39;). In either case, it is measured from the right edge of <strong><span class="list-cont">listCont</span></strong>.
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftSwipeStartThreshold: &#39;10px&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
    </div>

    <div class="subsection-cont">
        <a id="{{$refs_options['safariAutoOuterOverflow']['aref']}}" class="title-subsection">
            {{$refs_options['safariAutoOuterOverflow']['title']}}
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
            Applies only to desktop Safari. Ignored in all other browsers.
        </p>
        <p>
            Setting <code class="language-css">overflow: hidden</code> on <strong><span class="outer-cont">outerCont</span></strong> fixes an issue in desktop Safari that interferes with automatic scrolling. By default, Lithium List applies this fix during automatic scrolling. In the unlikely event this behaviour is undesireable, set this option to <code class="language-js">false</code>.
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var props = {
    safariAutoOuterOverflow: false
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
    </div>

    <div class="subsection-cont">
        <a id="{{$refs_options['safariBodyUnselectable']['aref']}}" class="title-subsection">
            {{$refs_options['safariBodyUnselectable']['title']}}
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
            Applies only to desktop Safari. Ignored in all other browsers.
        </p>
        <p>
            Setting <code class="language-css">user-select: none</code> on the <code class="language-markup">&lt;body&gt;</code> element fixes an issue in desktop Safari regarding text selection outside of <strong><span class="outer-cont">outerCont</span></strong> during sorting and swiping. By default, Lithium List applies this fix during these operations. In the unlikely event this behaviour is undesireable, set this option to <code class="language-js">false</code>.
        </p>
        <div class="title-codeblock">
            EXAMPLE JS
        </div>
<pre class="line-numbers"><code class="language-js">var props = {
    safariBodyUnselectable: false
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
    </div>

</div>