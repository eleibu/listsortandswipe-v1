<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Classes\Toolkit;

class Controller_Auth_SignOut extends Controller
{
	public function page(Request $request) {
		if (Auth::check()) {
			Auth::logout();
		}
		$pageInfo = Toolkit::pageInfo();
		return redirect($pageInfo['login']['path']);
	}
}