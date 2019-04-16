<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Domain;
use App\Classes\Toolkit;

class Controller_API_Console extends Controller
{
    public function api_loadpage(Request $request) {
    	Toolkit::sleep();
    	
		$user = Auth::guard('api')->user();

		$accountData = array(
			'name' => $user->name,
			'surname' => $user->surname,
			'email' => $user->email,
			'companyName' => $user->company_name,
			'countryName' => Toolkit::getCountryName($user->country_code),
			'accountType' => $user->account_type,
			'accountLicenceKey' => $user->account_licence_key,
			'accountExpiresAt' => $user->account_expires_at,
			'domainCountBase' => $user->domain_count_base,
			'domainCountAdditional' => $user->domain_count_additional
		);

		$domainIds = json_decode($user->domain_ids);
		$domains = array();
		for ($i = 0; $i < count($domainIds); $i++) {
			$domain = Domain::where('id', $domainIds[$i])
							->first();

			array_push($domains, $domain);
		}

		return response()->json([
			'accountData' => $accountData,
			'domains' => $domains
		], 200);
    }
}