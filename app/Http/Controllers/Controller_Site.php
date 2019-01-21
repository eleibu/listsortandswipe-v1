<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Controller_Site extends Controller
{	
	public function page_home(Request $request) {
		return view('home');
	}

	public function section_examples(Request $request, $subpage = '') {
		$subpages = array(
			'simple-fixedheight' => array(
				'selected' => false,
				'url' => url('/examples/simple-fixedheight'),
				'pageTitle' => 'Lithium List - examples - simple - fixed height',
				'detailsTitle' => 'Simple - fixed height',
				'detailsView' => 'examples-simple-fixedheight'
			),
			'simple-wholepage' => array(
				'selected' => false,
				'url' => url('/examples/simple-wholepage'),
				'pageTitle' => 'Lithium List - examples - simple - whole page',
				'detailsTitle' => 'Simple - whole page',
				'detailsView' => 'examples-simple-wholepage'
			),
			'sort-only' => array(
				'selected' => false,
				'url' => url('/examples/sort-only'),
				'pageTitle' => 'Lithium List - examples - sort only',
				'detailsTitle' => 'Sort only',
				'detailsView' => 'examples-sort-only'
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
			'delete-item-withmasks' => array(
				'selected' => false,
				'url' => url('/examples/delete-item-withmasks'),
				'pageTitle' => 'Lithium List - examples - delete item - with masks',
				'detailsTitle' => 'Delete item - with masks',
				'detailsView' => 'examples-delete-item-withmasks'
			),
			'delete-item-nomasks' => array(
				'selected' => false,
				'url' => url('/examples/delete-item-nomasks'),
				'pageTitle' => 'Lithium List - examples - delete item - no masks',
				'detailsTitle' => 'Delete item - no masks',
				'detailsView' => 'examples-delete-item-nomasks'
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
			$subpage = 'simple-fixedheight';
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
				->with('subpages', $subpages);
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
			'concepts' => array(
				'selected' => false,
				'url' => url('/documentation/concepts'),
				'pageTitle' => 'Lithium List - documentation - concepts',
				'detailsTitle' => 'Concepts',
				'detailsView' => 'documentation-concepts'
			),
			'options-events-methods-and-objects' => array(
				'selected' => false,
				'url' => url('/documentation/options-events-methods-and-objects'),
				'pageTitle' => 'Lithium List - documentation - options, events, methods and objects',
				'detailsTitle' => 'Options, events, methods and objects',
				'detailsView' => 'documentation-oemo'
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
			return view('documentation')
				->with('selectedpage', $selectedpage)
				->with('nextpage', $nextpage)
				->with('subpages', $subpages);
		} else {
			abort(403);
		}
	}

	public function page_why_lithium_list(Request $request) {
		return view('why-lithium-list');
	}

	public function page_pricing(Request $request) {
		return view('pricing');
	}

	public function page_support(Request $request) {
		return view('support');
	}
}