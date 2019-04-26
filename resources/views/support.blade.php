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
            <div class="page-title default">
                <i class="oln icon-chat-question"></i><strong>Support</strong>
            </div>
        </div>
    </div>
    <div class="section-cont">
        <div class="section-outer">
            <div class="intro">
                @if ($accountType == 0)
                    Your <strong>Free trial</strong> licence does not include tech support. To obtain tech support please upgrade to a <strong>Professional</strong> or <strong>Enterprise</strong> licence via the Account tab in your <a href="{{ url($consolePath) }}" title="{{$consoleName}}">{{$consoleName}}</a>.
                @elseif ($accountType == 1)
                    Your <strong>Basic</strong> licence does not include tech support. To obtain tech support please upgrade to a <strong>Professional</strong> or <strong>Enterprise</strong> licence via the Account tab in your <a href="{{ url($consolePath) }}" title="{{$consoleName}}">{{$consoleName}}</a>.
                @elseif ($accountType == 2)
                    Your <strong>Professional</strong> licence includes standard tech support. Please enter the details of your support request below.
                @elseif ($accountType == 3)
                    Your <strong>Enterprise</strong> licence includes premium tech support. Please enter the details of your support request below.
                @else
                    Tech support is available to holders of <strong>Professional</strong> and <strong>Enterprise</strong> licences. If you have one of these licences, please <a href="{{ url($loginPath) . '?nextPage=support' }}" title="{{$loginName}}">{{$loginName}}</a> to activate the form below.
                @endif
            </div>
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
                                    &nbsp;
                                </div>
                            @else
                                <div class="dataentry">
                                    <input id="input-subject" name="subject" class="textentry" type="text" placeholder="Subject" value="{{Request::old('subject')}}" tabindex="1" />
                                </div>
                                <div id="div-subject-submsg" class="submsg-cont">
                                    &nbsp;
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
                            @if ((!$errors->support->isEmpty()) && (strlen($errors->support->first('body')) > 0))
                                <div class="dataentry">
                                    <textarea id="textarea-body" rows="15" name="body" class="textentry error" placeholder="Details of your support request" value="{{Request::old('body')}}" tabindex="2"></textarea>
                                </div>
                                <div id="div-body-submsg" class="submsg-cont error">
                                    {!! $errors->support->first('body') !!}
                                </div>
                            @else
                                <div class="dataentry">
                                    <textarea id="textarea-body" rows="15" name="body" class="textentry" placeholder="Details of your support request" value="{{Request::old('body')}}" tabindex="2"></textarea>
                                </div>
                                <div id="div-body-submsg" class="submsg-cont">
                                    {!! $msgBodyDefault !!}
                                </div>
                            @endif
                        @else
                            <div class="dataentry">
                                <textarea id="textarea-body" rows="15" name="body" class="textentry disabled" tabindex="2" disabled=""></textarea>
                            </div>
                            <div id="div-body-submsg" class="submsg-cont">
                                &nbsp;
                            </div>
                        @endif
                    </div>
                    <div class="row">
                        @if (($accountType == 2) || ($accountType == 3))
                            <div id="div-submit" class="button-word-cont darkblue">
                                <div id="div-spinner-cont" class="spinner-cont">
                                    <div class="text">SUBMIT REQUEST</div>
                                    <div class="spinner-outer">
                                        <div class="spinner-inner">
                                            <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @else
                            <div id="div-disabled" class="button-word-cont disabled">
                                <div class="spinner-cont">
                                    <div class="text">SUBMIT REQUEST</div>
                                </div>
                            </div>
                        @endif
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
    <div id="div-sitecont-mask">
    </div>
@endif
@if ($view == 'success')
    <div class="section-cont">
        <div class="section-outer">
            <div class="page-title success">
                <i class="oln icon-chat-tick"></i><strong>Request</strong> <span>submitted</span>
            </div>
        </div>
    </div>
    <div class="section-cont grey">
        <div class="section-outer">
            <div class="subtitle">
                @if ($accountType == 2)
                    Thanks, your support request has been submitted. We&#39;ll get back to you within 72 hours.
                @elseif ($accountType == 3)
                    Thanks, your support request has been submitted. We&#39;ll get back to you within 24 hours.
                @else
                    Thanks, your support request has been submitted.
                @endif
            </div>
        </div>
    </div>
    <div class="section-cont">
        <div class="section-outer">
            <a class="textlink" href="{{url('/support')}}" title="Submit another">
                SUBMIT ANOTHER
            </a>
        </div>
    </div>
@endif
<br/><br/>
@endsection

@if ($view == 'support')
    @section('scriptBottom')
        <script>
            var msgBodyDefault = "{!! $msgBodyDefault !!}";
            var msgBodyNoBlank = "{!! $msgBodyNoBlank !!}";
        </script>
    @endsection
@endif