<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\User;
use App\Classes\Toolkit;
use Validator;
use Illuminate\Support\Facades\Mail;
// use App\Mail\SignedUp;
use App\Mail\ResendActivationLink;
use App\Mail\SendActivationLink;
use App\Mail\SendReceipt;
use App\Product;
use App\Sale;
use \Carbon\Carbon;

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
		// $invoice = array(
		// 	'date' => gmdate('Y-m-d'),
		// 	'customerName' => 'Elliot Leibu',
		// 	'companyName' => 'Indysoft Pty Ltd',
		// 	'countryName' => 'Australia',
		// 	'productName' => 'Lithium List - Basic - 12 months licence',
		// 	'price' => 3600,
		// 	'taxes' => 0,
		// 	'discount' => 0,
		// 	'total' => 3600
		// );		
		// $invoice['refnumber'] = Toolkit::getFullReceiptNumber(1);
		// return new SendReceipt('Elliot', $invoice);


        // Mail::to('elliot.leibu@gmail.com')
        // 	->send(new ResendActivationLink('Elliot', '123'));

			// $user = Auth::user();

			// $pageInfo = Toolkit::pageInfo();
			// return view('signup')
			// 	->with('view', 'account-created-requires-activation')
			// 	// ->with('accountType', $user->account_type)
	  //           ->with('homeName', $pageInfo['home']['name'])
	  //           ->with('homePath', $pageInfo['home']['path'])
	  //           ->with('loginName', $pageInfo['login']['name'])
	  //           ->with('loginPath', $pageInfo['login']['path'])
	  //           ->with('signupName', $pageInfo['signup']['name'])
	  //           ->with('signupPath', $pageInfo['signup']['path']);

		if (Auth::check()) {
			$pageInfo = Toolkit::pageInfo();
			return redirect($pageInfo['console']['path']);
		} else {
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
				'name' => $this->getProductName($dbProduct->description),
				'priceCents' => $dbProduct->price_cents
			);

			$countries = Toolkit::getAllCountries();

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

				$companyName = '';
				if (($request->filled('companyname')) && (strlen(trim($request->input('companyname'))) > 0)) {
					$companyName = trim($request->input('companyname'));
				}

				$invoice = array(
					'date' => gmdate('Y-m-d'),
					'customerName' => $firstname . ' ' . $surname,
					'companyName' => $companyName,
					'countryName' => Toolkit::getCountryName($request->input('country')),
					'productName' => $this->getProductName($dbProduct->description),
					'price' => $dbProduct->price_cents,
					'taxes' => 0,
					'discount' => 0,
					'total' => $dbProduct->price_cents
				);

				if ($requirePayment) {
					$transAmount = round(($invoice['total'] / 100), 2);
					$result = $this->gateway->transaction()->sale([
						'amount' => $transAmount,
						'paymentMethodNonce' => $request->input('nonce'),
						'options' => [
							'submitForSettlement' => true
						]
					]);
					if ($result->success) {
						return $this->createAccount($request, $dbProduct, $invoice);
					} else {
						// billing failed
				        return back()
				            ->withInput()
				        	->withErrors(['creditcard' => $cardErrorMsg], 'signup');
					}
				} else {
					return $this->createAccount($request, $dbProduct, $invoice);
				}
			}
		} else {
			abort(400);
		}
	}

	protected function createAccount($request, $dbProduct, $invoice) {
			// Auth::attempt(['email' => $email, 'password' => $password], false);

			// $pageInfo = Toolkit::pageInfo();
			// return view('signup')
			// 	->with('view', 'accountcreated')
	  //           ->with('homeName', $pageInfo['home']['name'])
	  //           ->with('homePath', $pageInfo['home']['path'])
	  //           ->with('loginName', $pageInfo['login']['name'])
	  //           ->with('loginPath', $pageInfo['login']['path'])
	  //           ->with('signupName', $pageInfo['signup']['name'])
	  //           ->with('signupPath', $pageInfo['signup']['path']);

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

		$vcode = str_random(30);
		if ($dbProduct->id == $productIDs['accountTypeFree']) {
	        $user->verified = false;
	        $user->verification_code = $vcode;
	        $accountCreatedView = 'account-created-requires-activation';
		} else {
			$user->verified = true;
			$accountCreatedView = 'account-created-and-activated';
		}

		if (($request->filled('companyname')) && (strlen(trim($request->input('companyname'))) > 0)) {
			$user->company_name = trim($request->input('companyname'));
		}

		$user->country_code = $request->input('country');

		$user->domain_ids = json_encode(array());

		switch ($dbProduct->id) {
			case $productIDs['accountTypeBasic']:
				$user->account_type = 1;
				$user->account_expires_at = Carbon::now('UTC')->addYear();
				$user->domain_count_base = 1;
				break;
			case $productIDs['accountTypeProfessional']:
				$user->account_type = 2;
				$user->account_expires_at = Carbon::now('UTC')->addYear();
				$user->domain_count_base = 5;
				break;
			case $productIDs['accountTypeEnterprise']:
				$user->account_type = 3;
				$user->account_expires_at = Carbon::now('UTC')->addYear();
				$user->domain_count_base = 35;
				break;
			default:
				$user->account_type = 0;
				$user->account_expires_at = Carbon::now('UTC')->addDays(30);
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
			Auth::attempt(['email' => $email, 'password' => $password], false);

			if ($dbProduct->id == $productIDs['accountTypeFree']) {
				Mail::to($email)
					->send(new SendActivationLink($firstname, $vcode));
			}

			$invoice['refnumber'] = Toolkit::getFullReceiptNumber($sale->id);
			Mail::to($email)
				->send(new SendInvoice($firstname, $invoice));

			$pageInfo = Toolkit::pageInfo();
			return view('signup')
				->with('view', $accountCreatedView)
				->with('accountType', $user->account_type)
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
        $user = Auth::user();
        Mail::to($user->email)
        	->send(new ResendActivationLink($user->name, $user->verification_code));
		
		$pageInfo = Toolkit::pageInfo();
		return view('signup')
			->with('view', 'link-sent')
            ->with('homeName', $pageInfo['home']['name'])
            ->with('homePath', $pageInfo['home']['path'])
            ->with('loginName', $pageInfo['login']['name'])
            ->with('loginPath', $pageInfo['login']['path'])
            ->with('signupName', $pageInfo['signup']['name'])
            ->with('signupPath', $pageInfo['signup']['path']);
	}

	protected function getProductName($description) {
		return 'Lithium List - ' . $description;
	}
}