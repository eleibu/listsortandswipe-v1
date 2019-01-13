<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <base href="/">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <title>Lithium List - temp overview images</title>
    <link rel="stylesheet" href="{{ url('/css/icons-outline.css') }}">
    <link rel="stylesheet" href="{{ url('/css/icons-solid.css') }}">
    <script defer src="{{ url(mix('/js/temp-overview-images.js')) }}"></script>
    <style>
        body {
            font-family: 'Roboto';
        }

        .unselectable {
          -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
             -khtml-user-select: none; /* Konqueror HTML */
               -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* Internet Explorer/Edge */
                    user-select: none;
        }

        #outerCont {
            font-size: 90%;
            border: 1px solid #AAAAAA;
            height: 300px;
            width: 300px;
            margin: 10em auto 0 auto;
            overflow: auto;
        }

        #outerCont:active {
            cursor: all-scroll;
        }

        #listCont {
            position: relative;
        }

        #listCont.left-list, #listCont.right-list {
            overflow-x: hidden;
        }

        div.listItem {
            border: 1px solid #003182;
            background-color: #FFFFFF;
            color: #003182;
            padding: 1em 0;
            margin: 0.4em 0.6em;
        }

/*        
        div.listItem.sort-clone {
            background-color: #003182;
            color: #FFFFFF;
        }

        div.listItem.left-clone {
            background-color: #000000;
            color: #FFFFFF;
        }
*/
        div.listItem div.inner {
            position: relative;
            margin: 0 0.2em;
        }

        div.listItem div.inner i {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            display: inline-block;
            font-size: 90%;
            padding: 0.5em;
            border-radius: 999px;
            color: #777777;
        }

        div.listItem div.inner i:hover {
            background: rgba(0, 0, 0, 0.06);
        }

        div.listItem div.inner i:active {
            cursor: default;
            background: rgba(0, 0, 0, 0.1);
        }

        div.listItem div.inner i.sort {
            left: 0;
        }

        div.listItem div.inner i.archive {
            left: 2em;
        }

        div.listItem div.inner i.delete {
            right: 0;
        }

        div.listItem div.inner div.text {
            margin: 0 50px;
            text-align: center;
        }

        div.left-mask div.label-cont {
            position: relative;
            height: 100%;
        }

        div.left-mask div.label-cont span {
            position: absolute;
            right: 0.4em;
            top: 50%;
            transform: translateY(-50%);
            color: #F8F8F8;
        }

        div.right-mask div.label-cont {
            position: relative;
            height: 100%;
        }

        div.right-mask div.label-cont span {
            position: absolute;
            left: 0.4em;
            top: 50%;
            transform: translateY(-50%);
            color: #F8F8F8;
        }
    </style>
</head>
<body>
    <div id='outerCont'>
        <div id='listCont'>
            <div class='listItem unselectable'>
                <div class='inner'>
                    <i class="sld budicon-grab-ui sort"></i>
                    <i class="sld budicon-reload-ui archive"></i>
                    <div class='text'>
                        List item
                    </div>
                    <i class="oln budicon-trash delete"></i>
                </div>
            </div>
            <div class='listItem unselectable'>
                <div class='inner'>
                    <i class="sld budicon-grab-ui sort"></i>
                    <i class="sld budicon-reload-ui archive"></i>
                    <div class='text'>
                        List item
                    </div>
                    <i class="oln budicon-trash delete"></i>
                </div>
            </div>
            <div class='listItem unselectable'>
                <div class='inner'>
                    <i class="sld budicon-grab-ui sort"></i>
                    <i class="sld budicon-reload-ui archive"></i>
                    <div class='text'>
                        List item
                    </div>
                    <i class="oln budicon-trash delete"></i>
                </div>
            </div>
            <div class='listItem unselectable'>
                <div class='inner'>
                    <i class="sld budicon-grab-ui sort"></i>
                    <i class="sld budicon-reload-ui archive"></i>
                    <div class='text'>
                        List item
                    </div>
                    <i class="oln budicon-trash delete"></i>
                </div>
            </div>
        </div>
    </div>
</body>
</html>