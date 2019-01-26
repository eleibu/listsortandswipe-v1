@php

// in Objects, Events, Methods and Objects, will need to search for
// $subpages['glossary']['url'] . '#ref-clone' and
// and replace '#ref-clone' with object ref

// remove unused methods from documentation.js

    $refs_options = array(
        'ignoreOnClick' => array(
            'aref' => 'ref-ignoreOnClick',
            'title' => 'ignoreOnClick'
        ),
        'leftButtonClass' => array(
            'aref' => 'ref-leftButtonClass',
            'title' => 'leftButtonClass'
        ),
        'leftBySwipe' => array(
            'aref' => 'ref-leftBySwipe',
            'title' => 'leftBySwipe'
        ),
        'leftCloneClass' => array(
            'aref' => 'ref-leftCloneClass',
            'title' => 'leftCloneClass'
        ),
        'leftCloneSlideBackClass' => array(
            'aref' => 'ref-leftCloneSlideBackClass',
            'title' => 'leftCloneSlideBackClass'
        ),
        'leftCloneSlideOutClass' => array(
            'aref' => 'ref-leftCloneSlideOutClass',
            'title' => 'leftCloneSlideOutClass'
        ),
        'leftEnabled' => array(
            'aref' => 'ref-leftEnabled',
            'title' => 'leftEnabled'
        ),
        'leftItemActiveClass' => array(
            'aref' => 'ref-leftItemActiveClass',
            'title' => 'leftItemActiveClass'
        ),
        'leftListClass' => array(
            'aref' => 'ref-leftListClass',
            'title' => 'leftListClass'
        ),
        'leftMasks' => array(
            'aref' => 'ref-leftMasks',
            'title' => 'leftMasks'
        ),
        'leftOuterClass' => array(
            'aref' => 'ref-leftOuterClass',
            'title' => 'leftOuterClass'
        ),
        'leftSlideBackDuration' => array(
            'aref' => 'ref-leftSlideBackDuration',
            'title' => 'leftSlideBackDuration'
        ),
        'leftSlideOutDuration' => array(
            'aref' => 'ref-leftSlideOutDuration',
            'title' => 'leftSlideOutDuration'
        ),
        'leftSwipeEndThreshold' => array(
            'aref' => 'ref-leftSwipeEndThreshold',
            'title' => 'leftSwipeEndThreshold'
        ),
        'leftSwipeStartThreshold' => array(
            'aref' => 'ref-leftSwipeStartThreshold',
            'title' => 'leftSwipeStartThreshold'
        ),
        'rightButtonClass' => array(
            'aref' => 'ref-rightButtonClass',
            'title' => 'rightButtonClass'
        ),
        'rightBySwipe' => array(
            'aref' => 'ref-rightBySwipe',
            'title' => 'rightBySwipe'
        ),
        'rightCloneClass' => array(
            'aref' => 'ref-rightCloneClass',
            'title' => 'rightCloneClass'
        ),
        'rightCloneSlideBackClass' => array(
            'aref' => 'ref-rightCloneSlideBackClass',
            'title' => 'rightCloneSlideBackClass'
        ),
        'rightCloneSlideOutClass' => array(
            'aref' => 'ref-rightCloneSlideOutClass',
            'title' => 'rightCloneSlideOutClass'
        ),
        'rightEnabled' => array(
            'aref' => 'ref-rightEnabled',
            'title' => 'rightEnabled'
        ),
        'rightItemActiveClass' => array(
            'aref' => 'ref-rightItemActiveClass',
            'title' => 'rightItemActiveClass'
        ),
        'rightListClass' => array(
            'aref' => 'ref-rightListClass',
            'title' => 'rightListClass'
        ),
        'rightMasks' => array(
            'aref' => 'ref-rightMasks',
            'title' => 'rightMasks'
        ),
        'rightOuterClass' => array(
            'aref' => 'ref-rightOuterClass',
            'title' => 'rightOuterClass'
        ),
        'rightSlideBackDuration' => array(
            'aref' => 'ref-rightSlideBackDuration',
            'title' => 'rightSlideBackDuration'
        ),
        'rightSlideOutDuration' => array(
            'aref' => 'ref-rightSlideOutDuration',
            'title' => 'rightSlideOutDuration'
        ),
        'rightSwipeEndThreshold' => array(
            'aref' => 'ref-rightSwipeEndThreshold',
            'title' => 'rightSwipeEndThreshold'
        ),
        'rightSwipeStartThreshold' => array(
            'aref' => 'ref-rightSwipeStartThreshold',
            'title' => 'rightSwipeStartThreshold'
        ),
        'safariAutoOuterOverflow' => array(
            'aref' => 'ref-safariAutoOuterOverflow',
            'title' => 'safariAutoOuterOverflow'
        ),
        'safariBodyUnselectable' => array(
            'aref' => 'ref-safariBodyUnselectable',
            'title' => 'safariBodyUnselectable'
        ),
        'sortByLongPress' => array(
            'aref' => 'ref-sortByLongPress',
            'title' => 'sortByLongPress'
        ),
        'sortCloneBoxShadow' => array(
            'aref' => 'ref-sortCloneBoxShadow',
            'title' => 'sortCloneBoxShadow'
        ),
        'sortCloneClass' => array(
            'aref' => 'ref-sortCloneClass',
            'title' => 'sortCloneClass'
        ),
        'sortCloneScale' => array(
            'aref' => 'ref-sortCloneScale',
            'title' => 'sortCloneScale'
        ),
        'sortDragHandleClass' => array(
            'aref' => 'ref-sortDragHandleClass',
            'title' => 'sortDragHandleClass'
        ),
        'sortEnabled' => array(
            'aref' => 'ref-sortEnabled',
            'title' => 'sortEnabled'
        ),
        'sortEndDuration' => array(
            'aref' => 'ref-sortEndDuration',
            'title' => 'sortEndDuration'
        ),
        'sortItemActiveClass' => array(
            'aref' => 'ref-sortItemActiveClass',
            'title' => 'sortItemActiveClass'
        ),
        'sortItemActiveHide' => array(
            'aref' => 'ref-sortItemActiveHide',
            'title' => 'sortItemActiveHide'
        ),
        'sortListClass' => array(
            'aref' => 'ref-sortListClass',
            'title' => 'sortListClass'
        ),
        'sortMoveStartDelay' => array(
            'aref' => 'ref-sortMoveStartDelay',
            'title' => 'sortMoveStartDelay'
        ),
        'sortOuterClass' => array(
            'aref' => 'ref-sortOuterClass',
            'title' => 'sortOuterClass'
        ),
        'sortScrollEnabled' => array(
            'aref' => 'ref-sortScrollEnabled',
            'title' => 'sortScrollEnabled'
        ),
        'sortScrollSpeed' => array(
            'aref' => 'ref-sortScrollSpeed',
            'title' => 'sortScrollSpeed'
        ),
        'sortStartDuration' => array(
            'aref' => 'ref-sortStartDuration',
            'title' => 'sortStartDuration'
        ),
        'sortReorderDuration' => array(
            'aref' => 'ref-sortReorderDuration',
            'title' => 'sortReorderDuration'
        ),
    );
    $refs_events = array(
        'onLeftEnd' => array(
            'aref' => 'ref-onLeftEnd',
            'title' => 'onLeftEnd'
        ),
        'onLeftSlideBackStart' => array(
            'aref' => 'ref-onLeftSlideBackStart',
            'title' => 'onLeftSlideBackStart'
        ),
        'onLeftSlideOutStart' => array(
            'aref' => 'ref-onLeftSlideOutStart',
            'title' => 'onLeftSlideOutStart'
        ),
        'onLeftStart' => array(
            'aref' => 'ref-onLeftStart',
            'title' => 'onLeftStart'
        ),
        'onRightEnd' => array(
            'aref' => 'ref-onRightEnd',
            'title' => 'onRightEnd'
        ),
        'onRightSlideBackStart' => array(
            'aref' => 'ref-onRightSlideBackStart',
            'title' => 'onRightSlideBackStart'
        ),
        'onRightSlideOutStart' => array(
            'aref' => 'ref-onRightSlideOutStart',
            'title' => 'onRightSlideOutStart'
        ),
        'onRightStart' => array(
            'aref' => 'ref-onRightStart',
            'title' => 'onRightStart'
        ),
        'onSortAutoScrollEnd' => array(
            'aref' => 'ref-onSortAutoScrollEnd',
            'title' => 'onSortAutoScrollEnd'
        ),
        'onSortAutoScrollStart' => array(
            'aref' => 'ref-onSortAutoScrollStart',
            'title' => 'onSortAutoScrollStart'
        ),
        'onSortEnd' => array(
            'aref' => 'ref-onSortEnd',
            'title' => 'onSortEnd'
        ),
        'onSortStart' => array(
            'aref' => 'ref-onSortStart',
            'title' => 'onSortStart'
        ),
    );
    $refs_methods = array(
        'attachToList' => array(
            'aref' => 'ref-attachToList',
            'title' => 'attachToList'
        ),
        'detachFromList' => array(
            'aref' => 'ref-detachFromList',
            'title' => 'detachFromList'
        ),
        'setListProperties' => array(
            'aref' => 'ref-setListProperties',
            'title' => 'setListProperties'
        ),
        'setDefaultProperties' => array(
            'aref' => 'ref-setDefaultProperties',
            'title' => 'setDefaultProperties'
        ),
        'triggerLeft' => array(
            'aref' => 'ref-triggerLeft',
            'title' => 'triggerLeft'
        ),
        'triggerRight' => array(
            'aref' => 'ref-triggerRight',
            'title' => 'triggerRight'
        ),
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
    $refs_glossary = array(
        'sorting' => array(
            'aref' => 'ref-sorting',
            'title' => 'Sorting'
        ),
        'automatic-scrolling' => array(
            'aref' => 'ref-automatic-scrolling',
            'title' => 'Automatic scrolling'
        ),
        'sliding-and-swiping' => array(
            'aref' => 'ref-sliding-and-swiping',
            'title' => 'Sliding and swiping'
        ),
        'clone' => array(
            'aref' => 'ref-clone',
            'title' => 'Clone'
        ),
        'masks' => array(
            'aref' => 'ref-masks',
            'title' => 'Masks'
        )
    );
@endphp

@extends('layout-info')

@section('pageTitle', $selectedpage['pageTitle'])

@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/documentation.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/documentation.js')) }}"></script>
@endsection

@section('content')
	<br/><br/>
    <div class="sitecont-outer">
    	<div class="toc-cont">
    		<div class="toc-outer">
    			<div class="title-main">Documentation</div>
                @foreach ($subpages as $subpage)
                    @if ($subpage['selected'])
                        <div class="button-word-cont selected">{{$subpage['detailsTitle']}}</div>
                    @else
                        <a class="button-word-cont" href="{{ $subpage['url'] }}" title="{{$subpage['detailsTitle']}}">{{$subpage['detailsTitle']}}</a>
                    @endif
                @endforeach
    			<br/><br/><br/>
    			<div class="subtitle-main">Other resources</div>
    			<a class="button-word-cont" href="" title="Examples">Examples</a>
    			<a class="button-word-cont" href="" title="Browser support">Browser support</a>
    			<a class="button-word-cont" href="" title="Upcoming features">Upcoming features</a>
    		</div>
    	</div>
    	<div class="details-cont">
    		<div class="details-outer">
                <div class="title-main">{{$selectedpage['detailsTitle']}}</div>
                @include($selectedpage['detailsView'])
                @if (isset($nextpage))
                    <div class="nextpage-cont">
                        <a class="button-word-cont" href="{{ url($nextpage['url']) }}" title="{{$nextpage['detailsTitle']}}">{{$nextpage['detailsTitle']}}&nbsp;&gt;</a>
                    </div>
                @endif
    		</div>
    	</div>
    </div>
@endsection