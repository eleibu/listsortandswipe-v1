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
        <div class="image">
            <img class="large" src="{{url('/images/image-caption.png')}}" alt="" width="193" height="200" />
            <img class="small" src="{{url('/images/image-caption.png')}}" alt="" width="145" height="150" />
        </div>
        <div class="details">
            <div class="title">
                Beautiful user experience
            </div>
            <div class="description">
                <p>
                    Sorting, scrolling, swiping... it&#39;s all simple and intuitive. Animations are smooth and have been carefully crafted to make every list feel natural and real.
                </p>
                <p>
                    <a href="{{url('/examples')}}" title="" class="button-word-cont">Check out the examples</a>
                </p>
            </div>            
        </div>
    </div>
</div>
<div class="section-cont right grey">
    <div class="section-outer">
        <div class="image">
            <img class="large" src="{{url('/images/desktop-smartphone.png')}}" alt="" width="193" height="200" />
            <img class="small" src="{{url('/images/desktop-smartphone.png')}}" alt="" width="145" height="150" />
        </div>
        <div class="details">
            <div class="title">
                Desktop and mobile
            </div>
            <div class="description">
                <p>
                    From the ground up, Lithium List has been designed to behave like sortable and swipeable tables in iOS and Android. It works equally well on desktop and mobile, enabling you to easily offer app-like functionality in your web pages.
                </p>
            </div>
        </div>
    </div>
</div>
<div class="section-cont left">
    <div class="section-outer">
        <div class="image">
            <img class="large" src="{{url('/images/cog.png')}}" alt="" width="200" height="200" />
            <img class="small" src="{{url('/images/cog.png')}}" alt="" width="150" height="150" />
        </div>
        <div class="details">
            <div class="title">
                Fully customisable
            </div>
            <div class="description">
                <p>
                    With piles of <a href="{{url('/documentation/options')}}" title="options">options</a>, <a href="{{url('/documentation/events')}}" title="events">events</a> and <a href="{{url('/documentation/methods')}}" title="methods">methods</a>, everything is customisable and overrideable. It&#39;s easy to make Lithium List behave exactly how you want it to.
                </p>
            </div>            
        </div>
    </div>
</div>
<div class="section-cont right grey">
    <div class="section-outer">
        <div class="image">
            <img class="large" src="{{url('/images/front-page.png')}}" alt="" width="174" height="200" />
            <img class="small" src="{{url('/images/front-page.png')}}" alt="" width="131" height="150" />
        </div>
        <div class="details">
            <div class="title">
                Awesome documentation
            </div>
            <div class="description">
                <p>
                    Everthing is fully documented in clear and simple terms, with sample code accompanying every description. You&#39;ll have no trouble getting up and running in minutes.
                </p>
                <p>
                    <a href="{{url('/documentation')}}" title="" class="button-word-cont">Read the docs</a>
                </p>
            </div>
        </div>
    </div>
</div>
<div class="section-cont left">
    <div class="section-outer">
        <div class="image">
            <img class="large" src="{{url('/images/science.png')}}" alt="" width="200" height="184" />
            <img class="small" src="{{url('/images/science.png')}}" alt="" width="150" height="138" />
        </div>
        <div class="details">
            <div class="title">
                JS frameworks
            </div>
            <div class="description">
                <p>
                    Lithium List automatically detects changes to list items, meaning there is no need to re-initialise or make method calls when items are added or removed. This makes it super easy to use Lithium List with JS frameworks like React.
                </p>
                <p>
                    <a href="{{url('/examples/react')}}" title="" class="button-word-cont">Check out the React example</a>
                </p>
            </div>            
        </div>
    </div>
</div>
@endsection