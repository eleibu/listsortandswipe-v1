@php
    $refs = array(
        'install' => array(
            'aref' => 'ref-install',
            'title' => 'Install'
        ),
        'import' => array(
            'aref' => 'ref-import',
            'title' => 'Import'
        ),
        'update' => array(
            'aref' => 'ref-update',
            'title' => 'Update'
        )
    );
@endphp
<div class="pagelinks">
    @foreach ($refs as $ref)
        <a class="button-word-cont" href="{{ url($selectedpage['url'] . '#' . $ref['aref']) }}" title="{{$ref['title']}}">{{$ref['title']}}</a>
    @endforeach
</div>
<div class="section-cont">
	<a id="{{$refs['install']['aref']}}" class="title-section">
        {{$refs['install']['title']}}
    </a>
	<p>
		Install Lithium List with npm:
	</p>
    <pre><code class="language-js">$ npm install lithiumlist</code></pre>
</div>
<div class="section-cont">
	<a id="{{$refs['import']['aref']}}" class="title-section">
        {{$refs['import']['title']}}
    </a>
	<p>
		Import Lithium List into your code bundle:
	</p>
    <pre class="line-numbers"><code class="language-js">import lithiumlist from 'lithiumlist';</code></pre>
</div>
<div class="section-cont">
	<a id="{{$refs['update']['aref']}}" class="title-section">
        {{$refs['update']['title']}}
    </a>
	<p>
		Update to the latest version via npm:
	</p>
    <pre><code class="language-js">$ npm update lithiumlist</code></pre>
</div>