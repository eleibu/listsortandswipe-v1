<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
// use App\User;
// use App\Context;
use App\Classes\Toolkit;
use Validator;
use Illuminate\Support\Facades\Mail;
// use App\Mail\SignedUp;
// use App\Mail\ResendActivationLink;

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

            	// FIRST CLEAR USERS WHO HAVE NOT VALIDATED FOR 30 DAYS!!!!

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

			$user = new User;
			$user->name = $email;
			$user->email = $email;
			$user->password = bcrypt($password);
			$user->verified = 0;
			$user->verification_code = $vcode;
			// $user->context_ids = json_encode(array());
			// $user->prev_context_id = null;
			// $user->add_context_newline_on_enter = 0;
			// $user->add_task_newline_on_enter = 0;
			// $user->add_project_newline_on_enter = 0;
			// $user->team_member_next_color = 'RED';
			// $user->datetime_format_moment = 'LL';
			// $user->auto_clear_prev_at = null;
			// $user->auto_clear_done_items = 1;
			// $user->auto_clear_time = '00:00:00:000';
			// $user->auto_clear_notify = 1;
			// $user->auto_clear_secs_to_next = 3600;
			// $user->action_upon_done = 'tobottom';
			// $user->per_page_todo = 500;
			// $user->per_page_recyclebin = 100;

			// $context = new Context;
			// $context->id = Toolkit::getGUID();
			// $context->description = 'Work';
			// $context->task_ids = json_encode(array());
			// $context->project_ids = json_encode(array());

			$success = false;

			DB::beginTransaction();
			try {
				$user->save();

				// $context->user_id = $user->id;
				// $context->save();

				// $user->context_ids = json_encode(array($context->id));
				// $user->prev_context_id = $context->id;
				// $user->save();

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
