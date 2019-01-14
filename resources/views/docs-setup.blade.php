@php
    $refs = array(
        'licence-key' => array(
            'aref' => 'ref-licence-key',
            'title' => 'Licence key'
        ),
        'html-structure' => array(
            'aref' => 'ref-html-structure',
            'title' => 'HTML structure'
        ),
        'required-css' => array(
            'aref' => 'ref-required-css',
            'title' => 'Required CSS'
        ),
        'optional-css' => array(
            'aref' => 'ref-optional-css',
            'title' => 'Optional CSS'
        ),
        'attachment' => array(
            'aref' => 'ref-attachment',
            'title' => 'Attachment'
        ),
        'window-as-outercont' => array(
            'aref' => 'ref-window-as-outercont',
            'title' => 'window as outerCont'
        )
    );
@endphp
<div class="pagelinks">
    @foreach ($refs as $ref)
        <a class="button-word-cont" href="{{ url($selectedpage['url'] . '#' . $ref['aref']) }}" title="{{$ref['title']}}">{{$ref['title']}}</a>
    @endforeach
</div>
<div class="section-cont">
    <a id="{{$refs['licence-key']['aref']}}" class="title-section">
        {{$refs['licence-key']['title']}}
    </a>
    <p>
        [You will need a licence key - LINK TO SIGN UP PAGE]
    </p>
</div>
<div class="section-cont">
    <a id="{{$refs['html-structure']['aref']}}" class="title-section">
        {{$refs['html-structure']['title']}}
    </a>
    <p>
        Lithium List requires three elements:
    </p>
    <p>
        <ul id="ul-html-structure">
            <li>
                <strong><span class="outer-cont">outerCont:</span></strong> An outer container element.
            </li>
            <li>
                <strong><span class="list-cont">listCont:</span></strong> An inner container for the <strong><span class="list-items">listItems</span></strong>.
            </li>
            <li>
                <strong><span class="list-items">listItems:</span></strong> The list items.
            </li>
        </ul>
    </p>
    <p>
        This is illustrated here:
    </p>
    <div class="diag-cont">
        <div id="div-diag-outer-cont-setup" class="diag-outer-cont">
            <div id="div-diag-list-cont-setup" class="diag-list-cont">
                <div class="list-item unselectable">
                    List item
                </div>
                <div class="list-item unselectable">
                    List item
                </div>
                <div class="list-item unselectable">
                    List item
                </div>
                <div class="list-item unselectable">
                    List item
                </div>
                <div class="list-item unselectable">
                    List item
                </div>
                <div class="list-item unselectable">
                    List item
                </div>
                <div class="list-item unselectable">
                    List item
                </div>
                <div class="list-item unselectable">
                    List item
                </div>
                <div class="list-item unselectable">
                    List item
                </div>
                <div class="list-item unselectable">
                    List item
                </div>
                <div class="list-item unselectable">
                    List item
                </div>
                <div class="list-item unselectable">
                    List item
                </div>
                <div class="list-item unselectable">
                    List item
                </div>
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE HTML:
    </div>
<pre class="line-numbers"><code class="language-markup">{{'<div id=\'outerCont\'>
    <div id=\'listCont\'>
        <div class=\'listItem\'>
            List item
        </div>
        <div class=\'listItem\'>
            List item
        </div>
        <div class=\'listItem\'>
            List item
        </div>
        <div class=\'listItem\'>
            List item
        </div>        
    </div>
</div>'}}</code></pre>
</div>
<div class="section-cont">
    <a id="{{$refs['required-css']['aref']}}" class="title-section">
        {{$refs['required-css']['title']}}
    </a>
    <p>
        The only required CSS is that <strong><span class="list-cont">listCont</span></strong> must be positioned. That is, it must have position &#39;relative&#39;, &#39;absolute&#39;, &#39;fixed&#39;, or &#39;sticky&#39;.
    </p>
    <div class="title-codeblock">
        EXAMPLE CSS:
    </div>
<pre class="line-numbers"><code class="language-css">#listCont {
    position: relative;
}</code></pre>
</div>
<div class="section-cont">
    <a id="{{$refs['optional-css']['aref']}}" class="title-section">
        {{$refs['optional-css']['title']}}
    </a>
    <div class="subsection-cont">
        <div class="title-subsection">
            Automatic scrolling
        </div>
        <p>
            One of Lithium List&#39;s key features is its ability to automatically scroll up/down as items are moved towards the top/bottom of the list. For this to work, <strong><span class="outer-cont">outerCont</span></strong> must have its height constrained and its overflow style set to &#39;auto&#39; or &#39;scroll&#39;.
        </p>
        <div class="title-codeblock">
            EXAMPLE CSS:
        </div>
<pre class="line-numbers"><code class="language-css">#outerCont {
    height: 400px;
    overflow: auto;
}</code></pre>
    </div>
    <div class="subsection-cont">
        <div class="title-subsection">
            Prevent text selection
        </div>
        <p>
            To prevent unintended text selection while dragging items, apply <code class="language-css">user-select: none;</code> with appropriate vendor prefixes.
        </p>
        <div class="title-codeblock">
            EXAMPLE CSS:
        </div>
