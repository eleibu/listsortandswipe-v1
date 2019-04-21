@extends('layout-info')

@section('pageTitle', 'Browser support')

@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/resources.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/resources.js')) }}"></script>
@endsection

@section('content')
	<br/><br/>
    <div class="sitecont-outer">
    	<div class="toc-cont">
    		<div class="toc-outer">
    			<div class="title-main">Resources</div>
                <a class="button-word-cont" href="{{ url('/examples') }}" title="Examples">Examples</a>
    			<a class="button-word-cont" href="{{ url('/documentation') }}" title="Documentation">Documentation</a>
                <a class="button-word-cont" href="{{ url('/browser-support') }}" title="Browser support">Browser support</a>
                <div class="button-word-cont selected">Upcoming features</div>
    		</div>
    	</div>
    	<div class="details-cont">
    		<div class="details-outer">
                <div class="title-main">Upcoming features</div>
                <div class="section-cont">
                    <p>
                        Upcoming features
                    </p>
                </div>
    		</div>
    	</div>
    </div>
@endsection