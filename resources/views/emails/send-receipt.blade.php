@extends('emails.layout-emails')

@section('content')
    <div style="margin: 0.8em 0; color: #222222; line-height: 130%;">
        Hi {{$firstname}}
    </div>
    <div style="margin: 0.8em 0; color: #222222; line-height: 130%; ">
        Welcome to Lithium List! Please click this link to activate your account.
    </div>
    <div style="padding-bottom: 1em; margin: 0.8em 0; color: #222222; line-height: 130%;">


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
    <div style="margin: 0.8em 0; color: #222222; line-height: 130%;">
        Thank you for supporting Lithium List.
    </div>
    <div style="margin: 0.8em 0; color: #222222; line-height: 130%;">
        <div><strong>Elliot</strong></div>
        <div style="font-size: 85%;">Lithium List founder</div>
        <div style="font-size: 85%;"><a style="text-decoration: none;" href="mailto:admin@lithiumlist.com" title="admin@lithiumlist.com">admin@lithiumlist.com</a></div>
        <div style="font-size: 85%;"><a style="text-decoration: none;" href="{{ url('/') }}" title="www.lithiumlist.com">www.lithiumlist.com</a></div>
    </div>
@endsection