<?php
/**
 * Get JWT (JSON Web Token) from jwt-handle.php of pfcomponent
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
/*
include $_SERVER["PFCOMPONENT_PATH"] . "/php/pfjwt/jwt_handle.php";
if (isset($_COOKIE['pf_auth_token'])) {
	$jwt = trim($_COOKIE['pf_auth_token']);
} else {
	$jwt = "";
}
$jwtToken = checkPfJwt($jwt);
*/

$comment1 = "";
$comment2 = "";

require "php-output-template-xml.php";

echo $pfxmdl;

?>
