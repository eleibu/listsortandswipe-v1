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
use PragmaRX\Countries\Package\Countries;


class Controller_Auth_SignUp extends Controller
{
    function __construct() {
    	$authErrorMessages = Toolkit::authErrorMessages();
		$this->msgEmailDefault = '';
		$this->msgEmailNoBlank = 'Email can&#39;t be blank.';
		$this->msgEmailInvalid = 'That email address appears to be invalid.';
		$this->msgPasswordDefault = $authErrorMessages['msgPasswordDefault'];
		$this->msgPasswordNoBlank = $authErrorMessages['msgPasswordNoBlank'];
		$this->msgPasswordInvalid = $authErrorMessages['msgPasswordInvalid'];
		$this->msgNameDefault = '';
		$this->msgNameNoBlankBoth = 'First name and surname can&#39;t be blank.';
		$this->msgNameNoBlankFirstname = 'First name can&#39;t be blank.';
		$this->msgNameNoBlankSurname = 'Surname can&#39;t be blank.';
		$this->msgCountryDefault = '';
		$this->msgCountryNoBlank = 'Please select a country.';
		$this->msgTermsDefault = '';
		$this->msgTermsNoBlank = 'If agreed, please accept the terms and conditions and privacy statement.';
		$this->msgPlaceOrderDefault = '';
		$this->msgPlaceOrderErrors = 'There is missing or invalid information. See above.';
    }

	public function page(Request $request) {
		if (Auth::check()) {
			$pageInfo = Toolkit::pageInfo();
			return redirect($pageInfo['console']['path']);
		} else {
			$atype = 'free';
			if (($request->filled('atype')) && (($request->input('atype') == 'basic') || ($request->input('atype') == 'professional') || ($request->input('atype') == 'enterprise'))) {
				$atype = $request->input('atype');
			}
			return $this->getReturnView('signup', $atype);
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

	protected function getReturnView($viewText, $atype) {
		// views: 'signup', 'accountcreated', 'linksent'
		$pageInfo = Toolkit::pageInfo();

        $tempCountries = new Countries();
		$allCountries = $tempCountries->all();
		$countries = array();
		foreach ($allCountries as $tempCountry) {
			if ((strlen($tempCountry['iso_a3']) > 0) && ($tempCountry['iso_a3'] != '-99') && ($tempCountry['iso_a3'] != 'EUR')) {
				$country = array(
					'name' => $tempCountry['name']['common'],
					'iso' => $tempCountry['iso_a3']
				);
				array_push($countries, $country);
			}
		}
		usort($countries, array($this, 'compCountries'));

		return view('signup')
			->with('view', $viewText)
            ->with('atype', $atype)
            ->with('countries', $countries)
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
            ->with('msgPasswordInvalid', $this->msgPasswordInvalid)
            ->with('msgNameDefault', $this->msgNameDefault)
            ->with('msgNameNoBlankBoth', $this->msgNameNoBlankBoth)
            ->with('msgNameNoBlankFirstname', $this->msgNameNoBlankFirstname)
            ->with('msgNameNoBlankSurname', $this->msgNameNoBlankSurname)
            ->with('msgCountryDefault', $this->msgCountryDefault)
            ->with('msgCountryNoBlank', $this->msgCountryNoBlank)
            ->with('msgTermsDefault', $this->msgTermsDefault)
            ->with('msgTermsNoBlank', $this->msgTermsNoBlank)
            ->with('msgPlaceOrderDefault', $this->msgPlaceOrderDefault)
            ->with('msgPasswordInvalid', $this->msgPasswordInvalid)
            ->with('msgPlaceOrderErrors', $this->msgPlaceOrderErrors);
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

	protected function compCountries($a, $b)
	{
	    return strcmp($a['name'], $b['name']);
	}
}
