<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta charset="utf-8">
        <style type="text/css">
            @font-face {
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
        </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Roboto', Sans-Serif; font-size: 110%;">
        <div style="margin: 1em 0; padding: 0.6em 0; color: #222222; line-height: 130%; border-bottom: 1px solid #CCCCCC;">
            <div style="margin: 0.2em 0;">
                <strong>USER</strong>
            </div>
            <div style="margin: 0.2em 0;">
                Email: {{$user->email}}
            </div>
            <div style="margin: 0.2em 0;">
                Account type: {{$user->account_type}}
            </div>
            <div style="margin: 0.2em 0;">
                Account expires at: {{$user->account_expires_at}}
            </div>
        </div>
        <div style="margin: 1em 0; padding: 0.6em 0; color: #222222; line-height: 130%; border-bottom: 1px solid #CCCCCC;">
            <div style="margin: 0.2em 0;">
                <strong>INVOICE</strong>
            </div>
            <div style="margin: 0.2em 0;">
                Date: {{$invoice['date']}}
            </div>
            <div style="margin: 0.2em 0;">
                Customer name: {{$invoice['customerName']}}
            </div>
            <div style="margin: 0.2em 0;">
                Country name: {{$invoice['countryName']}}
            </div>
            <div style="margin: 0.2em 0;">
                Product name: {{$invoice['productName']}}
            </div>
            <div style="margin: 0.2em 0;">
                Price: {{'$' . number_format($invoice['price'] / 100, 2)}}
            </div>
            <div style="margin: 0.2em 0;">
                Taxes: {{'$' . number_format($invoice['taxes'] / 100, 2)}}
            </div>
            <div style="margin: 0.2em 0;">
                Discount: {{$invoice['discount']}}
            </div>
            <div style="margin: 0.2em 0;">
                Total: {{'$' . number_format($invoice['total'] / 100, 2)}}
            </div>
        </div>
        <div style="margin: 1em 0; padding: 0.6em 0; color: #222222; line-height: 130%; border-bottom: 1px solid #CCCCCC;">
            <div style="margin: 0.2em 0;">
                <strong>ERROR DETAILS</strong>
            </div>
            <div style="margin: 0.2em 0;">
                Controller name: {{$controllerName}}
            </div>
            <div style="margin: 0.2em 0;">
                Error ID: {{$errorId}}
            </div>
        </div>
    </body>
</html>