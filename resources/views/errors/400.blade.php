@extends('layout-auth')

@section('pageTitle', 'Lithium List - 400 error')

@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/errors.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/errors.js')) }}"></script>
@endsection

@section('content')
<br/><br/><br/>
<div class="section-cont grey">
    <div class="section-outer">
        <br/><br/>
        <div class="title">
            400 error
        </div>
        <div class="para">
            Go to the <a href="{{ url('/') }}" title="Lithium List home page">Lithium List home page</a>
        </div>
        <br/><br/>
    </div>
</div>
@endsection