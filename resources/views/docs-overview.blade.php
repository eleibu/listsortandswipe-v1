@php
    $refs = array(
        'what-is-it' => array(
            'aref' => 'ref-what-is-it',
            'title' => 'What is it?'
        ),
        'sorting' => array(
            'aref' => 'ref-sorting',
            'title' => 'Sorting'
        ),
        'automatic-scrolling' => array(
            'aref' => 'ref-automatic-scrolling',
            'title' => 'Automatic-scrolling'
        ),
        'sliding-and-swiping' => array(
            'aref' => 'ref-sliding-and-swiping',
            'title' => 'Sliding and swiping'
        ),
        'active-item-clone' => array(
            'aref' => 'ref-active-item-clone',
            'title' => 'Active item clone'
        ),
        'masks' => array(
            'aref' => 'ref-masks',
            'title' => 'Masks'
        ),
        'variable-height-list-items' => array(
            'aref' => 'ref-variable-height-list-items',
            'title' => 'Variable height list items'
        ),
        'margins' => array(
            'aref' => 'ref-margins',
            'title' => 'Margins'
        ),
        'adding-new-list-items' => array(
            'aref' => 'ref-adding-new-list-items',
            'title' => 'Adding new list items'
        )
    );
@endphp
<div class="pagelinks">
    @foreach ($refs as $ref)
        <a class="button-word-cont" href="{{ url($selectedpage['url'] . '#' . $ref['aref']) }}" title="{{$ref['title']}}">{{$ref['title']}}</a>
    @endforeach
</div>
<div class="section-cont">
	<a id="{{$refs['what-is-it']['aref']}}" class="title-section">
        {{$refs['what-is-it']['title']}}
    </a>
	<p>
		Lithium List turns a series of vertically arranged items into a sortable and swipeable list, much like tables in iOS and Android. It works equally well on desktop and mobile, enabling developers to easily offer app-like functionality in their web pages.
	</p>
</div>
<div class="section-cont">
    <a id="{{$refs['sorting']['aref']}}" class="title-section">
        {{$refs['sorting']['title']}}
    </a>
    <div class="diag-cont">
        <div id="div-diag-outer-cont-sorting" class="diag-outer-cont">
            <div id="div-diag-list-cont-sorting" class="diag-list-cont">
                <div class="list-item unselectable">
                    <div class='inner'>
                        <i class="sld budicon-grab-ui sort"></i>
                        <div class='text'>
                            Press my drag handle to sort me
                        </div>
                    </div>
                </div>
                <div class="list-item unselectable">
                    <div class='inner'>
                        <div class='text'>
                            Long-press me to activate sorting
                        </div>
                    </div>
                </div>
                <div class="list-item unselectable">
                    &nbsp;
                </div>
                <div class="list-item unselectable">
                    &nbsp;
                </div>
            </div>
        </div>
    </div>
    <p>
        Users can sort list items in two ways. One is by clicking/tapping a drag handle. The other is by clicking/tapping on a list item (other than on its drag handle) and holding until it pops up for sorting. In both cases the item can then be dragged/dropped to its new location. Of course developers can specify which elements are drag handles, set the delay before sorting begins, turn off sorting via one way or the other, or turn off sorting altogether.
    </p>
</div>
