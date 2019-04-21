@if (Auth::check())
	<a class="button-word-cont auth" href="{{ url('/' . $consolePath) }}" title="">{{strtoupper($consoleName)}}</a>
@else
	<a class="button-word-cont auth" href="{{ url('/' . $loginPath) }}" title="">{{strtoupper($loginName)}}</a>
@endif