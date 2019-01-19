<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Controller_Site extends Controller
{	
	public function page_home(Request $request) {
		return view('home');
	}

	public function section_demos(Request $request, $subpage = '') {
		$subpages = array(
			'simple-fixedheight' => array(
				'selected' => false,
				'url' => url('/demos/simple-fixedheight'),
				'pageTitle' => 'Lithium List - demos - simple - fixed height',
				'detailsTitle' => 'Simple - fixed height',
				'detailsView' => 'demos-simple-fixedheight'
			),
			'simple-wholepage' => array(
				'selected' => false,
				'url' => url('/demos/simple-wholepage'),
				'pageTitle' => 'Lithium List - demos - simple - whole page',
				'detailsTitle' => 'Simple - whole page',
				'detailsView' => 'demos-simple-wholepage'
			),
			'sort-only' => array(
				'selected' => false,
				'url' => url('/demos/sort-only'),
				'pageTitle' => 'Lithium List - demos - sort only',
				'detailsTitle' => 'Sort only',
				'detailsView' => 'demos-sort-only'
			),
			'background-labels' => array(
				'selected' => false,
				'url' => url('/demos/background-labels'),
				'pageTitle' => 'Lithium List - demos - background labels',
				'detailsTitle' => 'Background labels',
				'detailsView' => 'demos-background-labels'
			),
			'no-masks' => array(
				'selected' => false,
				'url' => url('/demos/no-masks'),
				'pageTitle' => 'Lithium List - demos - no masks',
				'detailsTitle' => 'No masks',
				'detailsView' => 'demos-no-masks'
			),
			'delete-item-withmasks' => array(
				'selected' => false,
				'url' => url('/demos/delete-item-withmasks'),
				'pageTitle' => 'Lithium List - demos - delete item - with masks',
				'detailsTitle' => 'Delete item - with masks',
				'detailsView' => 'demos-delete-item-withmasks'
			),
			'delete-item-nomasks' => array(
				'selected' => false,
				'url' => url('/demos/delete-item-nomasks'),
				'pageTitle' => 'Lithium List - demos - delete item - no masks',
				'detailsTitle' => 'Delete item - no masks',
				'detailsView' => 'demos-delete-item-nomasks'
			),
			'detach-from-list' => array(
				'selected' => false,
				'url' => url('/demos/detach-from-list'),
				'pageTitle' => 'Lithium List - demos - detach from list',
				'detailsTitle' => 'Detach from list',
				'detailsView' => 'demos-detach-from-list'
			),
			'set-list-properties' => array(
				'selected' => false,
				'url' => url('/demos/set-list-properties'),
				'pageTitle' => 'Lithium List - demos - set list properties',
				'detailsTitle' => 'Set list properties',
				'detailsView' => 'demos-set-list-properties'
			),
			'trigger-leftandright' => array(
				'selected' => false,
				'url' => url('/demos/trigger-leftandright'),
				'pageTitle' => 'Lithium List - demos - trigger left and right',
				'detailsTitle' => 'Trigger left and right',
				'detailsView' => 'demos-trigger-leftandright'
			),
			'react' => array(
				'selected' => false,
				'url' => url('/demos/react'),
				'pageTitle' => 'Lithium List - demos - react',
				'detailsTitle' => 'React',
				'detailsView' => 'demos-react'
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
			return view('demos')
				->with('selectedpage', $selectedpage)
				->with('nextpage', $nextpage)
				->with('subpages', $subpages);
		} else {
			abort(403);
		}
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
			'options-events-methods-and-objects' => array(
				'selected' => false,
				'url' => url('/docs/options-events-methods-and-objects'),
				'pageTitle' => 'Lithium List - docs - options, events, methods and objects',
				'detailsTitle' => 'Options, events, methods and objects',
				'detailsView' => 'docs-oemo'
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