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
    <link rel="icon" sizes="16x16 32x32 48x48" href="{{url('/favicon.ico?v=0')}}">
    <link rel="apple-touch-icon-precomposed" href="{{url('/favicon-152.png?v=0')}}">
    <link rel="stylesheet" href="{{ url(mix('/css/home.css')) }}">
    <link rel="stylesheet" href="{{ url('/css/icons-outline.css') }}">
    <link rel="stylesheet" href="{{ url('/css/icons-solid.css') }}">
    <script defer src="{{ url(mix('/js/home.js')) }}"></script>
</head>
<body>
    <div id="pageWrapper">
        <div id="div-siteheader">
            <div class="siteheader-outer">
                <a id="a-logo" href="{{ url('/') }}" title="Lithium List - home"><img src="{{ url('/images/LithiumListLogo-white.png') }}" alt="Lithium List logo" height="60" width="113" /></a>
                <div class="links-cont">
                    <a class="button-word-cont hlink" href="{{ url('/pricing') }}" title="">PRICING</a>
                    <a class="button-word-cont hlink" href="{{ url('/examples') }}" title="">EXAMPLES</a>
                    <a class="button-word-cont hlink" href="{{ url('/documentation') }}" title="">DOCUMENTATION</a>
                    <a class="button-word-cont hlink" href="{{ url('/support') }}" title="">SUPPORT</a>
                    @component('button-auth', ['loginName' => $loginName, 'loginPath' => $loginPath, 'consoleName' => $consoleName, 'consolePath' => $consolePath])
                    @endcomponent
                </div>
                <div class="menubtn-cont">
                    <a id="a-pagemenu-show" class="menubtn"><i class="sld icon-hamburger-ui"></i></a>
                </div>
            </div>
        </div>
        <div class="section-cont pagetitle">
            <div class="section-outer">
                <br/>
                <div id="div-title">
                    Awesome JS list plugin
                </div>
                <br/>
                <div id="div-subtitle">
                    Lithium List is a beautifully engineered <strong>sortable</strong> and <strong>swipeable</strong> list that works perfectly on desktop and mobile
                </div>
                <br/>
            </div>
        </div>
        <div class="section-cont greybgd">
            <div class="section-outer">
                <div id="div-ptable">
                    <div class="restore">
                        <a href="" title="">Restore and shuffle</a>
                    </div>
                    <div id="div-list-cont" class="lg">
                        <div class="listitem-cont othernonmetal unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>H</span>Hydrogen</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont noblegas unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>He</span>Helium</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont alkali unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>Li</span>LITHIUM</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont alkaline unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>Be</span>Berylium</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont metalloid unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>B</span>Boron</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont othernonmetal unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>C</span>Carbon</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont othernonmetal unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>N</span>Nitrogen</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont othernonmetal unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>O</span>Oxygen</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont othernonmetal unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>F</span>Fluorine</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont noblegas unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>Ne</span>Neon</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont alkali unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>Na</span>Sodium</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont alkaline unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>Mg</span>Magnesium</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont posttransition unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>Al</span>Aluminium</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont metalloid unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>Si</span>Silicon</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont othernonmetal unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>P</span>Phosphorus</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont othernonmetal unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>S</span>Sulfur</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont othernonmetal unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>Cl</span>Chlorine</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont noblegas unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>Ar</span>Argon</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont alkali unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>K</span>Potassium</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont alkaline unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>Ca</span>Calcium</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont transition unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>Sc</span>Scandium</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont transition unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>Ti</span>Titanium</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont transition unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>V</span>Vanadium</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                        <div class="listitem-cont transition unselectable">
                            <div class="listitem-outer">
                                <i class="sld icon-grab-ui sort" title="Sort"></i>
                                <i class="sld icon-archive archive" title="Archive"></i>
                                <div class="text"><span>Cr</span>Chromium</div>
                                <i class="oln icon-trash delete" title="Delete"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <br/><br/>
            </div>
        </div>
        <div class="section-cont left whytitle">
            <div class="section-outer">
                <div class="title-main-cont">
                    <div class="title-main-outer">
                        Why use Lithium List?
                    </div>
                </div>
            </div>
        </div>

        <div class="section-cont left">
            <div class="section-outer">
                <div class="image">
                    <img class="large" src="{{url('/images/image-caption.png')}}" alt="" width="193" height="200" />
                    <img class="small" src="{{url('/images/image-caption.png')}}" alt="" width="145" height="150" />
                </div>
                <div class="details">
                    <div class="title">
                        Beautiful user experience
                    </div>
                    <div class="description">
                        <p>
                            Sorting, scrolling, swiping... it&#39;s all simple and intuitive. Animations are smooth and have been carefully crafted to make every list feel natural and real.
                        </p>
                        <p>
                            <a href="{{url('/examples')}}" title="" class="button-word-cont">Check out the examples</a>
                        </p>
                    </div>            
                </div>
            </div>
        </div>
        <div class="section-cont right grey">
            <div class="section-outer">
                <div class="image">
                    <img class="large" src="{{url('/images/desktop-smartphone.png')}}" alt="" width="193" height="200" />
                    <img class="small" src="{{url('/images/desktop-smartphone.png')}}" alt="" width="145" height="150" />
                </div>
                <div class="details">
                    <div class="title">
                        Desktop and mobile
                    </div>
                    <div class="description">
                        <p>
                            From the ground up, Lithium List has been designed to behave like sortable and swipeable tables in iOS and Android. It works equally well on desktop and mobile, enabling you to easily offer app-like functionality in your web pages.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="section-cont left">
            <div class="section-outer">
                <div class="image">
                    <img class="large" src="{{url('/images/cog.png')}}" alt="" width="200" height="200" />
                    <img class="small" src="{{url('/images/cog.png')}}" alt="" width="150" height="150" />
                </div>
                <div class="details">
                    <div class="title">
                        Fully customisable
                    </div>
                    <div class="description">
                        <p>
                            With piles of <a href="{{url('/documentation/options')}}" title="options">options</a>, <a href="{{url('/documentation/events')}}" title="events">events</a> and <a href="{{url('/documentation/methods')}}" title="methods">methods</a>, everything is customisable and overrideable. It&#39;s easy to make Lithium List behave exactly how you want it to.
                        </p>
                    </div>            
                </div>
            </div>
        </div>
        <div class="section-cont right grey">
            <div class="section-outer">
                <div class="image">
                    <img class="large" src="{{url('/images/front-page.png')}}" alt="" width="174" height="200" />
                    <img class="small" src="{{url('/images/front-page.png')}}" alt="" width="131" height="150" />
                </div>
                <div class="details">
                    <div class="title">
                        Awesome documentation
                    </div>
                    <div class="description">
                        <p>
                            Everthing is fully documented in clear and simple terms, with sample code accompanying every description. You&#39;ll have no trouble getting up and running in minutes.
                        </p>
                        <p>
                            <a href="{{url('/documentation')}}" title="" class="button-word-cont">Read the docs</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="section-cont left">
            <div class="section-outer">
                <div class="image">
                    <img class="large" src="{{url('/images/science.png')}}" alt="" width="200" height="184" />
                    <img class="small" src="{{url('/images/science.png')}}" alt="" width="150" height="138" />
                </div>
                <div class="details">
                    <div class="title">
                        JS frameworks
                    </div>
                    <div class="description">
                        <p>
                            Lithium List automatically detects changes to list items, meaning there is no need to re-initialise or make method calls when items are added or removed. This makes it super easy to use Lithium List with JS frameworks like React.
                        </p>
                        <p>
                            <a href="{{url('/examples/react')}}" title="" class="button-word-cont">Check out the React example</a>
                        </p>
                    </div>            
                </div>
            </div>
        </div>
        <br/><br/>
        @component('sitefooter')
        @endcomponent
        <div id="div-pagemask"></div>
        <div id="div-pagemenu-cont">
            <div class="menu-outer">
                <div class="menuclose-cont">
                    <a id="a-pagemenu-hide" class="menubtn"><i class="sld icon-cross-ui"></i></a>
                </div>
                <div class="links-cont">
                    <a class="button-word-cont hlink" href="{{ url('/pricing') }}" title="">PRICING</a>
                    <a class="button-word-cont hlink" href="{{ url('/examples') }}" title="">EXAMPLES</a>
                    <a class="button-word-cont hlink" href="{{ url('/documentation') }}" title="">DOCUMENTATION</a>
                    <a class="button-word-cont hlink" href="{{ url('/support') }}" title="">SUPPORT</a>
                    @component('button-auth', ['loginName' => $loginName, 'loginPath' => $loginPath, 'consoleName' => $consoleName, 'consolePath' => $consolePath])
                    @endcomponent
                </div>
            </div>
        </div>
    </div>
    @yield('scriptBottom')
</body>
</html>