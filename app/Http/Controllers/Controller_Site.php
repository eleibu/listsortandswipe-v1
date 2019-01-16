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
			'why-lithium-list' => array(
				'selected' => false,
				'url' => url('/docs/why-lithium-list'),
				'pageTitle' => 'Lithium List - docs - why Lithium List?',
				'detailsTitle' => 'Why Lithium List?',
				'detailsView' => 'docs-whylithiumlist'
			),
			'installation' => array(
				'selected' => false,
				'url' => url('/docs/installation'),
				'pageTitle' => 'Lithium List - docs - installation',
				'detailsTitle' => 'Installation',
				'detailsView' => 'docs-installation'
			),
			'set-up' => array(
				'selected' => false,
				'url' => url('/docs/set-up'),
				'pageTitle' => 'Lithium List - docs - set up',
				'detailsTitle' => 'Set up',
				'detailsView' => 'docs-setup'
			),
			'overview-of-functionality' => array(
				'selected' => false,
				'url' => url('/docs/overview-of-functionality'),
				'pageTitle' => 'Lithium List - docs - overview of functionality',
				'detailsTitle' => 'Overview of functionality',
				'detailsView' => 'docs-overview'
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
			$subpage = 'why-lithium-list';
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
			return view('docs')
				->with('selectedpage', $selectedpage)
				->with('nextpage', $nextpage)
				->with('subpages', $subpages);
		} else {
			abort(403);
		}
	}
}