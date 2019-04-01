@extends('emails.layout-emails')

@section('content')
    <div style="margin: 0.8em 0; color: #222222; line-height: 130%;">
        Hi there
    </div>
    <div style="margin: 0.8em 0; color: #222222; line-height: 130%; ">
        As requested, here is a password reset link for your Lithium List account:
    </div>
    <div style="padding-bottom: 1em; margin: 0.8em 0; color: #222222; line-height: 130%;">
        <a href="{{$resetLink}}" title="Activate account" style="display: inline-block; text-decoration: none; padding: 0.6em 1em; border-radius: 4px; text-align: center; font-weight: bold; color: #666666; background-color: #EEEEEE; box-shadow: 0 1px 4px 0 #CCCCCC;">
            RESET PASSWORD
        </a>
    </div>
    <div style="margin: 0.8em 0; color: #222222; line-height: 130%;">
        For your security this link will expire after 1 hour. You can request a new link at any time via the <a href="{{$pagePath}}" title="reset password page" style="text-decoration: none; ">reset password page</a>.
    </div>
    <div style="margin: 0.8em 0; color: #222222; line-height: 130%;">
        <div><strong>Elliot</strong></div>
        <div style="font-size: 85%;">Lithium List founder</div>
        <div style="font-size: 85%;"><a style="text-decoration: none;" href="mailto:admin@lithiumlist.com" title="admin@lithiumlist.com">admin@lithiumlist.com</a></div>
        <div style="font-size: 85%;"><a style="text-decoration: none;" href="{{ url('/') }}" title="www.lithiumlist.com">www.lithiumlist.com</a></div>
    </div>
@endsection