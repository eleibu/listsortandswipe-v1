@extends('layout-info')

@section('pageTitle', 'Lithium List - about')

@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/about.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/about.js')) }}"></script>
@endsection

@section('content')
<div class="title-main-cont">
    <div class="title-main-outer">
        About
    </div>
</div>
<div class="section-cont">
    <div class="section-outer">
        <div class="details">
            <div class="description">
                <img class="headshot" src="{{url('/images/elliot-large.jpg')}}" alt="Elliot headshot" width="140" height="140" />
                <p>
                    Hi, I&#39;m Elliot, the creator of Lithium List.
                </p>
                <p>
                    Lithium List is a solo operation. I write the code, develop the website, do the marketing, provide support and sweep the floors. It&#39;s both a passion project and a small business.
                </p>
                <p>
                    A while ago I made a little web-based task list app. The idea was pretty simple: a list of tasks that you swipe to delete or archive, and long-press to sort. Just like a list of items in iOS or Android app.
                </p>
                <p>
                    There are lots of Javascript plugins out there that enable sorting of items, but none that also enable swiping and auto-scrolling. At least none that I could find. So I decided to write one myself. And it was... tricky. Getting this to work reliably in any browser and on any device was quite a challenge, but I&#39;m very happy with the result. Lithium List was born.
                </p>
                <p>
                    I hope you find Lithium List valuable and easy to use. If you have any feedback, good or bad, please send it to me. You can email me any time at <a href="mailto:admin@lithiumlist.com" alt="admin@lithiumlist.com">admin@lithiumlist.com</a>.
                </p>
                <p>
                    Best wishes<br/>Elliot
                </p>
            </div>            
        </div>
    </div>
</div>
<br/><br/>
@endsection