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
                        <div id="div-submit" class="button-word-cont darkblue" tabindex="2">
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
@endif
@if ($view == 'link-success')

@endif
@if ($view == 'doreset-credentials')

@endif
@if ($view == 'doreset-success')

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