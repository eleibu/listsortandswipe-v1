@extends('layout-site')

@section('pageTitle', 'Temp')

@section('jsLinks')
    <script defer src="{{ url(mix('/js/site.js')) }}"></script>
@endsection

@section('content')
    <br/><br/><br/>
    <div id="div-title">
        A beautifully engineered <strong>sortable</strong> and <strong>swipeable</strong> list that works perfectly on desktop and mobile
    </div>
    <br/><br/>
    <div id="div-buttons">
        <a class="button-word-cont grey" href="" title="">LEARN ABOUT FEATURES</a>&nbsp;&nbsp;<a class="button-word-cont darkblue" href="" title="">HOW TO USE</a>
    </div>
    <br/><br/><br/><br/>
    <div id="div-game">
        <!--
        <div class="header">
            <div class="title">
                CAN YOU PUT THE ELEMENTS IN THE CORRECT ORDER?
            </div>
            <div class="subtitle">
                <div><strong>How to play</strong></div>
                <div>(1) Hit &#39;START GAME&#39;</div>
                <div>(2) Delete elements with chemical numbers above 10</div>
                <div>(3) Sort the remaining elements in the correct order</div>
                <div>(4) Hit &#39;FINISHED&#39;</div>
            </div>
        </div>
        -->
        <div id="div-scroll-cont" class="lg">
            <div id="div-list-cont">
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
    </div>
    <br/><br/>
@endsection
