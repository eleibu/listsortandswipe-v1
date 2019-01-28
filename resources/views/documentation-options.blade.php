<div class="pagelinks">
    @foreach ($refs_options as $ref)
        <a class="button-word-cont" href="{{ url($selectedpage['url'] . '#' . $ref['aref']) }}" title="{{$ref['title']}}">{{$ref['title']}}</a>
    @endforeach
</div>
<div class="section-cont">
    <a id="{{$refs_options['ignoreOnClick']['aref']}}" class="title-section">
        {{$refs_options['ignoreOnClick']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Array
        </div>
        <div class="param">
            Default: <code class="language-js">[&#39;input&#39;, &#39;textarea&#39;, &#39;select&#39;, &#39;option&#39;, &#39;button&#39;]</code>
        </div>
    </div>
    <p>
        The names of DOM elements to ignore when pressed.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    ignoreOnClick: [&#39;input&#39;, &#39;textarea&#39;]
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['leftButtonClass']['aref']}}" class="title-section">
        {{$refs_options['leftButtonClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;left-button&#39;</code>
        </div>
    </div>
    <p>
        The class name of DOM elements that will act as buttons to trigger an automatic full left slide of the list item.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftButon: &#39;button-left&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['leftBySwipe']['aref']}}" class="title-section">
        {{$refs_options['leftBySwipe']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Boolean
        </div>
        <div class="param">
            Default: <code class="language-js">true</code>
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

<div class="section-cont">
    <a id="{{$refs_options['leftCloneClass']['aref']}}" class="title-section">
        {{$refs_options['leftCloneClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;left-clone&#39;</code>
        </div>
    </div>
    <p>
        The active list item is cloned during sorting and sliding. This option sets a class name that is added to the clone during left sliding.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftCloneClass: &#39;clone-left&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['leftCloneSlideBackClass']['aref']}}" class="title-section">
        {{$refs_options['leftCloneSlideBackClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;left-clone-slide-back&#39;</code>
        </div>
    </div>
    <p>
        The active list item is cloned during sorting and sliding. This option sets a class name that is added to the clone while it is sliding back to its starting position at the end of a left slide.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftCloneSlideBackClass: &#39;back-slide-clone-left&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['leftCloneSlideOutClass']['aref']}}" class="title-section">
        {{$refs_options['leftCloneSlideOutClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;left-clone-slide-out&#39;</code>
        </div>
    </div>
    <p>
        The active list item is cloned during sorting and sliding. This option sets a class name that is added to the clone while it is sliding out of the list at the end of a left slide.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftCloneSlideOutClass: &#39;out-slide-clone-left&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['leftEnabled']['aref']}}" class="title-section">
        {{$refs_options['leftEnabled']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Boolean
        </div>
        <div class="param">
            Default: <code class="language-js">true</code>
        </div>
    </div>
    <p>
        Enable or disable sliding list items to the left. If set to <code class="language-js">false</code>, swiping a list item to the left or pressing a left button will do nothing.
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

<div class="section-cont">
    <a id="{{$refs_options['leftItemActiveClass']['aref']}}" class="title-section">
        {{$refs_options['leftItemActiveClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;left-item-active&#39;</code>
        </div>
    </div>
    <p>
        A class name that is added to the active list item during left sliding.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftItemActiveClass: 'active-item-left'
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['leftListClass']['aref']}}" class="title-section">
        {{$refs_options['leftListClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;left-list&#39;</code>
        </div>
    </div>
    <p>
        A class name that is added to <strong><span class="list-cont">listCont</span></strong> when a list item begins sliding to the left (either via a swipe or because a left button was pressed).
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftListClass: 'list-left'
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['leftMasks']['aref']}}" class="title-section">
        {{$refs_options['leftMasks']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Array
        </div>
        <div class="param">
            Default:
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
        An array of objects, each of which contains the properties of a mask that will cover the active list item during left sliding. Currently, only the first element in the array is used. All others are ignored. If the array is empty, no mask will appear during left sliding.
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
                A value that is set as the mask&#39;s &#39;background&#39; style.
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
                A class name that is added to the mask.
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
                A class name that is added to the mask while the clone is sliding out of the list.
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
                A class name that is added to the mask while the clone is sliding back to its starting position.
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
                An HTML element (which way contain child elements) that is appended to the mask. Useful for inserting an icon or label indicating to the user what left sliding will do.
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftMasks: [{
        background: &#39;rgba(252, 13, 27, 1)&#39;,
        classNameDefault: &#39;mask-left&#39;,
        classNameSlideOut: &#39;out-slide-mask-left&#39;,
        classNameSlideBack: &#39;back-slide-mask-left&#39;,
        childNode: null
    }]
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['leftOuterClass']['aref']}}" class="title-section">
        {{$refs_options['leftOuterClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;left-outer&#39;</code>
        </div>
    </div>
    <p>
        A class name that is added to <strong><span class="outer-cont">outerCont</span></strong> when a list item begins sliding to the left (either via a swipe or because a left button was pressed). Has no effect if <strong><span class="outer-cont">outerCont</span></strong> is <code class="language-js">window</code>.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftOuterClass: 'outer-left'
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['leftSlideBackDuration']['aref']}}" class="title-section">
        {{$refs_options['leftSlideBackDuration']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Integer
        </div>
        <div class="param">
            Default: <code class="language-js">200</code>
        </div>
    </div>
    <p>
        The duration, in milliseconds, of the left slide back animation.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftSlideBackDuration: 300
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['leftSlideOutDuration']['aref']}}" class="title-section">
        {{$refs_options['leftSlideOutDuration']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Integer
        </div>
        <div class="param">
            Default: <code class="language-js">300</code>
        </div>
    </div>
    <p>
        The duration, in milliseconds, of the left slide out animation.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftSlideOutDuration: 400
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['leftSwipeEndThreshold']['aref']}}" class="title-section">
        {{$refs_options['leftSwipeEndThreshold']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;30%&#39;</code>
        </div>
    </div>
    <p>
        The threshold at which a left swipe will, when released, slide out. Must be a percentage (for example, &#39;30%&#39;) or a number of pixels (for example, &#39;20px&#39;). In either case, it is measured from the right edge of <strong><span class="list-cont">listCont</span></strong>.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftSwipeEndThreshold: &#39;40%&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['leftSwipeStartThreshold']['aref']}}" class="title-section">
        {{$refs_options['leftSwipeStartThreshold']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;20px&#39;</code>
        </div>
    </div>
    <p>
        The threshold at which a left swipe will start moving the item. Must be a percentage (for example, &#39;5%&#39;) or a number of pixels (for example, &#39;10px&#39;). In either case, it is measured from the right edge of <strong><span class="list-cont">listCont</span></strong>.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    leftSwipeStartThreshold: &#39;30px&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['rightButtonClass']['aref']}}" class="title-section">
        {{$refs_options['rightButtonClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;right-button&#39;</code>
        </div>
    </div>
    <p>
        The class name of DOM elements that will act as buttons to trigger an automatic full right slide of the list item.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    rightButon: &#39;button-right&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['rightBySwipe']['aref']}}" class="title-section">
        {{$refs_options['rightBySwipe']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Boolean
        </div>
        <div class="param">
            Default: <code class="language-js">true</code>
        </div>
    </div>
    <p>
        Enable or disable swiping list items to the right.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    rightBySwipe: false
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['rightCloneClass']['aref']}}" class="title-section">
        {{$refs_options['rightCloneClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;right-clone&#39;</code>
        </div>
    </div>
    <p>
        The active list item is cloned during sorting and sliding. This option sets a class name that is added to the clone during right sliding.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    rightCloneClass: &#39;clone-right&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['rightCloneSlideBackClass']['aref']}}" class="title-section">
        {{$refs_options['rightCloneSlideBackClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;right-clone-slide-back&#39;</code>
        </div>
    </div>
    <p>
        The active list item is cloned during sorting and sliding. This option sets a class name that is added to the clone while it is sliding back to its starting position at the end of a right slide.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    rightCloneSlideBackClass: &#39;back-slide-clone-right&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['rightCloneSlideOutClass']['aref']}}" class="title-section">
        {{$refs_options['rightCloneSlideOutClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;right-clone-slide-out&#39;</code>
        </div>
    </div>
    <p>
        The active list item is cloned during sorting and sliding. This option sets a class name that is added to the clone while it is sliding out of the list at the end of a right slide.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    rightCloneSlideOutClass: &#39;out-slide-clone-right&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['rightEnabled']['aref']}}" class="title-section">
        {{$refs_options['rightEnabled']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Boolean
        </div>
        <div class="param">
            Default: <code class="language-js">true</code>
        </div>
    </div>
    <p>
        Enable or disable sliding list items to the right. If set to <code class="language-js">false</code>, swiping a list item to the right or pressing a right button will do nothing.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    rightEnabled: false
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['rightItemActiveClass']['aref']}}" class="title-section">
        {{$refs_options['rightItemActiveClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;right-item-active&#39;</code>
        </div>
    </div>
    <p>
        A class name that is added to the active list item during right sliding.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    rightItemActiveClass: 'active-item-right'
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['rightListClass']['aref']}}" class="title-section">
        {{$refs_options['rightListClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;right-list&#39;</code>
        </div>
    </div>
    <p>
        A class name that is added to <strong><span class="list-cont">listCont</span></strong> when a list item begins sliding to the right (either via a swipe or because a right button was pressed).
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    rightListClass: 'list-right'
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['rightMasks']['aref']}}" class="title-section">
        {{$refs_options['rightMasks']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Array
        </div>
        <div class="param">
            Default:
            <pre><code class="language-js">[{
    background: &#39;rgba(15, 127, 18, 1)&#39;,
    classNameDefault: &#39;right-mask&#39;,
    classNameSlideOut: &#39;right-mask-slide-out&#39;,
    classNameSlideBack: &#39;right-mask-slide-back&#39;,
    childNode: null
}]</code></pre>
        </div>
    </div>
    <p>
        An array of objects, each of which contains the properties of a mask that will cover the active list item during right sliding. Currently, only the first element in the array is used. All others are ignored. If the array is empty, no mask will appear during right sliding.
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
                A value that is set as the mask&#39;s &#39;background&#39; style.
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
                A class name that is added to the mask.
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
                A class name that is added to the mask while the clone is sliding out of the list.
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
                A class name that is added to the mask while the clone is sliding back to its starting position.
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
                An HTML element (which way contain child elements) that is appended to the mask. Useful for inserting an icon or label indicating to the user what right sliding will do.
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    rightMasks: [{
        background: &#39;rgba(15, 127, 18, 1)&#39;,
        classNameDefault: &#39;mask-right&#39;,
        classNameSlideOut: &#39;out-slide-mask-right&#39;,
        classNameSlideBack: &#39;back-slide-mask-right&#39;,
        childNode: null
    }]
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['rightOuterClass']['aref']}}" class="title-section">
        {{$refs_options['rightOuterClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;right-outer&#39;</code>
        </div>
    </div>
    <p>
        A class name that is added to <strong><span class="outer-cont">outerCont</span></strong> when a list item begins sliding to the right (either via a swipe or because a right button was pressed). Has no effect if <strong><span class="outer-cont">outerCont</span></strong> is <code class="language-js">window</code>.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    rightOuterClass: 'outer-right'
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['rightSlideBackDuration']['aref']}}" class="title-section">
        {{$refs_options['rightSlideBackDuration']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Integer
        </div>
        <div class="param">
            Default: <code class="language-js">200</code>
        </div>
    </div>
    <p>
        The duration, in milliseconds, of the right slide back animation.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    rightSlideBackDuration: 300
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['rightSlideOutDuration']['aref']}}" class="title-section">
        {{$refs_options['rightSlideOutDuration']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Integer
        </div>
        <div class="param">
            Default: <code class="language-js">300</code>
        </div>
    </div>
    <p>
        The duration, in milliseconds, of the right slide out animation.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    rightSlideOutDuration: 400
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['rightSwipeEndThreshold']['aref']}}" class="title-section">
        {{$refs_options['rightSwipeEndThreshold']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;30%&#39;</code>
        </div>
    </div>
    <p>
        The threshold at which a right swipe will, when released, slide out. Must be a percentage (for example, &#39;30%&#39;) or a number of pixels (for example, &#39;20px&#39;). In either case, it is measured from the right edge of <strong><span class="list-cont">listCont</span></strong>.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    rightSwipeEndThreshold: &#39;40%&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['rightSwipeStartThreshold']['aref']}}" class="title-section">
        {{$refs_options['rightSwipeStartThreshold']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;20px&#39;</code>
        </div>
    </div>
    <p>
        The threshold at which a right swipe will start moving the item. Must be a percentage (for example, &#39;5%&#39;) or a number of pixels (for example, &#39;10px&#39;). In either case, it is measured from the right edge of <strong><span class="list-cont">listCont</span></strong>.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    rightSwipeStartThreshold: &#39;30px&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['safariAutoOuterOverflow']['aref']}}" class="title-section">
        {{$refs_options['safariAutoOuterOverflow']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Boolean
        </div>
        <div class="param">
            Default: <code class="language-js">true</code>
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

<div class="section-cont">
    <a id="{{$refs_options['safariBodyUnselectable']['aref']}}" class="title-section">
        {{$refs_options['safariBodyUnselectable']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Boolean
        </div>
        <div class="param">
            Default: <code class="language-js">true</code>
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

<div class="section-cont">
    <a id="{{$refs_options['sortByLongPress']['aref']}}" class="title-section">
        {{$refs_options['sortByLongPress']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Boolean
        </div>
        <div class="param">
            Default: <code class="language-js">true</code>
        </div>
    </div>
    <p>
        Enable or disable sorting by long-pressing on an item.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    sortByLongPress: false
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['sortCloneBoxShadow']['aref']}}" class="title-section">
        {{$refs_options['sortCloneBoxShadow']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;0 5px 14px rgba(0,0,0,0.15), 0 6px 6px rgba(0,0,0,0.12)&#39;</code>
        </div>
    </div>
    <p>
        The active list item is cloned during sorting and sliding. This value is set as the &#39;box-shadow&#39; style of the clone during sorting.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    sortCloneBoxShadow: &#39;0 5px 20px rgba(0,0,0,0.5)&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['sortCloneClass']['aref']}}" class="title-section">
        {{$refs_options['sortCloneClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;sort-clone&#39;</code>
        </div>
    </div>
    <p>
        The active list item is cloned during sorting and sliding. This option sets a class name that is added to the clone during sorting.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    sortCloneClass: 'clone-sort'
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['sortCloneScale']['aref']}}" class="title-section">
        {{$refs_options['sortCloneScale']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;1.02&#39;</code>
        </div>
    </div>
    <p>
        The active list item is cloned during sorting and sliding. This value is set as the &#39;transform: scale()&#39; style of the clone during sorting. To prevent scaling of the clone, set this to &#39;1&#39;.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    sortCloneScale: '1'
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['sortDragHandleClass']['aref']}}" class="title-section">
        {{$refs_options['sortDragHandleClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;sort-drag-handle&#39;</code>
        </div>
    </div>
    <p>
        The class name of DOM elements that will act as drag handles for sorting.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    sortDragHandleClass: &#39;handle-drag-sort&#39;
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['sortEnabled']['aref']}}" class="title-section">
        {{$refs_options['sortEnabled']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Boolean
        </div>
        <div class="param">
            Default: <code class="language-js">true</code>
        </div>
    </div>
    <p>
        Enable or disable sorting of items. If set to <code class="language-js">false</code>, long-pressing an item or pressing its drag handle will do nothing.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    sortEnabled: false
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['sortEndDuration']['aref']}}" class="title-section">
        {{$refs_options['sortEndDuration']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Integer
        </div>
        <div class="param">
            Default: <code class="language-js">300</code>
        </div>
    </div>
    <p>
        The active list item is cloned during sorting and sliding. At the end of sorting the clone animates to its final position. This option sets the duration of that animation.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    sortEndDuration: 400
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['sortItemActiveClass']['aref']}}" class="title-section">
        {{$refs_options['sortItemActiveClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;sort-item-active&#39;</code>
        </div>
    </div>
    <p>
        A class name that is added to the active list item during sorting.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    sortItemActiveClass: 'active-item-sort'
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['sortItemActiveHide']['aref']}}" class="title-section">
        {{$refs_options['sortItemActiveHide']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Boolean
        </div>
        <div class="param">
            Default: <code class="language-js">true</code>
        </div>
    </div>
    <p>
        Enable or disable automatic hiding of the active list item during sorting. If this option is set to <code class="language-js">true</code>, the &#39;visibility&#39; style of the active list item is set to &#39;hidden&#39; during sorting, and &#39;visible&#39; at other times.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    sortItemActiveHide: false
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['sortListClass']['aref']}}" class="title-section">
        {{$refs_options['sortListClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;sort-list&#39;</code>
        </div>
    </div>
    <p>
        A class name that is added to <strong><span class="list-cont">listCont</span></strong> during sorting.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    sortListClass: 'list-sort'
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['sortMoveStartDelay']['aref']}}" class="title-section">
        {{$refs_options['sortMoveStartDelay']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Integer
        </div>
        <div class="param">
            Default: <code class="language-js">400</code>
        </div>
    </div>
    <p>
        The duration, in milliseconds, of the long-press required to start sorting an item. Does not apply to pressing a sort drag handle.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    sortMoveStartDelay: 800
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['sortOuterClass']['aref']}}" class="title-section">
        {{$refs_options['sortOuterClass']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: String
        </div>
        <div class="param">
            Default: <code class="language-js">&#39;sort-outer&#39;</code>
        </div>
    </div>
    <p>
        A class name that is added to <strong><span class="outer-cont">outerCont</span></strong> during sorting. Has no effect if <strong><span class="outer-cont">outerCont</span></strong> is <code class="language-js">window</code>.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    sortOuterClass: 'outer-sort'
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['sortScrollEnabled']['aref']}}" class="title-section">
        {{$refs_options['sortScrollEnabled']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Boolean
        </div>
        <div class="param">
            Default: <code class="language-js">true</code>
        </div>
    </div>
    <p>
        Enable or disable automatic scrolling during sorting of items.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    sortScrollEnabled: false
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['sortScrollSpeed']['aref']}}" class="title-section">
        {{$refs_options['sortScrollSpeed']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Integer
        </div>
        <div class="param">
            Default: <code class="language-js">3</code>
        </div>
    </div>
    <p>
        Sets the speed of automatic scrolling: 1 (slowest) to 5 (fastest).
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    sortScrollSpeed: 1
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['sortStartDuration']['aref']}}" class="title-section">
        {{$refs_options['sortStartDuration']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Integer
        </div>
        <div class="param">
            Default: <code class="language-js">300</code>
        </div>
    </div>
    <p>
        The active list item is cloned during sorting and sliding. At the start of sorting the clone&#39;s scale animates to <a href="{{ url($selectedpage['url'] . '#ref-sortCloneScale') }}" title="sortCloneScale">sortCloneScale</a>. This option sets the duration of that animation.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    sortStartDuration: 400
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>

<div class="section-cont">
    <a id="{{$refs_options['sortReorderDuration']['aref']}}" class="title-section">
        {{$refs_options['sortReorderDuration']['title']}}
    </a>
    <div class="params-cont">
        <div class="param">
            Type: Integer
        </div>
        <div class="param">
            Default: <code class="language-js">200</code>
        </div>
    </div>
    <p>
        During sorting, list items animate to new positions. This option sets the duration of that animation.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    sortReorderDuration: 300
};
lithiumlist.attachToList(
    ...,
    props
);
</code></pre>
</div>