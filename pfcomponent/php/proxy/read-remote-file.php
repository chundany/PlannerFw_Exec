<?php
/**
 * Read remote file with PHP cURL
 * 
 * @public
 * @param {string} url   	     URL of remote file 
 * @param {array=} fields  	     Optional array of query fields for remote file
 * @param {string=} method       A string of "POST" or "GET" 
 * @param {boolean=} withHeader  TRUE to include the header in function return 
 * @return {string}              Remote file contents
 * 
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 *
 */
function pfReadFile($url, $fields = array(), $method = "GET", $withHeader = FALSE) {
	$curl = curl_init();
	
	if (count($fields) > 0 && trim(strtoupper($method)) == "GET") {
		if (strpos($url, '?') !== false) {
			$url .= "&" . http_build_query($fields);
		} else {
			$url .= "?" . http_build_query($fields);
		}
	}
	
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
	
	// Set userAgent and referer header for requests
	// Uncomment following code and and update it to meet your requirements
	/**
	 * $userAgent = 'Mozilla/5.0 (Windows NT 5.1; rv:15.0) Gecko/20100101 Firefox/15.0';
	 * curl_setopt($curl, CURLOPT_USERAGENT, $userAgent);
	 * $referer = "http://your-referer-domain/";
	 * curl_setopt($curl, CURLOPT_REFERER, $referer);
	 */
	
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);	
	curl_setopt($curl, CURLOPT_FAILONERROR, TRUE);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, TRUE);
	curl_setopt($curl, CURLOPT_AUTOREFERER, TRUE);
	curl_setopt($curl, CURLOPT_TIMEOUT, 30);
	
	if ($withHeader) {
		curl_setopt($curl, CURLOPT_HEADER, $withHeader);
	}
	
	if (trim(strtoupper($method)) == "POST") {
		curl_setopt($curl, CURLOPT_POST, TRUE);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $fields);
	}
	
	$output = curl_exec($curl);
	
	curl_close($curl);
	
	return $output;
}
?>
