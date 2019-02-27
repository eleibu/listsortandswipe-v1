<?php

namespace App\Classes;

class Toolkit {
	public static function sleep(){
		sleep (1);
	}

	public static function moveElement($arr, $previousIndex, $newIndex) {
	    $removedArr = array_splice($arr, $previousIndex, 1);
	    array_splice($arr, $newIndex, 0, $removedArr);
		return $arr;
	}

	public static function hasDomainForm($value) {
		// note: changes should also be reflected in the equivalent js function

		$regex = '/^\S+\.\S+$/';
		if (preg_match($regex, trim($value))) {
			return true;
		}
		return false;
	}

	public static function stripUrl($url) {
		// note: changes should also be reflected in the equivalent js function

		$url = strtolower(trim($url));

		$url = preg_replace('/^http:\/\/|https:\/\/|ftp:\/\/|ftps:\/\//', '', $url);
		$url = preg_replace('/^www\./', '', $url);

		$iColon = strpos($url, ':');
		$iSlash = false;
		if ($iColon != false) {
			$url = substr($url, 0, $iColon);
		} else {
			$iSlash = strpos($url, '/');
			if ($iSlash != false) {
				$url = substr($url, 0, $iSlash);
			}
		}

		if (($iColon == false) && ($iSlash == false)) {
			$iQuery = strpos($url, '?');
			if ($iQuery != false) {
				$url = substr($url, 0, $iQuery);
			}
		}

		if (($iColon == false) && ($iSlash == false)) {
			$iHash = strpos($url, '#');
			if ($iHash != false) {
				$url = substr($url, 0, $iHash);
			}
		}

		return $url;
	}

	public static function authErrorMessages() {
		$authErrorMessages = array(
			'msgPasswordDefault' => 'Password must have at least 6 characters. Other than that, make it as simple or complex as you like.',
			'msgPasswordNoBlank' => 'Password can&#39;t be blank.',
			'msgPasswordInvalid' => 'Password must have at least 6 characters.'
		);
		return $authErrorMessages;
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
}