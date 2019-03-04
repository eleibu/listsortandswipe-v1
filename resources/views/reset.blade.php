@extends('layout-auth')

@section('pageTitle', 'Lithium List - reset password')

@section('jsLinks')
    <script defer src="{{ url(mix('/js/reset.js')) }}"></script>
@endsection

@section('content')
    <div class="middlebox-cont">
        <br/>
        <div class="middlebox-outer">
            <div class="middlebox-inner">
                <div class="header-outer">
                    <i class="sld icon-lock"></i>&nbsp;RESET PASSWORD
                </div>
                <br/>
                @if ($view == 'link-request')
                    <div class="otherpage-cont">
                        or <a href="{{ url($loginPath) }}" title="return to the log in page">return to the log in page</a>
                    </div>
                    <br/>
                    <div id="div-mainmsg" class="mainmsg-cont">
                        @if (!$errors->main->isEmpty())
                            {!! $errors->main->first('message') !!}
                        @elseif (isset($errorMsgMain) && (strlen($errorMsgMain) > 0))
                            {!! $errorMsgMain !!}
                        @endif
                    </div>
                    <form id="form" method="POST" action="{{url('/reset')}}">
                        @csrf
                        <fieldset>
                            <input type="hidden" name="action" value="requestlink" />
                            @if ($errors->emailrequest->isEmpty())
                                <div id="div-emailrequest-cont" class="text-cont">
                                    <div class="textentry-cont">
                                        <i class="oln icon-email"></i>
                                        <div class="textentry-outer icon">
                                            <input id="input-emailrequest" name="emailrequest" class="textentry" type="text" placeholder="Email" value="{{Request::old('emailrequest')}}" tabindex="1" />
                                        </div>
                                    </div>
                                    <div id="div-emailrequest-submsg" class="submsg-cont">
                                    </div>
                                </div>
                            @else
                                <div id="div-emailrequest-cont" class="text-cont error">
                                    <div class="textentry-cont">
                                        <i class="oln icon-email"></i>
                                        <div class="textentry-outer icon">
                                            <input id="input-emailrequest" name="emailrequest" class="textentry" type="text" placeholder="Email" value="{{Request::old('emailrequest')}}" tabindex="1" />
                                        </div>
                                    </div>
                                    <div id="div-emailrequest-submsg" class="submsg-cont">
                                        {!! $errors->emailrequest->first('message') !!}
                                    </div>
                                </div>
                            @endif
                        </fieldset>
                    </form>
                    <br/><br/>
                    <div class="buttons-cont">
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
                    </div>
                @endif
                @if ($view == 'link-success')
                    <br/>
                    <div class="bigmsg-cont">
                        Thanks, we&#39;ve sent a password reset link to you.
                    </div>
                    <br/>
                    <div class="smallmsg-cont">
                        Return to the <a href="{{ url($homePath) }}" title="home page">home page</a>
                    </div>
                    <br/><br/><br/>
                @endif
                @if ($view == 'doreset-credentials')
                    <div class="otherpage-cont">
                        Enter a new password for &#39;{{$email}}&#39;
                    </div>
                    <br/>
                    <div id="div-mainmsg" class="mainmsg-cont">
                        @if (!$errors->main->isEmpty())
                            {!! $errors->main->first('message') !!}
                        @endif
                    </div>
                    <form id="form" method="POST" action="{{url('/reset')}}">
                        @csrf
                        <fieldset>
                            <input type="hidden" name="action" value="resetpassword" />
                            <input type="hidden" name="emaildoreset" value="{!!$email!!}" />
                            <input type="hidden" name="token" value="{!!$token!!}" />
                            @if ($errors->password->isEmpty())
                                <div id="div-password-cont" class="text-cont">
                                    <div class="textentry-cont">
                                        <i class="oln icon-lock"></i>
                                        <div class="textentry-outer icon">
                                            <input id="input-password" name="password" class="textentry" type="password" placeholder="New password" tabindex="2" />
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
                                            <input id="input-password" name="password" class="textentry" type="password" placeholder="New password" tabindex="2" />
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
                        <div id="div-submit-doreset" class="button-word-cont darkblue" tabindex="3">
                            <div id="div-spinner-cont" class="spinner-cont">
                                <div class="text">RESET PASSWORD</div>
                                <div class="spinner-outer">
                                    <div class="spinner-inner">
                                        <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endif
                @if ($view == 'doreset-success')
                    <br/>
                    <div class="bigmsg-cont">
                        Your password has been reset.
                    </div>
                    <br/>
                    <div class="smallmsg-cont">
                        Go to the <a href="{{ url($loginPath) }}" title="log in page">log in page</a>
                    </div>
                    <br/><br/><br/>
                @endif
            </div>
            <div id="div-middlebox-mask">
            </div>
        </div>
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