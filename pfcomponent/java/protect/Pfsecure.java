/**
 * This file is covered by the GNU GPLv3 license <http://www.gnu.org/licenses/gpl.html>
 * To purchase a commercial license at http://w3plan.net
 * 
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 *
 */

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.zip.CRC32;
import java.util.zip.Checksum;

public class Pfsecure {
	/**
	 * Encrypt data and return result
	 * 
	 * @param {string} str    Plain text
	 * @param {string} pword  password for encryption
	 * @return {string}       Cypher text
	 */
	public static String pfEncryption(String str, String pword) {
		try {
			String val = URLEncoder.encode(str, "UTF-8");
			String xorVal = pfXor(val, pword);
			String b64Val = Base64.getEncoder().encodeToString(xorVal.getBytes(StandardCharsets.UTF_8));
			// encode special character "+", "/" and "=" in base64 result
			return URLEncoder.encode(b64Val, "UTF-8");	
			
		} catch (UnsupportedEncodingException e) {
			System.err.println(e);
		}
	}
	
	/**
	 * Decrypted data and return result
	 * 
	 * @param {string}  str    XOR encrypted data
	 * @param {string}  pword  password for decryption
	 * @return {string} plain text      
	 */
	public static String pfDecryption(String str, String pword) {
		try {
			// encode special character "+", "/" and "=" in str
			String val = URLDecoder.decode(str, "UTF-8");
			String aVal = Base64.getDecoder().decode(val);
			String xorVal = pfXor(aVal, pword);			
			return URLDecoder.decode(xorVal, "UTF-8");
			
		} catch (UnsupportedEncodingException e) {
			System.err.println(e);
		}
	}
	
	/**
	 * Check data weather matching gave CRC32 checksum
	 * 
	 * @public 
	 * @param {string} val  Original data
	 * @param {string} csm  decimal string of CRC32 checksum 
	 * @return {boolean}    True if data matches checksum otherwise false
	 */ 
	public static String pfCheckCrc(String val, String csm) {
		if (crc32CheckSum(val) == csm) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * Encrypt ASCII string and decrypt result string with XOR cipher and an optional password for Java
	 * 
	 * @private 
	 * @param {string} instr    ASCII string to be encrypted and string to be decrypted
	 * @param {string} pword  	Optional XOR password with 8 characters at least, 
	 * 							default length of password is 256
	 * @return {string} 		Encrypted/decrypted string, return an empty string if instr is empty
	 * 
	 */
	private static String pfXor(String instr, String pword) {
		if ((instr == "") || (instr.trim() == "")) {
			return "";
		}
		
		if (pword.length() < 8) {
			pword = "8q2EXsYBCDZcK3hajFFnyzdGRTbnrYbjYJzkbMFfRJFdvhPfBmpNVw2YkBZtM9kLW6MRAst7Vb3yh8KZwq2dTNuVdq8acHYeavBaPz3MPsBGpAP3zaCDvZUTvNGaWvpNwqwnQ9D8nZ8T4K9D8HRyQ2XTapaAeDSUfanvkCkRFzh4vSs3C9qBWxTwx9PUTTrAaL5PfgvQRWaCtCAZng3P8S9aEYEST79w2Ryu5Vs4etvKz4xdM8K7uCn2yFZ5C2MJ";
		}
		
		int icnt = instr.length();
		char[] keys = pword.toCharArray();		
		int kcnt = keys.length;
		StringBuilder output = new StringBuilder();

		for (int i = 0; i < icnt; i++) {
			int val = instr.charAt(i) ^ keys[i % kcnt];
			char result = (char) val;
			output.append(result);
		}
		
		return output.toString();	
	}
	
	/**
	 * Calculates a string's CRC32 checksum to check data integrity to see
	 * weather the data has been modified or changed 
	 *
	 * @private
	 * @param {string} str   A string in Latin1 (ISO8859-1) character set
	 * @return {string}      A decimal string
	 */
	private static String crc32CheckSum(String str) {
		CRC32 crc = new CRC32();
		return crc.update(str.getBytes());
	}
}
