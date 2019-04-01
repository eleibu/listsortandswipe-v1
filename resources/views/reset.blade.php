@extends('layout-auth')

@section('pageTitle', 'Lithium List - reset password')

@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/reset.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/reset.js')) }}"></script>
@endsection

@section('content')
@if ($view == 'link-request')
    <div class="section-cont">
        <div class="section-outer">
            <div class="page-title default">
                <i class="oln icon-lock"></i><strong>Reset</strong> <span>password</span>
            </div>
            <div class="page-subtitle">
                or <a href="{{ url($loginPath) }}" title="return to the log in page">return to the log in page</a>
            </div>
        </div>
    </div>
    <form id="form" method="POST" action="{{url('/reset')}}">
        @csrf
        <fieldset>
            <div class="section-cont grey">
                <div class="section-outer">
                    <div class="reset-row">
                        <input type="hidden" name="action" value="requestlink" />
                        @if ($errors->emailrequest->isEmpty())
                            <div class="reset-dataentry">
                                <input id="input-emailrequest" name="emailrequest" class="textentry" type="text" placeholder="Email" value="{{Request::old('emailrequest')}}" tabindex="1" />
                            </div>
                            <div id="div-emailrequest-submsg" class="submsg-cont">
                            </div>
                        @else
                            <div class="reset-dataentry">
                                <input id="input-emailrequest" name="emailrequest" class="textentry error" type="text" placeholder="Email" value="{{Request::old('emailrequest')}}" tabindex="1" />
                            </div>
                            <div id="div-emailrequest-submsg" class="submsg-cont error">
                                {!! $errors->emailrequest->first('message') !!}
                            </div>
                        @endif
                    </div>
                </div>
            </div>
            <div class="section-cont">
                <div class="section-outer">
                    <div class="reset-row">
                        <div id="div-submit-request" class="button-word-cont darkblue" tabindex="2">
                            <div id="div-spinner-cont" class="spinner-cont">
                                <div class="text">REQUEST RESET LINK</div>
                                <div class="spinner-outer">
                                    <div class="spinner-inner">
                                        <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @if ($errors->main->isEmpty())
                            @if (isset($errorMsgMain) && (strlen($errorMsgMain) > 0))
                                <div id="div-submit-submsg-request" class="submsg-cont error">
                                    {!! $errorMsgMain !!}
                                </div>
                            @else
                                <div id="div-submit-submsg-request" class="submsg-cont">
                                </div>
                            @endif
                        @else
                            <div id="div-submit-submsg-request" class="submsg-cont error">
                                {!! $errors->main->first('message') !!}
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </fieldset>
    </form>
@endif
@if ($view == 'link-success')
    <div class="section-cont">
        <div class="section-outer">
            <div class="page-title default">
                <i class="oln icon-lock"></i><strong>Reset link</strong> <span>sent</span>
            </div>
        </div>
    </div>
    <div class="section-cont grey">
        <div class="section-outer">
            <div class="subtitle">
                Thanks, a password reset link has been sent to you. Return to the <a href="{{ url($homePath) }}" title="home page">home page</a>.
            </div>
        </div>
    </div>
@endif
@if ($view == 'doreset-credentials')
    <div class="section-cont">
        <div class="section-outer">
            <div class="page-title default">
                <i class="oln icon-lock"></i><strong>Reset</strong> <span>password</span>
            </div>
            <div class="page-subtitle">
                or <a href="{{ url($loginPath) }}" title="return to the log in page">return to the log in page</a>
            </div>
        </div>
    </div>
    <form id="form" method="POST" action="{{url('/reset')}}">
        @csrf
        <fieldset>
            <div class="section-cont grey">
                <div class="section-outer">
                    <div class="reset-row">
                        <input type="hidden" name="action" value="resetpassword" />
                        <input type="hidden" name="emaildoreset" value="{!!$email!!}" />
                        <input type="hidden" name="token" value="{!!$token!!}" />
                        @if ($errors->password->isEmpty())
                            <div class="reset-dataentry">
                                <input id="input-password" name="password" class="textentry" type="password" placeholder="New password" tabindex="1" />
                            </div>
                            <div id="div-password-submsg" class="submsg-cont">
                            </div>
                        @else
                            <div class="reset-dataentry">
                                <input id="input-password" name="password" class="textentry error" type="password" placeholder="New password" tabindex="1" />
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
                    <div class="reset-row">
                        <div id="div-submit-doreset" class="button-word-cont darkblue" tabindex="2">
                            <div id="div-spinner-cont" class="spinner-cont">
                                <div class="text">RESET PASSWORD</div>
                                <div class="spinner-outer">
                                    <div class="spinner-inner">
                                        <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @if ($errors->main->isEmpty())
                            <div id="div-submit-submsg-doreset" class="submsg-cont">
                            </div>
                        @else
                            <div id="div-submit-submsg-doreset" class="submsg-cont error">
                                {!! $errors->main->first('message') !!}
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </fieldset>
    </form>
@endif
@if ($view == 'doreset-success')
    <div class="section-cont">
        <div class="section-outer">
            <div class="page-title success">
                <i class="oln icon-lock"></i><strong>Password</strong> <span>reset</span>
            </div>
        </div>
    </div>
    <div class="section-cont grey">
        <div class="section-outer">
            <div class="subtitle">
                Your password has been reset. Go to the <a href="{{ url($loginPath) }}" title="log in page">log in page</a>.
            </div>
        </div>
    </div>
@endif
<div id="div-sitecont-mask">
</div>
@endsection

@section('scriptBottom')
    <script>
        @if ($view == 'link-request')
            var msgEmailRequestDefault = "{!! $msgEmailRequestDefault !!}";
            var msgEmailRequestNoBlank = "{!! $msgEmailRequestNoBlank !!}";
            var msgEmailRequestInvalid = "{!! $msgEmailRequestInvalid !!}";
        @endif
        @if ($view == 'doreset-credentials')
            var msgEmailDoresetDefault = "{!! $msgEmailDoresetDefault !!}";
            var msgEmailDoresetNoBlank = "{!! $msgEmailDoresetNoBlank !!}";
            var msgEmailDoresetInvalid = "{!! $msgEmailDoresetInvalid !!}";
            var msgPasswordDefault = "{!! $msgPasswordDefault !!}";
            var msgPasswordNoBlank = "{!! $msgPasswordNoBlank !!}";
            var msgPasswordInvalid = "{!! $msgPasswordInvalid !!}";
        @endif
    </script>
@endsection