<?php
/**
 * Read JWT from Cookie, decode JWT then return it or other processes 
 * according to JWT issued time. You have to use this file for all 
 * PlannerFw model access if you want to use JWT
 * 
 * As long as start to use JWT for model access, jwtClaim has to be 1 to model in 
 * following response otherwise PlannerFw would turn off model access from JWT
 *
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 *
 */

// Load JWT Library
require __DIR__ . "/../vendor/jwt/JWT.php";

use \Firebase\JWT\JWT;

/**
 * beginning to use JWT for model access
 *
 * Update JWT claims with user data that collects from sign-in code or server-side storage
 *
 * To apply RESTful architecture for model system, startJwt() have to run with sign-in code 
 * so that transfers user data into JWT because REST application is stateless, the server 
 * does not store client context
 * 
 */
function startJwt() {	
	// Unix time stamp
	$timestamp = time();

	// user private data, for example, 
	$firest_name = "Mary";
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
		echo getEmptyModel(2, "PlannerFw can not encode JWT");
		exit();
	}
	
	return array("jwtClaim" => 1, "jwt" => $jwt);	
}

/**
 * Decode JWT, verify JWT, return an array with jwtClaim element or jwtClaim and jwt elements
 * If there is an error happen getEmptyModel would be called to output an empty model
 * with error message to the client
 *
 * @param string $pf_type    "http" or "ws"
 * @param string $pf_jwt     The value of JWT
 * @return array      An array with jwtClaim element or jwtClaim and jwt elements
 */
function checkPfJwt($pf_jwt, $pf_type = "http") {
	if (isset($pf_jwt) && strlen(trim($pf_jwt)) > 10) {
		/**
		 * Save JWT secret key to $_SERVER or $_ENV variable would get 
		 * better performance than saving them in the file 
		 *
		 */
		$config = file_get_contents(__DIR__ . "/../../component.json");
		
		try {
			$config = json_decode($config, true);
		}
		catch(Exception $e) {
			if (strtolower($pf_type) == "ws") {
				throw $e;
			} else {
				/**
				 * Output empty model as a string with message in description
				 */
				echo getEmptyModel(2, $e->getMessage());
				exit();
			}
		}
		
		$scretKey = $config['jwtSecretKey'];
		
		/**
		 *  You have to specify algorithms to decode JWT 
		 *  this library supports: HS256, HS384, RS256, RS384 and ES256
		 *
		 */		
		try {
			$decodedJwt = JWT::decode($pf_jwt, $scretKey, array('HS256','HS384', 'RS256', 'RS384', 'ES256'));
		} 
		catch(Exception $e) {
				if (strtolower($pf_type) == "ws") {
					throw $e;				
				} else {
					echo getEmptyModel(2, $e->getMessage());
					exit();
				}
			}
		
		// Unix time stamp
		$timestamp = time();

		/**
		 *  Refresh issued time with current Unix time stamp. If JWT issued
		 *  time is large then 12 minutes then delete cookie pf_auth_token
		 *  
		 *  You are able to replace it with your value
		 * 
		 */
		if ($timestamp - $decodedJwt->iat < 720) {
			
			// rewrite issued time to JWT if it is between 60 and 720 seconds 
			if ($timestamp - $decodedJwt->iat >= 60) {
				
				// set new Unix time stamp
				$decodedJwt->iat = $timestamp;
				
				/**
				 * Encoding existing token
				 *
				 */
				try {
					$jwt = JWT::encode($decodedJwt, $scretKey);
				}
				catch(Exception $e) {
					if (strtolower($pf_type) == "ws") {
						throw $e;				
					} else {
							echo getEmptyModel(2, "PlannerFw can not encode JWT", true);
							exit();
					}
				}
				
				return array("jwtClaim" => 1, "jwt" => $jwt);
			} else {
				// do not rewrite issued time to JWT if it is no more then 6 seconds 
				return array("jwtClaim" => 1);
			}
		} else {
			// if JWT issued time is more than 720 seconds, turn off model access from JWT
			return array("jwtClaim" => 0);
		}
		
	} else {
		// Client computer does not use JWT to access model
		return array("jwtClaim" => 0);
	}
}

/**
 * output a empty PlannerFw model with errorLevel and errorMessage properties
 * 
 * @param integer $errorLevel    value from 0 to 3
 * @param string $errorMessage   Error message
 *
 * @return string      Empty model in string
 */
function getEmptyModel($errorLevel, $errorMessage, $jwtClaim = 0 ) {
	return <<<DOC
				{	
					"description": "An empty model",
					"expiration": 0,
					"jwtClaim": $jwtClaim,
					"pfDataSet": null,
					"errorLevel": $errorLevel,
					"errorMessage": $errorMessage
				}
DOC;
}

/**
 * Execute startJwt() to start JWT for model, then use checkPfJwt() to verify JWT. 
 * If you do not use JWT to access model, do not use this file
 *
 * The value of JWT from client would be $_COOKIE['pf_auth_token'] for a HTTP request, and the value of JWT 
 * would be got through Cookie parse of WebSocket server
 * 
 * $this->jwtInfo = array("jwtClaim" => 0);	or $this->jwtInfo = checkPfJwt("") would turn off model access from JWT
 * 
 */
?>
