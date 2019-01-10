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
        'attachment' => array(
            'aref' => 'ref-attachment',
            'title' => 'Attachment'
        ),
        'optional-css' => array(
            'aref' => 'ref-optional-css',
            'title' => 'Optional CSS'
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
        html-structure
    </p>
    <pre><code class="language-js">$ npm install lithium-list</code></pre>
</div>
<div class="section-cont">
    <a id="{{$refs['attachment']['aref']}}" class="title-section">
        {{$refs['attachment']['title']}}
    </a>
    <p>
        attachment
    </p>
    <pre><code class="language-js">$ npm install lithium-list</code></pre>
</div>
<div class="section-cont">
    <a id="{{$refs['optional-css']['aref']}}" class="title-section">
        {{$refs['optional-css']['title']}}
    </a>
    <p>
        optional-css
    </p>
    <pre><code class="language-js">$ npm install lithium-list</code></pre>
</div>