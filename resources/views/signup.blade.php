@php
switch ($atype) {
    case 'basic':
        $product_desc = 'Lithium List - 1 year licence - Basic';
        $product_price = '$36.00';
        $subtotal = '$36.00';
        $taxes = '$0.00';
        $total = '$36.00';
        break;
    case 'professional':
        $product_desc = 'Lithium List - 1 year licence - Professional';
        $product_price = '$108.00';
        $subtotal = '$108.00';
        $taxes = '$0.00';
        $total = '$108.00';
        break;
    case 'enterprise':
        $product_desc = 'Lithium List - 1 year licence - Enterprise';
        $product_price = '$648.00';
        $subtotal = '$648.00';
        $taxes = '$0.00';
        $total = '$648.00';
        break;
    default:
        $product_desc = 'Lithium List - 30 day licence - Free trial';
        $product_price = '$0.00';
        $subtotal = '$0.00';
        $taxes = '$0.00';
        $total = '$0.00';
}
@endphp

@extends('layout-auth')

@section('pageTitle', 'Lithium List - sign up')

@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/signup.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/signup.js')) }}"></script>
@endsection

@section('content')
@if ($view == 'signup')
    <div class="section-cont">
        <div class="section-outer">
            <div class="plan">
                @if ($atype == 'basic')
                    <strong>Basic</strong> <span>plan</span>
                @elseif ($atype == 'professional')
                    <strong>Professional</strong> <span>plan</span>
                @elseif ($atype == 'enterprise')
                    <strong>Enterprise</strong> <span>plan</span>
                @else
                    <strong>Free trial</strong> <span>plan</span>
                @endif
            </div>
        </div>
    </div>
    <form id="form" method="POST" action="{{url('/signup')}}">
        @csrf
        <fieldset>
            <div class="section-cont grey">
                <div class="section-outer">
                    <div class="title">
                        Create your account
                    </div>
                    <div class="signup-row">
                        @if ($errors->email->isEmpty())
                            <div class="signup-dataentry">
                                <input id="input-email" name="email" class="textentry" type="text" placeholder="Email" value="{{Request::old('email')}}" tabindex="1" />
                            </div>
                            <div id="div-email-submsg" class="submsg-cont">
                                {!! $msgEmailDefault !!}
                            </div>
                        @else
                            <div class="signup-dataentry">
                                <input id="input-email" name="email" class="textentry error" type="text" placeholder="Email" value="{{Request::old('email')}}" tabindex="1" />
                            </div>
                            <div id="div-email-submsg" class="submsg-cont error">
                                {!! $errors->email->first('message') !!}
                            </div>
                        @endif
                    </div>
                    <div class="signup-row">
                        @if ($errors->password->isEmpty())
                            <div class="signup-dataentry">
                                <input id="input-password" name="password" class="textentry" type="password" placeholder="Password" value="{{Request::old('password')}}" tabindex="2" />
                            </div>
                            <div id="div-password-submsg" class="submsg-cont">
                                {!! $msgPasswordDefault !!}
                            </div>
                        @else
                            <div class="signup-dataentry">
                                <input id="input-password" name="password error" class="textentry error" type="password" placeholder="Password" value="{{Request::old('password')}}" tabindex="2" />
                            </div>
                            <div id="div-password-submsg" class="submsg-cont error">
                                {!! $errors->password->first('message') !!}
                            </div>
                        @endif
                    </div>
                </div>
            </div>
            <div class="section-cont">
                <div class="section-outer">
                    <div class="title">
                        Contact details
                    </div>
                    <div class="signup-row">
                        @if (($errors->firstname->isEmpty()) && ($errors->surname->isEmpty()))
                            <div class="signup-dataentry">
                                <input id="input-firstname" name="firstname" class="textentry left" type="text" placeholder="First name" value="{{Request::old('firstname')}}" tabindex="3" />
                                <input id="input-surname" name="surnname" class="textentry right" type="text" placeholder="Surname" value="{{Request::old('surnname')}}" tabindex="4" />
                                <br clear="all"/>
                            </div>
                            <div id="div-name-submsg" class="submsg-cont">
                                {!! $msgNameDefault !!}
                            </div>
                        @else
                            @if ((!$errors->firstname->isEmpty()) && (!$errors->surname->isEmpty()))
                                <div class="signup-dataentry">
                                    <input id="input-firstname" name="firstname" class="textentry left error" type="text" placeholder="First name" value="{{Request::old('firstname')}}" tabindex="3" />
                                    <input id="input-surname" name="surnname" class="textentry right error" type="text" placeholder="Surname" value="{{Request::old('surnname')}}" tabindex="4" />
                                    <br clear="all"/>
                                </div>
                                <div id="div-name-submsg" class="submsg-cont error">
                                    {!! $errors->firstname->first('message') !!}
                                </div>
                            @elseif (!$errors->firstname->isEmpty())
                                <div class="signup-dataentry">
                                    <input id="input-firstname" name="firstname" class="textentry left error" type="text" placeholder="First name" value="{{Request::old('firstname')}}" tabindex="3" />
                                    <input id="input-surname" name="surnname" class="textentry right" type="text" placeholder="Surname" value="{{Request::old('surnname')}}" tabindex="4" />
                                    <br clear="all"/>
                                </div>
                                <div id="div-name-submsg" class="submsg-cont error">
                                    {!! $errors->firstname->first('message') !!}
                                </div>
                            @else
                                <div class="signup-dataentry">
                                    <input id="input-firstname" name="firstname" class="textentry left" type="text" placeholder="First name" value="{{Request::old('firstname')}}" tabindex="3" />
                                    <input id="input-surname" name="surnname" class="textentry right error" type="text" placeholder="Surname" value="{{Request::old('surnname')}}" tabindex="4" />
                                    <br clear="all"/>
                                </div>
                                <div id="div-name-submsg" class="submsg-cont error right">
                                    {!! $errors->surname->first('message') !!}
                                </div>
                            @endif
                        @endif
                    </div>
                    <div class="signup-row">
                        <div class="signup-dataentry">
                            <input id="input-companyname" name="companyname" class="textentry" type="text" placeholder="Company name (if applicable)" value="{{Request::old('companyname')}}" tabindex="5" />
                        </div>
                        <div id="div-companyname-submsg" class="submsg-cont">
                        </div>
                    </div>
                    <div class="signup-row">
                        <div class="signup-dataentry">
                            @if ($errors->country->isEmpty())
                                <select id="select-country" name="country" tabindex="6">
                            @else
                                <select id="select-country" name="country" class="error" tabindex="6">
                            @endif
                                <option value="">Country</option>
                                @foreach ($countries as $country)
                                    @if (Request::old('country') == $country['iso'])
                                          <option value="{{$country['iso']}}" selected>{{$country['name']}}</option>
                                    @else
                                          <option value="{{$country['iso']}}">{{$country['name']}}</option>
                                    @endif
                                @endforeach
                            </select>
                        </div>
                        @if ($errors->country->isEmpty())
                            <div id="div-country-submsg" class="submsg-cont">
                                {!! $msgCountryDefault !!}
                            </div>
                        @else
                            <div id="div-country-submsg" class="submsg-cont error">
                                {!! $errors->country->first('message') !!}
                            </div>
                        @endif
                    </div>
                </div>
            </div>
            <div class="section-cont grey">
                <div class="section-outer">
                    <div class="title">
                        Order summary
                    </div>
                    <div class="signup-row">
                        <div class="signup-address">
                            <p id="p_indiv_name" class="empty">&nbsp;</p>
                            <p id="p_co_name" class="company empty">&nbsp;</p>
                            <p id="p_country" class="empty">&nbsp;</p>
                        </div>
                        <div class="signup-orderdetails">
                            <table cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td colspan="2">&nbsp;</td>
                                        <td class="col-right">USD</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">{{$product_desc}}</td>
                                        <td class="col-right">{{$product_price}}</td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td class="border-top col-mdl">Subtotal</td>
                                        <td class="border-top col-right">{{$subtotal}}</td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td class="border-btm col-mdl">Taxes</td>
                                        <td class="border-btm col-right">{{$taxes}}</td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td class="col-mdl"><strong>Total</strong></td>
                                        <td class="col-right"><strong>{{$total}}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            @if (($atype == 'basic') || ($atype == 'professional') || ($atype == 'enterprise'))
                <div class="section-cont">
                    <div class="section-outer">
                        <div class="title">
                            Discount
                        </div>
                        <div class="signup-row">
                            <div class="signup-dataentry">
                                <input id="input-discountcode" name="discountcode" class="textentry" type="text" placeholder="Discount code" value="{{Request::old('discountcode')}}" tabindex="7" />
                            </div>
                            <div class="signup-buttons">
                                <div id="div-apply-discount" class="button-word-cont grey">
                                    <div id="div-spinner-cont-discount" class="spinner-cont">
                                        <div class="text">APPLY DISCOUNT</div>
                                        <div class="spinner-outer">
                                            <div class="spinner-inner">
                                                <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="div-discount-submsg" class="submsg-cont">
                                &nbsp;
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section-cont grey">
                    <div class="section-outer">
                        <div class="title">
                            Payment
                        </div>
                        <div class="signup-row">
                            <input id="input-client-token" type="hidden" value="{{$clientToken}}"/>
                            <div id="div-card-number" class="hosted-field"></div>
                            <div id="div-expiry-date" class="hosted-field"></div>&nbsp;&nbsp;
                            <div id="div-cvv" class="hosted-field"></div>
                        </div>
                    </div>
                </div>
            @endif
            <div class="section-cont">
                <div class="section-outer">
                    <div class="signup-row">
                        <div class="signup-terms">
                            @if ($errors->terms->isEmpty())
                                <table id="div-table-terms" cellpadding="0" cellspacing="0">
                            @else
                                <table id="div-table-terms" cellpadding="0" cellspacing="0" class="error">
                            @endif
                                <tbody>
                                    <tr>
                                        <td class="checkbox">
                                            @if (Request::old('terms'))
                                                <input id="input-terms" name="terms" type="checkbox" checked/>  
                                            @else
                                                <input id="input-terms" name="terms" type="checkbox"/>
                                            @endif
                                        </td>
                                        <td  class="text">I agree to the <a href="{{ url('/terms') }}" title="terms and conditions" target="_blank">terms and conditions</a> and <a href="{{ url('/privacy') }}" title="privacy statement" target="_blank">privacy statement</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        @if ($errors->terms->isEmpty())
                            <div id="div-terms-submsg" class="submsg-cont">
                                {!! $msgTermsDefault !!}
                            </div>
                        @else
                            <div id="div-terms-submsg" class="submsg-cont error">
                                {!! $errors->terms->first('message') !!}
                            </div>
                        @endif
                    </div>
                    <div class="signup-row">
                        <div id="div-place-order" class="button-word-cont darkblue">
                            <div id="div-spinner-cont-placeorder" class="spinner-cont">
                                <div class="text">PLACE ORDER</div>
                                <div class="spinner-outer">
                                    <div class="spinner-inner">
                                        <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @if ($errors->placeorder->isEmpty())
                            <div id="div-place-order-submsg" class="submsg-cont">
                                {!! $msgPlaceOrderDefault !!}
                            </div>
                        @else
                            <div id="div-place-order-submsg" class="submsg-cont error">
                                {!! $errors->placeorder->first('message') !!}
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </fieldset>
    </form>
