<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Classes\Toolkit;
use App\User;
use DB;
use Illuminate\Support\Facades\Password;
use Mail;
use App\Mail\ResetPasswordLink;
use Illuminate\Contracts\Hashing\Hasher as HasherContract;

class Controller_Auth_Reset extends Controller
{
	protected $msgEmailRequestDefault = 'Enter your email address and we&#39;ll send you a link to reset your password.';
	protected $msgEmailRequestNoBlank = 'Email can&#39;t be blank.';
	protected $msgEmailRequestInvalid = 'That email address appears to be invalid.';
	protected $msgEmailDoresetDefault = '';
	protected $msgEmailDoresetNoBlank = 'Email can&#39;t be blank.';
	protected $msgEmailDoresetInvalid = 'That email address appears to be invalid.';
	protected $msgPasswordDefault = 'Password must have at least 6 characters. Other than that, make it as simple or tricky as you like.';
	protected $msgPasswordNoBlank = 'Password can&#39;t be blank.';
	protected $msgPasswordInvalid = 'Password must have at least 6 characters.';

	protected $tokenValidString = '1 hour';
	protected $msgEmailNotFound = 'That email address could not be found.';

	protected $hasher;

    public function __construct(HasherContract $hasher) {
        $this->hasher = $hasher;
    }

	public function page(Request $request) {
		$pageInfo = Toolkit::pageInfo();

		if (Auth::check()) {
			return redirect($pageInfo['console']['path']);
		} else {
			if ($request->filled('email', 'token')) {
				$email = $request->input('email');
				$token = $request->input('token');

				$linkValid = false;
				$passwordReset = DB::table('password_resets')->where('email', $email)->first();
				if (isset($passwordReset)) {
					if ($this->hasher->check($token, $passwordReset->token)) {
						$linkValid = true;
					}
				}
				if ($linkValid) {
	                $createdDate = date_create($passwordReset->created_at);
	                $cutOffDate = date_create('now');
	                date_sub($cutOffDate, date_interval_create_from_date_string($this->tokenValidString));

	                if ($createdDate >= $cutOffDate) {
						return view('reset')
							->with('view', 'doreset-credentials')
							->with('email', $email)
							->with('token', $token)
				            ->with('homeName', $pageInfo['home']['name'])
				            ->with('homePath', $pageInfo['home']['path'])
				            ->with('loginName', $pageInfo['login']['name'])
				            ->with('loginPath', $pageInfo['login']['path'])
				            ->with('msgEmailDoresetDefault', $this->msgEmailDoresetDefault)
				            ->with('msgEmailDoresetNoBlank', $this->msgEmailDoresetNoBlank)
				            ->with('msgEmailDoresetInvalid', $this->msgEmailDoresetInvalid)
				            ->with('msgPasswordDefault', $this->msgPasswordDefault)
				            ->with('msgPasswordNoBlank', $this->msgPasswordNoBlank)
				            ->with('msgPasswordInvalid', $this->msgPasswordInvalid);
	                } else {
	                	// link expired
						return view('reset')
							->with('view', 'link-request')
							->with('errorMsgMain', 'This reset link has expired. Please request a new one.')
				            ->with('homeName', $pageInfo['home']['name'])
				            ->with('homePath', $pageInfo['home']['path'])
				            ->with('loginName', $pageInfo['login']['name'])
				            ->with('loginPath', $pageInfo['login']['path'])
				            ->with('msgEmailRequestDefault', $this->msgEmailRequestDefault)
				            ->with('msgEmailRequestNoBlank', $this->msgEmailRequestNoBlank)
				            ->with('msgEmailRequestInvalid', $this->msgEmailRequestInvalid);
	                }
				} else {
					// invalid link
					return view('reset')
						->with('view', 'link-request')
						->with('errorMsgMain', 'This reset link is not valid. Please request a new one.')
			            ->with('homeName', $pageInfo['home']['name'])
			            ->with('homePath', $pageInfo['home']['path'])
			            ->with('loginName', $pageInfo['login']['name'])
			            ->with('loginPath', $pageInfo['login']['path'])
			            ->with('msgEmailRequestDefault', $this->msgEmailRequestDefault)
			            ->with('msgEmailRequestNoBlank', $this->msgEmailRequestNoBlank)
			            ->with('msgEmailRequestInvalid', $this->msgEmailRequestInvalid);
				}
			} else {
				return view('reset')
					->with('view', 'link-request')
		            ->with('homeName', $pageInfo['home']['name'])
		            ->with('homePath', $pageInfo['home']['path'])
		            ->with('loginName', $pageInfo['login']['name'])
		            ->with('loginPath', $pageInfo['login']['path'])
		            ->with('msgEmailRequestDefault', $this->msgEmailRequestDefault)
		            ->with('msgEmailRequestNoBlank', $this->msgEmailRequestNoBlank)
		            ->with('msgEmailRequestInvalid', $this->msgEmailRequestInvalid);
			}
		}
	}

