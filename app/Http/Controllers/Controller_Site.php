<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Controller_Site extends Controller
{
	public function page_home(Request $request) {
		return view('home');
	}

	public function section_docs(Request $request, $subpage = '') {
		$subpages = array(
			'overview-and-features' => array(
				'selected' => false,
				'url' => url('/docs/overview-and-features'),
				'pageTitle' => 'Lithium List - docs - overview and features',
				'detailsTitle' => 'Overview and features',
				'detailsView' => 'docs-overview'
			),
			'installation' => array(
				'selected' => false,
				'url' => url('/docs/installation'),
				'pageTitle' => 'Lithium List - docs - installation',
				'detailsTitle' => 'Installation',
				'detailsView' => 'docs-installation'
			),
			'set-up-and-attachment' => array(
				'selected' => false,
				'url' => url('/docs/set-up-and-attachment'),
				'pageTitle' => 'Lithium List - docs - set up and attachment',
				'detailsTitle' => 'Set up and attachment',
				'detailsView' => 'docs-setup'
			),
			'options-events-and-methods' => array(
				'selected' => false,
				'url' => url('/docs/options-events-and-methods'),
				'pageTitle' => 'Lithium List - docs - options, events and methods',
				'detailsTitle' => 'Options, events and methods',
				'detailsView' => 'docs-options'
			),
			'changelog' => array(
				'selected' => false,
				'url' => url('/docs/changelog'),
				'pageTitle' => 'Lithium List - docs - changelog',
				'detailsTitle' => 'Changelog',
				'detailsView' => 'docs-changelog'
			)
		);
		if ($subpage == '') {
			$subpage = 'installation';
		}
		foreach($subpages as $key => $value) {
			if ($key == $subpage) {
				$value['selected'] = true;
				$selectedpage = $value;
			}
		}
		if (isset($selectedpage)) {
			return view('docs')
				->with('selectedpage', $selectedpage)
				->with('subpages', $subpages);
		} else {
			abort(403);
		}
	}
}