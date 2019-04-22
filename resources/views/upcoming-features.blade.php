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
                <a class="button-word-cont" href="{{ url('/browser-support') }}" title="Browser support">Browser support</a>
                <div class="button-word-cont selected">Upcoming features</div>
    		</div>
    	</div>
    	<div class="details-cont">
    		<div class="details-outer">
                <div class="title-main">Upcoming features</div>
                <div class="section-cont">
                    <p>
                        The following features are coming to Lithium List:
                    </p>
                    <div>
                        <table class="upcoming-features" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td class="heading feature">
                                        FEATURE
                                    </td>
                                    <td class="heading priority">
                                        PRIORITY
                                    </td>
                                    <td class="heading commenced">
                                        COMMENCED
                                    </td>
                                </tr>
                                <tr class="grey">
                                    <td class="detail feature">
                                        Create a 'triggerSort' method that enables automatic sorting (ie. the equivalent of 'triggerLeft' and 'triggerRight' for sorting).
                                    </td>
                                    <td class="detail priority">
                                        High
                                    </td>
                                    <td class="detail commenced">
                                        No
                                    </td>
                                </tr>
                                <tr>
                                    <td class="detail feature">
                                        Enable tap-to-confirm functionality following a left or right button press.
                                    </td>
                                    <td class="detail priority">
                                        Medium
                                    </td>
                                    <td class="detail commenced">
                                        No
                                    </td>
                                </tr>
                                <tr class="grey">
                                    <td class="detail feature">
                                        Enable multiple actions upon a left or right swipe, or a left or right button press.
                                    </td>
                                    <td class="detail priority">
                                        Medium
                                    </td>
                                    <td class="detail commenced">
                                        No
                                    </td>
                                </tr>
                                <tr>
                                    <td class="detail feature">
                                        Enable elasticity when a left swipe reaches the 'leftSwipeEndThreshold' or a right swipe reaches the 'rightSwipeEndThreshold'.
                                    </td>
                                    <td class="detail priority">
                                        Medium
                                    </td>
                                    <td class="detail commenced">
                                        No
                                    </td>
                                </tr>
                                <tr class="grey">
                                    <td class="detail feature">
                                        Slow the auto-scroll rate when approaching the top or bottom of the item list.
                                    </td>
                                    <td class="detail priority">
                                        Low
                                    </td>
                                    <td class="detail commenced">
                                        No
                                    </td>
                                </tr>
                                <tr>
                                    <td class="detail feature">
                                        Enable options that accept a classname (such as 'sortOuterClass', 'sortListClass', 'sortCloneClass', etc) to accept multiple classnames in the form 'classname0 classname1 classname2'.
                                    </td>
                                    <td class="detail priority">
                                        Low
                                    </td>
                                    <td class="detail commenced">
                                        No
                                    </td>
                                </tr>
                                <tr class="grey">
                                    <td class="detail feature">
                                        Enable 'triggerLeft' and 'triggerRight' methods to operate on multiple items concurrently.
                                    </td>
                                    <td class="detail priority">
                                        Low
                                    </td>
                                    <td class="detail commenced">
                                        No
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