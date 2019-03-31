@extends('layout-auth')

@section('pageTitle', 'Lithium List - log in')

@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/login.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/login.js')) }}"></script>
@endsection

@section('content')
<div class="section-cont">
    <div class="section-outer">
        <div class="page-title default">
            <i class="oln icon-lock"></i><strong>Log</strong> <span>in</span>
        </div>
        <div class="page-subtitle">
            or <a href="{{ url('/pricing') }}" title="create a new account">create a new account</a>
        </div>
    </div>
</div>
<form id="form" method="POST" action="{{url('/login')}}">
    @csrf
    <fieldset>
        <div class="section-cont grey">
            <div class="section-outer">
                <div class="login-row">
                    @if ($errors->email->isEmpty())
                        <div class="login-dataentry">
                            <input id="input-email" name="email" class="textentry" type="text" placeholder="Email" value="{{Request::old('email')}}" tabindex="1" />
                        </div>
                        <div id="div-email-submsg" class="submsg-cont">
                            {!! $msgEmailDefault !!}
                        </div>
                    @else
                        <div class="login-dataentry">
                            <input id="input-email" name="email" class="textentry error" type="text" placeholder="Email" value="{{Request::old('email')}}" tabindex="1" />
                        </div>
                        <div id="div-email-submsg" class="submsg-cont error">
                            {!! $errors->email->first('message') !!}
                        </div>
                    @endif
                </div>
                <div class="login-row">
                    @if ($errors->password->isEmpty())
                        <div class="login-dataentry">
                            <input id="input-password" name="password" class="textentry" type="password" placeholder="Password" value="{{Request::old('password')}}" tabindex="2" />
                        </div>
                        <div id="div-password-submsg" class="submsg-cont">
                            {!! $msgPasswordDefault !!}
                        </div>
                    @else
                        <div class="login-dataentry">
                            <input id="input-password" name="password" class="textentry error" type="password" placeholder="Password" value="{{Request::old('password')}}" tabindex="2" />
                        </div>
                        <div id="div-password-submsg" class="submsg-cont error">
                            {!! $errors->password->first('message') !!}
                        </div>
                    @endif
                </div>
            </div>
        </div>
        <div class="section-cont">
            <div class="section-outer">
                <div class="login-row submit">
                    <div id="div-submit" class="button-word-cont darkblue" tabindex="3">
                        <div id="div-spinner-cont" class="spinner-cont">
                            <div class="text">{{strtoupper($loginName)}}</div>
                            <div class="spinner-outer">
                                <div class="spinner-inner">
                                    <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="forgot-pwd" href="{{ url('/' . $resetPath) }}" title="Forgot password">Forgot password</a>
                    @if ($errors->main->isEmpty())
                        <div id="div-submit-submsg" class="submsg-cont">
                        </div>
                    @else
                        <div id="div-submit-submsg" class="submsg-cont error">
                            {!! $errors->main->first('message') !!}
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </fieldset>
</form>
<div id="div-sitecont-mask">
</div>
@endsection

@section('scriptBottom')
    <script>
        var msgEmailDefault = "{!! $msgEmailDefault !!}";
        var msgEmailNoBlank = "{!! $msgEmailNoBlank !!}";
        var msgPasswordDefault = "{!! $msgPasswordDefault !!}";
        var msgPasswordNoBlank = "{!! $msgPasswordNoBlank !!}";
    </script>
@endsection