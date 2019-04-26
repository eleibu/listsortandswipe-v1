@extends('emails.layout-emails')

@section('content')
    <div style="margin: 0.8em 0; color: #222222; line-height: 130%;">
        Hi {{$user->name}}
    </div>
    <div style="margin: 0.8em 0; color: #222222; line-height: 130%; ">
        @if ($user->account_type == 2)
            Thanks for submitting your support request, a copy of which is set out below. We&#39;ll get back to you within 72 hours.
        @elseif ($user->account_type == 3)
            Thanks for submitting your support request, a copy of which is set out below. We&#39;ll get back to you within 24 hours.
        @else
            Thanks for submitting your support request, a copy of which is set out below.
        @endif
    </div>
    <br/><br/>
    <div style="color: #AAAAAA; line-height: 130%; font-size: 80%;">
        SUPPORT REQUEST:
    </div>
    <div style="padding: 1em 0; margin: 0.8em 0; color: #222222; line-height: 130%; border-top: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD;">
        {!! nl2br(htmlspecialchars($body)) !!}
    </div>
    <br/>
@endsection