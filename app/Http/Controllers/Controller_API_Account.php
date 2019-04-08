<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\Toolkit;

class Controller_API_Account extends Controller
{
	public function discount(Request $request) {
		Toolkit::sleep();

		return response()->json([
			'id' => '92024C59-9BAD-4EC5-8049-F9E8EB4D9E3F',
			'message' => 'Invalid discount code.'
		], 422);
	}
}