@endif
@if ($view == 'accountcreated')


@endif
@if ($view == 'linksent')


@endif

    
<div id="div-sitecont-mask">
</div>
@endsection

@section('scriptBottom')
    <script>
        var api_url_web = "{{ url('/api/web/v1/') }}/";
        var msgEmailDefault = "{!! $msgEmailDefault !!}";
        var msgEmailNoBlank = "{!! $msgEmailNoBlank !!}";
        var msgEmailInvalid = "{!! $msgEmailInvalid !!}";
        var msgPasswordDefault = "{!! $msgPasswordDefault !!}";
        var msgPasswordNoBlank = "{!! $msgPasswordNoBlank !!}";
        var msgPasswordInvalid = "{!! $msgPasswordInvalid !!}";
        var msgNameDefault = "{!! $msgNameDefault !!}";
        var msgNameNoBlankBoth = "{!! $msgNameNoBlankBoth !!}";
        var msgNameNoBlankFirstname = "{!! $msgNameNoBlankFirstname !!}";
        var msgNameNoBlankSurname = "{!! $msgNameNoBlankSurname !!}";
        var msgCountryDefault = "{!! $msgCountryDefault !!}";
        var msgCountryNoBlank = "{!! $msgCountryNoBlank !!}";
        var msgDiscountDefault = "{!! $msgDiscountDefault !!}";
        var msgDiscountInvalid = "{!! $msgDiscountInvalid !!}";
        var msgTermsDefault = "{!! $msgTermsDefault !!}";
        var msgTermsNoBlank = "{!! $msgTermsNoBlank !!}";
        var msgPlaceOrderDefault = "{!! $msgPlaceOrderDefault !!}";
        var msgPlaceOrderErrors = "{!! $msgPlaceOrderErrors !!}";
    </script>
@endsection