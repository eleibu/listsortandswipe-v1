<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use DB;
use \Carbon\Carbon;
use App\Domain;
use App\Classes\Toolkit;

class Controller_API_Domains extends Controller
{
	public function get(Request $request) {
		Toolkit::sleep();

		$user = Auth::guard('api')->user();

		$domainIds = json_decode($user->domain_ids);
		$domains = array();
		for ($i = 0; $i < count($domainIds); $i++) {
			$domain = Domain::where('id', $domainIds[$i])
							->first();

			array_push($domains, $domain);
		}

		return response()->json([
			'domains' => $domains
		], 200);
	}

	public function post(Request $request) {
		Toolkit::sleep();

		if ($request->filled('id', 'domain')) {
			$user = Auth::guard('api')->user();
			$domainId = $request->input('id');

			$domainIds = json_decode($user->domain_ids);
			if (!isset($domainIds)) {
				$domainIds = array();
			}

			array_unshift($domainIds, $domainId);

			$domain = new Domain;
			$domain->id = $domainId;
			$domain->domain = $request->input('domain');

			if (($user->account_type == 3) && isset($user->account_licence_key)) {
				$domain->licence_key = $user->account_licence_key;
			} else {
				$domain->licence_key = str_random(30);
			}

			DB::beginTransaction();
			try {
				$affected = DB::table('users')
					->where('id', $user->id)
					->where('updated_at', '=', $user->updated_at)
					->update([
						'updated_at' => Carbon::now('UTC'),
						'domain_ids' => json_encode($domainIds)
					]);
				if ($affected == 1) {
					$domain->save();
				} else {
					DB::rollback();
					return response()->json([
						'id' => 'B36AFFA2-39B0-4FE4-BCE7-645B1A14A494',
						'message' => 'Database conflict.'
					], 409);
				}
			} catch(\Exception $e) {
			   DB::rollback();
			   throw $e;
			}
			DB::commit();

			return response()->json([
				'domain' => $domain
			], 201);
		} else {
			return response()->json([
				'id' => 'AB5941F3-7F2F-43C3-8486-652F81CED28A',
				'message' => 'Missing parameters.'
			], 400);
		}
	}

	public function put(Request $request, $id) {
		Toolkit::sleep();

	}
}