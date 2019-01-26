<div class="pagelinks">
    @foreach ($refs_glossary as $ref)
        <a class="button-word-cont" href="{{ url($selectedpage['url'] . '#' . $ref['aref']) }}" title="{{$ref['title']}}">{{$ref['title']}}</a>
    @endforeach
</div>

<div class="section-cont">
    <a id="{{$refs_glossary['sorting']['aref']}}" class="title-section">
        {{$refs_glossary['sorting']['title']}}
    </a>
    <p>
        Lithium List allows users to sort list items in two ways. One is by clicking/tapping a drag handle. The other is by clicking/tapping on a list item (other than on its drag handle) and holding until it pops up for sorting. Of course developers can specify which elements are drag handles, set the delay before sorting begins, turn off sorting via one method or another, or turn off sorting altogether.
    </p>
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
                        <i class="sld icon-grab-ui sort"></i>
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
            <a class="button-word-cont" href="{{ $subpages['options-events-methods-and-objects']['url'] . '#ref-ignoreOnClick' }}" title="ignoreOnClick">ignoreOnClick</a>
        </div>
    </div>
</div>
<div class="section-cont">
    <a id="{{$refs_glossary['automatic-scrolling']['aref']}}" class="title-section">
        {{$refs_glossary['automatic-scrolling']['title']}}
    </a>
    <p>
        Lithium List automatically scrolls during sorting. Scrolling is fluid, responsive and... just nice. Developers can control the scroll speed and, if desired, turn off automatic scrolling altogether.
    </p>
    <div id="div-diag-container-automatic-scrolling" class="diag-cont">
        <div id="div-diag-outer-cont-automatic-scrolling" class="diag-outer-cont">
            <div id="div-diag-list-cont-automatic-scrolling" class="diag-list-cont">
                <div class="list-item unselectable">
                    <div class='inner'>
                        <i class="sld icon-grab-ui sort"></i>
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
    <div class="related-cont">
        <div class="title-related">
            Related options and events:
        </div>
        <div class="related-links">
            <a class="button-word-cont" href="{{ $subpages['options-events-methods-and-objects']['url'] . '#ref-sortScrollEnabled' }}" title="sortScrollEnabled">sortScrollEnabled</a>
            <a class="button-word-cont" href="{{ $subpages['options-events-methods-and-objects']['url'] . '#ref-sortScrollSpeed' }}" title="sortScrollSpeed">sortScrollSpeed</a>
            <a class="button-word-cont" href="{{ $subpages['options-events-methods-and-objects']['url'] . '#ref-onSortAutoScrollStart' }}" title="onSortAutoScrollStart">onSortAutoScrollStart</a>
            <a class="button-word-cont" href="{{ $subpages['options-events-methods-and-objects']['url'] . '#ref-onSortAutoScrollEnd' }}" title="onSortAutoScrollEnd">onSortAutoScrollEnd</a>
        </div>
    </div>
</div>
<div class="section-cont">
    <a id="{{$refs_glossary['sliding-and-swiping']['aref']}}" class="title-section">
        {{$refs_glossary['sliding-and-swiping']['title']}}
    </a>
    <p>
        Users can slide items left and right. Like in many mobile apps, sliding left will typically delete the item and sliding right will typically archive it. Developers can, of course, determine what sliding left and right does. There are two ways to slide items in either direction. One is by clicking/tapping a slide button. The other is by clicking/tapping on a list item (other than on a slide button) and, while holding down, swiping left or right. As long as the user has swiped by at least the left or right slide-start threshold, sliding mode will be activated. This enables a nice user experience, especially on mobile - users can sort or swipe using simple touch gestures that they are already familiar with.
    </p>
    <p>
        After sliding has commenced and the user releases their click/tap, the item will either slide 'out' or slide 'back'. Which of these occurs depends on whether or not it was swiped beyond the left/right slide-end threshold. Sliding 'out' means the item will automatically slide all the way out of the list. Sliding 'back' means it will automatically slide back to its starting position.
    </p>
    <p>
        Developers can control all aspects of sliding and swiping, including specifying which elements are slide buttons, setting the slide-start and slide-end thresholds,
        determining the speed at which items will slide out/back and turning off sliding and/or swiping altogether.
    </p>
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
                        <i class="oln icon-arrow-right-circle archive"></i>
                        <div class='text'>
                            Try using my left or right slide buttons
                        </div>
                        <i class="oln icon-arrow-left-circle delete"></i>
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
    <div class="related-cont">
        <div class="title-related">
            Related options and events:
        </div>
        <div class="related-links">
            <a class="button-word-cont" href="{{ $subpages['options-events-methods-and-objects']['url'] . '#ref-ignoreOnClick' }}" title="ignoreOnClick">ignoreOnClick</a>
        </div>
    </div>
</div>

