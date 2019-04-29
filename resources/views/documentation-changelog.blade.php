@php
    $refs = array(
        'version-1-0-0' => array(
            'aref' => 'ref-version-1-0-0',
            'title' => 'Version 1.0.0'
        )
    );
@endphp
<div class="pagelinks">
    @foreach ($refs as $ref)
        <a class="button-word-cont" href="{{ url($selectedpage['url'] . '#' . $ref['aref']) }}" title="{{$ref['title']}}">{{$ref['title']}}</a>
    @endforeach
</div>
<div class="section-cont">
    <a id="{{$refs['version-1-0-0']['aref']}}" class="title-section">
        {{$refs['version-1-0-0']['title']}}
    </a>
    <p>
        The first version. No changelog required.
    </p>
</div>