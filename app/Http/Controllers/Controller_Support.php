<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Classes\Toolkit;

class Controller_Support extends Controller
{
    function __construct() {
		$this->msgSubjectDefault = '';
		$this->msgSubjectNoBlank = 'Subject can&#39;t be blank.';
		$this->msgMessageDefault = '';
		$this->msgMessageNoBlank = 'Message can&#39;t be blank.';
		$this->msgSubmitDefault = '';
		$this->msgSubmitErrors = 'Please review the above errors and correct any missing or invalid information.';
    }

	public function page(Request $request) {
		$pageInfo = Toolkit::pageInfo();
		return view('support')
			->with('view', 'support')
            ->with('loginName', $pageInfo['login']['name'])
            ->with('loginPath', $pageInfo['login']['path'])
            ->with('consoleName', $pageInfo['console']['name'])
            ->with('consolePath', $pageInfo['console']['path'])
            ->with('msgSubjectDefault', $this->msgSubjectDefault)
            ->with('msgSubjectNoBlank', $this->msgSubjectNoBlank)
            ->with('msgMessageDefault', $this->msgMessageDefault)
            ->with('msgMessageNoBlank', $this->msgMessageNoBlank)
            ->with('msgSubmitDefault', $this->msgSubmitDefault)
            ->with('msgSubmitErrors', $this->msgSubmitErrors);
	}

	public function post(Request $request) {

	}
}