<div class="section-cont">
    <a id="{{$refs_glossary['clone']['aref']}}" class="title-section">
        {{$refs_glossary['clone']['title']}}
    </a>
    <p>
        Under the hood, Lithium List clones the active list item during sorting and swiping. The active list item is hidden while the clone is physically moved around the screen. Developers can control various aspects of the clone, such as its box-shadow and scale during sorting, and class names during other activities.
    </p>
    <div id="div-diag-container-clone" class="diag-cont">
        <div id="div-diag-outer-cont-clone" class="diag-outer-cont">
            <div id="div-diag-list-cont-clone" class="diag-list-cont">
                <div class="list-item unselectable">
                    <div class='inner'>
                        <i class="sld icon-grab-ui sort"></i>
                        <div class='text'>
                            Start sorting to see my box-shadow and scale change
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
            </div>
        </div>
        <div class="diag-options-cont">
            <div class="label">
                sortCloneBoxShadow:
            </div>
            <div class="option">
                <select id="select-sortCloneBoxShadow">
                    <option value="none">none</option>
                    <option value="4px 4px 4px rgba(0,0,0,0.05)">4 4px 4px rgba(0,0,0,0.05)</option>
                    <option value="0 5px 14px rgba(0,0,0,0.15), 0 6px 6px rgba(0,0,0,0.12)" selected="selected">0 5px 14px rgba(0,0,0,0.15), 0 6px 6px rgba(0,0,0,0.12)</option>
                    <option value="0 15px 30px rgba(0,0,0,0.5), 0 10px 6px rgba(0,0,0,0.45)">0 15px 30px rgba(0,0,0,0.5), 0 10px 6px rgba(0,0,0,0.45)</option>
                </select>
            </div>
            <div class="label">
                sortCloneScale:
            </div>
            <div class="option">
                <select id="select-sortCloneScale">
                    <option value="1">1</option>
                    <option value="1.02" selected="selected">1.02</option>
                    <option value="1.05">1.05</option>
                    <option value="1.10">1.10</option>
                </select>
            </div>
        </div>
    </div>
    <div class="related-cont">
        <div class="title-related">
            Related options and events:
        </div>
        <div class="related-links">
            <a class="button-word-cont" href="{{ $subpages['options-events-methods-and-objects']['url'] . '#ref-ignoreOnClick' }}" title="ignoreOnClick">ignoreOnClick</a>
        </div>
    </div>
</div>

<div class="section-cont">
    <a id="{{$refs_glossary['masks']['aref']}}" class="title-section">
        {{$refs_glossary['masks']['title']}}
    </a>
    <p>
        During sliding, Lithium List covers over the active list item with a mask. The mask is a DIV with the exact dimensions and location of the active list item. By default the mask is given a red background for left sliding and a green background for right sliding. Developers can change the background colour of the masks, apply class names during sliding and define child nodes for insertion into the masks (for example, to show a label indicating what action will occur upon completion of the slide).
    </p>
    <div id="div-diag-container-masks" class="diag-cont">
        <div id="div-diag-outer-cont-masks" class="diag-outer-cont">
            <div id="div-diag-list-cont-masks" class="diag-list-cont">
                <div class="list-item unselectable">
                    <div class='inner'>
                        <i class="oln icon-arrow-right-circle archive"></i>
                        <div class='text'>
                            Slide me left or right to reveal my masks
                        </div>
                        <i class="oln icon-arrow-left-circle delete"></i>
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
            </div>
        </div>
        <div class="diag-options-cont">
            <div class="label">
                leftMask background:
            </div>
            <div class="option">
                <select id="select-leftMaskBackground">
                    <option value="orange">orange</option>
                    <option value="rgba(252, 13, 27, 0.5)">rgba(252, 13, 27, 0.5)</option>
                    <option value="rgba(252, 13, 27, 1)" selected="selected">rgba(252, 13, 27, 1)</option>
                    <option value="#000000">#000000</option>
                </select>
            </div>
            <div class="label">
                leftMask label:
            </div>
            <div class="option">
                <select id="select-leftMaskLabel">
                    <option value="Send to trash">Send to trash</option>
                    <option value="Delete">Delete</option>
                    <option value="none" selected="selected">none</option>
                    <option value="Donald Trump">Donald Trump</option>
                </select>
            </div>
            <div class="label">
                rightMask background:
            </div>
            <div class="option">
                <select id="select-rightMaskBackground">
                    <option value="blue">blue</option>
                    <option value="rgba(15, 127, 18, 0.5)">rgba(15, 127, 18, 0.5)</option>
                    <option value="rgba(15, 127, 18, 1)" selected="selected">rgba(15, 127, 18, 1)</option>
                    <option value="#FFFFFF">#FFFFFF</option>
                </select>
            </div>
            <div class="label">
                rightMask label:
            </div>
            <div class="option">
                <select id="select-rightMaskLabel">
                    <option value="Send to trash">Save for later</option>
                    <option value="Delete">Archive</option>
                    <option value="none" selected="selected">none</option>
                    <option value="Kim Jong Un">Kim Jong Un</option>
                </select>
            </div>
        </div>
    </div>
    <div class="related-cont">
        <div class="title-related">
            Related options and events:
        </div>
        <div class="related-links">
            <a class="button-word-cont" href="{{ $subpages['options-events-methods-and-objects']['url'] . '#ref-ignoreOnClick' }}" title="ignoreOnClick">ignoreOnClick</a>
        </div>
    </div>
</div>