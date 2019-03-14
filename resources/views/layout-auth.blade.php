<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <base href="/">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <title>@yield('pageTitle')</title>
    <link rel="icon" sizes="16x16 32x32 48x48" href="{{url('/favicon.ico?v=0')}}">
    <link rel="apple-touch-icon-precomposed" href="{{url('/favicon-152.png?v=0')}}">
    @yield('cssLinks')
    <link rel="stylesheet" href="{{ url('/css/icons-outline.css') }}">
    <link rel="stylesheet" href="{{ url('/css/icons-solid.css') }}">
    @yield('jsLinks')
</head>
<body>
    <div id="pageWrapper">
        <div id="div-siteheader">
            <div class="siteheader-outer">
                <a id="a-logo" href="{{ url('/') }}" title="Lithium List - home"><img src="{{ url('/images/LithiumListLogo-blue.png') }}" alt="Lithium List logo" height="60" width="113" /></a>
            </div>
        </div>
        <div id="div-sitecont">
            @yield('content')
        </div>
    </div>
    @yield('scriptBottom')
</body>
</html>