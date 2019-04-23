@extends('layout-info')

@section('pageTitle', 'Lithium List - support')

@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/support.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/support.js')) }}"></script>
@endsection

@section('content')
@if ($view == 'support')
    <div class="section-cont">
        <div class="section-outer">
            @if (($accountType == 2) || ($accountType == 3))
                <div class="page-title active">
                    <i class="oln icon-chat-question"></i><strong>Support</strong>
                </div>
            @else
                <div class="page-title default">
                    <i class="oln icon-chat-question"></i><strong>Support</strong>
                </div>
            @endif
        </div>
    </div>
    <div class="section-cont">
        <div class="section-outer">
            @if ($accountType == 0)
                <div class="intro default">
                    Your <strong>Free trial</strong> licence does not include tech support. To obtain tech support please upgrade to a <strong>Professional</strong> or <strong>Enterprise</strong> licence via the Account tab in your <a href="{{ url($consolePath) }}" title="{{$consoleName}}">{{$consoleName}}</a>.
                </div>
            @elseif ($accountType == 1)
                <div class="intro default">
                    Your <strong>Basic</strong> licence does not include tech support. To obtain tech support please upgrade to a <strong>Professional</strong> or <strong>Enterprise</strong> licence via the Account tab in your <a href="{{ url($consolePath) }}" title="{{$consoleName}}">{{$consoleName}}</a>.
                </div>
            @elseif ($accountType == 2)
                <div class="intro active">
                    Your <strong>Professional</strong> licence includes standard tech support. Enter details of your support request below. Please expect a response within 72 hours.
                </div>
            @elseif ($accountType == 3)
                <div class="intro active">
                    Your <strong>Enterprise</strong> licence includes premium tech support. Enter details of your support request below. Please expect a response within 24 hours.
                </div>
            @else
                <div class="intro default">
                    Tech support is available to holders of <strong>Professional</strong> and <strong>Enterprise</strong> licences. If you have one of these licences, please <a href="{{ url($loginPath) }}" title="{{$loginName}}">{{$loginName}}</a> to activate the form below.
                </div>
            @endif
        </div>
    </div>
    <div class="section-cont grey">
        <div class="section-outer">
            <form id="form" method="POST" action="{{url('/support')}}">
                @csrf
                <fieldset>
                    <div class="row">
                        @if (($accountType == 2) || ($accountType == 3))
                            @if ((!$errors->support->isEmpty()) && (strlen($errors->support->first('subject')) > 0))
                                <div class="dataentry">
                                    <input id="input-subject" name="subject" class="textentry error" type="text" placeholder="Subject" value="{{Request::old('subject')}}" tabindex="1" />
                                </div>
                                <div id="div-subject-submsg" class="submsg-cont error">
                                    {!! $errors->support->first('subject') !!}
                                </div>
                            @else
                                <div class="dataentry">
                                    <input id="input-subject" name="subject" class="textentry" type="text" placeholder="Subject" value="{{Request::old('subject')}}" tabindex="1" />
                                </div>
                                <div id="div-subject-submsg" class="submsg-cont">
                                    {!! $msgSubjectDefault !!}
                                </div>
                            @endif
                        @else
                            <div class="dataentry">
                                <input id="input-subject" name="subject" class="textentry disabled" type="text" tabindex="1" disabled/>
                            </div>
                            <div id="div-subject-submsg" class="submsg-cont">
                                &nbsp;
                            </div>
                        @endif
                    </div>
                    <div class="row">
                        @if (($accountType == 2) || ($accountType == 3))
                            @if ((!$errors->support->isEmpty()) && (strlen($errors->support->first('message')) > 0))
                                <div class="dataentry">
                                    <textarea id="textarea-message" rows="15" name="message" class="textentry error" placeholder="Details of your support request" value="{{Request::old('message')}}" tabindex="2"></textarea>
                                </div>
                                <div id="div-message-submsg" class="submsg-cont error">
                                    {!! $errors->support->first('message') !!}
                                </div>
                            @else
                                <div class="dataentry">
                                    <textarea id="textarea-message" rows="15" name="message" class="textentry" placeholder="Details of your support request" value="{{Request::old('message')}}" tabindex="2"></textarea>
                                </div>
                                <div id="div-message-submsg" class="submsg-cont">
                                    {!! $msgMessageDefault !!}
                                </div>
                            @endif
                        @else
                            <div class="dataentry">
                                <textarea id="textarea-message" rows="15" name="message" class="textentry disabled" tabindex="2" disabled=""></textarea>
                            </div>
                            <div id="div-message-submsg" class="submsg-cont">
                                &nbsp;
                            </div>
                        @endif
                    </div>
                    <div class="row">
                        @if (($accountType == 2) || ($accountType == 3))
                            <div id="div-submit" class="button-word-cont darkblue">
                                <div id="div-spinner-cont-submit" class="spinner-cont">
                                    <div class="text">SUBMIT REQUEST</div>
                                    <div class="spinner-outer">
                                        <div class="spinner-inner">
                                            <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            @if ($errors->submit->isEmpty())
                                <div id="div-submit-submsg" class="submsg-cont">
                                    {!! $msgSubmitDefault !!}
                                </div>
                            @else
                                <div id="div-submit-submsg" class="submsg-cont error">
                                    {!! $msgSubmitErrors !!}
                                </div>
                            @endif
                        @else
                            <div id="div-disabled" class="button-word-cont disabled">
                                <div id="div-spinner-cont-submit" class="spinner-cont">
                                    <div class="text">SUBMIT REQUEST</div>
                                    <div class="spinner-outer">
                                        <div class="spinner-inner">
                                            <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="div-submit-submsg" class="submsg-cont">
                                &nbsp;
                            </div>
                        @endif
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
@endif
@if ($view == 'submitted')
    <div class="title-main-cont">
        <div class="title-main-outer">
            Submitted
        </div>
    </div>
    <div class="section-cont">
        <div class="section-outer">
            <br/>
        </div>
    </div>
@endif
<br/><br/>
@endsection

@if ($view == 'support')
    @section('scriptBottom')
        <script>
            var msgSubjectDefault = "{!! $msgSubjectDefault !!}";
            var msgSubjectNoBlank = "{!! $msgSubjectNoBlank !!}";
            var msgMessageDefault = "{!! $msgMessageDefault !!}";
            var msgMessageNoBlank = "{!! $msgMessageNoBlank !!}";
            var msgSubmitDefault = "{!! $msgSubmitDefault !!}";
            var msgSubmitErrors = "{!! $msgSubmitErrors !!}";
        </script>
    @endsection
@endif