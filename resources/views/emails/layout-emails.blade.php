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
        <div style="padding: 20px 2em; background-color: #003182; box-shadow: 0 1px 2px 0 #AAAAAA;">
            <img src="{{ url('/images/LithiumListLogo-white.png') }}" alt="Lithium List logo" height="60" width="113" />
        </div>
        <br/>
        <div style="padding: 0 2em; ">
            @yield('content')
        </div>  
    </body>
</html>