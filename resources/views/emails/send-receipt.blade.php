@extends('emails.layout-emails')

@section('content')
    <div style="margin: 0.8em 0; color: #222222; line-height: 130%;">
        Hi {{$firstname}}
    </div>
    <div style="margin: 0.8em 0; color: #222222; line-height: 130%; ">
        Attached below for your records is a receipt for your Lithium List purchase.
    </div>
    <br/>
    <div style="padding-bottom: 1em; margin: 0.8em 0; color: #222222; line-height: 130%; border-top: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD;">
        <br/>
        <div style="color: #444444;">
            Date: {{$invoice['date']}} (UTC)
        </div>
        <div style="color: #444444;">
            Receipt number: {{$invoice['refnumber']}}
        </div>
        <br/>
        <div style="color: #444444;">
            <p style="margin: 0.2em 0;">{{$invoice['customerName']}}</p>
            @if (strlen($invoice['companyName']) > 0)
                <p style="margin: 0.2em 0;">{{$invoice['companyName']}}</p>
            @endif
            <p style="margin: 0.2em 0;">{{$invoice['countryName']}}</p>
        </div>
        <br/>
        <div class="signup-orderdetails">
            <table cellpadding="0" cellspacing="0" style="width: 100%; color: #444444;">
                <tbody>
                    <tr>
                        <td colspan="2" style="padding: 0.6em;">&nbsp;</td>
                        <td style="padding: 0.6em; width: 10%; text-align: right;">USD</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="padding: 0.6em;">{{$invoice['productName']}}</td>
                        <td style="padding: 0.6em; width: 10%; text-align: right;">{{ '$' . number_format($invoice['price'] / 100, 2) }}</td>
                    </tr>
                    <tr>

                        <td>&nbsp;</td>
                        <td style="padding: 0.6em;width: 40%; border-top: 1px solid #777777;">Subtotal</td>
                        <td style="padding: 0.6em; width: 10%; text-align: right; border-top: 1px solid #777777;">{{ '$' . number_format($invoice['price'] / 100, 2) }}</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td style="padding: 0.6em;width: 40%; border-bottom: 1px solid #777777;">Taxes</td>
                        <td style="padding: 0.6em; width: 10%; text-align: right; border-bottom: 1px solid #777777;">{{ '$' . number_format($invoice['taxes'] / 100, 2) }}</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td style="padding: 0.6em;width: 40%;"><strong>Total</strong></td>
                        <td style="padding: 0.6em; width: 10%; text-align: right;"><strong>{{ '$' . number_format($invoice['total'] / 100, 2) }}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <br/>
@endsection