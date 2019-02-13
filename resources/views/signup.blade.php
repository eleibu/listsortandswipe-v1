@extends('layout-auth')

@section('pageTitle', 'Lithium List - sign up')

@section('jsLinks')
    <script defer src="{{ url(mix('/js/signup.js')) }}"></script>
@endsection

@section('content')
    <div class="middlebox-cont">
        <br/>
        <div class="middlebox-outer">
            <div class="middlebox-inner">
                <div class="header-outer">
                    <i class="sld icon-profile-picture"></i>&nbsp;SIGN UP
                </div>
                <br/>
                @if ($view == 'signup')
                    <div class="otherpage-cont">
                        or <a href="{{ url($loginPath) }}" title="log in to your account">log in to your account</a>
                    </div>
                    <br/>
                    <div id="div-mainmsg" class="mainmsg-cont">
                        @if (!$errors->main->isEmpty())
                            {!! $errors->main->first('message') !!}
                        @endif
                    </div>
                    <form id="form" method="POST" action="{{url('/signup')}}">
                        @csrf
                        <fieldset>
                            <input type="hidden" name="action" value="signup" />
                            @if ($errors->email->isEmpty())
                                <div id="div-email-cont" class="text-cont">
                                    <div class="textentry-cont">
                                        <i class="oln icon-email"></i>
                                        <div class="textentry-outer">
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
                                        <div class="textentry-outer">
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
                                        <div class="textentry-outer">
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
                                        <div class="textentry-outer">
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
                                <div class="text">{{strtoupper($signupName)}}</div>
                                <div class="spinner-outer">
                                    <div class="spinner-inner">
                                        <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/><br/>
                    <div class="terms-cont">
                        By signing up you agree to the <a target='_blank' href="{{ url('/terms') }}" title="Lithium List - terms and conditions">terms and conditions</a> and <a target='_blank' href="{{ url('/privacy') }}" title="Lithium List - privacy policy">privacy policy</a>.
                    </div>
                @endif
                @if ($view == 'accountcreated')
                    <br/>
                    <div class="bigmsg-cont">
                        Congratulations, your account has been created.
                    </div>
                    <br/>
                    <div class="smallmsg-cont">
                        We&#39;ve sent an activation link to you. Click it and you&#39;re all set to go!
                    </div>
                    <br/><br/><br/>
                    <form id="form" method="POST" action="{{url('/signup')}}">
                        @csrf
                        <fieldset>
                            <input type="hidden" name="action" value="resendlink" />
                        </fieldset>
                    </form>
                    <div class="buttons-cont">
                        <div id="div-resend-link" class="button-word-cont darkblue">
                            <div id="div-spinner-cont" class="spinner-cont">
                                <div class="text">RESEND ACTIVATION LINK</div>
                                <div class="spinner-outer">
                                    <div class="spinner-inner">
                                        <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endif
                @if ($view == 'linksent')
                    <br/>
                    <div class="bigmsg-cont">
                        We&#39;ve resent the activation link.
                    </div>
                    <br/>
                    <div class="smallmsg-cont">
                        Click it and you&#39;re all set to go!
                    </div>
                    <br/><br/><br/>
                    <form id="form" method="POST" action="{{url('/signup')}}">
                        @csrf
                        <fieldset>
                            <input type="hidden" name="action" value="resendlink" />
                        </fieldset>
                    </form>
                    <div class="buttons-cont">
                        <div id="div-resend-link" class="button-word-cont darkblue">
                            <div id="div-spinner-cont" class="spinner-cont">
                                <div class="text">SEND AGAIN</div>
                                <div class="spinner-outer">
                                    <div class="spinner-inner">
                                        <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endif
            </div>
            <div id="div-middlebox-mask">
            </div>
        </div>
    </div>
@endsection

@section('scriptBottom')
    <script>
        var msgEmailDefault = "{!! $msgEmailDefault !!}";
        var msgEmailNoBlank = "{!! $msgEmailNoBlank !!}";
        var msgEmailInvalid = "{!! $msgEmailInvalid !!}";
        var msgPasswordDefault = "{!! $msgPasswordDefault !!}";
        var msgPasswordNoBlank = "{!! $msgPasswordNoBlank !!}";
        var msgPasswordInvalid = "{!! $msgPasswordInvalid !!}";
    </script>
@endsection