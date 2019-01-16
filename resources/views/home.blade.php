<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <base href="/">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <title>Lithium List - home</title>
    <link rel="stylesheet" href="{{ url(mix('/css/home.css')) }}">
    <link rel="stylesheet" href="{{ url('/css/icons-outline.css') }}">
    <link rel="stylesheet" href="{{ url('/css/icons-solid.css') }}">
    <script defer src="{{ url(mix('/js/home.js')) }}"></script>
</head>
<body>
    <div id="div-body">
        <div id="div-siteheader">
            <div class="siteheader-outer">
                <a id="a-logo" href="{{ url('/') }}" title="Lithium List - home"><img src="{{ url('/images/LithiumListLogo-white.png') }}" alt="Lithium List logo" height="60" width="113" /></a>
                <div class="links-cont">
                    <a class="button-word-cont hlink" href="" title="">PRICING</a>
                    <a class="button-word-cont hlink" href="" title="">DEMOS</a>
                    <a class="button-word-cont hlink" href="{{ url('/docs') }}" title="">DOCS</a>
                    <a class="button-word-cont hlink" href="" title="">SUPPORT</a>
                    <a class="button-word-cont login" href="" title="">LOG IN</a>
                </div>
                <div class="menubtn-cont">
                    <a id="a-pagemenu-show" class="menubtn"><i class="sld budicon-hamburger-ui"></i></a>
                </div>
            </div>
        </div>
        <div id="div-sitecont">
            <div class="sitecont-outer">
                <br/><br/><br/>
                <div id="div-title">
                    A beautifully engineered <strong>sortable</strong> and <strong>swipeable</strong> list that works perfectly on desktop and mobile
                </div>
                <br/><br/>
                <div id="div-buttons">
                    <a class="button-word-cont grey" href="{{url('/docs/why-lithium-list')}}">WHY LITHIUM LIST?</a>&nbsp;&nbsp;<a class="button-word-cont darkblue" href="{{url('/docs/installation')}}">INSTALLATION</a>
                </div>
                <br/><br/><br/><br/>
                <div id="div-ptable">
                    <div class="restore">
                        <a href="" title="">Restore and shuffle</a>
                    </div>
                    <div id="div-list-cont" class="lg">
                        <div class="listitem-cont othernonmetal unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>H</span>Hydrogen</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont noblegas unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>He</span>Helium</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont alkali unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>Li</span>LITHIUM</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont alkaline unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>Be</span>Berylium</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont metalloid unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>B</span>Boron</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont othernonmetal unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>C</span>Carbon</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont othernonmetal unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>N</span>Nitrogen</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont othernonmetal unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>O</span>Oxygen</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont othernonmetal unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>F</span>Fluorine</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont noblegas unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>Ne</span>Neon</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont alkali unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>Na</span>Sodium</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont alkaline unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>Mg</span>Magnesium</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont posttransition unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>Al</span>Aluminium</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont metalloid unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>Si</span>Silicon</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont othernonmetal unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>P</span>Phosphorus</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont othernonmetal unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>S</span>Sulfur</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont othernonmetal unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>Cl</span>Chlorine</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont noblegas unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>Ar</span>Argon</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont alkali unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>K</span>Potassium</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont alkaline unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>Ca</span>Calcium</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont transition unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>Sc</span>Scandium</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont transition unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>Ti</span>Titanium</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont transition unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>V</span>Vanadium</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont transition unselectable">
                            <div class="listitem-outer">
                                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                                <div class="text"><span>Cr</span>Chromium</div>
                                <i class="oln budicon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <br/><br/>
            </div>
        </div>
        <br/><br/>
        <div id="div-sitefooter">
            <div class="sitefooter-outer">
                © 2019
            </div>
        </div>
        <div id="div-pagemask"></div>
        <div id="div-pagemenu-cont">
            <div class="menu-outer">
                <div class="menuclose-cont">
                    <a id="a-pagemenu-hide" class="menubtn"><i class="sld budicon-cross-ui"></i></a>
                </div>
                <div class="links-cont">
                    <a class="button-word-cont hlink" href="" title="">PRICING</a>
                    <a class="button-word-cont hlink" href="" title="">DEMOS</a>
                    <a class="button-word-cont hlink" href="{{ url('/docs') }}" title="">DOCS</a>
                    <a class="button-word-cont hlink" href="" title="">SUPPORT</a>
                    <a class="button-word-cont login" href="" title="">LOG IN</a>
                </div>
            </div>
        </div>
    </div>
    @yield('scriptBottom')
</body>
</html>