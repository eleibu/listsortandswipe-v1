<?php

namespace App\Classes;
use PragmaRX\Countries\Package\Countries;

class Toolkit {
	public static function sleep() {
		sleep (1);
	}

	public static function emailAddresses() {
		$emailAddresses = array(
			'admin' => 'admin@lithiumlist.com',
			'errorLog' => 'admin@lithiumlist.com'
		);
		return $emailAddresses;
	}

	public static function getDomainCountBase($licenceType) {
		switch($licenceType) {
			case 1:
				// basic
				return 1;
			break;
			case 2:
				// professional
				return 5;
			break;
			case 3:
				// enterprise
				return 35;
			break;
			default:
				// free trial
				return 1;
		}
	}

	public static function getAllCountries() {
        $tempCountries = new Countries();
		$allCountries = $tempCountries->all();
		$countries = array();
		foreach ($allCountries as $tempCountry) {
			if ((strlen($tempCountry['iso_a3']) > 0) && ($tempCountry['iso_a3'] != '-99') && ($tempCountry['iso_a3'] != 'EUR')) {
				$country = array(
					'name' => $tempCountry['name']['common'],
					'iso' => $tempCountry['iso_a3']
				);
				array_push($countries, $country);
			}
		}
		usort($countries, array(__CLASS__, 'compCountries'));
		return $countries;
	}

	public static function compCountries($a, $b) {
	    return strcmp($a['name'], $b['name']);
	}

	public static function getCountryName($iso) {
		$countryName = null;
        $tempCountries = new Countries();
		$allCountries = $tempCountries->all();
		foreach ($allCountries as $tempCountry) {
			if ((strlen($tempCountry['iso_a3']) > 0) && ($tempCountry['iso_a3'] != '-99') && ($tempCountry['iso_a3'] != 'EUR') && ($tempCountry['iso_a3'] == $iso)) {
				$countryName = $tempCountry['name']['common'];
				break;
			}
		}
		return $countryName;
	}

	public static function getFullReceiptNumber($num) {
		$numAsString = strval($num);
		$addChars = 8 - strlen($numAsString);

		$refnumber = '';
		for ($i = 0; $i < $addChars; $i++) {
			$refnumber = $refnumber . '0';
		}
		return $refnumber . $numAsString;
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

	public static function discountErrorMessages() {
		$discountErrorMessages = array(
			'msgDiscountDefault' => '',
			'msgDiscountInvalid' => 'Sorry, that discount code is not valid.'
		);
		return $discountErrorMessages;
	}

	public static function productIDs() {
		$productIDs = array(
			'accountTypeFree' => 'BBCE2AC1-35DA-4D86-8B20-1411A5C553E2',
			'accountTypeBasic' => '8126D38E-F031-4956-B6C6-DD040E1D2776',
			'accountTypeProfessional' => '27349E50-2E5D-4290-A6C1-17587BEA5E35',
			'accountTypeEnterprise' => 'E2866B2E-BB05-41B7-B001-C3AEEC6E51FB',
			'additionalDomainBasic' => '2E68FB1C-C6A6-4947-961F-9EB94ECC0406',
			'additionalDomainProfessional' => 'DD264AB7-6E4E-4F33-8BC8-E73138D6F520',
			'additionalDomainEnterprise' => '1F9E09C7-2F10-400D-A595-4482D72F4F80'
		);
		return $productIDs;
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