@extends('layout-info')

@section('pageTitle', $selectedpage['pageTitle'])

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
    			<a class="button-word-cont" href="" title="Demos">Demos</a>
    			<a class="button-word-cont" href="" title="Browser support">Browser support</a>
    			<a class="button-word-cont" href="" title="Upcoming features">Upcoming features</a>
    		</div>
    	</div>
    	<div class="details-cont">
    		<div class="details-outer">
                <div class="title-main">{{$selectedpage['detailsTitle']}}</div>
                @include($selectedpage['detailsView'])
    		</div>
    	</div>
    </div>
@endsection