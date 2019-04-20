<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use DB;
use App\Classes\Toolkit;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendReceipt;
use App\Mail\LogFailureAfterCharge;
use App\Product;
use App\Sale;
use App\Domain;
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

        if ($request->filled('type', 'productName', 'amount', 'nonce')) {
        	$result = $this->submitPayment($request->input('amount'), $request->input('nonce'));

			if ($result->success) {
				$user = Auth::guard('api')->user();

				$domainIds = json_decode($user->domain_ids);
				$newLicenceType = intval($request->input('type'));
				$invoice = $this->getInvoice($request, $user);
				$sale = $this->getSale($newLicenceType, $user, $invoice);

				$newDomainIds = array();
				$deleteDomainIds = array();

				$deleteFromIndex = -1;
				$newDomainCountBase = Toolkit::getDomainCountBase($newLicenceType);
				if (count($domainIds) > ($newDomainCountBase + $user->domain_count_additional)) {
					$numToDelete = count($domainIds) - $newDomainCountBase - $user->domain_count_additional;
					$deleteFromIndex = count($domainIds) - $numToDelete;
				}
				if ($deleteFromIndex > -1) {
					for ($i = 0; $i < count($domainIds); $i++) {
						if ($i < $deleteFromIndex) {
							array_push($newDomainIds, $domainIds[$i]);
						} else {
							array_push($deleteDomainIds, $domainIds[$i]);
						}
					}
				} else {
					$newDomainIds = $domainIds;
				}

				$newAccountExpiresAt = Carbon::createFromTimestamp(strtotime($user->account_expires_at))->addYear()->toDateTimeString();

				if ($newLicenceType == 3) {
					if ($user->account_type != 3) {
						$accountLicenceKey = str_random(30);
					} else {
						$accountLicenceKey = $user->account_licence_key;
					}
				} else {
					$accountLicenceKey = null;
				}

				DB::beginTransaction();
				try {
					$affected = DB::table('users')
						->where('id', $user->id)
						->where('updated_at', '=', $user->updated_at)
						->update([
							'updated_at' => Carbon::now('UTC'),
							'domain_ids' => json_encode($newDomainIds),
							'account_type' => $newLicenceType,
							'account_expires_at' => $newAccountExpiresAt,
							'account_licence_key' => $accountLicenceKey,
							'domain_count_base' => $newDomainCountBase
						]);
					if ($affected == 1) {
						Domain::whereIn('id', $deleteDomainIds)		// no need to check that 'deleted_at' == null (this will only affect untrashed items)
							->delete();

						$sale->save();
					} else {
						DB::rollback();

						$emailAddresses = Toolkit::emailAddresses();
						Mail::to($emailAddresses['errorLog'])
							->send(new LogFailureAfterCharge($user, $invoice, 'Controller_API_Account', '1AAD1607-7A09-47B8-96AE-2D5122352B16'));

						return response()->json([
							'id' => 'F1E2C56E-C4F1-48D5-B12F-0524D5C765BA',
							'message' => 'Database conflict.'
						], 409);
					}
				} catch(\Exception $e) {
				   DB::rollback();

					$emailAddresses = Toolkit::emailAddresses();
					Mail::to($emailAddresses['errorLog'])
						->send(new LogFailureAfterCharge($user, $invoice, 'Controller_API_Account', '983246DC-0720-431E-8316-73AF37FA3553'));

				   throw $e;
				}
				DB::commit();

				$invoice['refnumber'] = Toolkit::getFullReceiptNumber($sale->id);

				Mail::to($user->email)
					->send(new SendReceipt($user->name, $invoice));

				$accountData = array(
					'accountType' => $newLicenceType,
					'accountExpiresAt' => $newAccountExpiresAt,
					'domainCountBase' => $newDomainCountBase
				);
				if (isset($accountLicenceKey)) {
					$accountData['accountLicenceKey'] = $accountLicenceKey;
				}

				if ($deleteFromIndex > -1) {
					$domains = array();
					for ($i = 0; $i < count($newDomainIds); $i++) {
						$domain = Domain::where('id', $newDomainIds[$i])
										->first();

						array_push($domains, $domain);
					}

					return response()->json([
						'accountData' => $accountData,
						'domains' => $domains
					], 200);
				} else {
					return response()->json([
						'accountData' => $accountData,
						'domains' => null
					], 200);
				}
			} else {
				return response()->json([
					'id' => 'C2EA3DB4-4492-4929-8714-B5E98D9FA46D',
					'message' => 'Credit card billing failed.'
				], 500);
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

			$newLicenceType = intval($request->input('type'));
			if ($newLicenceType > $user->account_type) {
	        	$result = $this->submitPayment($request->input('amount'), $request->input('nonce'));

				if ($result->success) {
					$invoice = $this->getInvoice($request, $user);
					$sale = $this->getSale($newLicenceType, $user, $invoice);

					$user->account_type = $newLicenceType;
					$user->domain_count_base = Toolkit::getDomainCountBase($newLicenceType);

					if ($newLicenceType == 3) {
						$user->account_licence_key = str_random(30);
					}

					DB::beginTransaction();
					try {
						$user->save();
						$sale->save();
					} catch(\Exception $e) {
					   DB::rollback();

						$emailAddresses = Toolkit::emailAddresses();
						Mail::to($emailAddresses['errorLog'])
							->send(new LogFailureAfterCharge($user, $invoice, 'Controller_API_Account', '89C7AACB-B7E1-420F-B54A-ACC921038C9F'));

					   throw $e;
					}
					DB::commit();

					$invoice['refnumber'] = Toolkit::getFullReceiptNumber($sale->id);

					Mail::to($user->email)
						->send(new SendReceipt($user->name, $invoice));

					$accountData = array(
						'accountType' => $user->account_type,
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

	protected function getSale($newLicenceType, $user, $invoice) {
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

		$sale = new Sale;
		$sale->user_id = $user->id;
		$sale->product_id = $dbProduct->id;
		$sale->country_code = $user->country_code;
		$sale->currency = $dbProduct->currency;
		$sale->discount_percent = 0;
		$sale->price_cents_orig = $invoice['price'];
		$sale->price_cents_after_discount = $invoice['price'];
		$sale->licence_period_secs = strtotime($user->account_expires_at) - time();

		return $sale;
	}

	protected function getInvoice($request, $user) {
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
		return $invoice;
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