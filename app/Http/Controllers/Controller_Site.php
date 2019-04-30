<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Classes\Toolkit;
use App\Domain;
use App\Product;

class Controller_Site extends Controller
{
    function __construct() {
		$this->gateway = new \Braintree_Gateway([
		    'environment' => env('BRAINTREE_ENV'),
		    'merchantId' => env('BRAINTREE_MERCHANT_ID'),
		    'publicKey' => env('BRAINTREE_PUBLIC_KEY'),
		    'privateKey' => env('BRAINTREE_PRIVATE_KEY')
		]);
    	$authErrorMessages = Toolkit::authErrorMessages();
    	$discountErrorMessages = Toolkit::discountErrorMessages();
		$this->msgPasswordDefault = $authErrorMessages['msgPasswordDefault'];
		$this->msgPasswordNoBlank = $authErrorMessages['msgPasswordNoBlank'];
		$this->msgPasswordInvalid = $authErrorMessages['msgPasswordInvalid'];
		$this->msgDiscountDefault = $discountErrorMessages['msgDiscountDefault'];
		$this->msgDiscountInvalid = $discountErrorMessages['msgDiscountInvalid'];
    }

	public function page_home(Request $request) {
		$pageInfo = Toolkit::pageInfo();
		return view('home')
            ->with('loginName', $pageInfo['login']['name'])
            ->with('loginPath', $pageInfo['login']['path'])
            ->with('consoleName', $pageInfo['console']['name'])
            ->with('consolePath', $pageInfo['console']['path']);
	}

	public function page_why_lithium_list(Request $request) {
		$pageInfo = Toolkit::pageInfo();
		return view('why-lithium-list')
            ->with('loginName', $pageInfo['login']['name'])
            ->with('loginPath', $pageInfo['login']['path'])
            ->with('consoleName', $pageInfo['console']['name'])
            ->with('consolePath', $pageInfo['console']['path']);
	}

	public function page_pricing(Request $request) {
		$productIDs = Toolkit::productIDs();
		$pageInfo = Toolkit::pageInfo();
		return view('pricing')
			->with('productIDs', $productIDs)
            ->with('loginName', $pageInfo['login']['name'])
            ->with('loginPath', $pageInfo['login']['path'])
            ->with('consoleName', $pageInfo['console']['name'])
            ->with('consolePath', $pageInfo['console']['path']);
	}

	public function page_terms(Request $request) {
		$pageInfo = Toolkit::pageInfo();
		return view('terms')
            ->with('loginName', $pageInfo['login']['name'])
            ->with('loginPath', $pageInfo['login']['path'])
            ->with('consoleName', $pageInfo['console']['name'])
            ->with('consolePath', $pageInfo['console']['path']);
	}

	public function page_privacy(Request $request) {
		$pageInfo = Toolkit::pageInfo();
		return view('privacy')
            ->with('loginName', $pageInfo['login']['name'])
            ->with('loginPath', $pageInfo['login']['path'])
            ->with('consoleName', $pageInfo['console']['name'])
            ->with('consolePath', $pageInfo['console']['path']);
	}

	public function page_about(Request $request) {
		$pageInfo = Toolkit::pageInfo();
		return view('about')
            ->with('loginName', $pageInfo['login']['name'])
            ->with('loginPath', $pageInfo['login']['path'])
            ->with('consoleName', $pageInfo['console']['name'])
            ->with('consolePath', $pageInfo['console']['path']);
	}

	public function page_browser_support(Request $request) {
		$pageInfo = Toolkit::pageInfo();
		return view('browser-support')
            ->with('loginName', $pageInfo['login']['name'])
            ->with('loginPath', $pageInfo['login']['path'])
            ->with('consoleName', $pageInfo['console']['name'])
            ->with('consolePath', $pageInfo['console']['path']);
	}

	public function page_upcoming_features(Request $request) {
		$pageInfo = Toolkit::pageInfo();
		return view('upcoming-features')
            ->with('loginName', $pageInfo['login']['name'])
            ->with('loginPath', $pageInfo['login']['path'])
            ->with('consoleName', $pageInfo['console']['name'])
            ->with('consolePath', $pageInfo['console']['path']);
	}

