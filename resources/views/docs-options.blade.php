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
    <a id="{{$refs['options']['aref']}}" class="title-section">
        {{$refs['options']['title']}}
    </a>
    <div class="subsection-cont">
        <div class="title-subsection">
            leftEnabled
        </div>
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
            EXAMPLE
        </div>
<pre class="line-numbers"><code class="language-js">var options = {
leftEnabled: false
};
lithiumlistPro.attachToList(
...,
options
);
</code></pre>
    </div>
    <div class="subsection-cont">
        <div class="title-subsection">
            leftBySwipe
        </div>
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
            EXAMPLE
        </div>
<pre class="line-numbers"><code class="language-js">var options = {
leftBySwipe: false
};
lithiumlistPro.attachToList(
...,
options
);
</code></pre>
    </div>
</div>