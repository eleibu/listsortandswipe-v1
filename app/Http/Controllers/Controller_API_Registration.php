<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\User;
use App\Domain;
use App\Regcheck;

class Controller_API_Registration extends Controller
{
    public function check(Request $request) {
		sleep(1);

    	$status = 0;
    	if ($request->filled('llv', 'key')) {
            $host = $request->getHost();

            $domain = Domain::where('domain', $host)
                        ->first();

            if (isset($domain)) {
                $user = $domain->user();

                if ($user->account_type == 3) {
                    if (($request->input('key') == $domain->licence_key) || ($request->input('key') == $user->account_licence_key)) {
                        $status = 1;
                    }
                } else {
                    if ($request->input('key') == $domain->licence_key) {
                        $status = 1;
                    }
                }
            }
    	}

        $regcheck = new Regcheck;
        $regcheck->domain = $host;
        $regcheck->licence_key = $request->input('key');
        $regcheck->version = $request->input('llv');
        $regcheck->status = $status;
        $regcheck->save();

		return response()->json([
			'data' => $status
		], 200);
    }
}