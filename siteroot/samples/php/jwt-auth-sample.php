<?php

/**
 *  This file should be a traditional code mixture file to implement following purposes:   
 *    User authentication or user sign-in;
 *    JWT (JSON Web Token) generation;
 *    Output JWT to Cookie pf_auth_token;
 *  
 *  JWT (JSON Web Token) can give signed-in user permission to access model 
 *  over HTTP and WebSocket under PlannerFw's mechanisms
 *  
 *  You must modify the code to meet your development and product environments
 *  Remembers to delete cookie pf_auth_token in your user signed-out code
 *
 *  Reference of JWT on internet: 
 *    https://tools.ietf.org/html/rfc7519
 *    https://jwt.io/
 *    https://packagist.org/search/?tags=JWT
 *  
 *  Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 *
 */

// You may use session on authentication server 
session_start();

/**
 * Save JWT secret key as $_SERVER or $_ENV variable to get 
 * better performance than saving them in the file 
 *
 */

// $_SERVER["PFCOMPONENT_PATH"] set by .htaccess
$config = file_get_contents($_SERVER["PFCOMPONENT_PATH"] . "/component.json");

try {
	$config = json_decode($config, true);
} catch(Exception $e) {
	echo $e->getMessage();
	exit();
}

$referrer  = $_SERVER['HTTP_REFERER'];

// Load JWT library
require $_SERVER["PFCOMPONENT_PATH"] . "/php/vendor/jwt/JWT.php";

use \Firebase\JWT\JWT;

/**
 * Verify if user was singed in Website or web application  
 *
 * This example uses query data from request to decide whether user is signed in the website
 *
 */ 

$signed = trim(htmlspecialchars($_GET['signed'], ENT_QUOTES));

$user_was_signed_in = ($signed == 1) ? true : false;

if ($user_was_signed_in) {
	
	/*
	 * Apply JWT library to generator a permission token
	 *
	 * JWT library from https://jwt.io, you may replace it 
	 * with your JWT library  
	 * 
	 */

	$scretKey = $config['jwtSecretKey'];

	// Unix time stamp
	$timestamp = time();

	// user private data, for example, 
	$firest_name = "mary";
	$last_name = "Kay";
	$email = "mary.kay@gmail.com";
	$country_code = "US";
	$ownership = "public";

	/**
     * Registered Claim Names for JWT
	 *   iss: (mandatory) The issuer of the token
	 *   sub: The subject of the token
	 *   aud: The audience of the token
	 *   exp: Token expiration time defined in Unix time
	 *   nbf: "Not before" time that identifies the time before 
     *        which the JWT must not be accepted for processing
	 *   iat: (mandatory) "Issued at" time, in Unix time, at which the token was issued
	 *   jti: JWT ID claim provides a unique identifier for the JWT
	 *   
     * Public Claim Names for JWT used by PlannerFw
     *   permission: read, create, replace or delete. read is default value
     *   ownership: owner, group or public. public is default value
     * 
	 * Following fname, lname, email, country and ownership are examples of JWT public claims
     *     
	 * Be mind: do not put sensitive information to claims because they are not encrypted  
	 * 
	 */
    
	$token = array (
		"iss" => "http://w3plan.net",
		"sub" => "Model in JSON or XML",
		"iat" => $timestamp,
		"fname" => $firest_name,				
		"lname" => $last_name,		
		"email" => $email,
		"country" => $country_code,
		"ownership" => $ownership
	);

	/**
	 * Encoding token
	 * 
	 */
	try {
		$jwt = JWT::encode($token, $scretKey);
	} 
	catch(Exception $e) {
		echo "PlannerFw can not encode JWT";
		exit();
	}

	/*
	 * Write PWT to Cookie pf_auth_token  and go back home page
	 *
	 */
	?>
	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<title>Write JWT to Cookie pf_auth_token and go back</title>
	
	<script type="text/javascript">
		// Output JWT to Cookie pf_auth_token, which is a session Cookie
		document.cookie = "pf_auth_token=<?php echo trim($jwt) ?>; expires=; path=/";
		
		console.log("You had signed in the website and JWT are ready to use");
		
		// Go back home page
		window.location.href = "<?php echo $referrer; ?>";
	</script>
	
	</head>
	<body>
	</body>
	</html>

	<?php
	
} else {
	/*
	 * Make sure to delete Cookie pf_auth_token if user is not signed in 
	 * or already signed out the website
	 *
	 */
    setcookie('pf_auth_token', null, -1, '/');
    unset($_COOKIE['pf_auth_token']);
	
	/*
	 * Keep $referrer value in cache or other place so that 
	 * you can get entry place after singed in
	 */	
	// $referrer
	
	/*
	 * Add your code here as sign-in page
	 *
	 */	
    header("Location: $referrer");
    exit();
}
