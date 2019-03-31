<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Classes\Toolkit;
use App\User;
use DB;
use Illuminate\Support\Facades\Mail;
// use App\Mail\ResendActivationLink;

class Controller_Auth_Activate extends Controller
{
	public function page(Request $request, $code = "") {
		// awaitingactivation
		// linksent
		// activated
		// invalidlink
		$pageInfo = Toolkit::pageInfo();

		if (strlen($code) > 0) {
            $user = DB::table('users')
            			->where('verification_code', $code)
            			->first();

            if ($user) {
                DB::table('users')
                        ->where('verification_code', $code)
                        ->update(['verified' => 1, 'verification_code' => null]);

				return view('activate')
					->with('view', 'activated')
					->with('accountType', $user->account_type)
		            ->with('homeName', $pageInfo['home']['name'])
		            ->with('homePath', $pageInfo['home']['path']);
            } else {
            	// not valid
				return view('activate')
					->with('view', 'invalidlink')
		            ->with('homeName', $pageInfo['home']['name'])
		            ->with('homePath', $pageInfo['home']['path']);
            }
		} else {
			if (Auth::check()) {
            	$user = Auth::user();

            	if ($user->verified == 1) {
					return redirect($pageInfo['console']['path']);
            	} else {
					return view('activate')
						->with('view', 'awaitingactivation')
			            ->with('homeName', $pageInfo['home']['name'])
			            ->with('homePath', $pageInfo['home']['path']);
            	}
			} else {
				return redirect($pageInfo['login']['path']);
			}
		}
	}

	public function post(Request $request) {
		Toolkit::sleep();
		
		$pageInfo = Toolkit::pageInfo();

		if (Auth::check()) {
        	$user = Auth::user();

        	if ($user->verified == 1) {
				return redirect($pageInfo['console']['path']);
        	} else {
        		// Mail::to($user->email)->send(new ResendActivationLink($user->verification_code));

				return view('activate')
					->with('view', 'linksent')
		            ->with('homeName', $pageInfo['home']['name'])
		            ->with('homePath', $pageInfo['home']['path']);
        	}
		} else {
			// should never happen because can only post from 'awaitingactivation' view, which is only visible to logged in users
			return redirect($pageInfo['login']['path']);
		}
	}
}