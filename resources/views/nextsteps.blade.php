<div class="nextsteps-cont">
    <div class="heading">
        NEXT STEPS...
    </div>
    <a class="link-outer btmborder" href="{{ url('/documentation/installation')}}" title="Download and/or install">
        <i class="sld icon-file-download red"></i>Download and/or install Lithium List
    </a>
    <a class="link-outer btmborder" href="{{ url('/documentation/set-up')}}" title="Set up">
        <i class="sld icon-cog orange"></i>Set up
    </a>
    <a class="link-outer" href="{{ url('/console')}}" title="Log in">
        @if (($accountType == 0) || ($accountType == 1))
            <i class="sld icon-lock yellow"></i>Visit your console and add a domain
        @else
            <i class="sld icon-lock yellow"></i>Visit your console and add some domains
        @endif
    </a>
</div>