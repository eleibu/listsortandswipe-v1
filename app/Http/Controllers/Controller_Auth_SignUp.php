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
use App\Product;
use App\Sale;

use DateTime;
use DateTimeZone;
use DateInterval;
use PragmaRX\Countries\Package\Countries;


class Controller_Auth_SignUp extends Controller
{
    function __construct() {
		$this->gateway = new \Braintree_Gateway([
		    'environment' => env('BRAINTREE_ENV'),
		    'merchantId' => env('BRAINTREE_MERCHANT_ID'),
		    'publicKey' => env('BRAINTREE_PUBLIC_KEY'),
		    'privateKey' => env('BRAINTREE_PRIVATE_KEY')
		]);

    	$authErrorMessages = Toolkit::authErrorMessages();
		$this->msgEmailDefault = '';
		$this->msgEmailNoBlank = 'Email can&#39;t be blank.';
		$this->msgEmailInvalid = 'The email address appears to be invalid.';
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
		$this->msgTermsNoBlank = 'Please accept the terms and conditions and privacy statement.';
		$this->msgDiscountDefault = '';
		$this->msgDiscountInvalid = 'Sorry, that discount code is not valid.';
		$this->msgPlaceOrderDefault = '';
		$this->msgPlaceOrderErrors = 'Please review the above errors and correct any missing or invalid information.';
    }

