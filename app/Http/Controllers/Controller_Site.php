<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Controller_Site extends Controller
{
	public function page_home(Request $request) {
		return view('home');
	}

	public function section_docs(Request $request, $subsection = "") {
		if (isset($subsection) && (strlen($subsection) > 0)) {
			switch ($subsection) {
			    case 'installation':
					return view('docs-installation');
			        break;
			    default:
			    	abort(403);
			}
		} else {
			return view('docs-installation');
			// return redirect($pageInfo['login']['path']);
		}
	}
}