	public function section_examples(Request $request, $subpage = '') {
		$pageInfo = Toolkit::pageInfo();
		$subpages = array(
			'super-simple' => array(
				'selected' => false,
				'url' => url('/examples/super-simple'),
				'pageTitle' => 'Lithium List - examples - super simple',
				'detailsTitle' => 'Super simple',
				'detailsView' => 'examples-super-simple'
			),
			'full-page-scrolling' => array(
				'selected' => false,
				'url' => url('/examples/full-page-scrolling'),
				'pageTitle' => 'Lithium List - examples - full page scrolling',
				'detailsTitle' => 'Full page scrolling',
				'detailsView' => 'examples-full-page-scrolling'
			),
			'on-sort-end' => array(
				'selected' => false,
				'url' => url('/examples/on-sort-end'),
				'pageTitle' => 'Lithium List - examples - on sort end',
				'detailsTitle' => 'onSortEnd',
				'detailsView' => 'examples-on-sort-end'
			),
			'buttons' => array(
				'selected' => false,
				'url' => url('/examples/buttons'),
				'pageTitle' => 'Lithium List - examples - buttons',
				'detailsTitle' => 'Buttons',
				'detailsView' => 'examples-buttons'
			),
			'background-labels' => array(
				'selected' => false,
				'url' => url('/examples/background-labels'),
				'pageTitle' => 'Lithium List - examples - background labels',
				'detailsTitle' => 'Background labels',
				'detailsView' => 'examples-background-labels'
			),
			'no-masks' => array(
				'selected' => false,
				'url' => url('/examples/no-masks'),
				'pageTitle' => 'Lithium List - examples - no masks',
				'detailsTitle' => 'No masks',
				'detailsView' => 'examples-no-masks'
			),
			'delete-item' => array(
				'selected' => false,
				'url' => url('/examples/delete-item'),
				'pageTitle' => 'Lithium List - examples - delete item',
				'detailsTitle' => 'Delete item',
				'detailsView' => 'examples-delete-item'
			),
			'detach-from-list' => array(
				'selected' => false,
				'url' => url('/examples/detach-from-list'),
				'pageTitle' => 'Lithium List - examples - detach from list',
				'detailsTitle' => 'Detach from list',
				'detailsView' => 'examples-detach-from-list'
			),
			'set-list-properties' => array(
				'selected' => false,
				'url' => url('/examples/set-list-properties'),
				'pageTitle' => 'Lithium List - examples - set list properties',
				'detailsTitle' => 'Set list properties',
				'detailsView' => 'examples-set-list-properties'
			),
			'trigger-leftandright' => array(
				'selected' => false,
				'url' => url('/examples/trigger-leftandright'),
				'pageTitle' => 'Lithium List - examples - trigger left and right',
				'detailsTitle' => 'Trigger left and right',
				'detailsView' => 'examples-trigger-leftandright'
			),
			'react' => array(
				'selected' => false,
				'url' => url('/examples/react'),
				'pageTitle' => 'Lithium List - examples - react',
				'detailsTitle' => 'React',
				'detailsView' => 'examples-react'
			),
		);
		if ($subpage == '') {
			$subpage = 'super-simple';
		}
		$nextpage = null;
		$setNext = false;
		foreach($subpages as $key => $value) {
			if ($key == $subpage) {
				$value['selected'] = true;
				$selectedpage = $value;
				$setNext = true;
			} elseif ($setNext) {
				$nextpage = $value;
				$setNext = false;
			}
		}
		if (isset($selectedpage)) {
			return view('examples')
				->with('selectedpage', $selectedpage)
				->with('nextpage', $nextpage)
				->with('subpages', $subpages)
	            ->with('loginName', $pageInfo['login']['name'])
	            ->with('loginPath', $pageInfo['login']['path'])
	            ->with('consoleName', $pageInfo['console']['name'])
	            ->with('consolePath', $pageInfo['console']['path']);
		} else {
			abort(403);
		}
	}

