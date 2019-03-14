@extends('layout-auth')

@section('pageTitle', 'Lithium List - sign up')

@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/signup.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/signup.js')) }}"></script>
@endsection

@section('content')
<div class="section-cont">
    <div class="section-outer">
        <div class="title">
            Create your account
        </div>
        <div class="signup-row">
            <div class="signup-dataentry">
                <input id="input-email" name="email" class="textentry" type="text" placeholder="Email" value="{{Request::old('email')}}" tabindex="1" />
            </div>
            <div id="div-companyname-submsg" class="submsg-cont">
                &nbsp;
            </div>
        </div>
        <div class="signup-row">
            <div class="signup-dataentry">
                <input id="input-password" name="password" class="textentry" type="password" placeholder="Password" value="{{Request::old('password')}}" tabindex="2" />
            </div>
            <div id="div-companyname-submsg" class="submsg-cont">
                Password must have at least 6 characters. Other than that, make it as simple or complex as you like.
            </div>
        </div>
    </div>
</div>
<div class="section-cont grey">
    <div class="section-outer">
        <div class="title">
            Contact details
        </div>
        <div class="signup-row">
            <div class="signup-dataentry">
                <input id="input-firstname" name="firstname" class="textentry left" type="text" placeholder="First name" value="{{Request::old('firstname')}}" tabindex="3" />
                <input id="input-surnname" name="surnname" class="textentry right" type="text" placeholder="Surname" value="{{Request::old('surnname')}}" tabindex="4" />
                <br clear="all"/>
            </div>
            <div id="div-name-submsg" class="submsg-cont">
                &nbsp;
            </div>
        </div>
        <div class="signup-row">
            <div class="signup-dataentry">
                <input id="input-companyname" name="companyname" class="textentry" type="text" placeholder="Company name (if applicable)" value="{{Request::old('companyname')}}" tabindex="5" />
            </div>
            <div id="div-companyname-submsg" class="submsg-cont">
                &nbsp;
            </div>
        </div>
        <div class="signup-row">
            <div class="signup-dataentry">
                <select  tabindex="6">
                    <option value="">Country</option>
                    <option value="AUS">Austria</option>
                    <option value="AUT">Australia</option>
                    <option value="IDN">Indonesia</option>
                </select>
            </div>
            <div id="div-country-submsg" class="submsg-cont">
                &nbsp;
            </div>
        </div>
    </div>
</div>
<div class="section-cont">
    <div class="section-outer">
        <div class="title">
            Order summary
        </div>
        <div class="signup-row">
            <div class="signup-address">
                <p>Elliot Leibu</p>
                <p>IndySoft Pty Ltd</p>
                <p>Australia</p>
            </div>
            <div class="signup-orderdetails">
                <table cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td colspan="2">&nbsp;</td>
                            <td class="col-right">USD</td>
                        </tr>
                        <tr>
                            <td colspan="2">Lithium List - 1 year licence - Basic</td>
                            <td class="col-right">$36.00</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td class="border-top col-mdl">Subtotal</td>
                            <td class="border-top col-right">$36.00</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td class="border-btm col-mdl">Taxes</td>
                            <td class="border-btm col-right">$0.00</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td class="col-mdl"><strong>Total</strong></td>
                            <td class="col-right"><strong>$36.00</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<div class="section-cont grey">
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
                    <div id="div-spinner-cont" class="spinner-cont">
                        <div class="text">APPLY DISCOUNT</div>
                        <div class="spinner-outer">
                            <div class="spinner-inner">
                                <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="div-companyname-submsg" class="submsg-cont">
                &nbsp;
            </div>            
        </div>
    </div>
</div>
<div class="section-cont">
    <div class="section-outer">
        <div class="title">
            Payment
        </div>
        <div class="signup-row">
            PayPal drop in<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    </div>
