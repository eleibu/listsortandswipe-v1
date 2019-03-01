@extends('layout-info')

@section('pageTitle', 'Test')

@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/test.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/test.js')) }}"></script>
@endsection

@section('content')
<div id="outerCont">
    <div id="listCont">
        <div id="listItem" class="listItem">
            <div class="cont test"><div class="outer">Span test0</div></div>
            <div class="cont"><div class="outer">Span test1</div></div>
        </div>
        <div class="listItem">
            List item
        </div>
        <div class="listItem">
            List item
        </div>
        <div class="listItem">
            List item
        </div>
        <div class="listItem">
            List item
        </div>
        <div class="listItem">
            List item
        </div>
        <div class="listItem">
            List item
        </div>
    </div>
</div>
@endsection