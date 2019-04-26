@extends('layout-info')

@section('pageTitle', 'Browser support')

@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/resources.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/resources.js')) }}"></script>
@endsection

@section('content')
	<br/><br/>
    <div class="sitecont-outer">
    	<div class="toc-cont">
    		<div class="toc-outer">
    			<div class="title-main">Resources</div>
                <a class="button-word-cont" href="{{ url('/examples') }}" title="Examples">Examples</a>
    			<a class="button-word-cont" href="{{ url('/documentation') }}" title="Documentation">Documentation</a>
                <div class="button-word-cont selected">Browser support</div>
    			<a class="button-word-cont" href="{{ url('/upcoming-features') }}" title="Upcoming features">Upcoming features</a>
    		</div>
    	</div>
    	<div class="details-cont">
    		<div class="details-outer">
                <div class="title-main">Browser support</div>
                <div class="section-cont">
                    <div class="title-section">Tested browsers</div>
                    <p>
                        Lithium List has been tested, and verified to work properly, on these browsers:
                    </p>
                    <div>
                        <table class="browser-support" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td class="heading">
                                        BROWSER
                                    </td>
                                    <td class="heading">
                                        PLATFORM
                                    </td>
                                    <td class="heading">
                                        VERSION(S)
                                    </td>
                                </tr>
                                <tr class="grey">
                                    <td class="detail">
                                        Chrome
                                    </td>
                                    <td class="detail">
                                        Windows
                                    </td>
                                    <td class="detail">
                                        71
                                    </td>
                                </tr>
                                <tr>
                                    <td class="detail">
                                        Chrome
                                    </td>
                                    <td class="detail">
                                        MacOS
                                    </td>
                                    <td class="detail">
                                        71
                                    </td>
                                </tr>
                                <tr class="grey">
                                    <td class="detail">
                                        Chrome
                                    </td>
                                    <td class="detail">
                                        iOS
                                    </td>
                                    <td class="detail">
                                        71
                                    </td>
                                </tr>
                                <tr>
                                    <td class="detail">
                                        Chrome
                                    </td>
                                    <td class="detail">
                                        Android
                                    </td>
                                    <td class="detail">
                                        59
                                    </td>
                                </tr>
                                <tr class="grey">
                                    <td class="detail">
                                        Safari
                                    </td>
                                    <td class="detail">
                                        MacOS
                                    </td>
                                    <td class="detail">
                                        12
                                    </td>
                                </tr>
                                <tr>
                                    <td class="detail">
                                        Safari
                                    </td>
                                    <td class="detail">
                                        iOS
                                    </td>
                                    <td class="detail">
                                        12.2
                                    </td>
                                </tr>
                                <tr class="grey">
                                    <td class="detail">
                                        Firefox
                                    </td>
                                    <td class="detail">
                                        Windows
                                    </td>
                                    <td class="detail">
                                        ?????
                                    </td>
                                </tr>
                                <tr>
                                    <td class="detail">
                                        Firefox
                                    </td>
                                    <td class="detail">
                                        MacOS
                                    </td>
                                    <td class="detail">
                                        64
                                    </td>
                                </tr>
                                <tr>
                                    <td class="detail">
                                        Firefox
                                    </td>
                                    <td class="detail">
                                        iOS
                                    </td>
                                    <td class="detail">
                                        16.2
                                    </td>
                                </tr>
                                <tr>
                                    <td class="detail">
                                        Firefox
                                    </td>
                                    <td class="detail">
                                        Android
                                    </td>
                                    <td class="detail">
                                        66
                                    </td>
                                </tr>
                                <tr class="grey">
                                    <td class="detail">
                                        Edge
                                    </td>
                                    <td class="detail">
                                        Windows
                                    </td>
                                    <td class="detail">
                                        38
                                    </td>
                                </tr>
                                <tr>
                                    <td class="detail">
                                        Internet Explorer
                                    </td>
                                    <td class="detail">
                                        Windows
                                    </td>
                                    <td class="detail">
                                        11
                                    </td>
                                </tr>
                                <tr class="grey">
                                    <td class="detail">
                                        Samsung Browser
                                    </td>
                                    <td class="detail">
                                        Android
                                    </td>
                                    <td class="detail">
                                        5.4
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="section-cont">
                    <div class="title-section">Other browsers</div>
                    <p>
                        Lithium List should also work, but has not been specifically tested, on these browsers:
                    </p>
                    <div>
                        <table class="browser-support" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td class="heading">
                                        BROWSER
                                    </td>
                                    <td class="heading">
                                        PLATFORM
                                    </td>
                                    <td class="heading">
                                        VERSION(S)
                                    </td>
                                    <td class="heading notes">
                                        NOTES
                                    </td>
                                </tr>
                                <tr class="grey">
                                    <td class="detail">
                                        Chrome
                                    </td>
                                    <td class="detail">
                                        All
                                    </td>
                                    <td class="detail">
                                        4+
                                    </td>
                                    <td class="detail notes">
                                        &nbsp;
                                    </td>
                                </tr>
                                <tr>
                                    <td class="detail">
                                        Safari
                                    </td>
                                    <td class="detail">
                                        MacOS and iOS
                                    </td>
                                    <td class="detail">
                                        4+
                                    </td>
                                    <td class="detail notes">
                                        &nbsp;
                                    </td>
                                </tr>
                                <tr class="grey">
                                    <td class="detail">
                                        Firefox
                                    </td>
                                    <td class="detail">
                                        All
                                    </td>
                                    <td class="detail">
                                        12+
                                    </td>
                                    <td class="detail notes">
                                        &nbsp;
                                    </td>
                                </tr>
                                <tr>
                                    <td class="detail">
                                        Edge
                                    </td>
                                    <td class="detail">
                                        Windows
                                    </td>
                                    <td class="detail">
                                        12
                                    </td>
                                    <td class="detail notes">
                                        &nbsp;
                                    </td>
                                </tr>
                                <tr class="grey">
                                    <td class="detail">
                                        Internet Explorer
                                    </td>
                                    <td class="detail">
                                        Windows
                                    </td>
                                    <td class="detail">
                                        10+
                                    </td>
                                    <td class="detail notes">
                                        Versions prior to 10 did not support CSS transitions.
                                    </td>
                                </tr>
                                <tr>
                                    <td class="detail">
                                        Android Browser
                                    </td>
                                    <td class="detail">
                                        Android
                                    </td>
                                    <td class="detail">
                                        2.3+
                                    </td>
                                    <td class="detail notes">
                                        &nbsp;
                                    </td>
                                </tr>
                                <tr class="grey">
                                    <td class="detail">
                                        Opera
                                    </td>
                                    <td class="detail">
                                        All
                                    </td>
                                    <td class="detail">
                                        11.5+
                                    </td>
                                    <td class="detail notes">
                                        &nbsp;
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
    		</div>
    	</div>
    </div>
    <br/>
@endsection