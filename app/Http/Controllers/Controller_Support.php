<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Classes\Toolkit;
use Illuminate\Support\Facades\Mail;
use App\Mail\SupportRequest;

class Controller_Support extends Controller
{
    function __construct() {
		$this->msgMessageDefault = '';
		$this->msgMessageNoBlank = 'Message can&#39;t be blank.';
    }

	public function page(Request $request) {
		$accountType = -1;
		if (Auth::check()) {
			$user = Auth::user();
			$accountType = $user->account_type;
		}
		$pageInfo = Toolkit::pageInfo();
		return view('support')
			->with('view', 'support')
			->with('accountType', $accountType)
            ->with('loginName', $pageInfo['login']['name'])
            ->with('loginPath', $pageInfo['login']['path'])
            ->with('consoleName', $pageInfo['console']['name'])
            ->with('consolePath', $pageInfo['console']['path'])
            ->with('msgMessageDefault', $this->msgMessageDefault)
            ->with('msgMessageNoBlank', $this->msgMessageNoBlank);
	}

	public function post(Request $request) {
		if ((Auth::check()) && ($request->has('subject', 'message'))) {
			$user = Auth::user();

			if (strlen($request->input('message')) > 0) {
				$message = $request->input('message');
				if (strlen($message) > 60000) {
					$message = substr($message, 0, 60000);
				}

				if (strlen($request->input('subject')) > 0) {
					$subject = 'SUPPORT REQUEST: ' . $request->input('subject');
				} else {
					$subject = 'SUPPORT REQUEST: (no subject)';
				}
				if (strlen($subject) > 78) {
					$subject = substr($subject, 0, 78);
				}

				$emailAddresses = Toolkit::emailAddresses();
				Mail::to($emailAddresses['support'])
					->send(new SupportRequest($user, $subject, $message));

				$pageInfo = Toolkit::pageInfo();
				return view('support')
					->with('view', 'success')
					->with('accountType', $user->account_type)
		            ->with('loginName', $pageInfo['login']['name'])
		            ->with('loginPath', $pageInfo['login']['path'])
		            ->with('consoleName', $pageInfo['console']['name'])
		            ->with('consolePath', $pageInfo['console']['path']);
			} else {
		        return back()
		            ->withInput()
		        	->withErrors(['message' => $this->msgMessageNoBlank], 'support');
			}
		} else {
			abort(400);
		}
	}
}