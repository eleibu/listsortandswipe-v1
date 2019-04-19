@php
if (isset($productDetails)) {
    $product_price = '$' . ($productDetails['priceCents'] / 100) . '.00';
    $subtotal = $product_price;
    $taxes = '$0.00';
    $total = $product_price;
} else {
    $product_price = '$0';
    $subtotal = $product_price;
    $taxes = '$0.00';
    $total = $product_price;
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
            <div class="page-title default">
                <i class="oln icon-user-plus"></i><strong>{{$productDetails['pageTitle']}}</strong> <span>licence</span>
            </div>
        </div>
    </div>
    <form id="form" method="POST" action="{{url('/signup')}}">
        @csrf
        <fieldset>
            <input type="hidden" name="action" value="signup" />
            <input type="hidden" id="input-pid" name="pid" value="{{$productDetails['id']}}" />
            <div class="section-cont grey">
                <div class="section-outer">
                    <div class="title">
                        Create your account
                    </div>
                    <div class="signup-row">
                        @if ((!$errors->signup->isEmpty()) && (strlen($errors->signup->first('email')) > 0))
                            <div class="signup-dataentry">
                                <input id="input-email" name="email" class="textentry error" type="text" placeholder="Email" value="{{Request::old('email')}}" tabindex="1" />
                            </div>
                            <div id="div-email-submsg" class="submsg-cont error">
                                {!! $errors->signup->first('email') !!}
                            </div>
                        @else
                            <div class="signup-dataentry">
                                <input id="input-email" name="email" class="textentry" type="text" placeholder="Email" value="{{Request::old('email')}}" tabindex="1" />
                            </div>
                            <div id="div-email-submsg" class="submsg-cont">
                                {!! $msgEmailDefault !!}
                            </div>
                        @endif
                    </div>
                    <div class="signup-row">
                        @if ((!$errors->signup->isEmpty()) && (strlen($errors->signup->first('password')) > 0))
                            <div class="signup-dataentry">
                                <input id="input-password" name="password" class="textentry error" type="password" placeholder="Password" value="{{Request::old('password')}}" tabindex="2" />
                            </div>
                            <div id="div-password-submsg" class="submsg-cont error">
                                {!! $errors->signup->first('password') !!}
                            </div>
                        @else
                            <div class="signup-dataentry">
                                <input id="input-password" name="password" class="textentry" type="password" placeholder="Password" value="{{Request::old('password')}}" tabindex="2" />
                            </div>
                            <div id="div-password-submsg" class="submsg-cont">
                                {!! $msgPasswordDefault !!}
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
                        @if ((!$errors->signup->isEmpty()) && ((strlen($errors->signup->first('firstname')) > 0) || (strlen($errors->signup->first('surname')) > 0)))
                            @if ((strlen($errors->signup->first('firstname')) > 0) && (strlen($errors->signup->first('surname')) > 0))
                                <div class="signup-dataentry">
                                    <input id="input-firstname" name="firstname" class="textentry left error" type="text" placeholder="First name" value="{{Request::old('firstname')}}" tabindex="3" />
                                    <input id="input-surname" name="surname" class="textentry right error" type="text" placeholder="Surname" value="{{Request::old('surname')}}" tabindex="4" />
                                    <br clear="all"/>
                                </div>
                                <div id="div-name-submsg" class="submsg-cont error">
                                    {!! $errors->signup->first('firstname') !!}
                                </div>
                            @elseif (strlen($errors->signup->first('firstname')) > 0)
                                <div class="signup-dataentry">
                                    <input id="input-firstname" name="firstname" class="textentry left error" type="text" placeholder="First name" value="{{Request::old('firstname')}}" tabindex="3" />
                                    <input id="input-surname" name="surname" class="textentry right" type="text" placeholder="Surname" value="{{Request::old('surname')}}" tabindex="4" />
                                    <br clear="all"/>
                                </div>
                                <div id="div-name-submsg" class="submsg-cont error">
                                    {!! $errors->signup->first('firstname') !!}
                                </div>
                            @else
                                <div class="signup-dataentry">
                                    <input id="input-firstname" name="firstname" class="textentry left" type="text" placeholder="First name" value="{{Request::old('firstname')}}" tabindex="3" />
                                    <input id="input-surname" name="surname" class="textentry right error" type="text" placeholder="Surname" value="{{Request::old('surname')}}" tabindex="4" />
                                    <br clear="all"/>
                                </div>
                                <div id="div-name-submsg" class="submsg-cont error right">
                                    {!! $errors->signup->first('surname') !!}
                                </div>
                            @endif
                        @else
                            <div class="signup-dataentry">
                                <input id="input-firstname" name="firstname" class="textentry left" type="text" placeholder="First name" value="{{Request::old('firstname')}}" tabindex="3" />
                                <input id="input-surname" name="surname" class="textentry right" type="text" placeholder="Surname" value="{{Request::old('surname')}}" tabindex="4" />
                                <br clear="all"/>
                            </div>
                            <div id="div-name-submsg" class="submsg-cont">
                                {!! $msgNameDefault !!}
                            </div>
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
                            @if ((!$errors->signup->isEmpty()) && (strlen($errors->signup->first('country')) > 0))
                                <select id="select-country" name="country" class="error" tabindex="6">
                            @else
                                <select id="select-country" name="country" tabindex="6">
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
                        @if ((!$errors->signup->isEmpty()) && (strlen($errors->signup->first('country')) > 0))
                            <div id="div-country-submsg" class="submsg-cont error">
                                {!! $errors->signup->first('country') !!}
                            </div>
                        @else
                            <div id="div-country-submsg" class="submsg-cont">
                                {!! $msgCountryDefault !!}
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
                            @if ((strlen(Request::old('firstname')) > 0) || (strlen(Request::old('surname')) > 0))
                                @if ((strlen(Request::old('firstname')) > 0) && (strlen(Request::old('surname')) > 0))
                                    <p id="p_indiv_name">{{Request::old('firstname')}} {{Request::old('surname')}}</p>
                                @elseif (strlen(Request::old('firstname')) > 0)
                                    <p id="p_indiv_name">{{Request::old('firstname')}}</p>
                                @else
                                    <p id="p_indiv_name">{{Request::old('surname')}}</p>
                                @endif
                            @else
                                <p id="p_indiv_name" class="empty">&nbsp;</p>
                            @endif
                            @if (strlen(Request::old('companyname')) > 0)
                                <p id="p_co_name" class="company">{{Request::old('companyname')}}</p>
                            @else
                                <p id="p_co_name" class="company empty">&nbsp;</p>
                            @endif
                            @if (strlen(Request::old('country')) > 0)
                                @foreach ($countries as $country)
                                    @if (Request::old('country') == $country['iso'])
                                        <p id="p_country">{{$country['name']}}</p>
                                        @break
                                    @endif
                                @endforeach
                            @else
                                <p id="p_country" class="empty">&nbsp;</p>
                            @endif
                        </div>
                        <div class="signup-orderdetails">
                            <table cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td colspan="2">&nbsp;</td>
                                        <td class="col-right">USD</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">{{$productDetails['name']}}</td>
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
            @if ($productDetails['priceCents'] != 0)
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
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section-cont grey">
                    <div class="section-outer">
                        <div class="title">
                            Payment details
                        </div>
                        <div class="signup-row">
                            <input id="input-client-token" type="hidden" name="client-token" value="{{$clientToken}}"/>
                            <input id="input-nonce" type="hidden" name="nonce" value=""/>
                            <div class="signup-dataentry">
                                <div id="div-payment-number" class="hosted-field"></div>                                
                            </div>
                            <br/>
                            <div class="signup-dataentry">
                                <div id="div-payment-expirationDate" class="hosted-field"></div>&nbsp;&nbsp;
                                <div id="div-payment-cvv" class="hosted-field"></div>                                
                            </div>
                            @if ((!$errors->signup->isEmpty()) && (strlen($errors->signup->first('creditcard')) > 0))
                                <div id="div-payment-submsg" class="submsg-cont error">
                                    {!! $errors->signup->first('creditcard') !!}
                                </div>
                            @else
                                <div id="div-payment-submsg" class="submsg-cont">
                                </div>
                            @endif
                            <div class="signup-dataentry">
                                <img width="32" class="payment" src="{{url('images/payment-paypal.png')}}" title="PayPal" alt="Paypal">
                                <img width="32" class="payment" src="{{url('images/payment-visa.png')}}" title="Visa" alt="Visa">
                                <img width="32" class="payment" src="{{url('images/payment-mastercard.png')}}" title="Mastercard" alt="Mastercard">
                                <img width="32" class="payment" src="{{url('images/payment-amex.png')}}" title="American Express" alt="Amex">
                                <img width="32" class="payment" src="{{url('images/payment-discover.png')}}" title="Discover" alt="Discover">
                                <img width="32" class="payment" src="{{url('images/payment-dinersclub.png')}}" title="Diner's club" alt="Diners">
                                <img width="32" class="payment" src="{{url('images/payment-jcb.png')}}" title="JCB" alt="JCB">
                                <img width="32" class="payment" src="{{url('images/payment-maestro.png')}}" title="Maestro" alt="Maestro">
                                <img width="32" class="payment" src="{{url('images/payment-maestrouk.png')}}" title="Maestro UK" alt="Maestro UK">
                            </div>
                        </div>
                    </div>
                </div>
            @endif
            <div class="section-cont">
                <div class="section-outer">
                    <div class="signup-row">
                        <div class="signup-terms">
                            @if ((!$errors->signup->isEmpty()) && (strlen($errors->signup->first('terms')) > 0))
                                <table id="div-table-terms" cellpadding="0" cellspacing="0" class="error">
                            @else
                                <table id="div-table-terms" cellpadding="0" cellspacing="0">
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
                        @if ((!$errors->signup->isEmpty()) && (strlen($errors->signup->first('terms')) > 0))
                            <div id="div-terms-submsg" class="submsg-cont error">
                                {!! $errors->signup->first('terms') !!}
                            </div>
                        @else
                            <div id="div-terms-submsg" class="submsg-cont">
                                {!! $msgTermsDefault !!}
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
                        @if ($errors->signup->isEmpty())
                            <div id="div-place-order-submsg" class="submsg-cont">
                                {!! $msgPlaceOrderDefault !!}
                            </div>
                        @else
                            <div id="div-place-order-submsg" class="submsg-cont error">
                                {!! $msgPlaceOrderErrors !!}
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </fieldset>
    </form>
@endif
@if ($view == 'account-created-and-activated')
    <div class="section-cont">
        <div class="section-outer">
            <div class="page-title success">
                <i class="oln icon-user-tick"></i><strong>Account</strong> <span>created</span>
            </div>
        </div>
    </div>
    <div class="section-cont grey">
        <div class="section-outer">
            <div class="subtitle">
                Congratulations, your account has been created. Thanks for supporting Lithium List.
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
@if ($view == 'account-created-requires-activation')
    <div class="section-cont">
        <div class="section-outer">
            <div class="page-title success">
                <i class="oln icon-user-tick"></i><strong>Account</strong> <span>created</span>
            </div>
        </div>
    </div>
    <div class="section-cont grey">
        <div class="section-outer">
            <div class="subtitle">
                We&#39;ve sent an activation link to you. Please click it to get started.
            </div>
        </div>
    </div>
    <form id="form" method="POST" action="{{url('/signup')}}">
        @csrf
        <fieldset>
            <input type="hidden" name="action" value="resendlink" />
        </fieldset>
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
@if ($view == 'link-sent')
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
    <form id="form" method="POST" action="{{url('/signup')}}">
        @csrf
        <fieldset>
            <input type="hidden" name="action" value="resendlink" />
        </fieldset>
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
<div id="div-sitecont-mask">
</div>
@endsection

@if ($view == 'signup')
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
@endif