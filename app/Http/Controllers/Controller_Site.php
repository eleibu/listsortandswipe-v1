<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Controller_Site extends Controller
{
	public function page_home(Request $request) {
		return view('home');
	}
}