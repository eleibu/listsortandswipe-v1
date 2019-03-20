<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\Toolkit;

class Controller_API_SignUp extends Controller
{
	public function discount(Request $request) {
		Toolkit::sleep();

		return response()->json([
			'id' => '58177926-7C69-4F89-9701-410B774AEEDC',
			'message' => 'Invalid discount code.'
		], 422);
	}
}
