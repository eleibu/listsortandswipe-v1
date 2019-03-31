@extends('layout-auth')

@section('pageTitle', 'Lithium List - activate')

@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/activate.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/activate.js')) }}"></script>
@endsection

@section('content')
@if ($view == 'awaitingactivation')
    <div class="section-cont">
        <div class="section-outer">
            <div class="page-title default">
                <i class="oln icon-user"></i><strong>Activate</strong> <span>your account</span>
            </div>
        </div>
    </div>
    <div class="section-cont grey">
        <div class="section-outer">
            <div class="subtitle">
                Your account is not yet active. If you&#39;ve misplaced your activation link, please request it again using the button below.
            </div>
        </div>
    </div>
    <form id="form" method="POST" action="{{url('/activate')}}">
        @csrf
    </form>
    <div class="section-cont">
        <div class="section-outer">
            <div id="div-resendlink" class="button-word-cont darkblue">
                <div id="div-spinner-cont-resendlink" class="spinner-cont">
                    <div class="text">RESEND ACTIVATION LINK</div>
                    <div class="spinner-outer">
                        <div class="spinner-inner">
                            <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endif
@if ($view == 'linksent')
    <div class="section-cont">
        <div class="section-outer">
            <div class="page-title default">
                <i class="oln icon-user"></i><strong>Activation link</strong> <span>sent</span>
            </div>
        </div>
    </div>
    <div class="section-cont grey">
        <div class="section-outer">
            <div class="subtitle">
                We&#39;ve re-sent the activation link. Please click it to get started.
            </div>
        </div>
    </div>
    <form id="form" method="POST" action="{{url('/activate')}}">
        @csrf
    </form>
    <div class="section-cont">
        <div class="section-outer">
            <div id="div-resendlink" class="button-word-cont darkblue">
                <div id="div-spinner-cont-resendlink" class="spinner-cont">
                    <div class="text">SEND AGAIN</div>
                    <div class="spinner-outer">
                        <div class="spinner-inner">
                            <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endif
@if ($view == 'activated')
    <div class="section-cont">
        <div class="section-outer">
            <div class="page-title success">
                <i class="oln icon-user-tick"></i><strong>Account</strong> <span>activated</span>
            </div>
        </div>
    </div>
    <div class="section-cont grey">
        <div class="section-outer">
            <div class="subtitle">
                Congratulations, your account has been activated. Thanks for supporting Lithium List.
            </div>
        </div>
    </div>
    <div class="section-cont">
        <div class="section-outer">
            @component('nextsteps', ['accountType' => $accountType])
            @endcomponent
        </div>
    </div>
@endif
@if ($view == 'invalidlink')
    <div class="section-cont">
        <div class="section-outer">
            <div class="page-title default">
                <i class="oln icon-user-cross"></i><strong>Activation link</strong> <span>invalid</span>
            </div>
        </div>
    </div>
    <div class="section-cont grey">
        <div class="section-outer">
            <div class="subtitle">
                Sorry, this activation link is invalid. Return to the <a href="{{ url($homePath) }}" title="home page">home page</a>.
            </div>
        </div>
    </div>
@endif
<div id="div-sitecont-mask">
</div>
@endsection