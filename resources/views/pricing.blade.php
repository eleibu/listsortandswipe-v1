@extends('layout-info')

@section('pageTitle', 'Pricing')

@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/pricing.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/pricing.js')) }}"></script>
@endsection

@section('content')
<div class="title-main-cont">
    <div class="title-main-outer">
        Pricing
    </div>
</div>
<div class="pricing-cont large">
    <div class="pricing-outer">
        <table cellspacing="0" cellpadding="0">
            <tr>
                <td class="label">
                </td>
                <td class="name">
                    Free trial
                </td>
                <td class="name">
                    Basic
                </td>
                <td class="name">
                    Professional
                </td>
                <td class="name">
                    Enterprise
                </td>
            </tr>
            <tr>
                <td class="label">
                </td>
                <td class="price">
                    Free
                </td>
                <td class="price">
                    $36
                </td>
                <td class="price">
                    $108
                </td>
                <td class="price">
                    $648
                </td>
            </tr>
            <tr>
                <td class="label">
                </td>
                <td class="button">
                    <a class="button-word-cont green" href="" title="">Try it</a>
                </td>
                <td class="button">
                    <a class="button-word-cont grey" href="" title="">Buy now</a>
                </td>
                <td class="button">
                    <a class="button-word-cont grey" href="" title="">Buy now</a>
                </td>
                <td class="button">
                    <a class="button-word-cont grey" href="" title="">Buy now</a>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Licence period
                </td>
                <td class="detail line">
                    30 days
                </td>
                <td class="detail line">
                    1 year
                </td>
                <td class="detail line">
                    1 year
                </td>
                <td class="detail line">
                    1 year
                </td>
            </tr>
            <tr>
                <td class="label line">
                    All features
                </td>
                <td class="detail line">
                    <i class="sld icon-check-ui"></i>
                </td>
                <td class="detail line">
                    <i class="sld icon-check-ui"></i>
                </td>
                <td class="detail line">
                    <i class="sld icon-check-ui"></i>
                </td>
                <td class="detail line">
                    <i class="sld icon-check-ui"></i>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Number of domains
                </td>
                <td class="detail line">
                    1
                </td>
                <td class="detail line">
                    1
                </td>
                <td class="detail line">
                    5
                </td>
                <td class="detail line">
                    Unlimited
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Licence key
                </td>
                <td class="detail line">
                    Per domain
                </td>
                <td class="detail line">
                    Per domain
                </td>
                <td class="detail line">
                    Per domain
                </td>
                <td class="detail line">
                    Per account
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Tech support
                </td>
                <td class="detail line">
                    <span class="neg">&#9472;</span>
                </td>
                <td class="detail line">
                    <span class="neg">&#9472;</span>
                </td>
                <td class="detail line">
                    Standard
                </td>
                <td class="detail line">
                    Premium&nbsp;<i class="sld icon-circle-info"></i>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Paid web app&nbsp;<i class="sld icon-circle-info"></i>
                </td>
                <td class="detail line">
                    <span class="neg">&#9472;</span>
                </td>
                <td class="detail line">
                    <span class="neg">&#9472;</span>
                </td>
                <td class="detail line">
                    <i class="sld icon-check-ui"></i>
                </td>
                <td class="detail line">
                    <i class="sld icon-check-ui"></i>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Reseller&nbsp;<i class="sld icon-circle-info"></i>
                </td>
                <td class="detail line">
                    <span class="neg">&#9472;</span>
                </td>
                <td class="detail line">
                    <span class="neg">&#9472;</span>
                </td>
                <td class="detail line">
                    <span class="neg">&#9472;</span>
                </td>
                <td class="detail line">
                    <i class="sld icon-check-ui"></i>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="pricing-cont small">
    <div class="pricing-outer">
        <table cellspacing="0" cellpadding="0">
            <tr>
                <td class="name" colspan="2">
                    Free trial
                </td>
            </tr>
            <tr>
                <td class="price" colspan="2">
                    Free
                </td>
            </tr>
            <tr>
                <td class="button" colspan="2">
                    <a class="button-word-cont green" href="" title="">Try it</a>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Licence period
                </td>
                <td class="detail line">
                    30 days
                </td>
            </tr>
            <tr>
                <td class="label line">
                    All features
                </td>
                <td class="detail line">
                    <i class="sld icon-check-ui"></i>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Number of domains
                </td>
                <td class="detail line">
                    1
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Licence key
                </td>
                <td class="detail line">
                    Per domain
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Tech support
                </td>
                <td class="detail line">
                    <span class="neg">&#9472;</span>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Paid web app&nbsp;<i class="sld icon-circle-info"></i>
                </td>
                <td class="detail line">
                    <span class="neg">&#9472;</span>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Reseller&nbsp;<i class="sld icon-circle-info"></i>
                </td>
                <td class="detail line">
                    <span class="neg">&#9472;</span>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="pricing-cont small">
    <div class="pricing-outer">
        <table cellspacing="0" cellpadding="0">
            <tr>
                <td class="name" colspan="2">
                    Basic
                </td>
            </tr>
            <tr>
                <td class="price" colspan="2">
                    $36
                </td>
            </tr>
            <tr>
                <td class="button" colspan="2">
                    <a class="button-word-cont grey" href="" title="">Buy now</a>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Licence period
                </td>
                <td class="detail line">
                    1 year
                </td>
            </tr>
            <tr>
                <td class="label line">
                    All features
                </td>
                <td class="detail line">
                    <i class="sld icon-check-ui"></i>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Number of domains
                </td>
                <td class="detail line">
                    1
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Licence key
                </td>
                <td class="detail line">
                    Per domain
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Tech support
                </td>
                <td class="detail line">
                    <span class="neg">&#9472;</span>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Paid web app&nbsp;<i class="sld icon-circle-info"></i>
                </td>
                <td class="detail line">
                    <span class="neg">&#9472;</span>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Reseller&nbsp;<i class="sld icon-circle-info"></i>
                </td>
                <td class="detail line">
                    <span class="neg">&#9472;</span>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="pricing-cont small">
    <div class="pricing-outer">
        <table cellspacing="0" cellpadding="0">
            <tr>
                <td class="name" colspan="2">
                    Professional
                </td>
            </tr>
            <tr>
                <td class="price" colspan="2">
                    $108
                </td>
            </tr>
            <tr>
                <td class="button" colspan="2">
                    <a class="button-word-cont grey" href="" title="">Buy now</a>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Licence period
                </td>
                <td class="detail line">
                    1 year
                </td>
            </tr>
            <tr>
                <td class="label line">
                    All features
                </td>
                <td class="detail line">
                    <i class="sld icon-check-ui"></i>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Number of domains
                </td>
                <td class="detail line">
                    5
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Licence key
                </td>
                <td class="detail line">
                    Per domain
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Tech support
                </td>
                <td class="detail line">
                    Standard
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Paid web app&nbsp;<i class="sld icon-circle-info"></i>
                </td>
                <td class="detail line">
                    <i class="sld icon-check-ui"></i>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Reseller&nbsp;<i class="sld icon-circle-info"></i>
                </td>
                <td class="detail line">
                    <span class="neg">&#9472;</span>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="pricing-cont small">
    <div class="pricing-outer">
        <table cellspacing="0" cellpadding="0">
            <tr>
                <td class="name" colspan="2">
                    Enterprise
                </td>
            </tr>
            <tr>
                <td class="price" colspan="2">
                    $648
                </td>
            </tr>
            <tr>
                <td class="button" colspan="2">
                    <a class="button-word-cont grey" href="" title="">Buy now</a>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Licence period
                </td>
                <td class="detail line">
                    1 year
                </td>
            </tr>
            <tr>
                <td class="label line">
                    All features
                </td>
                <td class="detail line">
                    <i class="sld icon-check-ui"></i>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Number of domains
                </td>
                <td class="detail line">
                    Unlimited
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Licence key
                </td>
                <td class="detail line">
                    Per domain
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Tech support
                </td>
                <td class="detail line">
                    Premium&nbsp;<i class="sld icon-circle-info"></i>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Paid web app&nbsp;<i class="sld icon-circle-info"></i>
                </td>
                <td class="detail line">
                    <i class="sld icon-check-ui"></i>
                </td>
            </tr>
            <tr>
                <td class="label line">
                    Reseller&nbsp;<i class="sld icon-circle-info"></i>
                </td>
                <td class="detail line">
                    <i class="sld icon-check-ui"></i>
                </td>
            </tr>
        </table>
    </div>
</div>
<br/><br/>
<div class="section-cont right">
    <div class="section-outer">
        <div class="image">
            <img class="large" src="{{url('/images/browser-tick.png')}}" alt="" width="200" height="184" />
            <img class="small" src="{{url('/images/browser-tick.png')}}" alt="" width="150" height="138" />
        </div>
        <div class="details">
            <div class="title">
                All plans, all features
            </div>
            <div class="description">
                <p>
                    All plans include all features and all updates during the licence period. Try it for free (without a credit card) and upgrade later if it&#39;s right for you. No pressure.
                </p>
            </div>            
        </div>
    </div>
</div>
<div class="section-cont left">
    <div class="section-outer">
        <div class="image">
            <img class="large" src="{{url('/images/reload-ui.png')}}" alt="" width="200" height="200" />
            <img class="small" src="{{url('/images/reload-ui.png')}}" alt="" width="150" height="150" />
        </div>
        <div class="details">
            <div class="title">
                Discounted renewals
            </div>
            <div class="description">
                <p>
                    Get 10% off renewals within one month of the licence expiry. It&#39;s our way of saying thanks for your ongoing support.
                </p>
            </div>            
        </div>
    </div>
</div>
@endsection