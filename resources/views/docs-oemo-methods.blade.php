@php
    $refs_methods = array(
        'attachToList' => array(
            'aref' => 'ref-attachToList',
            'title' => 'attachToList'
        ),


        // attachToList: attachToList,
        // detachFromList: detachFromList,
        // setListProperties: setListProperties,
        // setDefaultProperties: setDefaultProperties,
        // triggerLeft: triggerLeft,
        // triggerRight: triggerRight

    );
@endphp
<a id="{{$refs['methods']['aref']}}" class="title-section">
    {{$refs['methods']['title']}}
</a>
<div class="subsection-links">
    @foreach ($refs_methods as $ref_method)
        <a class="button-word-cont" href="{{ url($selectedpage['url'] . '#' . $ref_method['aref']) }}" title="{{$ref_method['title']}}">{{$ref_method['title']}}</a>
    @endforeach
</div>
<div class="subsection-cont">
    <a id="{{$refs_methods['attachToList']['aref']}}" class="title-subsection">
        {{$refs_methods['attachToList']['title']}}
    </a>
    <p>
        Attaches Lithium List to a list. See the <a href="{{$subpages['set-up']['url']}}" title="set up page">set up page</a> for a discussion of the required HTML and CSS. Each attachment creates its own <a href="{{$selectedpage['url'] . '#' . $refs_objects['instance']['aref']}}" title="instance">instance</a> object.
    </p>
    <div class="function">
        lithiumlist.attachToList(key, outerCont, listCont, listItemClass [, props])
    </div>
    <div class="params-cont">
        <div class="param">
            <strong>key</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: String
            </div>
            <div class="sub-param">
                Your Lithium List licence key.
            </div>
        </div>
        <div class="param">
            <strong>outerCont</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Element
            </div>
            <div class="sub-param">
                The <strong><span class="outer-cont">outerCont</span></strong> element to which the Lithium List instance will be attached. Must be a DOM element or <code class="language-js">window</code> (and if it is to be <code class="language-js">window</code>, note <a href="{{$subpages['set-up']['url'] . '#ref-window-as-outercont'}}" title="window as outerCont">window as outerCont</a>). Must not be <code class="language-js">document</code> or <code class="language-js">document.body</code>.
            </div>
        </div>
        <div class="param">
            <strong>listCont</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Element
            </div>
            <div class="sub-param">
                The <strong><span class="list-cont">listCont</span></strong> element to which the Lithium List instance will be attached.
            </div>
        </div>
        <div class="param">
            <strong>listItemClass</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: String
            </div>
            <div class="sub-param">
                The class name of the list item elements.
            </div>
        </div>
        <div class="param">
            <strong>props</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Object
            </div>
            <div class="sub-param">
                If provided, will override the default settings for this instance. May contain only the settings to be overrided. Others will inherit their default values.
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">lithiumlist.attachToList(
    '0123456789',
    document.getElementById('outer-cont'),
    document.getElementById('list-cont'),
    'list-item',
    {
        sortDragHandleClass: 'drag-handle'
    }
);
</code></pre>
</div>