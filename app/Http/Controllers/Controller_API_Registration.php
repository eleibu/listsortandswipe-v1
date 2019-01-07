<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Controller_API_Registration extends Controller
{
    public function check(Request $request) {
		sleep(1);

    	$status = 0;
    	if ($request->filled('host', 'key')) {
    		if (($request->input('host') == 'localhost') && ($request->input('key') == '123456789')) {
    			$status = 1;
    		}
    	}
		return response()->json([
			'data' => $status
		], 200);
    }
}
