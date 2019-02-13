<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <base href="/">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <title>Lithium List - console</title>
    <link rel="icon" sizes="16x16 32x32 48x48" href="{{url('/favicon.ico?v=0')}}">
    <link rel="apple-touch-icon-precomposed" href="{{url('/favicon-152.png?v=0')}}">
    <link rel="stylesheet" href="{{ url(mix('/css/console.css')) }}">
    <link rel="stylesheet" href="{{ url('/css/icons-outline.css') }}">
    <link rel="stylesheet" href="{{ url('/css/icons-solid.css') }}">
    <script defer src="{{ url(mix('/js/console.js')) }}"></script>
    <script>
        var urlArrowImg = "{{url('images/tt-arrow.png')}}";
    </script>
</head>
<body>
    <div id="pageWrapper">
        <div id="div-siteheader">
            <div class="siteheader-outer">
                <a id="a-logo" href="{{ url('/') }}" title="Lithium List - home"><img src="{{ url('/images/LithiumListLogo-white.png') }}" alt="Lithium List logo" height="60" width="113" /></a>
                <div class="signout-cont">
                    <a class="button-word-cont signout" href="{{ url($signoutPath) }}">{{ strtoupper($signoutName) }}</a>
                </div>
            </div>
        </div>
        <div id="div-sitecont">
            <div id="div-target" class="sitecont-outer">
            </div>
        </div>
        <div id="div-sitefooter">
            <div class="sitefooter-outer">
                © 2019
            </div>
        </div>
    </div>
</body>
</html>