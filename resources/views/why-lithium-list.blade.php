@extends('layout-info')

@section('pageTitle', 'Why Lithium List?')

@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/why-lithium-list.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/why-lithium-list.js')) }}"></script>
@endsection

@section('content')
<div class="title-main-cont">
    <div class="title-main-outer">
        Why Lithium List?
    </div>
</div>
<div class="section-cont left">
    <div class="section-outer">
        <img src="{{url('/images/image-caption.png')}}" alt="" width="193" height="200" />
        <div class="details">
            <div class="title">
                Beautiful user experience
            </div>
            <div class="description">
                <p>
                    Sorting, scrolling, swiping... it&#39;s all simple and intuitive. Animations are smooth and have been carefully crafted to make every list feel natural and real.
                </p>
            </div>            
        </div>
    </div>
</div>
<div class="section-cont right">
    <div class="section-outer">
        <img src="{{url('/images/desktop-smartphone.png')}}" alt="" width="193" height="200" />
        <div class="details">
            <div class="title">
                Desktop and mobile
            </div>
            <div class="description">
                <p>
                    From the ground up, Lithium List has been designed to behave like sortable and swipeable tables in iOS and Android. It works equally well on desktop and mobile, enabling developers to easily offer app-like functionality in their web pages.
                </p>
            </div>            
        </div>
    </div>
</div>
<div class="section-cont left">
    <div class="section-outer">
        <img src="{{url('/images/cog.png')}}" alt="" width="200" height="200" />
        <div class="details">
            <div class="title">
                Fully customisable
            </div>
            <div class="description">
                <p>
                    With piles of options, events and methods, everything is customisable and overrideable. It&#39;s easy to make Lithium List behave exactly how you want it to.
                </p>
            </div>            
        </div>
    </div>
</div>
@endsection