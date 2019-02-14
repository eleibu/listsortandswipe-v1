<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\User;
// use App\Context;
use App\Classes\Toolkit;
use Validator;
use Illuminate\Support\Facades\Mail;
// use App\Mail\SignedUp;
// use App\Mail\ResendActivationLink;

use DateTime;
use DateTimeZone;
use DateInterval;


class Controller_Auth_SignUp extends Controller
{
	protected $msgEmailDefault = '';
	protected $msgEmailNoBlank = 'Email can&#39;t be blank.';
	protected $msgEmailInvalid = 'That email address appears to be invalid.';
	protected $msgPasswordDefault = 'Password must have at least 6 characters. Other than that, make it as simple or complex as you like.';
	protected $msgPasswordNoBlank = 'Password can&#39;t be blank.';
	protected $msgPasswordInvalid = 'Password must have at least 6 characters.';

	public function page(Request $request) {
		if (Auth::check()) {
			$pageInfo = Toolkit::pageInfo();
			return redirect($pageInfo['console']['path']);
		} else {
			return $this->getReturnView('signup');
		}
	}

	public function post(Request $request) {
		Toolkit::sleep();

		if (Auth::check()) {
			$pageInfo = Toolkit::pageInfo();
			return redirect($pageInfo['console']['path']);
		} else {
			$action = $request->input('action');
			if ($action == 'resendlink') {
				return $this->resendlink($request);
			} else {
				return $this->signup($request);
			}
		}
	}

	protected function getReturnView($viewText) {
		// views: 'signup', 'accountcreated', 'linksent'
		$pageInfo = Toolkit::pageInfo();

		return view('signup')
			->with('view', $viewText)
            ->with('homeName', $pageInfo['home']['name'])
            ->with('homePath', $pageInfo['home']['path'])
            ->with('loginName', $pageInfo['login']['name'])
            ->with('loginPath', $pageInfo['login']['path'])
            ->with('signupName', $pageInfo['signup']['name'])
            ->with('signupPath', $pageInfo['signup']['path'])
            ->with('msgEmailDefault', $this->msgEmailDefault)
            ->with('msgEmailNoBlank', $this->msgEmailNoBlank)
            ->with('msgEmailInvalid', $this->msgEmailInvalid)
            ->with('msgPasswordDefault', $this->msgPasswordDefault)
            ->with('msgPasswordNoBlank', $this->msgPasswordNoBlank)
            ->with('msgPasswordInvalid', $this->msgPasswordInvalid);
	}

	protected function signup($request) {
		$emailMsg = null;
		if ($request->filled('email')) {
			$email = trim($request->input('email'));

            $tempArray = array("email" => $email);
            $validator_emailFormat = Validator::make($tempArray, [
                'email' => 'email'
            ]);

            if ($validator_emailFormat->fails()) {
				$emailMsg = $this->msgEmailInvalid;
            } else {
                $validator_emailUnique = Validator::make($tempArray, [
                    'email' => 'unique:users'
                ]);

                if ($validator_emailUnique->fails()) {
					$emailMsg = 'It appears you already have an account.';
                }
            }
		} else {
			$emailMsg = $this->msgEmailNoBlank;
		}

		$passwordMsg = null;
		if ($request->filled('password')) {
			$password = $request->input('password');
			if (strlen($password) < 6) {
				$passwordMsg = $this->msgPasswordInvalid;
			}
		} else {
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
            $vcode = str_random(30);

            // NEED TO ENSURE THESE ARE SAVED IN DB AS UTC TIMES - see 'account_expires_at' for my account

            $datetimeOneYear = (new DateTime('now', new DateTimeZone('UTC')))->add(new DateInterval('P1Y'))->format('Y-m-d H:i:s');
            $datetime30Days = (new DateTime('now', new DateTimeZone('UTC')))->add(new DateInterval('P30D'))->format('Y-m-d H:i:s');

            // only require account verification for free account

			// $user = new User;
			// $user->name = 'Elliot';
			// $user->surname = 'Leibu';
			// $user->email = $email;

            // $user->verified = false;
            // $user->verification_code = $vcode;

			// $user->password = bcrypt($password);
			// $user->company_name = 'Indysoft Pty Ltd';
			// $user->country_code = 'AUS';
			// $user->domain_ids = json_encode(array());
			// $user->account_type = 2;
			// $user->account_expires_at = $datetimeOneYear;
			// $user->domain_count_base = 5;
			// $user->domain_count_additional = 0;

			$success = false;

			DB::beginTransaction();
			try {
				$user->save();

				$success = true;
			} catch(\Exception $e) {
			   DB::rollback();
			   throw $e;
			}
			DB::commit();

            if ($success) {
                // Mail::to($email)->send(new SignedUp($vcode));

                Auth::attempt(['email' => $email, 'password' => $password], false);

				return $this->getReturnView('accountcreated');
            } else {
		        return back()
		            ->withInput()
		            ->withErrors(['message' => 'An error occured. Please try again.'], 'main');
            }
		}
	}

	protected function resendlink($request) {
        $user = Auth::guard('api')->user();
        Mail::to($user->email)->send(new ResendActivationLink($user->verification_code));

		return $this->getReturnView('linksent');
	}
}
