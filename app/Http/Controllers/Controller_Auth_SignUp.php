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


			switch ($request->input('pid')) {
				case '8126D38E-F031-4956-B6C6-DD040E1D2776':
					$pageTitle = 'Basic';
					$dbProduct = Product::where('id', $request->input('pid'))
						->first();
					break;
				case '27349E50-2E5D-4290-A6C1-17587BEA5E35':
					$pageTitle = 'Professional';
					$dbProduct = Product::where('id', $request->input('pid'))
						->first();
					break;
				case 'E2866B2E-BB05-41B7-B001-C3AEEC6E51FB':
					$pageTitle = 'Enterprise';
					$dbProduct = Product::where('id', $request->input('pid'))
						->first();
					break;
				default:
					$pageTitle = 'Free trial';
					$dbProduct = Product::where('id', 'BBCE2AC1-35DA-4D86-8B20-1411A5C553E2')
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

	protected function getReturnView($viewText) {
		// views: 'accountcreated', 'linksent'
		$pageInfo = Toolkit::pageInfo();

		return view('signup')
			->with('view', $viewText)
            ->with('homeName', $pageInfo['home']['name'])
            ->with('homePath', $pageInfo['home']['path'])
            ->with('loginName', $pageInfo['login']['name'])
            ->with('loginPath', $pageInfo['login']['path'])
            ->with('signupName', $pageInfo['signup']['name'])
            ->with('signupPath', $pageInfo['signup']['path']);
	}

	protected function signup($request) {
		if (($request->filled('pid')) && (($request->input('pid') == 'BBCE2AC1-35DA-4D86-8B20-1411A5C553E2') || ($request->input('pid') == '8126D38E-F031-4956-B6C6-DD040E1D2776') || ($request->input('pid') == '27349E50-2E5D-4290-A6C1-17587BEA5E35') || ($request->input('pid') == 'E2866B2E-BB05-41B7-B001-C3AEEC6E51FB'))) {

			$pid = $request->input('pid');
			if ($pid == 'BBCE2AC1-35DA-4D86-8B20-1411A5C553E2') {
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
				$firstname = $request->input('firstname');
			}
			if ($request->filled('surname')) {
				$surname = $request->input('surname');
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
						return $this->createAccount($dbProduct);
					} else {
						// billing failed
				        return back()
				            ->withInput()
				        	->withErrors(['creditcard' => $cardErrorMsg], 'signup');
					}
				} else {
					return $this->createAccount($dbProduct);
				}
			}
		} else {
			abort(400);
		}
	}

	protected function createAccount($dbProduct) {
		return $this->getReturnView('accountcreated');
	}

	protected function resendlink($request) {
        // $user = Auth::guard('api')->user();
        // Mail::to($user->email)->send(new ResendActivationLink($user->verification_code));

		return $this->getReturnView('linksent');
	}

	protected function compCountries($a, $b)
	{
	    return strcmp($a['name'], $b['name']);
	}
}