<?php
/**
 * Get JWT (JSON Web Token) from jwt_handle.php of pfcomponent
 * if access model with JWT
 *
 * PlannerFw supports model access with HTTP method "GET", "POST", "PUT" and "DELETE"
 * 
 * PHP can get data sent by "PUT" method with
     $result = "";
     while ($data = fread(fopen("php://input", "r"), 1024)) $result .= $data;
 *
 * Gets data from "DELETE" method with
     $result = file_get_contents("php://input");
 *
 *
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 *
 */

// Load JWT handle file, do processes according to value of $jwtToken
// $_SERVER["PFCOMPONENT_PATH"] set by .htaccess
include $_SERVER["PFCOMPONENT_PATH"] . "/php/pfjwt/jwt_handle.php";
if (isset($_COOKIE['pf_auth_token'])) {
	$jwt = trim($_COOKIE['pf_auth_token']);
} else {
	$jwt = "";
}
$jwtInfo = checkPfJwt($jwt);

// Generates model according to value of $jwtToken

$comment1 = "";
$comment2 = "";

require "php-output-data.php";

$claimVal = $jwtInfo['jwtClaim'];

/**
 * Output model as a string
 * Do not add double quote to $pfDataSet Because it is an object
 */ 
if (array_key_exists("jwt", $jwtInfo)) {
$jwtVal = $jwtInfo['jwt'];

echo <<<DOC
{	
	"description": "PlannerFw template model",
	"version": "0.0.1",
	"category": "JSON data model",
	"author": "W3plan Technologies",
	"company": "W3plan Technologies",
	"copyright": "Copyright 2015-2016 W3plan Technologies, http://w3plan.net",
	"licenses": "GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>",
	"expiration": 0,
	"jwtClaim": $claimVal,
	"jwt": "$jwtVal",
	"pfDataSet": $pfDataSet
}
DOC;
} else {
echo <<<DOC
{	
	"description": "PlannerFw template model",
	"version": "0.0.1",
	"category": "JSON data model",
	"author": "W3plan Technologies",
	"company": "W3plan Technologies",
	"copyright": "Copyright 2015-2016 W3plan Technologies, http://w3plan.net",
	"licenses": "GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>",
	"expiration": 0,
	"jwtClaim": $claimVal,
	"pfDataSet": $pfDataSet
}
DOC;
}

// do not forget to stop execution after model outpu
exit();
?>
