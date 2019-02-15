<?php

namespace App\Classes;
// use App\Context;
// use App\Task;
// use App\Project;
// use DB;
// use \Carbon\Carbon;

class Toolkit {
	public static function sleep(){
		sleep (1);
	}

	public static function pageInfo() {
		$pageInfo = array(
			'home' => array(
				'name' => 'home',
				'path' => '/home'
			),
			'login' => array(
				'name' => 'log in',
				'path' => 'login'
			),
			'reset' => array(
				'name' => 'reset',
				'path' => 'reset'
			),
			'signup' => array(
				'name' => 'sign up',
				'path' => 'signup'
			),
			'signout' => array(
				'name' => 'sign out',
				'path' => 'signout'
			),
			'activate' => array(
				'name' => 'activate',
				'path' => 'activate'
			),
			'console' => array(
				'name' => 'console',
				'path' => 'console'
			)
		);
		return $pageInfo;
	}

	public static function getGUID(){
	    if (function_exists('com_create_guid')){
	    	return trim(com_create_guid(), '{}');
	    }else{
	        mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
	        $charid = strtoupper(md5(uniqid(rand(), true)));
	        $hyphen = chr(45);// "-"
	        $uuid = substr($charid, 0, 8).$hyphen
	            .substr($charid, 8, 4).$hyphen
	            .substr($charid,12, 4).$hyphen
	            .substr($charid,16, 4).$hyphen
	            .substr($charid,20,12);
	        return $uuid;
	    }
	}

	public static function moveElement($arr, $previousIndex, $newIndex) {
	    $removedArr = array_splice($arr, $previousIndex, 1);
	    array_splice($arr, $newIndex, 0, $removedArr);
		return $arr;
	}
}