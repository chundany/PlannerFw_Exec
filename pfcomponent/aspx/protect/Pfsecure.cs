/**
 * This file is covered by the GNU GPLv3 license <http://www.gnu.org/licenses/gpl.html>
 * To purchase a commercial license at http://w3plan.net
 * 
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 *
 */

using System.IO;
using System;
using System.Net;

class Pfsecure {
	/**
	 * Encrypt data and return result
	 * 
	 * @param {string} str     Plain text
	 * @param {string} pword   password for encryption
	 * @return {string}        Cypher text
	 */
	public string pfEncryption(string str, string pword) {
		try {
			string val = WebUtility.UrlEncode(str);				
			val = Xor.Pfxor(val, pword);
			byte[] sval = System.Text.Encoding.UTF8.GetBytes(val);		
			// encode special character "+", "/" and "=" in base64 result
			return WebUtility.UrlEncode(System.Convert.ToBase64String(sval));		
		} catch (Exception e) {
			Console.WriteLine("Encryption failed, {0} ", e);
			return "";
		}
	}

	/**
	 * Decrypted data and return result
	 * 
	 * @param {string}  str     XOR encrypted data
	 * @param {string}  pword   password for decryption
	 * @return {string} plain text      
	 */
	public string pfDecryption(string str, string pword) {
		try {
			// encode special character "+", "/" and "=" in str
			string val = WebUtility.UrlDecode(str);
			byte[] sVal = System.Convert.FromBase64String(val);
			string bVal = Xor.Pfxor(System.Text.Encoding.UTF8.GetString(sVal), pword);
			return WebUtility.UrlDecode(bVal);		
		} catch (Exception e) {
			Console.WriteLine("Decryption failed, {0} ", e);
			return "";
		}
	}
	
	/**
	 * Entry
	 */
	static void Main() {     
		
    }
}

class Xor {
    /**
	 * Encryption and decryption ASCII string with XOR cipher and an optional password for C#
	 * 
	 * @public
	 * @param {string} instr   	 ASCII string to be encrypted/decrypted
	 * @param {string=} pword  	 Optional XOR password with 8 characters at least, 
	 *							 default length of password is 256
	 * @return {string}   		 Encrypted/decrypted string, return an empty string if instr is empty 
	 */
   public static string Pfxor (string instr, string pword) {
		if (instr.Trim().Length < 1) {
			return "";
		}
		
		if (pword.Length < 8) {
			pword = "8q2EXsYBCDZcK3hajFFnyzdGRTbnrYbjYJzkbMFfRJFdvhPfBmpNVw2YkBZtM9kLW6MRAst7Vb3yh8KZwq2dTNuVdq8acHYeavBaPz3MPsBGpAP3zaCDvZUTvNGaWvpNwqwnQ9D8nZ8T4K9D8HRyQ2XTapaAeDSUfanvkCkRFzh4vSs3C9qBWxTwx9PUTTrAaL5PfgvQRWaCtCAZng3P8S9aEYEST79w2Ryu5Vs4etvKz4xdM8K7uCn2yFZ5C2MJ";
		}
		
		int icnt = instr.Length;
		int index = 0;
		int i = 0;
		string retval = "";	
		for (i = 0; i < icnt; i++) {
			index = i % pword.Length;
			retval += instr[i] ^ pword[index];
		}
		
		return retval;
	}
}
