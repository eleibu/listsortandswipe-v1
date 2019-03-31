<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Classes\Toolkit;

class Controller_Auth_LogIn extends Controller
{
	protected $msgEmailDefault = '';
	protected $msgEmailNoBlank = 'Email can&#39;t be blank.';
	protected $msgPasswordDefault = '';
	protected $msgPasswordNoBlank = 'Password can&#39;t be blank.';

	public function page(Request $request) {
		$pageInfo = Toolkit::pageInfo();

		if (Auth::check()) {			
			return redirect($pageInfo['console']['path']);
		} else {
			return view('login')
	            ->with('homeName', $pageInfo['home']['name'])
	            ->with('homePath', $pageInfo['home']['path'])
	            ->with('loginName', $pageInfo['login']['name'])
	            ->with('loginPath', $pageInfo['login']['path'])
	            ->with('signupName', $pageInfo['signup']['name'])
	            ->with('signupPath', $pageInfo['signup']['path'])
	            ->with('resetName', $pageInfo['reset']['name'])
	            ->with('resetPath', $pageInfo['reset']['path'])
	            ->with('msgEmailDefault', $this->msgEmailDefault)
	            ->with('msgEmailNoBlank', $this->msgEmailNoBlank)
	            ->with('msgPasswordDefault', $this->msgPasswordDefault)
	            ->with('msgPasswordNoBlank', $this->msgPasswordNoBlank);
		}
	}

	public function post(Request $request) {
		Toolkit::sleep();

		if (Auth::check()) {
			$pageInfo = Toolkit::pageInfo();
			return redirect($pageInfo['console']['path']);
		} else {
			$emailMsg = null;
			if (!$request->filled('email')) {
				$emailMsg = $this->msgEmailNoBlank;
			}

			$passwordMsg = null;
			if (!$request->filled('password')) {
				$passwordMsg = $this->msgPasswordNoBlank;
			}

			if (isset($emailMsg) || isset($passwordMsg)) {
				if (isset($emailMsg) && isset($passwordMsg)) {
			        return back()
			            ->withInput()
			            ->withErrors(['message' => $emailMsg], 'email')
			            ->withErrors(['message' => $passwordMsg], 'password');
				} elseif (isset($emailMsg)) {
			        return back()
			            ->withInput()
			            ->withErrors(['message' => $emailMsg], 'email');
				} else {
			        return back()
			            ->withInput()
			            ->withErrors(['message' => $passwordMsg], 'password');
				}
			} else {
				// FIRST CLEAR ACCOUNTS THAT HAVE NOT ACTIVATED WITHIN 30 DAYS

				$email = trim($request->input('email'));
				$password = $request->input('password');

	            if (Auth::attempt(['email' => $email, 'password' => $password], false)) {
	            	$user = Auth::user();
					$pageInfo = Toolkit::pageInfo();

	            	if ($user->verified == 1) {
						return redirect($pageInfo['console']['path']);
	            	} else {
						return redirect($pageInfo['activate']['path']);
	            	}
	            } else {
			        return back()
			            ->withInput()
			            ->withErrors(['message' => 'The credentials are not valid.'], 'main');
	            }
			}
		}
	}
}