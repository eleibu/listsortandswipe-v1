@extends('layout-auth')

@section('pageTitle', 'Lithium List - log in')

@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/auth.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/login.js')) }}"></script>
@endsection

@section('content')
    <div class="middlebox-cont">
        <br/>
        <div class="middlebox-outer">
            <div class="middlebox-inner">
                <div class="header-outer">
                    <i class="sld icon-lock"></i>&nbsp;LOG IN
                </div>
                <br/>
                <div class="otherpage-cont">
                    or <a href="{{ url($signupPath) }}" title="sign up for an account">sign up for an account</a>
                </div>
                <br/>
                <div id="div-mainmsg" class="mainmsg-cont">
                    @if (!$errors->main->isEmpty())
                        {!! $errors->main->first('message') !!}
                    @endif
                </div>
                <form id="form" method="POST" action="{{url('/login')}}">
                    @csrf
                    <fieldset>
                        <input type="hidden" name="action" value="signup" />
                        @if ($errors->email->isEmpty())
                            <div id="div-email-cont" class="text-cont">
                                <div class="textentry-cont">
                                    <i class="oln icon-email"></i>
                                    <div class="textentry-outer icon">
                                        <input id="input-email" name="email" class="textentry" type="text" placeholder="Email" value="{{Request::old('email')}}" tabindex="1" />
                                    </div>
                                </div>
                                <div id="div-email-submsg" class="submsg-cont">
                                </div>
                            </div>
                        @else
                            <div id="div-email-cont" class="text-cont error">
                                <div class="textentry-cont">
                                    <i class="oln icon-email"></i>
                                    <div class="textentry-outer icon">
                                        <input id="input-email" name="email" class="textentry" type="text" placeholder="Email" value="{{Request::old('email')}}" tabindex="1" />
                                    </div>
                                </div>
                                <div id="div-email-submsg" class="submsg-cont">
                                    {!! $errors->email->first('message') !!}
                                </div>
                            </div>
                        @endif
                        @if ($errors->password->isEmpty())
                            <div id="div-password-cont" class="text-cont">
                                <div class="textentry-cont">
                                    <i class="oln icon-lock"></i>
                                    <div class="textentry-outer icon">
                                        <input id="input-password" name="password" class="textentry" type="password" placeholder="Password" tabindex="2" />
                                    </div>
                                </div>
                                <div id="div-password-submsg" class="submsg-cont">
                                </div>
                            </div>
                        @else
                            <div id="div-password-cont" class="text-cont error">
                                <div class="textentry-cont">
                                    <i class="oln icon-lock"></i>
                                    <div class="textentry-outer icon">
                                        <input id="input-password" name="password" class="textentry" type="password" placeholder="Password" tabindex="2" />
                                    </div>
                                </div>
                                <div id="div-password-submsg" class="submsg-cont">
                                    {!! $errors->password->first('message') !!}
                                </div>
                            </div>
                        @endif
                    </fieldset>
                </form>
                <br/><br/>
                <div class="buttons-cont">
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
                </div>
                <br/><br/>
                <div class="forgot-cont">
                    Forgot your password? <a href="{{ url($resetPath) }}" title="Reset it here">Reset it here</a>.
                </div>
            </div>
            <div id="div-middlebox-mask">
            </div>
        </div>
    </div>
    <br/><br/>
@endsection

@section('scriptBottom')
    <script>
        var msgEmailDefault = "{!! $msgEmailDefault !!}";
        var msgEmailNoBlank = "{!! $msgEmailNoBlank !!}";
        var msgPasswordDefault = "{!! $msgPasswordDefault !!}";
        var msgPasswordNoBlank = "{!! $msgPasswordNoBlank !!}";
    </script>
@endsection