	public function post(Request $request) {
		Toolkit::sleep();

		if (Auth::check()) {
			$pageInfo = Toolkit::pageInfo();
			return redirect($pageInfo['console']['path']);
		} else {
			$action = $request->input('action');
			if ($action == 'requestlink') {
				return $this->requestlink($request);
			} else {
				return $this->resetPassword($request);
			}
		}
	}

	protected function requestlink($request) {
        if ($request->filled('emailrequest')) {
        	$email = trim($request->input('emailrequest'));

		    $user = User::where('email', $email)
		    			->first();
		    
		    if (isset($user)) {
				$token = Password::getRepository()->create($user);
				Mail::to($email)->send(new ResetPasswordLink($email, $token));

            	$pageInfo = Toolkit::pageInfo();
				return view('reset')
					->with('view', 'link-success')
		            ->with('homeName', $pageInfo['home']['name'])
		            ->with('homePath', $pageInfo['home']['path'])
		            ->with('loginName', $pageInfo['login']['name'])
		            ->with('loginPath', $pageInfo['login']['path']);
		    } else {
		        return back()
		            ->withInput()
		            ->withErrors(['message' => $this->msgEmailNotFound], 'emailrequest');
		    }
        } else {
	        return back()
	            ->withInput()
	            ->withErrors(['message' => $this->msgEmailRequestNoBlank], 'emailrequest');
        }
	}

	protected function resetPassword($request) {
		$passwordMsg = null;
		if ($request->filled('password')) {
			$password = $request->input('password');
			if (strlen($password) < 6) {
				$passwordMsg = $this->msgPasswordInvalid;
			}
		} else {
			$passwordMsg = $this->msgPasswordNoBlank;
		}

		if (isset($passwordMsg)) {
	        return back()
	            ->withInput()
	            ->withErrors(['message' => $passwordMsg], 'password');
		} else {
			if ($request->filled('emaildoreset', 'token')) {
				$email = $request->input('emaildoreset');
				$password = $request->input('password');
				$token = $request->input('token');

				$linkValid = false;
				$passwordReset = DB::table('password_resets')->where('email', $email)->first();
				if (isset($passwordReset)) {
					if ($this->hasher->check($token, $passwordReset->token)) {
						$linkValid = true;
					}
				}
				if ($linkValid) {
	                $createdDate = date_create($passwordReset->created_at);
	                $cutOffDate = date_create('now');
	                date_sub($cutOffDate, date_interval_create_from_date_string($this->tokenValidString));

	                if ($createdDate >= $cutOffDate) {
		                $affected = DB::update('update users set password = :newpasswordhash where email = :email', ['newpasswordhash' => bcrypt($password), 'email' => $email]);

		                if (sizeof($affected) == 1) {
		                    // success
		                    DB::table('password_resets')
		                    		->where('email', $email)
		                    		->delete();

		                	$pageInfo = Toolkit::pageInfo();
							return view('reset')
								->with('view', 'doreset-success')
					            ->with('homeName', $pageInfo['home']['name'])
					            ->with('homePath', $pageInfo['home']['path'])
					            ->with('loginName', $pageInfo['login']['name'])
					            ->with('loginPath', $pageInfo['login']['path']);
		                } else {
		                    // error
					        return back()
					            ->withInput()
					            ->withErrors(['message' => 'An error occured. Please try again.'], 'main');
		                }
	                } else {
	                	// link expired
	                    $pageInfo = Toolkit::pageInfo();
	                    $resetPath = url($pageInfo['reset']['path']);
				        return back()
				            ->withInput()
				            ->withErrors(['message' => 'This reset link has expired. <a href=\'' . $resetPath . '\' title=\'Click here\'>Click here</a> to request a new one.'], 'main');
	                }
				} else {
					// invalid link
			        return back()
			            ->withInput()
			            ->withErrors(['message' => 'An error occured. Please try again.'], 'main');
				}
			} else {
		        return back()
		            ->withInput()
		            ->withErrors(['message' => 'An error occured. Please try again.'], 'main');
			}
		}
	}
}