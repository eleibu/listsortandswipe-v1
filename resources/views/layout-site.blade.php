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
    <link rel="stylesheet" href="{{ url(mix('/css/site.css')) }}">
    <link rel="stylesheet" href="{{ url('/css/icons-outline.css') }}">
    <link rel="stylesheet" href="{{ url('/css/icons-solid.css') }}">
    @yield('jsLinks')
</head>
<body>
    <div id="div-body">
        <div id="div-siteheader" class="siteheader-cont">
            <div class="siteheader-outer">
                <a id="a-logo" href="" title="Syndeal - home"><img src="{{ url('/images/LithiumListLogo-white.png') }}" alt="Lithium List logo" height="60" width="113" /></a>
            </div>
        </div>
        <div id="div-sitecontent">
            @yield('content')
        </div>
        <div id="div-sitefooter" class="sitefooter-cont">
            <div class="sitefooter-outer">
                © 2019
            </div>
        </div>
        <br/><br/>
    </div>
    @yield('scriptBottom')
</body>
</html>