	public function section_documentation(Request $request, $subpage = '') {
		
		$subpages = array(
			'installation' => array(
				'selected' => false,
				'url' => url('/documentation/installation'),
				'pageTitle' => 'Lithium List - documentation - installation',
				'detailsTitle' => 'Installation',
				'detailsView' => 'documentation-installation'
			),
			'set-up' => array(
				'selected' => false,
				'url' => url('/documentation/set-up'),
				'pageTitle' => 'Lithium List - documentation - set up',
				'detailsTitle' => 'Set up',
				'detailsView' => 'documentation-setup'
			),
			'options' => array(
				'selected' => false,
				'url' => url('/documentation/options'),
				'pageTitle' => 'Lithium List - documentation - options',
				'detailsTitle' => 'Options',
				'detailsView' => 'documentation-options'
			),
			'events' => array(
				'selected' => false,
				'url' => url('/documentation/events'),
				'pageTitle' => 'Lithium List - documentation - events',
				'detailsTitle' => 'Events',
				'detailsView' => 'documentation-events'
			),
			'methods' => array(
				'selected' => false,
				'url' => url('/documentation/methods'),
				'pageTitle' => 'Lithium List - documentation - methods',
				'detailsTitle' => 'Methods',
				'detailsView' => 'documentation-methods'
			),
			'objects' => array(
				'selected' => false,
				'url' => url('/documentation/objects'),
				'pageTitle' => 'Lithium List - documentation - objects',
				'detailsTitle' => 'Objects',
				'detailsView' => 'documentation-objects'
			),
			'changelog' => array(
				'selected' => false,
				'url' => url('/documentation/changelog'),
				'pageTitle' => 'Lithium List - documentation - changelog',
				'detailsTitle' => 'Changelog',
				'detailsView' => 'documentation-changelog'
			)
		);
		if ($subpage == '') {
			$subpage = 'installation';
		}
		$nextpage = null;
		$setNext = false;
		foreach($subpages as $key => $value) {
			if ($key == $subpage) {
				$value['selected'] = true;
				$selectedpage = $value;
				$setNext = true;
			} elseif ($setNext) {
				$nextpage = $value;
				$setNext = false;
			}
		}
		if (isset($selectedpage)) {
			$pageInfo = Toolkit::pageInfo();
			$productIDs = Toolkit::productIDs();

			return view('documentation')
				->with('selectedpage', $selectedpage)
				->with('nextpage', $nextpage)
				->with('subpages', $subpages)
	            ->with('loginName', $pageInfo['login']['name'])
	            ->with('loginPath', $pageInfo['login']['path'])
	            ->with('consoleName', $pageInfo['console']['name'])
	            ->with('consolePath', $pageInfo['console']['path'])
	            ->with('createFreeTrialUrl', url($pageInfo['signup']['path'] . '?pid=' . $productIDs['accountTypeFree']));
		} else {
			abort(403);
		}
	}

	public function page_console(Request $request) {
		$pageInfo = Toolkit::pageInfo();

		$user = Auth::user();
		$domainIds = json_decode($user->domain_ids);

		$hasDomains = 1;
		if (isset($domainIds) && (count($domainIds) > 0)) {
			$hasDomains = 1;
		}

		$productIDs = Toolkit::productIDs();
		$dbProductBasic = Product::where('id', $productIDs['accountTypeBasic'])
			->first();
		$dbProductProfessional = Product::where('id', $productIDs['accountTypeProfessional'])
			->first();
		$dbProductEnterprise = Product::where('id', $productIDs['accountTypeEnterprise'])
			->first();
		$licenceDetails = array(
			1 => array(
				'name' => $this->getProductName($dbProductBasic->description),
				'priceCents' => $dbProductBasic->price_cents,
				'maxDomains' => Toolkit::getDomainCountBase(1)
			),
			2 => array(
				'name' => $this->getProductName($dbProductProfessional->description),
				'priceCents' => $dbProductProfessional->price_cents,
				'maxDomains' => Toolkit::getDomainCountBase(2)
			),
			3 => array(
				'name' => $this->getProductName($dbProductEnterprise->description),
				'priceCents' => $dbProductEnterprise->price_cents,
				'maxDomains' => Toolkit::getDomainCountBase(3)
			)
		);

		return view('console')
			->with('clientToken', $this->gateway->clientToken()->generate())
            ->with('signoutName', $pageInfo['signout']['name'])
            ->with('signoutPath', $pageInfo['signout']['path'])
			->with('licenceDetails', json_encode($licenceDetails))
            ->with('msgPasswordDefault', $this->msgPasswordDefault)
            ->with('msgPasswordNoBlank', $this->msgPasswordNoBlank)
            ->with('msgPasswordInvalid', $this->msgPasswordInvalid)
            ->with('msgDiscountDefault', $this->msgDiscountDefault)
            ->with('msgDiscountInvalid', $this->msgDiscountInvalid);
	}

	protected function getProductName($description) {
		return 'Lithium List - ' . $description;
	}
}