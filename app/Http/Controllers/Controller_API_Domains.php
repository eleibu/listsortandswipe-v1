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
			if (Toolkit::hasDomainForm($request->input('domain'))) {
				$user = Auth::guard('api')->user();
				$domainId = $request->input('id');

				$domainIds = json_decode($user->domain_ids);
				if (!isset($domainIds)) {
					$domainIds = array();
				}

				array_unshift($domainIds, $domainId);

				$domain = new Domain;
				$domain->id = $domainId;
				$domain->user_id = $user->id;
				$domain->domain = Toolkit::stripUrl($request->input('domain'));
				$domain->licence_key = str_random(30);

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
					'id' => '551EC8EC-59E0-451B-ADC5-491BB827EAC5',
					'message' => 'Domain is not in the correct form.'
				], 400);
			}
		} else {
			return response()->json([
				'id' => 'AB5941F3-7F2F-43C3-8486-652F81CED28A',
				'message' => 'Missing parameters.'
			], 400);
		}
	}

	public function put(Request $request, $id) {
		Toolkit::sleep();

		if ($request->filled('action')) {
			switch ($request->input('action')) {
			    case 'update':
			    	return $this->updateDomain($request, $id);
			        break;
			    case 'sort':
			    	return $this->sortDomain($request, $id);
			        break;
			    case 'delete':
			    	return $this->deleteDomain($request, $id);
			        break;
			    case 'undelete':
			    	return $this->undeleteDomain($request, $id);
			        break;
			    default:
					return response()->json([
						'id' => '3868D890-4050-4C52-BA42-3DE717A0CDFD',
						'message' => 'Invalid action.'
					], 400);
			}
		} else {
			return response()->json([
				'id' => '0D916ABC-24B5-45A4-8FC7-92CE01A5255C',
				'message' => 'Missing parameters.'
			], 400);
		}
	}

	protected function sortDomain($request, $id) {
		if ($request->filled('new-index')) {
			$user = Auth::guard('api')->user();
			$domainIds = json_decode($user->domain_ids);

			if (isset($domainIds) && (count($domainIds) > 1)) {
				$oldIndex = null;
				for ($i = 0; $i < count($domainIds); $i++) {
					if ($domainIds[$i] == $id) {
						$oldIndex = $i;
						break;
					}
				}
				if (isset($oldIndex)) {
					$newIndex = $request->input('new-index');

					if ($newIndex > (count($domainIds) - 1)) {
						array_push($domainIds, $id);
					} else {
						$domainIds = Toolkit::moveElement($domainIds, $oldIndex, $newIndex);
					}

					$affected = DB::table('users')
						->where('id', $user->id)
						->where('updated_at', '=', $user->updated_at)
						->update([
							'updated_at' => Carbon::now('UTC'),
							'domain_ids' => json_encode($domainIds)
						]);
					if ($affected == 1) {
						return response()->json([
							'domainIds' => $domainIds
						], 200);
					} else {
						DB::rollback();
						return response()->json([
							'id' => '9E4B2533-CC49-4234-9916-667A4561FD93',
							'message' => 'Database conflict.'
						], 409);
					}
				} else {
					return response()->json([
						'id' => '46BC692F-02D1-4E52-9A02-DA7DE69937A8',
						'message' => 'Domain not found.'
					], 409);
				}
			} else {
				return response()->json([
					'id' => '5B0294D8-B4B4-46EB-8DC2-3F3B190B4CA5',
					'message' => 'Too few domains to reorder.'
				], 409);
			}
		} else {
			return response()->json([
				'id' => '26155E93-BAC2-485A-8E49-F19CA62CC6FD',
				'message' => 'Missing parameters.'
			], 400);
		}
	}

	protected function deleteDomain(Request $request, $id) {
		$user = Auth::guard('api')->user();
		$domainIds = json_decode($user->domain_ids);

		if (isset($domainIds) && (count($domainIds) > 0)) {
			$domain = Domain::where('id', $id)
						->first();

			if (isset($domain)) {
				$newDomainIds = array();
				for ($i = 0; $i < count($domainIds); $i++) {
					if ($domainIds[$i] != $id) {
						array_push($newDomainIds, $domainIds[$i]);
					}
				}			

				DB::beginTransaction();
				try {
					$affected = DB::table('users')
						->where('id', $user->id)
						->where('updated_at', '=', $user->updated_at)
						->update([
							'updated_at' => Carbon::now('UTC'),
							'domain_ids' => json_encode($newDomainIds)
						]);
					if ($affected == 1) {
						$domain->delete();
					} else {
						DB::rollback();
						return response()->json([
							'id' => '2D918067-745E-445B-819C-9194D2531885',
							'message' => 'Database conflict.'
						], 409);
					}
				} catch(\Exception $e) {
				   DB::rollback();
				   throw $e;
				}
				DB::commit();

				return response()->json([
					'domainIds' => $newDomainIds
				], 200);
			} else {
				return response()->json([
					'id' => '7732905A-551D-4F83-A92E-205640AE5FEE',
					'message' => 'Domain not found.'
				], 409);
			}
		} else {
			return response()->json([
				'domainIds' => $domainIds
			], 200);
		}
	}

	protected function undeleteDomain(Request $request, $id) {
		if ($request->filled('index')) {
			$domain = Domain::where('id', $id)
						->withTrashed()
						->first();

			if (isset($domain)) {
				$user = Auth::guard('api')->user();
				$domainIds = json_decode($user->domain_ids);
				if (!isset($domainIds)) {
					$domainIds = array();
				}

				if (!in_array($id, $domainIds)) {
					array_splice($domainIds, $request->input('index'), 0, $id);

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
							$domain->restore();
						} else {
							DB::rollback();
							return response()->json([
								'id' => 'C0063608-9CF0-417D-9036-C9AF68AA2034',
								'message' => 'Database conflict.'
							], 409);
						}
					} catch(\Exception $e) {
					   DB::rollback();
					   throw $e;
					}
					DB::commit();

					return response()->json([
						'domainIds' => $domainIds
					], 200);
				} else {
					return response()->json([
						'domainIds' => $domainIds
					], 200);
				}
			} else {
				return response()->json([
					'id' => '810F9E2C-08F7-4C64-95FC-B54708038098',
					'message' => 'Domain not found.'
				], 404);
			}
		} else {
			return response()->json([
				'id' => '9498E297-E169-4999-BE3F-0686214D3A8A',
				'message' => 'Missing parameters.'
			], 400);
		}
	}

	protected function updateDomain($request, $id) {
		$domain = Domain::where('id', $id)
					->first();

		if (($request->filled('domain')) && (Toolkit::hasDomainForm($request->input('domain')))) {
			$domain->domain = Toolkit::stripUrl($request->input('domain'));
		} else {
			return response()->json([
				'id' => '4A0513CF-A144-4F0E-B763-572F80C5AE04',
				'message' => 'Domain is not in the correct form.'
			], 400);
		}

		$domain->save();

		return response()->json([
			'domain' => $domain
		], 200);
	}
}