<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\User;
use DB;
use \Carbon\Carbon;
use App\Classes\Toolkit;

class Controller_API_Users extends Controller
{
    public function put(Request $request, $email) {
		Toolkit::sleep();

    	$user = Auth::guard('api')->user();
    	if ($user->email == $email) {
			if ($request->filled('action')) {
				switch ($request->input('action')) {
				    case 'change-password':
						return $this->changePassword($request, $user);
				        break;
				    default:
						return response()->json([
							'id' => '7BE7073B-3504-43A9-95A9-C232BA3FBBAE',
							'message' => 'Invalid action.'
						], 400);
				}
			} else {
				return response()->json([
					'id' => '7CC47B30-5371-49CF-8461-421E4B20D020',
					'message' => 'Missing parameters.'
				], 400);
			}
    	} else {
			return response()->json([
				'id' => '5C6CD7CB-0DEC-4047-BE48-B929F5BE0E06',
				'message' => 'Different user.'
			], 403);
    	}
    }

    protected function changePassword($request, $user) {
    	if (($request->filled('currentpassword')) && ($request->filled('newpassword'))) {
    		if (Hash::check($request->input('currentpassword'), $user->password)) {
    			$user->password = bcrypt($request->input('newpassword'));
		    	$user->save();

				return response()->json([
					'allGood' => 'allGood'
				], 200);
    		} else {
				return response()->json([
					'id' => '6D487B0F-8C3E-4CF2-8D0B-9223A53C5673',
					'message' => 'Invalid password.'
				], 403);
    		}
    	} else {
			return response()->json([
				'id' => '381BBA97-4446-4B6B-8098-29FBADAB2827',
				'message' => 'Missing parameters.'
			], 400);
    	}
    }
}