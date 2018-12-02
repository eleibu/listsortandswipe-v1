@extends('layout-site')

@section('pageTitle', 'Temp')

@section('jsLinks')
    <script defer src="{{ url(mix('/js/site.js')) }}"></script>
@endsection

@section('content')
    <br/><br/>
    <div id="div-list-cont" class="lg">
        <div class="listitem-cont">
            <div class="listitem-outer">
                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                <div class="text">Hydrogen</div>
                <i class="oln budicon-trash delete" title="Delete"></i>
            </div>
        </div>
        <div class="listitem-cont">
            <div class="listitem-outer">
                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                <div class="text">Helium</div>
                <i class="oln budicon-trash delete" title="Delete"></i>
            </div>
        </div>
        <div class="listitem-cont">
            <div class="listitem-outer">
                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                <div class="text">LITHIUM</div>
                <i class="oln budicon-trash delete" title="Delete"></i>
            </div>
        </div>
        <div class="listitem-cont">
            <div class="listitem-outer">
                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                <div class="text">Berylium</div>
                <i class="oln budicon-trash delete" title="Delete"></i>
            </div>
        </div>
        <div class="listitem-cont">
            <div class="listitem-outer">
                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                <div class="text">Boron</div>
                <i class="oln budicon-trash delete" title="Delete"></i>
            </div>
        </div>
        <div class="listitem-cont">
            <div class="listitem-outer">
                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                <div class="text">Carbon</div>
                <i class="oln budicon-trash delete" title="Delete"></i>
            </div>
        </div>
        <div class="listitem-cont">
            <div class="listitem-outer">
                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                <div class="text">Nitrogen</div>
                <i class="oln budicon-trash delete" title="Delete"></i>
            </div>
        </div>
        <div class="listitem-cont">
            <div class="listitem-outer">
                <i class="sld budicon-grab-ui sort" title="Sort"></i>
                <i class="sld budicon-reload-ui archive" title="Archive"></i>
                <div class="text">Oxygen</div>
                <i class="oln budicon-trash delete" title="Delete"></i>
            </div>
        </div>
    </div>
    <br/><br/>
@endsection
