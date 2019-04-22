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
    <div class="title-main-cont">
        <div class="title-main-outer">
            Support
        </div>
    </div>
    <div class="section-cont">
        <div class="section-outer">
            <form id="form" method="POST" action="{{url('/support')}}">
                @csrf
                <fieldset>
                    <div class="row">
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
                    </div>
                    <div class="row">
                        @if ((!$errors->support->isEmpty()) && (strlen($errors->support->first('message')) > 0))
                            <div class="dataentry">
                                <textarea id="textarea-message" rows="15" name="message" class="textentry error" placeholder="Message" value="{{Request::old('message')}}" tabindex="2"></textarea>
                            </div>
                            <div id="div-message-submsg" class="submsg-cont error">
                                {!! $errors->support->first('message') !!}
                            </div>
                        @else
                            <div class="dataentry">
                                <textarea id="textarea-message" rows="15" name="message" class="textentry" placeholder="Message" value="{{Request::old('message')}}" tabindex="2"></textarea>
                            </div>
                            <div id="div-message-submsg" class="submsg-cont">
                                {!! $msgMessageDefault !!}
                            </div>
                        @endif
                    </div>
                    <div class="row">
                        <div id="div-submit-order" class="button-word-cont darkblue">
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
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="mask-cont">
            
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