<?php
/**
 * This file is covered by the GNU GPLv3 license <http://www.gnu.org/licenses/gpl.html>
 * To purchase a commercial license at http://w3plan.net
 * 
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 *
 */

/**
 * Encrypt data and return result
 * 
 * @param {string} $str    Plain text
 * @param {string} $pword  password for encryption
 * @return {string}        Cypher text
 */
function pfEncryption($str, $pword = "") {
	try {
		$val = rawurlencode($str);				
		$val = pfXor($val, $pword);
		$val = base64_encode($val);
		// encode special character "+", "/" and "=" in base64 result
		return rawurlencode($val);
		
	} catch (Exception $e) {
		echo 'Encryption failed, ',  $e->getMessage();
	}
}

/**
 * Decrypted data and return result
 * 
 * @param {string}  $str    XOR encrypted data
 * @param {string}  $pword  password for decryption
 * @return {string} plain text      
 */
function pfDecryption($str, $pword = "") {
	try {
		// encode special character "+", "/" and "=" in str
		$val = rawurldecode($str);
		$val = base64_decode($val);
		$val = pfXor($val, $pword);
		return rawurldecode($val);
		
	} catch (Exception $e) {
		echo 'Decryption failed, ',  $e->getMessage();
	}
}

/**
 * Encryption and decryption ASCII string with XOR cipher and an optional password for PHP
 * 
 * @param {string} instr   	ASCII string to be encrypted/decrypted
 * @param {string=} pword  	Optional XOR password with 8 characters at least, 
 *							default length of password is 256
 * @return {string}			Encrypted/decrypted string, return an empty string if instr is empty
 * 
 */
function pfXor($instr, $pword = "") {
	if (!($instr && trim($instr))) {
		return "";
	}
	
	if (strlen($pword) < 8) {
		$pword = "8q2EXsYBCDZcK3hajFFnyzdGRTbnrYbjYJzkbMFfRJFdvhPfBmpNVw2YkBZtM9kLW6MRAst7Vb3yh8KZwq2dTNuVdq8acHYeavBaPz3MPsBGpAP3zaCDvZUTvNGaWvpNwqwnQ9D8nZ8T4K9D8HRyQ2XTapaAeDSUfanvkCkRFzh4vSs3C9qBWxTwx9PUTTrAaL5PfgvQRWaCtCAZng3P8S9aEYEST79w2Ryu5Vs4etvKz4xdM8K7uCn2yFZ5C2MJ";
	}
	
	$icnt = strlen($instr);
	$keys = str_split($pword);
	$kcnt = count($keys);	
	$output = "";
	for ($i = 0; $i < $icnt; $i++) {
		$index = $i % $kcnt;
		$output .= $instr[$i] ^ $keys[$index];
	}
	
	return $output;
}

/**
 * Check data weather matching gave CRC32 checksum
 * 
 * @public 
 * @param {string} $val  Original data
 * @param {string} $csm  decimal string of CRC32 checksum 
 * @return {boolean}     True if data matches checksum otherwise false
 */ 
function pfCheckCrc($val, $csm) {
	if (crc32CheckSum($val) == $csm) {
		return true;
	} else {
		return false;
	}
}

/**
 * Calculates a string's CRC32 checksum to check data integrity to see
 * weather the data has been modified or changed 
 *
 * @public
 * @param {string} $str   A string in Latin1 (ISO8859-1) character set
 * @return {string}	      A decimal string
 */
function crc32CheckSum($str) {
	return str_pad(crc32($str), 8, '0', STR_PAD_LEFT);
}

/**
 * PHP put data from requests to global variable $GLOBALS, this function could 
 * validate variable type weather being same with its validation label  
 * 
 * @public
 * @return {boolean}     True if variable type is same with its validation label otherwise false
 */ 
function typeValidation() {
	$typeLabels = array(
						"angstr", "ascstr", "b64str", "binstr", "bln", "bytstr", 		
						"clrstr", "datstr", "emlstr", "empstr", "expstr", "flsbln",
						"fltnum", "fltstr", "hexstr", "intnum", "intstr", "jsnstr",
						"lenstr", "negnum", "nngnum", "npsnum", "nrmstr", "nul", 
						"num", "numstr", "octstr", "posnum", "regstr", "str", 
						"tokstr", "trubln", "uecstr", "unistr", "urlstr"
					);
	
	$flag = true;	
	foreach($GLOBALS as $name => $value) {
		$notation = strtolower(substr($name, -7));
		$vName = substr($name, 0, -7);
		
		if ($notation == "__pfvld" && in_array($value, $typeLabels) && strlen($vName) > 0) {			
			if (doValidation($value, $GLOBALS[$vName])) {
				$flag = false;
			}
		}
	}
	
	return $flag;
}

/**
 * Validate type of variable value weather is wanted type  
 * 
 * Write your validation code according to PlannerFw's validation label
 *
 * @public
 * @return {boolean}     True if variable type is same with gave type otherwise false
 */ 
function doValidation($type, $val) {
	// put your validation code here
}

?>
