/**
 * This file is covered by the GNU GPLv3 license <http://www.gnu.org/licenses/gpl.html>
 * To purchase a commercial license at http://w3plan.net
 * 
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 *
 */

var crc32 = require('crc-32');

 /**
 * Encrypt data and return result
 * 
 * @param {string} str    Plain text
 * @param {string} pword  password for encryption
 * @return {string}   Cypher text
 */
function pfEncryption(str, pword) {
	try {
		var val = encodeURIComponent(str);			
		val = pfXor(val, pword);
		var bf = new Buffer(val);
		bf =  bf.toString('base64');
		// encode special character "+" "/" and "=" in base64 result
		return encodeURIComponent(bf);
		
	} catch (e) {
		console.log("Encryption failed, " + e.message);
	}
};

/**
 * Decrypted data and return result
 * 
 * @param {string} str    XOR encrypted data
 * @param {string} pword  password for decryption
 * @return {string}   plain text      
 */
function pfDecryption(str, pword) {
	try {
		var val = decodeURIComponent(str);
		val = new Buffer(val, 'base64');	
		val = pfXor(val.toString('ascii'), pword);
		return decodeURIComponent(val);	
		
	} catch (e) {
		console.log("Decryption failed, " + e.message);
	}
};

/**
 * Encrypt ASCII string and decrypt result string with XOR cipher and an optional password for Node.js
 * 
 * @param {string} instr    ASCII string to be encrypted and string to be decrypted
 * @param {string=} pword  	Optional XOR password with 8 characters at least, 
 *							default length of password is 256
 * @return {string} 		Encrypted/decrypted string, return an empty string if instr is empty
 * 
 */
function pfXor(instr, pword) {
	if (!(instr && instr.trim())) {
		return "";
	}
	
	pword = pword || "";	
	if (pword.length < 8) {
		pword = "8q2EXsYBCDZcK3hajFFnyzdGRTbnrYbjYJzkbMFfRJFdvhPfBmpNVw2YkBZtM9kLW6MRAst7Vb3yh8KZwq2dTNuVdq8acHYeavBaPz3MPsBGpAP3zaCDvZUTvNGaWvpNwqwnQ9D8nZ8T4K9D8HRyQ2XTapaAeDSUfanvkCkRFzh4vSs3C9qBWxTwx9PUTTrAaL5PfgvQRWaCtCAZng3P8S9aEYEST79w2Ryu5Vs4etvKz4xdM8K7uCn2yFZ5C2MJ";
	}
	
	var icnt = instr.length;
	var keys = pword.split("");
	var kcnt = keys.length;
	
	var output = "";
	for (var i = 0; i < icnt; i++) {
		var charCode = instr.charCodeAt(i) ^ keys[i % kcnt].charCodeAt(0);		
		output += String.fromCharCode(charCode);
	}
	
	return output;
};

/**
 * Check data weather matching gave CRC32 checksum
 * 
 * @public 
 * @param {string} val   Original data
 * @param {string} csm   decimal string of CRC32 checksum 
 * @return {boolean}     True if data matches checksum otherwise false
 */ 
function pfCheckCrc(val, csm) {
	if (crc32CheckSum(val) == csm) {
		return true;
	} else {
		return false;
	}
}

/**
 * Calculates a string's CRC32 checksum to check data integrity of stored data to see
 * weather the data has been modified or changed 
 *
 * @public
 * @param {string} str   A string in Latin1 (ISO8859-1) character set
 * @return {string}	     A decimal string
 */
function crc32CheckSum(str) {
	return CRC32.str(str) >>> 0;
}
