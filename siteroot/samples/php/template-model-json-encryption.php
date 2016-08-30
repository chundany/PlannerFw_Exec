<?php
/**
 * Sample of encrypting model member
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 *
 */

require $_SERVER["PFCOMPONENT_PATH"] . '/php/protect/pfsecure.php';

require "php-output-data-raw.php";

// password example
$pfDataKey = "Password 1234567890 abcdefghijklmnopqrstuvwxyz";

$pfSet1 = pfEncryption($pfSet1, $pfDataKey);
$pfSet2 = pfEncryption($pfSet2, $pfDataKey);
$pfSet3 = pfEncryption($pfSet3, $pfDataKey);

/*
* URL encode encryption key then Save it to Cookie pfDataKey, set Cookie expiry time with 2 seconds and Coolie path with "/"
* Sample password is Test Password 1234567890 abcdefghijklmnopqrstuvwxyz
* 
*/
$expire = time() + 2;
setrawcookie("pfDataKey", rawurlencode($pfDataKey), $expire, "/");

/**
 * Output model as a string
 * Add double quote to $pfDataSet Because it is an encrypted string
 */
echo <<<DOC
{	
	"description": "Example of encrypted model with password",
	"version": "0.0.1",
	"category": "JSON data model",
	"author": "W3plan Technologies",
	"company": "W3plan Technologies",
	"copyright": "Copyright 2015-2016 W3plan Technologies, http://w3plan.net",
	"licenses": "GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>",
	"expiration": 0,
	"pfDataSet": {
			"pfSet1__pfenc": "$pfSet1",
			"pfSet2__pfenc": "$pfSet2",
			"pfSet3__pfenc": "$pfSet3"
	}
}
DOC;

?>
