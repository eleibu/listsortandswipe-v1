@php
    $refs = array(
        'what-is-lithium-list' => array(
            'aref' => 'ref-what-is-lithium-list',
            'title' => 'What is Lithium List?'
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
    $optionsUrl = '/docs/options-events-and-methods#ref-';
@endphp
<div class="pagelinks">
    @foreach ($refs as $ref)
        <a class="button-word-cont" href="{{ url($selectedpage['url'] . '#' . $ref['aref']) }}" title="{{$ref['title']}}">{{$ref['title']}}</a>
    @endforeach
</div>
<div class="section-cont">
	<a id="{{$refs['what-is-lithium-list']['aref']}}" class="title-section">
        {{$refs['what-is-lithium-list']['title']}}
    </a>
	<p>
		Lithium List turns a series of vertically arranged items into a sortable and swipeable list, much like tables in iOS and Android. It works equally well on desktop and mobile, enabling developers to easily offer app-like functionality in their web pages.
	</p>
</div>

<div class="section-cont">
    <a id="{{$refs['sorting']['aref']}}" class="title-section">
        {{$refs['sorting']['title']}}
    </a>
    <div id="div-diag-container-sorting" class="diag-cont">
        <div id="div-diag-outer-cont-sorting" class="diag-outer-cont">
            <div id="div-diag-list-cont-sorting" class="diag-list-cont">
                <div class="list-item unselectable">
                    <div class='inner'>
                        <div class='text'>
                            Long-press me to start sorting
                        </div>
                    </div>
                </div>
                <div class="list-item unselectable">
                    <div class='inner'>
                        <i class="sld budicon-grab-ui sort"></i>
                        <div class='text'>
                            Try using my drag handle to sort me
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
    <div class="related-cont">
        <div class="title-related">
            Related options and events:
        </div>
    <!--
//// ignoreOnClick, onSortStart, onSortEnd, sortEnabled, sortByDrag, sortStartDuration, sortEndDuration, sortOuterClass, sortListClass, sortCloneClass, sortCloneBoxShadow,
//// sortCloneScale, sortItemActiveHide, sortItemActiveClass, sortDragHandleClass, sortMoveStartDelay, sortReorderDuration, safariBodyUnselectable,
//// safariAutoOuterOverflow
    -->
        <div class="related-links">
            <a class="button-word-cont" href="{{ url($optionsUrl) . 'ignoreOnClick' }}" title="ignoreOnClick">ignoreOnClick</a>
        </div>
    </div>
</div>
<div class="section-cont">
    <a id="{{$refs['automatic-scrolling']['aref']}}" class="title-section">
        {{$refs['automatic-scrolling']['title']}}
    </a>
    <div id="div-diag-container-automatic-scrolling" class="diag-cont">
        <div id="div-diag-outer-cont-automatic-scrolling" class="diag-outer-cont">
            <div id="div-diag-list-cont-automatic-scrolling" class="diag-list-cont">
                <div class="list-item unselectable">
                    <div class='inner'>
                        <i class="sld budicon-grab-ui sort"></i>
                        <div class='text'>
                            Move me all the way to the bottom and then back up again
                        </div>
                    </div>
                </div>
                <div class="list-item unselectable">
                    &nbsp;
                </div>
                <div class="list-item unselectable">
                    &nbsp;
                </div>
                <div class="list-item unselectable">
                    &nbsp;
                </div>
                <div class="list-item unselectable">
                    &nbsp;
                </div>
                <div class="list-item unselectable">
                    &nbsp;
                </div>
                <div class="list-item unselectable">
                    &nbsp;
                </div>
                <div class="list-item unselectable">
                    &nbsp;
                </div>
                <div class="list-item unselectable">
                    &nbsp;
                </div>
                <div class="list-item unselectable">
                    &nbsp;
                </div>
                <div class="list-item unselectable">
                    &nbsp;
                </div>
                <div class="list-item unselectable">
                    &nbsp;
                </div>
                <div class="list-item unselectable">
                    &nbsp;
                </div>
                <div class="list-item unselectable">
                    &nbsp;
                </div>
                <div class="list-item unselectable">
                    &nbsp;
                </div>
            </div>
        </div>
        <div class="diag-options-cont">
            <div class="label">
                sortScrollSpeed:
            </div>
            <div class="option">
                <select id="select-sortScrollSpeed">
                    <option value="1">1 - very slow</option>
                    <option value="2">2 - slow</option>
                    <option value="3" selected="selected">3 - default</option>
                    <option value="4">4 - fast</option>
                    <option value="5">5 - very fast</option>
                </select>
            </div>
        </div>
    </div>
    <p>
        If the list of items extends beyond the bottom or top of its container, Lithium List automatically scrolls during sorting. Scrolling is fluid, responsive and... just nice. Developers can control the scroll speed and, if desired, turn off automatic scrolling altogether.
    </p>
    <div class="related-cont">
        <div class="title-related">
            Related options and events:
        </div>
        <div class="related-links">
            <a class="button-word-cont" href="{{ url($optionsUrl) . 'sortScrollEnabled' }}" title="sortScrollEnabled">sortScrollEnabled</a>
            <a class="button-word-cont" href="{{ url($optionsUrl) . 'sortScrollSpeed' }}" title="sortScrollSpeed">sortScrollSpeed</a>
            <a class="button-word-cont" href="{{ url($optionsUrl) . 'onSortAutoScrollStart' }}" title="onSortAutoScrollStart">onSortAutoScrollStart</a>
            <a class="button-word-cont" href="{{ url($optionsUrl) . 'onSortAutoScrollEnd' }}" title="onSortAutoScrollEnd">onSortAutoScrollEnd</a>
        </div>
    </div>
</div>
<div class="section-cont">
    <a id="{{$refs['sliding-and-swiping']['aref']}}" class="title-section">
        {{$refs['sliding-and-swiping']['title']}}
    </a>
    <div id="div-diag-container-sliding-and-swiping" class="diag-cont">
        <div id="div-diag-outer-cont-sliding-and-swiping" class="diag-outer-cont">
            <div id="div-diag-list-cont-sliding-and-swiping" class="diag-list-cont">
                <div class="list-item unselectable">
                    <div class='inner'>
                        <div class='text'>
                            Swipe me left or right
                        </div>
                    </div>
                </div>
                <div class="list-item unselectable">
                    <div class='inner'>
                        <i class="sld budicon-reload-ui archive"></i>
                        <div class='text'>
                            Try using my left or right slide buttons
                        </div>
                        <i class="oln budicon-trash delete"></i>
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
        <div class="diag-options-cont">
            <div class="label">
                leftSwipeStartThreshold:
            </div>
            <div class="option">
                <select id="select-leftSwipeStartThreshold">
                    <option value="10px" selected="selected">10px</option>
                    <option value="50px">50px</option>
                    <option value="20%">20%</option>
                    <option value="40%">40%</option>
                </select>
            </div>
            <div class="label">
                leftSwipeEndThreshold:
            </div>
            <div class="option">
                <select id="select-leftSwipeEndThreshold">
                    <option value="80px">80px</option>
                    <option value="160px">160px</option>
                    <option value="30%" selected="selected">30%</option>
                    <option value="60%">60%</option>
                </select>
            </div>
            <div class="label">
                leftSlideOutDuration:
            </div>
            <div class="option">
                <select id="select-leftSlideOutDuration">
                    <option value="50">50</option>
                    <option value="300" selected="selected">300</option>
                    <option value="1000">1000</option>
                    <option value="3000">3000</option>
                </select>
            </div>
            <div class="label">
                leftSlideBackDuration:
            </div>
            <div class="option">
                <select id="select-leftSlideBackDuration">
                    <option value="50">50</option>
                    <option value="200" selected="selected">200</option>
                    <option value="1000">1000</option>
                    <option value="3000">3000</option>
                </select>
            </div>
        </div>
    </div>
    <p>
        Users can slide items left and right. Like in many mobile apps, sliding left will typically delete the item and sliding right will typically archive it. Developers can, of course, determine what sliding left and right does. There are two ways to slide items in either direction. One is by clicking/tapping a slide button. The other is by clicking/tapping on a list item (other than on a slide button) and, while holding down, swiping left or right. As long as the user has swiped by at least the left or right slide-start threshold, sliding mode will be activated. This enables a nice user experience, espcially on mobile - users can sort or swipe using simple touch gestures that they are already familiar with.
    </p>
    <p>
        After sliding has commenced and the user releases their click/tap, the item will either slide 'out' or slide 'back'. Which of these occurs depends on whether or not it was swiped beyond the left/right slide-end threshold. Sliding 'out' means the item will automatically slide all the way out of the list. Sliding 'back' means it will automatically slide back to its starting position.
    </p>
    <p>
        Developers can control all aspects of sliding and swiping, including specifying which elements are slide buttons, setting the slide-start and slide-end thresholds,
        determining the speed at which items will slide out/back and turning off sliding and/or swiping altogether.
    </p>
    <div class="related-cont">
        <div class="title-related">
            Related options and events:
        </div>
        <div class="related-links">
            <a class="button-word-cont" href="{{ url($optionsUrl) . 'ignoreOnClick' }}" title="ignoreOnClick">ignoreOnClick</a>
        </div>
    </div>
</div>