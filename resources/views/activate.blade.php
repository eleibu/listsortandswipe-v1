@extends('layout-auth')

@section('pageTitle', 'Lithium List - activate')

@section('jsLinks')
    <script defer src="{{ url(mix('/js/activate.js')) }}"></script>
@endsection

@section('content')
    <div class="middlebox-cont">
        <br/>
        <div class="middlebox-outer">
            <div class="middlebox-inner">
                <div class="header-outer">
                    <i class="sld icon-profile-picture"></i>&nbsp;ACTIVATE ACCOUNT
                </div>
                <br/>
                @if ($view == 'awaitingactivation')
                    <br/>
                    <div class="bigmsg-cont">
                        Your account is not yet active.
                    </div>
                    <br/>
                    <div class="smallmsg-cont">
                        If you&#39;ve misplaced your activation link, please request a new one using the button below.
                    </div>
                    <br/><br/><br/>
                    <form id="form" method="POST" action="{{url('/activate')}}">
                        @csrf
                    </form>
                    <div class="buttons-cont">
                        <div id="div-resend-link" class="button-word-cont lightblue">
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
                    <form id="form" method="POST" action="{{url('/activate')}}">
                        @csrf
                    </form>
                    <div class="buttons-cont">
                        <div id="div-resend-link" class="button-word-cont lightblue">
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
                @if ($view == 'activated')
                    <br/>
                    <div class="bigmsg-cont">
                        Congratulations, your account has been activated.
                    </div>
                    <br/>
                    <div class="smallmsg-cont">
                        @if (isset($userEmail))
                            You&#39;re all set to <a href="{{ url($appPath) }}" title="go to the app">go to the app</a>
                        @else
                            Go to the <a href="{{ url($loginPath) }}" title="log in page">log in page</a>
                        @endif
                    </div>
                    <br/><br/><br/>
                @endif
                @if ($view == 'invalidlink')
                    <br/>
                    <div class="bigmsg-cont">
                        Sorry, this activation link is not valid.
                    </div>
                    <br/>
                    <div class="smallmsg-cont">
                        Return to the <a href="{{ url($homePath) }}" title="home page">home page</a>
                    </div>
                    <br/><br/><br/>
                @endif
            </div>
            <div id="div-middlebox-mask">
            </div>
        </div>
    </div>
@endsection