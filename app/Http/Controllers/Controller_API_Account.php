<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use DB;
use App\Classes\Toolkit;
use App\Mail\SendReceipt;
use App\Product;
use App\Sale;
use \Carbon\Carbon;

class Controller_API_Account extends Controller
{
	public function discount(Request $request) {
		Toolkit::sleep();

		return response()->json([
			'id' => '92024C59-9BAD-4EC5-8049-F9E8EB4D9E3F',
			'message' => 'Invalid discount code.'
		], 422);
	}

	public function renew(Request $request) {
		Toolkit::sleep();

        if ($request->filled('type', 'amount', 'nonce')) {
        	$result = $this->submitPayment($request->input('amount'), $request->input('nonce'));

			if ($result->success) {

				
				// if renew to lower account:
					// delete extra domains
					// if previous account was enterprise, delete 'account_licence_key' (do we need to generate new licence keys for all domains?)
				// MUST TEST ENTERPRISE ACCOUNT (DOMAIN CREATION) AND CHANGE FROM AND TO ENTERPRISE ACCOUNT

				// CREATE AN ALERT IF DB CHANGES FAIL AFTER CREDIT CARD HAS BEEN CHARGED (here and on sign up page)
			} else {
				// billing failed
		        // return back()
		        //     ->withInput()
		        // 	->withErrors(['creditcard' => $cardErrorMsg], 'signup');
			}
        } else {
			return response()->json([
				'id' => '5A00D003-7D48-4CB7-8990-20C6975A42C7',
				'message' => 'Missing parameters.'
			], 400);
        }
	}

	public function upgrade(Request $request) {
		Toolkit::sleep();

        if ($request->filled('type', 'productName', 'amount', 'nonce')) {
        	$user = Auth::guard('api')->user();



						$accountData = array(
							'accountType' => 2,
							'accountExpiresAt' => $user->account_expires_at,
							'domainCountBase' => 5
						);
						if (isset($user->account_licence_key)) {
							$accountData['accountLicenceKey'] = $user->account_licence_key;
						}

						return response()->json([
							'accountData' => $accountData
						], 200);


			

			$newLicenceType = intval($request->input('type'));
			if ($newLicenceType > $user->account_type) {
	        	$result = $this->submitPayment($request->input('amount'), $request->input('nonce'));

				if ($result->success) {
					$productIDs = Toolkit::productIDs();
					switch($newLicenceType) {
						case 1:
							$dbProduct = Product::where('id', $productIDs['accountTypeBasic'])
								->first();
						break;
						case 2:
							$dbProduct = Product::where('id', $productIDs['accountTypeProfessional'])
								->first();
						break;
						case 3:
							$dbProduct = Product::where('id', $productIDs['accountTypeEnterprise'])
								->first();
						break;
						default:
							$dbProduct = Product::where('id', $productIDs['accountTypeFree'])
								->first();
					}

					$user->account_type = $newLicenceType;
					$user->domain_count_base = Toolkit::getDomainCount($newLicenceType);

					if ($newLicenceType == 3) {
						$user->account_licence_key = str_random(30);
					}

					$invoice = array(
						'date' => gmdate('Y-m-d'),
						'customerName' => $user->name . ' ' . $user->surname,
						'companyName' => $user->company_name,
						'countryName' => Toolkit::getCountryName($user->country_code),
						'productName' => $request->input('productName'),
						'price' => intval($request->input('amount') * 100),
						'taxes' => 0,
						'discount' => 0,
						'total' => intval($request->input('amount') * 100)
					);

					$sale = new Sale;
					$sale->user_id = $user->id;
					$sale->product_id = $dbProduct->id;
					$sale->country_code = $user->country_code;
					$sale->currency = $dbProduct->currency;
					$sale->discount_percent = 0;
					$sale->price_cents_orig = $invoice['price'];
					$sale->price_cents_after_discount = $invoice['price'];
					$sale->licence_period_secs = strtotime($user->account_expires_at) - time();

					$success = false;
					DB::beginTransaction();
					try {
						$user->save();
						$sale->save();						
						$success = true;
					} catch(\Exception $e) {
					   DB::rollback();
					   throw $e;
					}
					DB::commit();

					if ($success) {
						$invoice['refnumber'] = Toolkit::getFullReceiptNumber($sale->id);
						Mail::to($email)
							->send(new SendInvoice($user->name, $invoice));

						$accountData = array(
							'accountType' => $user->account_type,
							'accountExpiresAt' => $user->account_expires_at,
							'domainCountBase' => $user->domain_count_base
						);
						if (isset($user->account_licence_key)) {
							$accountData['accountLicenceKey'] = $user->account_licence_key;
						}

						return response()->json([
							'accountData' => $accountData
						], 200);
					} else {
						return response()->json([
							'id' => '0ABA1BE4-8DC4-4746-87D8-7FC1279715ED',
							'message' => 'A database error occurred.'
						], 500);
					}
				} else {
					return response()->json([
						'id' => '6A5EC71F-D627-4679-BE89-9B867DDB1758',
						'message' => 'Credit card billing failed.'
					], 500);
				}
			} else {
				return response()->json([
					'id' => 'DFF1F725-28C3-4C1E-BB0B-0BBCE47CF297',
					'message' => 'New account type must be greater than old account type.'
				], 400);
			}
        } else {
			return response()->json([
				'id' => 'FD42AFCF-E8FC-4C7C-81D5-3A550E32DE92',
				'message' => 'Missing parameters.'
			], 400);
        }
	}

	protected function submitPayment($amount, $nonce) {
		$gateway = new \Braintree_Gateway([
		    'environment' => env('BRAINTREE_ENV'),
		    'merchantId' => env('BRAINTREE_MERCHANT_ID'),
		    'publicKey' => env('BRAINTREE_PUBLIC_KEY'),
		    'privateKey' => env('BRAINTREE_PRIVATE_KEY')
		]);
		$result = $gateway->transaction()->sale([
			'amount' => $amount,
			'paymentMethodNonce' => $nonce,
			'options' => [
				'submitForSettlement' => true
			]
		]);
		return $result;
	}
}