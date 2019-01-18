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
        ),
        'objects' => array(
            'aref' => 'ref-objects',
            'title' => 'Objects'
        )
    );

    $refs_objects = array(
        'instance' => array(
            'aref' => 'ref-instance',
            'title' => 'instance'
        ),
        'props' => array(
            'aref' => 'ref-props',
            'title' => 'props'
        ),
    );
@endphp
<div class="pagelinks">
    @foreach ($refs as $ref)
        <a class="button-word-cont" href="{{ url($selectedpage['url'] . '#' . $ref['aref']) }}" title="{{$ref['title']}}">{{$ref['title']}}</a>
    @endforeach
</div>
<div class="section-cont">
    @include('docs-oemo-options')
    @include('docs-oemo-events')

    @include('docs-oemo-objects')
</div>