	public function page(Request $request) {
		if (Auth::check()) {
			$pageInfo = Toolkit::pageInfo();
			return redirect($pageInfo['console']['path']);
		} else {

			// ALLOW PRICE TO BE NEGATIVE IN DB

			$productIDs = Toolkit::productIDs();
			switch ($request->input('pid')) {
				case $productIDs['accountTypeBasic']:
					$pageTitle = 'Basic';
					$dbProduct = Product::where('id', $request->input('pid'))
						->first();
					break;
				case $productIDs['accountTypeProfessional']:
					$pageTitle = 'Professional';
					$dbProduct = Product::where('id', $request->input('pid'))
						->first();
					break;
				case $productIDs['accountTypeEnterprise']:
					$pageTitle = 'Enterprise';
					$dbProduct = Product::where('id', $request->input('pid'))
						->first();
					break;
				default:
					$pageTitle = 'Free trial';
					$dbProduct = Product::where('id', $productIDs['accountTypeFree'])
						->first();
			}

			$productDetails = array(
				'id' => $dbProduct->id,
				'pageTitle' => $pageTitle,
				'name' => 'Lithium List - ' . $dbProduct->description,
				'priceCents' => $dbProduct->price_cents
			);

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

			$pageInfo = Toolkit::pageInfo();

			return view('signup')
				->with('view', 'signup')
	            ->with('productDetails', $productDetails)
	            ->with('clientToken', $this->gateway->clientToken()->generate())
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
	            ->with('msgDiscountDefault', $this->msgDiscountDefault)
	            ->with('msgDiscountInvalid', $this->msgDiscountInvalid)
	            ->with('msgTermsDefault', $this->msgTermsDefault)
	            ->with('msgTermsNoBlank', $this->msgTermsNoBlank)
	            ->with('msgPlaceOrderDefault', $this->msgPlaceOrderDefault)
	            ->with('msgPlaceOrderErrors', $this->msgPlaceOrderErrors);
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

	protected function signup($request) {
		$productIDs = Toolkit::productIDs();
		if (($request->filled('pid')) && (($request->input('pid') == $productIDs['accountTypeFree']) || ($request->input('pid') == $productIDs['accountTypeBasic']) || ($request->input('pid') == $productIDs['accountTypeProfessional']) || ($request->input('pid') == $productIDs['accountTypeEnterprise']))) {

			$pid = $request->input('pid');
			if ($pid == $productIDs['accountTypeFree']) {
				$requirePayment = false;
			} else {
				$requirePayment = true;
			}

    		$errors = array();
    		$cardErrorMsg = 'Your card could not be processed. Please check the details and try again.';

	    	// email
			if ($request->filled('email')) {
				$email = trim($request->input('email'));

	            $tempArray = array("email" => $email);
	            $validator_emailFormat = Validator::make($tempArray, [
	                'email' => 'email'
	            ]);

	            if ($validator_emailFormat->fails()) {
					$errors['email'] = $this->msgEmailInvalid;
	            } else {
	                $validator_emailUnique = Validator::make($tempArray, [
	                    'email' => 'unique:users'
	                ]);
	                if ($validator_emailUnique->fails()) {
						$errors['email'] = 'It appears you already have an account.';
	                }
	            }
			} else {
				$errors['email'] = $this->msgEmailNoBlank;
			}

			// password
			if ($request->filled('password')) {
				if (strlen($request->input('password')) < 6) {
					$errors['password'] = $this->msgPasswordInvalid;
				}
			} else {
				$errors['password'] = $this->msgPasswordNoBlank;
			}

			// firstname and surname
			if ($request->filled('firstname')) {
				$firstname = trim($request->input('firstname'));
			}
			if ($request->filled('surname')) {
				$surname = trim($request->input('surname'));
			}
			if (!isset($firstname) && !isset($surname)) {
				$errors['firstname'] = $this->msgNameNoBlankBoth;
				$errors['surname'] = 'dummy';
			} else {
				if (!isset($firstname)) {
					$errors['firstname'] = $this->msgNameNoBlankFirstname;
				} else if (!isset($surname)) {
					$errors['surname'] = $this->msgNameNoBlankSurname;
				}
			}

			// country
			if (!$request->filled('country')) {
				$errors['country'] = $this->msgCountryNoBlank;
			}

			// credit card
			if (($requirePayment) && (!$request->filled('nonce'))) {
				$errors['creditcard'] = $cardErrorMsg;
			}

			// terms
			if (!$request->input('terms')) {
				$errors['terms'] = $this->msgTermsNoBlank;
			}

			if (count($errors) > 0) {
		        return back()
		            ->withInput()
		            ->withErrors($errors, 'signup');
			} else {
				$dbProduct = Product::where('id', $pid)
					->first();

				if ($requirePayment) {
					$amount = round(($dbProduct->price_cents / 100), 2);
					$result = $this->gateway->transaction()->sale([
						'amount' => $amount,
						'paymentMethodNonce' => $request->input('nonce'),
						'options' => [
							'submitForSettlement' => true
						]
					]);

					if ($result->success) {
						return $this->createAccount($request, $dbProduct);
					} else {
						// billing failed
				        return back()
				            ->withInput()
				        	->withErrors(['creditcard' => $cardErrorMsg], 'signup');
					}
				} else {
					return $this->createAccount($request, $dbProduct);
				}
			}
		} else {
			abort(400);
		}
	}

	protected function createAccount($request, $dbProduct) {
			Auth::attempt(['email' => $email, 'password' => $password], false);

			$pageInfo = Toolkit::pageInfo();
			return view('signup')
				->with('view', 'accountcreated')
	            ->with('homeName', $pageInfo['home']['name'])
	            ->with('homePath', $pageInfo['home']['path'])
	            ->with('loginName', $pageInfo['login']['name'])
	            ->with('loginPath', $pageInfo['login']['path'])
	            ->with('signupName', $pageInfo['signup']['name'])
	            ->with('signupPath', $pageInfo['signup']['path']);




		$productIDs = Toolkit::productIDs();

		// user
		$user = new User;

		$firstname = trim($request->input('firstname'));
		if (strlen($firstname) > 255) {
			$firstname = substr($firstname, 0, 255);
		}
		$user->name = $firstname;

		$surname = trim($request->input('surname'));
		if (strlen($surname) > 255) {
			$surname = substr($surname, 0, 255);
		}
		$user->surname = $surname;

		$email = trim($request->input('email'));
		if (strlen($email) > 255) {
			$email = substr($email, 0, 255);
		}
		$user->email = $email;

		$user->password = bcrypt($request->input('password'));

		if ($dbProduct->id == $productIDs['accountTypeFree']) {
	        $user->verified = false;
	        $user->verification_code = str_random(30);
		} else {
			$user->verified = true;
		}

		if (($request->filled('companyname')) && (strlen(trim($request->input('companyname'))) > 0)) {
			$user->company_name = trim($request->input('companyname'));
		}

		$user->country_code = $request->input('country');

		$user->domain_ids = json_encode(array());

		// FIX THESE DATES!!!

        $datetimeOneYear = (new DateTime('now', new DateTimeZone('UTC')))->add(new DateInterval('P1Y'))->format('Y-m-d H:i:s');
        $datetime30Days = (new DateTime('now', new DateTimeZone('UTC')))->add(new DateInterval('P30D'))->format('Y-m-d H:i:s');
		switch ($dbProduct->id) {
			case $productIDs['accountTypeBasic']:
				$user->account_type = 1;
				$user->account_expires_at = $datetimeOneYear;
				$user->domain_count_base = 1;
				break;
			case $productIDs['accountTypeProfessional']:
				$user->account_type = 2;
				$user->account_expires_at = $datetimeOneYear;
				$user->domain_count_base = 5;
				break;
			case $productIDs['accountTypeEnterprise']:
				$user->account_type = 3;
				$user->account_expires_at = $datetimeOneYear;
				$user->domain_count_base = 35;
				break;
			default:
				$user->account_type = 0;
				$user->account_expires_at = $datetime30Days;
				$user->domain_count_base = 1;
		}

		$user->domain_count_additional = 0;

		$user->comms_sales = true;

		$user->comms_updates = true;

		// sale
		$sale = new Sale;
		$sale->product_id = $dbProduct->id;
		$sale->country_code = $request->input('country');
		$sale->currency = $dbProduct->currency;
		$sale->discount_percent = 0;
		$sale->price_cents_orig = $dbProduct->price_cents;
		$sale->price_cents_after_discount = $dbProduct->price_cents;

		// save
		$success = false;
		DB::beginTransaction();
		try {
			$user->save();
			
			$sale->user_id = $user->id;
			$sale->save();
			
			$success = true;
		} catch(\Exception $e) {
		   DB::rollback();
		   throw $e;
		}
		DB::commit();

		if ($success) {
			// Mail::to($email)->send(new SignedUp($vcode));

			Auth::attempt(['email' => $email, 'password' => $password], false);

			$pageInfo = Toolkit::pageInfo();
			return view('signup')
				->with('view', 'accountcreated')
	            ->with('homeName', $pageInfo['home']['name'])
	            ->with('homePath', $pageInfo['home']['path'])
	            ->with('loginName', $pageInfo['login']['name'])
	            ->with('loginPath', $pageInfo['login']['path'])
	            ->with('signupName', $pageInfo['signup']['name'])
	            ->with('signupPath', $pageInfo['signup']['path']);
		} else {
			abort(500);
		}
	}

	protected function resendlink($request) {
        // $user = Auth::guard('api')->user();
        // Mail::to($user->email)->send(new ResendActivationLink($user->verification_code));

		$pageInfo = Toolkit::pageInfo();
		return view('signup')
			->with('view', 'linksent')
            ->with('homeName', $pageInfo['home']['name'])
            ->with('homePath', $pageInfo['home']['path'])
            ->with('loginName', $pageInfo['login']['name'])
            ->with('loginPath', $pageInfo['login']['path'])
            ->with('signupName', $pageInfo['signup']['name'])
            ->with('signupPath', $pageInfo['signup']['path']);
	}

	protected function compCountries($a, $b)
	{
	    return strcmp($a['name'], $b['name']);
	}
}