</div>
<div class="section-cont grey">
    <div class="section-outer">
        <div class="signup-row">
            <div class="signup-terms">
                <input id="input-terms" name="terms" type="checkbox"/>
                <div class="signup-terms-text">
                    I agree to the <a href="" title="terms and conditions">terms and conditions</a> and <a href="" title="privacy policy">privacy policy</a>
                </div>
            </div>
        </div>
        <div class="signup-row">
            <div id="div-place-order" class="button-word-cont darkblue">
                <div id="div-spinner-cont" class="spinner-cont">
                    <div class="text">PLACE ORDER</div>
                    <div class="spinner-outer">
                        <div class="spinner-inner">
                            <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


    <!--
    <div class="middlebox-cont">
        <div class="middlebox-outer">
            <div class="middlebox-inner">
                <div class="header-outer signup">
                    <i class="sld icon-profile-picture"></i>&nbsp;Create your account
                </div>
                <br/>
                <div class="signup-row">
                    <div class="signup-dataentry">
                        <input id="input-email" name="email" class="textentry" type="text" placeholder="Email" value="{{Request::old('email')}}" tabindex="1" />
                    </div>
                    <div id="div-companyname-submsg" class="submsg-cont">
                        &nbsp;
                    </div>
                </div>
                <div class="signup-row">
                    <div class="signup-dataentry">
                        <input id="input-password" name="password" class="textentry" type="password" placeholder="Password" value="{{Request::old('password')}}" tabindex="2" />
                    </div>
                    <div id="div-companyname-submsg" class="submsg-cont">
                        Password must have at least 6 characters. Other than that, make it as simple or complex as you like.
                    </div>
                </div>
                <br/><br/>
                <div class="header-outer signup">
                    <i class="sld icon-invoice"></i>&nbsp;Contact details
                </div>
                <br/>
                <div class="signup-row">
                    <div class="signup-dataentry">
                        <input id="input-firstname" name="firstname" class="textentry left" type="text" placeholder="First name" value="{{Request::old('firstname')}}" tabindex="3" />
                        <input id="input-surnname" name="surnname" class="textentry right" type="text" placeholder="Surname" value="{{Request::old('surnname')}}" tabindex="4" />
                        <br clear="all"/>
                    </div>
                    <div id="div-name-submsg" class="submsg-cont">
                        &nbsp;
                    </div>
                </div>
                <div class="signup-row">
                    <div class="signup-dataentry">
                        <input id="input-companyname" name="companyname" class="textentry" type="text" placeholder="Company name (if applicable)" value="{{Request::old('companyname')}}" tabindex="5" />
                    </div>
                    <div id="div-companyname-submsg" class="submsg-cont">
                        &nbsp;
                    </div>
                </div>
                <div class="signup-row">
                    <div class="signup-dataentry">
                        <select  tabindex="6">
                            <option value="">Country</option>
                            <option value="AUS">Austria</option>
                            <option value="AUT">Australia</option>
                            <option value="IDN">Indonesia</option>
                        </select>
                    </div>
                    <div id="div-country-submsg" class="submsg-cont">
                        &nbsp;
                    </div>
                </div>
                <br/><br/>
                <div class="header-outer signup">
                    <i class="sld icon-cart"></i>&nbsp;Order summary
                </div>
                <br/>
                <div class="signup-row">
                    <div class="signup-address">
                        <p>Elliot Leibu</p>
                        <p>IndySoft Pty Ltd</p>
                        <p>Australia</p>
                    </div>
                    <div class="signup-orderdetails">
                        <table cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td colspan="2">&nbsp;</td>
                                    <td class="col-right">USD</td>
                                </tr>
                                <tr>
                                    <td colspan="2">Lithium List - 1 year licence - Basic</td>
                                    <td class="col-right">$36.00</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td class="border-top col-mdl">Subtotal</td>
                                    <td class="border-top col-right">$36.00</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td class="border-btm col-mdl">Taxes</td>
                                    <td class="border-btm col-right">$0.00</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td class="col-mdl"><strong>Total</strong></td>
                                    <td class="col-right"><strong>$36.00</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br/><br/>
                <div class="header-outer signup">
                    <i class="sld icon-discount-coupon"></i>&nbsp;Discount
                </div>
                <br/>
                <div class="signup-row">
                    <div class="supmsg-cont">
                        If you have a discount code, enter it here.
                    </div>
                    <div class="signup-dataentry">
                        <input id="input-discountcode" name="discountcode" class="textentry" type="text" placeholder="Discount code" value="{{Request::old('discountcode')}}" tabindex="7" />
                    </div>
                    <div class="signup-buttons">
                        <div id="div-apply-discount" class="button-word-cont grey">
                            <div id="div-spinner-cont" class="spinner-cont">
                                <div class="text">APPLY DISCOUNT</div>
                                <div class="spinner-outer">
                                    <div class="spinner-inner">
                                        <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="div-companyname-submsg" class="submsg-cont">
                        &nbsp;
                    </div>
                </div>
                <br/><br/>
                <div class="header-outer signup">
                    <i class="sld icon-credit-card-a"></i>&nbsp;Payment
                </div>
                <br/>
                <div class="signup-row">
                    PayPal drop in
                </div>
                <br/><br/>
                <div class="signup-row terms-cont">
                    <input id="input-terms" name="terms" type="checkbox"/>&nbsp;&nbsp;I agree to the <a href="" title="terms and conditions">terms and conditions</a> and <a href="" title="privacy policy">privacy policy</a>
                </div>
                <br/><br/>
                <div class="signup-row">
                    <div id="div-place-order" class="button-word-cont darkblue">
                        <div id="div-spinner-cont" class="spinner-cont">
                            <div class="text">PLACE ORDER</div>
                            <div class="spinner-outer">
                                <div class="spinner-inner">
                                    <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                @if ($view == 'signup')
                    <div class="otherpage-cont">
                        or <a href="{{ url($loginPath) }}" title="log in to your account">log in to your account</a>
                    </div>
                    <br/>
                    <div id="div-mainmsg" class="mainmsg-cont">
                        @if (!$errors->main->isEmpty())
                            {!! $errors->main->first('message') !!}
                        @endif
                    </div>
                    <form id="form" method="POST" action="{{url('/signup')}}">
                        @csrf
                        <fieldset>
                            <input type="hidden" name="action" value="signup" />
                            @if ($errors->email->isEmpty())
                                <div id="div-email-cont" class="text-cont">
                                    <div class="textentry-cont">
                                        <i class="oln icon-email"></i>
                                        <div class="textentry-outer">
                                            <input id="input-email" name="email" class="textentry" type="text" placeholder="Email" value="{{Request::old('email')}}" tabindex="1" />
                                        </div>
                                    </div>
                                    <div id="div-email-submsg" class="submsg-cont">
                                    </div>
                                </div>
                            @else
                                <div id="div-email-cont" class="text-cont error">
                                    <div class="textentry-cont">
                                        <i class="oln icon-email"></i>
                                        <div class="textentry-outer">
                                            <input id="input-email" name="email" class="textentry" type="text" placeholder="Email" value="{{Request::old('email')}}" tabindex="1" />
                                        </div>
                                    </div>
                                    <div id="div-email-submsg" class="submsg-cont">
                                        {!! $errors->email->first('message') !!}
                                    </div>
                                </div>
                            @endif
                            @if ($errors->password->isEmpty())
                                <div id="div-password-cont" class="text-cont">
                                    <div class="textentry-cont">
                                        <i class="oln icon-lock"></i>
                                        <div class="textentry-outer">
                                            <input id="input-password" name="password" class="textentry" type="password" placeholder="Password" tabindex="2" />
                                        </div>
                                    </div>
                                    <div id="div-password-submsg" class="submsg-cont">
                                    </div>
                                </div>
                            @else
                                <div id="div-password-cont" class="text-cont error">
                                    <div class="textentry-cont">
                                        <i class="oln icon-lock"></i>
                                        <div class="textentry-outer">
                                            <input id="input-password" name="password" class="textentry" type="password" placeholder="Password" tabindex="2" />
                                        </div>
                                    </div>
                                    <div id="div-password-submsg" class="submsg-cont">
                                        {!! $errors->password->first('message') !!}
                                    </div>
                                </div>
                            @endif
                        </fieldset>
                    </form>
                    <br/><br/>
                    <div class="buttons-cont">
                        <div id="div-submit" class="button-word-cont darkblue" tabindex="3">
                            <div id="div-spinner-cont" class="spinner-cont">
                                <div class="text">{{strtoupper($signupName)}}</div>
                                <div class="spinner-outer">
                                    <div class="spinner-inner">
                                        <div class="rect rect0"></div><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/><br/>
                    <div class="terms-cont">
                        By signing up you agree to the <a target='_blank' href="{{ url('/terms') }}" title="Lithium List - terms and conditions">terms and conditions</a> and <a target='_blank' href="{{ url('/privacy') }}" title="Lithium List - privacy policy">privacy policy</a>.
                    </div>
                @endif
                @if ($view == 'accountcreated')
                    <br/>
                    <div class="bigmsg-cont">
                        Congratulations, your account has been created.
                    </div>
                    <br/>
                    <div class="smallmsg-cont">
                        We&#39;ve sent an activation link to you. Click it and you&#39;re all set to go!
                    </div>
                    <br/><br/><br/>
                    <form id="form" method="POST" action="{{url('/signup')}}">
                        @csrf
                        <fieldset>
                            <input type="hidden" name="action" value="resendlink" />
                        </fieldset>
                    </form>
                    <div class="buttons-cont">
                        <div id="div-resend-link" class="button-word-cont darkblue">
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
                    <form id="form" method="POST" action="{{url('/signup')}}">
                        @csrf
                        <fieldset>
                            <input type="hidden" name="action" value="resendlink" />
                        </fieldset>
                    </form>
                    <div class="buttons-cont">
                        <div id="div-resend-link" class="button-word-cont darkblue">
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
            </div>
            <div id="div-middlebox-mask">
            </div>
        </div>
    </div>
    -->
@endsection

@section('scriptBottom')
    <script>
        var msgEmailDefault = "{!! $msgEmailDefault !!}";
        var msgEmailNoBlank = "{!! $msgEmailNoBlank !!}";
        var msgEmailInvalid = "{!! $msgEmailInvalid !!}";
        var msgPasswordDefault = "{!! $msgPasswordDefault !!}";
        var msgPasswordNoBlank = "{!! $msgPasswordNoBlank !!}";
        var msgPasswordInvalid = "{!! $msgPasswordInvalid !!}";
    </script>
@endsection