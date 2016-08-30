<?php
/*
 * modelServer Class verifies JWT (JSON Web Token), generates and sends model
 * 
 * You have to write your code in methods: checkJwt, checkUrl and
 * getModel to meet requirements 
 * 
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 *
 */

// Load PlannerFw JWT library
require __DIR__ . "/../pfjwt/jwt_handle.php";

class modelServer extends WebSocketServer {
	/**
	 * JWT secret key
	 * 
	 */
	private $scretKey = "";
	
	/**
	 * Set root path of the website that runs PlannerFw applications  
	 * 
	 */
	private $siteRootDir = "";
	
	/**
	 * An array with jwtClaim element or jwtClaim and jwt elements
	 * 
	 */
	private $jwtInfo = null;
	
	/*
	 * $wsUrl is the URL transferred by WebSocket handshake
	 * 
	 */
	private $wsUrl = "";
	
	/**
     * Set properties to class instance
     *
	 * @param $key string
 	 * @param $root string
     * @return void 
     */
	public function setInstProp($key, $root) {
		$this->scretKey = $key;
		$this->siteRootDir = $root;
	}
	
	/**
	 * WebSocket server opens WebSocket and send PalnnerFw model 
     * 
	 *
	 * @param $string user  Default value from instance of WebSocketServer
     * @return void 
     */
	protected function connected($user) {
		$this->send($user, $this->getModel());
	}
	
	/**
     * JWT Verification, return true if JWT is valid,  return false if JWT is expired  
	 * throw exception if error happen
	 * 
     * @param $string jwt   Cookie pf_auth_token value transferred by WebSocket 
     * @return boolean      
	 *
     */
	protected function checkJwt($jwt) {
		
		/**
		 * If you do not use JWT to access model
		 *
		 */
		$this->jwtInfo = array("jwtClaim" => 0);		// or $this->jwtInfo = checkPfJwt("", "ws")
		
		/**
		 * If you want to use JWT, run startJwt() to create JWT at first
		 *
		 * Decode JWT, verify JWT, return an array with jwtClaim element or jwtClaim and jwt elements
		 * 
		 */
		//$this->jwtInfo = checkPfJwt($jwt, "ws");
		
		return true;
	}
	
	/**
     * Check if URL is valid
	 * 
     * @param $string url   The URL transferred by WebSocket 
     * @return boolean  return true if URL is valid
     */
	protected function checkUrl($url) {
		
		/**
		 * Check URL transferred by WebSocket 
		 * 
		 */
		
		//if PlannerFw does not support the URL then return false
		
		$this->wsUrl = $url;
		
		return true;
	}
	
	/**
     * According AWT and request URL to output model over WebSocket
	 *
     * @param void
     * @return string  PlannerFw model in string
     */
	private function getModel() {
	
		/*
		 * Write your code to return model of JSON or XML according to
		 * properties: jwt, siteRootDir and wsUrl
		 * 
		 * Following code is an example
		 * 
		 */
		
		// Get data from file
		include $this->siteRootDir . $this->wsUrl;
		
		$optional = "";
		if (isset($pfxmdl)) {
			if (array_key_exists('jwt', $this->jwtInfo)) 
			{	
				$optional .= "<jwtClaim>" . $this->jwtInfo['jwtClaim'] . "</jwtClaim><jwt>" . $this->jwtInfo['jwt'] . "</jwt>";
			} else {
				$optional .= "<jwtClaim>" . $this->jwtInfo['jwtClaim'] . "</jwtClaim>";
			}
			
			return substr(trim($pfxmdl), 0, -7) . $optional . "</root>";
			
		} else {
			if (array_key_exists('jwt', $this->jwtInfo)) 
			{	
				$optional .= ', "jwtClaim" : "' . $this->jwtInfo['jwtClaim'] . '", "jwt": "' . $this->jwtInfo['jwt'] . '"';
			} else {
				$optional .= ', "jwtClaim" : "' . $this->jwtInfo['jwtClaim'] . '"';
			}
			
			return substr(trim($pfmdl), 0, -1) . $optional . "}";
		}
	}
}

?>