<pre class="line-numbers"><code class="language-css">.listItem {
  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}</code></pre>
    </div>
    <div class="subsection-cont">
        <div class="title-subsection">
            Fix bouncing items
        </div>
        <p>
            If <strong><span class="list-cont">listCont</span></strong> and/or <strong><span class="list-items">listItems</span></strong> have top/bottom margins, in some browsers items will &#39;bounce&#39; during sorting and swiping. Applying a top border, even if minimal, to <strong><span class="list-cont">listCont</span></strong> fixes this.
        </p>
        <div class="title-codeblock">
            EXAMPLE CSS:
        </div>
<pre class="line-numbers"><code class="language-css">#listCont {
    border-top: 0.1px solid transparent;
}</code></pre>
    </div>
</div>
<div class="section-cont">
    <a id="{{$refs['attachment']['aref']}}" class="title-section">
        {{$refs['attachment']['title']}}
    </a>
    <p>
        Call [LINK TO .attachToList() METHOD] to attach Lithium List to a list:
    </p>
<pre class="line-numbers"><code class="language-js">var outerCont = document.getElementById('outerCont');
var listCont = document.getElementById('listCont');
lithiumlist.attachToList(
    '0123456789',
    outerCont,
    listCont,
    'listItem'
);</code></pre>
</div>
<div class="section-cont">
    <a id="{{$refs['window-as-outercont']['aref']}}" class="title-section">
        {{$refs['window-as-outercont']['title']}}
    </a>
    <p>
        If you want the whole window to scroll when list items are sorted (like the <a href="{{ url('/') }}" title="Lithium List - home">Lithium List home page</a>), you can set <code class="language-js">var outerCont = window;</code>. However, in this case automatic scrolling will be rough and unreliable in some mobile browsers.
    </p>
    <p>
        Instead, it&#39;s recommended you wrap the whole page in a DIV and use it as <strong><span class="outer-cont">outerCont</span></strong>.
    </p>
    <div class="title-codeblock">
        EXAMPLE HTML:
    </div>
<pre class="line-numbers"><code class="language-markup">{{'<html>
    <head>
        ...
    </head>
    <body>
        <div id=\'pageWrapper\'>
            <div>
                ...
            </div>
            <div id=\'listCont\'>
                <div class=\'listItem\'>
                    List item
                </div>
                <div class=\'listItem\'>
                    List item
                </div>
                <div class=\'listItem\'>
                    List item
                </div>
                <div class=\'listItem\'>
                    List item
                </div>        
            </div>
            <div>
                ...
            </div>
        </div>
    </body>
</html>'}}</code></pre>
    <div class="title-codeblock">
        EXAMPLE CSS:
    </div>
<pre class="line-numbers"><code class="language-css">html {
    height: 100%;
}

body {
    height: 100%;
    margin: 0;
    padding: 0;
}

#pageWrapper {
    height: 100%;
    overflow: auto;
}
</code></pre>
    <div class="title-codeblock">
        EXAMPLE JS:
    </div>
<pre class="line-numbers"><code class="language-js">var pageWrapper = document.getElementById('pageWrapper');
var listCont = document.getElementById('listCont');
lithiumlist.attachToList(
    '0123456789',
    pageWrapper,
    listCont,
    'listItem'
);</code></pre>
</div>