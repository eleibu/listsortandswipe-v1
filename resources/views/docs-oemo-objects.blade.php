<a id="{{$refs['objects']['aref']}}" class="title-section">
    {{$refs['objects']['title']}}
</a>
<div class="subsection-links">
    @foreach ($refs_objects as $ref_object)
        <a class="button-word-cont" href="{{ url($selectedpage['url'] . '#' . $ref_object['aref']) }}" title="{{$ref_object['title']}}">{{$ref_object['title']}}</a>
    @endforeach
</div>
<div class="subsection-cont">
    <a id="{{$refs_objects['instance']['aref']}}" class="title-subsection">
        {{$refs_objects['instance']['title']}}
    </a>
    <p>
        An object containing the following properties for the Lithium List instance:
    </p>
    <div class="params-cont">
        <div class="param">
            <strong>outerCont</strong>
        </div>
        <div class="sub-params-cont">
            <div class="sub-param">
                Type: Element
            </div>
            <div class="sub-param">
                The <strong><span class="outer-cont">outerCont</span></strong> element to which the Lithium List instance is attached.
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
                The <strong><span class="list-cont">listCont</span></strong> element to which the Lithium List instance is attached.
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
                The <a href="{{ url($selectedpage['url'] . '#' . $refs_objects['props']['aref']) }}" title="{{$refs_objects['props']['title']}}">{{$refs_objects['props']['title']}}</a> object for the Lithium List instance.
            </div>
        </div>
    </div>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var outerCont = instance.outerCont;
var listCont = instance.listCont;
var listItemClass = instance.listItemClass;
var props = instance.props;
</code></pre>
</div>

<div class="subsection-cont">
    <a id="{{$refs_objects['props']['aref']}}" class="title-subsection">
        {{$refs_objects['props']['title']}}
    </a>
    <p>
        An object containing options and events for the Lithium List instance. See <a href="{{ url($selectedpage['url'] . '#' . $refs['options']['aref']) }}" title="{{$refs['options']['title']}}">{{$refs['options']['title']}}</a> and <a href="{{ url($selectedpage['url'] . '#' . $refs['events']['aref']) }}" title="{{$refs['events']['title']}}">{{$refs['events']['title']}}</a> for available parameters.
    </p>
    <div class="title-codeblock">
        EXAMPLE JS
    </div>
<pre class="line-numbers"><code class="language-js">var props = {
    ignoreOnClick: [&#39;input&#39;, &#39;textarea&#39;, &#39;select&#39;, &#39;option&#39;, &#39;button&#39;],
    ...,
    onLeftEnd: function(instance, index, didSlideOut) {
        if (didSlideOut) {
            var items = instance.listCont.getElementsByClassName(instance.listItemClass);
            instance.listCont.removeChild(items[index]);
        }
    },
    ...
};
</code></pre>
</div>