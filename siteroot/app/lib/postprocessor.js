/**
 * Postprocessor Library
 * 
 * PlannerFw Exec v2.1.0 
 * 
 * 
 * This file is covered by the GNU GPLv3 license <http://www.gnu.org/licenses/gpl.html>
 * To purchase a commercial license at http://w3plan.net
 * 
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 * 
 */

(function(){
/**
 * Error handling
 *
 * Static module
 * 
 * @constructor
 * 
 */
var errorHandle = function () {};

/**
 * Print error message on the browser console
 *
 * Static method
 * 
 * @private 
 * @param {integer} errorLevel  PlannerFw defined error level from 0 to 3
 * @param {string} errorMsg     PlannerFw error message
 * @param {integer} lineNo      Error line number
 * @return void
 */
errorHandle.logMessage = function(errorLevel, errorMsg, lineNo) {
    var tm = new Date();
    var color = "color: #000";
    var lineSect = lineNo ? (" - Line: " + lineNo) : "";
    if  (errorLevel == 3 || typeof errorLevel == "string" && errorLevel.toLowerCase() == "notice") {
        console.log("%c " + tm.getHours() + ":" + tm.getMinutes() + ":" + tm.getSeconds() + " - Notice: " + errorMsg + lineSect, color);
    } else if  (errorLevel == 2 || typeof errorLevel == "string" && errorLevel.toLowerCase() == "warning") {
        console.log("%c " + tm.getHours() + ":" + tm.getMinutes() + ":" + tm.getSeconds() + " - Warning: " + errorMsg + lineSect, color);
    } else {
        console.log("%c " + tm.getHours() + ":" + tm.getMinutes() + ":" + tm.getSeconds() + " - Error: " + errorMsg + lineSect, color);
    }
};

/**
 * Tool Kit
 *
 * Static module
 * 
 * @constructor
 * 
 */
var toolKit = function () {};

/**
 * Calculates a string's CRC32 checksum to check data integrity of stored data to see
 * whether the data has been modified or changed, and returns as a hexadecimal or decimal string 
 * 
 * CRC32 polynomial table is used to speed up the checksum calculation
 *
 * Static method
 *
 * @private
 * @param {string} str     A string in Latin1 (ISO8859-1) character set
 * @param {number=} radix  10 or 16, it can be omitted
 * @return {string}	       A decimal string if radix is 10 otherwise a hexadecimal string
 */
toolKit.crc32 = function(str, radix) {
    var table =
    "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
    var crc = 0;
    var x = 0;
    var y = 0;
    
    crc = crc ^ (-1);
    for (var i = 0, iTop = str.length; i < iTop; i++) {
        y = (crc ^ str.charCodeAt(i)) & 0xFF;
        x = "0x" + table.substr(y * 9, 8);
        crc = (crc >>> 8) ^ x;
    }
    var cs = (crc ^ (-1)) >>> 0;
    if (radix && radix == 10) {
        return cs;
    } else {
        return cs.toString(16);
    }
};

/**
 * Calculate the md5 hash of a string
 * 
 * @private
 * @param {string} str   A string
 * @return {string}	  A md5 hash string
 */
toolKit.md5 = function(str) {
    var xl;
    var rotateLeft = function(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    };
    var addUnsigned = function(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    };

    var _F = function(x, y, z) {
        return (x & y) | ((~x) & z);
    };
    var _G = function(x, y, z) {
        return (x & z) | (y & (~z));
    };
    var _H = function(x, y, z) {
        return (x ^ y ^ z);
    };
    var _I = function(x, y, z) {
        return (y ^ (x | (~z)));
    };

    var _FF = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var _GG = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var _HH = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var _II = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var convertToWordArray = function(str) {
        var lWordCount;
        var lMessageLength = str.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = new Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    var wordToHex = function(lValue) {
        var wordToHexValue = '',
            wordToHexValue_temp = '',
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            wordToHexValue_temp = '0' + lByte.toString(16);
            wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
        }
        return wordToHexValue;
    };

    var x = [], k, AA, BB, CC, DD, a, b, c, d, 
    S11 = 7, S12 = 12, S13 = 17, S14 = 22, S21 = 5, S22 = 9, S23 = 14, S24 = 20, S31 = 4, S32 = 11, S33 = 16, S34 = 23, S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    
    str = toolKit.utf8Encode(str);
    x = convertToWordArray(str);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    xl = x.length;
    for (k = 0; k < xl; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);		
    }
    var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
    return temp.toLowerCase();
};

/**
 * Encoding an ISO-8859-1 string with UTF-8
 * 
 * @public
 * @param {string} str   A string
 * @return {string}	     An UTF-8 encoding string
 */
toolKit.utf8Encode = function(str) {
    if (str === null || typeof str === 'undefined') {
        return '';
    }

    var string = (str + '');
    var utftext = '', start = 0, end = 0, stringl = 0;		
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
        } else if ((c1 & 0xF800) != 0xD800) {
            enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
        } else {
            // surrogate pairs
            if ((c1 & 0xFC00) != 0xD800) {
                errorHandle.logMessage(2, 'Unmatched trail surrogate at ' + n);
            }
            var c2 = string.charCodeAt(++n);
            if ((c2 & 0xFC00) != 0xDC00) {
                errorHandle.logMessage(2, 'Unmatched lead surrogate at ' + (n - 1));
            }
            c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
            enc = String.fromCharCode((c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }
    
    if (end > start) {
        utftext += string.slice(start, stringl);
    }

    return utftext;
};

/**
 * PlannerFw hash, encryption/decryption
 * 
 * 
 * Supermodule
 *
 * @constructor
 *
 */
var plannerEncryption = function() {
	/**
	 * Encrypt ASCII string and decrypt result string with XOR cipher and an optional password
	 * XOR cipher security is related to the length of password
	 * 
	 * @private 
	 * @param {string} instr    ASCII string to be encrypted and string to be decrypted
	 * @param {string=} pword  	Optional XOR password with 8 characters at least, 
	 *							default length of password is 256
	 * @return {string}   Encrypted/decrypted string,  return an empty string if instr is empty
	 */
	var pfXor = function (instr, pword) {
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
	 * public method of md5
	 * 
	 * @public
	 */
	this.md5Hash = function(str) {
		return toolKit.md5(str);
	};
	
	/**
	 * Public method of crc32
	 *
	 * @public
	 */
	this.crc32CheckSum = function(str, radix) {
		return toolKit.crc32(str, radix);
	};
	
	/**
	 * Check data weather matching gave CRC32 checksum, if does not match PlannerFw 
	 * show error message and stop processing
	 * 
	 * @public 
  	 * @param {string} val  Original data
	 * @param {string} csm  decimal string of CRC32 checksum 
	 * @param {string=} Msg  Error message
	 * @return {boolean}    True
	 */ 
	this.pfCheckCrc = function (val, csm, Msg) {		
		Msg = Msg || "mistook";
		if (this.crc32CheckSum(val, 10) == csm) {
			return true;
		} else {
            errorHandle.logMessage(2, "CRC32 checksum" + Msg);
		}
	};
	
	/**
	 * Encrypt data and return result
	 * 
	 * @public
	 * @param {string} str    Plain text
  	 * @param {string=} pword  optional password for encryption
	 * @return {string}   Cypher text
	 */
	this.pfEncryption = function (str, pword) {
		pword = pword || "";
		try {
			var val = encodeURIComponent(str);			
			val = pfXor(val, pword);		
			val = window.btoa(val);
			// encode special character "+", "/" and "=" in base64 result
			return encodeURIComponent(val);			
		} catch (e) {
            errorHandle.logMessage(2, "Encryption failed, " + e.message);
		}
	};
	
	/**
	 * Decrypted data and return result
	 * 
	 * @public
	 * @param {string} cypher XOR encrypted data
  	 * @param {string} pword  optional password for decryption
	 * @return {string}   plain text
	 */
	this.pfDecryption = function (cypher, pword) {
		pword = pword || "";
		try {
			// decode special character "+", "/" and "=" in cypher
			var val = decodeURIComponent(cypher);
			val =  window.atob(val);
			val = pfXor(val, pword);	
			return decodeURIComponent(val);	
		} catch (e) {
            errorHandle.logMessage(2, "Decryption failed, " + e.message);
		}
	};
};

/**
 * PlannerFw request
 * 
 * Supermodule
 * 
 * @constructor
 *
 */
var plannerRequest = function() {
	/**
	 * Check whether url is same host with current page
	 * 
	 * @private 
	 * @param {string} url   Request URL
	 * @return {boolean}
	 */
	var isAllowedRequest = function(url) {
		if (url.substr(0, 8).indexOf("//") != -1) {
			var reqHost = url.split("/")[2].toLowerCase(); 
			reqHost = reqHost.split(":")[0];
			if (reqHost != window.location.hostname.toLowerCase())
				return false;
		}
		return true;
	};
	
	/**
	 * Create a new input element to the form
	 * 
	 * @private 
  	 * @param {object} form    A form element to contain new input element(s)
	 * @param {string} name    name to input
 	 * @param {string} value   value to input
	 * @return {void}
	 */
	var createInputElement = function(form, name, value) {
		var input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", name);
		input.setAttribute("value", value);
		form.appendChild(input);	
	};
	
	/**
	 * Prepare data to send to server for httpRequest and wsRequest
	 * 
	 *
	 * @private
	 * @param {object} data  	A name/value pairs data object to send to server, valueS could include one of
								[value, "pfcrc"], [value, "pfenc"] or [value, "pfvld", "type_label"], for example, 
								{"key1": ["book", "pfenc"], "key2": ["year 2016", "pfcrc"], "key3": [257, "pfvld", "intnum"]}
	 * @return {string}		Query string of key/value pairs 
	 */
	this.getQueryData = function(data) {
		if (data == null) {
			return "";
		}
		
		var qstr = "";
		var pfval = "";
		for (var key in data) {
			if ( Array.isArray(data[key]) && data[key].length == 2
				 && (typeof data[key][0] == "string" || typeof data[key][0] == "number")
				 && data[key][1].toLowerCase() == "pfcrc" )
			{
				qstr += key + "=" + data[key][0] + "&";
				
				// add 32-bits checksum of a decimal number to data
				pfval = this.crc32CheckSum(data[key][0]);				
				qstr += key + "__pfcrc=" + pfval + "&"; 
			
			} else if ( Array.isArray(data[key]) && data[key].length == 2
						&& (typeof data[key][0] == "string" || typeof data[key][0] == "number" && data[key][0].length > 0)
						&& data[key][1].toLowerCase() == "pfenc" )
			{  
				pfval = this.pfEncryption(data[key][0], '');	
				qstr += key + "__pfenc=" + pfval + "&";
				
			} else if ( Array.isArray(data[key]) && data[key].length == 3
						&& ["string", "number", "boolean"].indexOf(typeof data[key][0])
						&& data[key][1].toLowerCase() == "pfvld" )
			{   
				qstr += key + "=" + data[key][0] + "&";		
				qstr += key + "__pfvld=" + data[key][2] + "&";
				
			} else if (typeof data[key] == "string" || typeof data[key] == "number" || typeof data[key] == "boolean") {
				qstr += key + "=" + data[key] + "&";
			}
		}
		
		if (qstr.substr(-1) == "&") {
			return qstr.slice(0, -1);
		} else {
			return qstr;
		}
	};
	
	/**
	 * Submit HTTP requests with HTTP method, response type and data with encryption, crc32 checksum and validation 
	 * 
	 *
	 * @public
	 * @param {string} url 			  	An URL without query part
	 * @param {object} data  			A name/value pairs data object to send to server, value could include
										one of "pfcrc", "pfenc" or ["pfvld", "type_label"]
	 * @param {string=} method       	One of "Head", "Get", "POST", "PUT" and "DELETE"   
	 * @param {string=} responseType 	One of "", "text", "xml", "json", "document", "blob" and "arraybuffer"  
	 * @return {string|boolean}      	Return response contents or false if failed
	 * 
	 */
	this.httpRequest = function (url, data, method, responseType) {
		method = method || "GET";
		method = method.toLowerCase();
		responseType = responseType || "";
		responseType = responseType.toLowerCase();
		
		if (isAllowedRequest(url)) {
			var qstr = this.getQueryData(data);	
			
			req = new XMLHttpRequest();			
			if (method == "post") {
				req.open("POST", url, true);
				req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
			} else if (method == "put") {
				req.open("PUT", url, true);
				req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
			} else if (method == "delete") {
				req.open("DELETE", url, true);
				req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
			} else if (method == "head") {
				eq.open("HEAD", url + "?" + qstr, true);			
			} else {
				req.open("GET", url + "?" + qstr, true);
			}
			
			if (responseType == "xml") {
				req.overrideMimeType("text/xml; charset=UTF-8");	
			} else {
				req.responseType = responseType;
			}
			
			req.setRequestHeader("X-Requested-With", "PostXMLHttpRequest");
			req.timeout = 3000;												// Set time out in 3 seconds
			
			if (method == "post" || method == "put" || method == "delete") {
				req.send(qstr);
			} else {
				req.send();
			}
			
			req.onreadystatechange = function() {
				if (req.readyState == 4) {
					if (method = "head" && req.status !== 404) {
						return req.getAllResponseHeaders();
					} else if (req.status == 200 || req.status == 203) {
						if (responseType == "xml") {
							return req.responseXML;
						} else if (responseType == "" || responseType == "text") {
							return req.responseText;
						} else {
							return req.response;
						}
					} else {
						return false;
					}
				}
			};
			
			req.ontimeout = function() {
				return false;
			};
			
			req.onerror = function() {
				return false;
			};
		}
	};
	
	/**
	 * Send request to WebSocket server then close connection after response received  
	 * 
	 * If JWT (JSON Web Token) is created at time of user signed in then 
	 * WebSocket server will be able to authenticate consecutive requests	 
	 * 
	 * @public
	 * @param {string} url 		An URL without query part
	 * @param {object} data  	A name/value pairs data object to send to server, valueS could include 
								one of "pfcrc", "pfenc" or ["pfvld", "type_label"]
	 * @return {string|boolean} Data string sent by WebSocket server or boolean if WebSocket communication failed
	 * 
	 */
	this.wsRequest = function(url, data) {	
		if (isAllowedRequest(url) && window.WebSocket && typeof window.WebSocket === "function") {			
			var qstr = this.getQueryData(data);
			
			if (qstr) {
				url += "?" + qstr;
			}
			
			var wsocket = new WebSocket(url);			
			wsocket.onmessage = function(msg) {
									//wsocket.close();
									wsocket = null;
									return msg.data;
							   };
							   
			wsocket.onerror = function(msg) {
									//wsocket.close();
									wsocket = null;
									return false;
							   };
			
			wsocket.ontimeout = function(msg) { 
									wsocket = null;
									return false;
								};
		}
		
		return false;
	};
	
	/**
	 * Replace input value with PlannerFw encryption, add new input elements with validation or CRC32 checksum as value to HTML form 
	 * 
	 * Usage: add onsubmit="return postplanner.secureField(this, your_data_object)" to HTML form of web page
	 * 
	 * @public
 	 * @param {object} target  	A form element to contain new input element(s)
	 * @param {object} data  	A name/value pairs object, name is a field name of query, value is 
								one of "pfcrc", "pfenc" or ["pfvld", "type_label"], for example, 
								{"field1": "pfenc", "field2": "pfcrc", "field3": ["pfvld", "unistr"]}
	 * @return {boolean}     	True
	 * 
	 */
	this.secureField = function(target, data) {
		var val = ""; 
		if (typeof data == "object" && data != null) {
			for (var key in data) {
				if (data.hasOwnProperty(key) && typeof data[key] == "string" && data[key].toLowerCase() == "pfcrc") {
					// get 32-bits checksum of value of key field     
					val = this.crc32CheckSum(target[key].value);					
					// add new input element
					createInputElement(target, key + "__pfcrc", val);					
				} if (data.hasOwnProperty(key) && Array.isArray(data[key]) && data[key][0].toLowerCase() == "pfvld") {
					// add new input element
					createInputElement(target, key + "__pfvld", data[key][1]);
				} else if (data.hasOwnProperty(key) && typeof data[key] == "string" && data[key].toLowerCase() == "pfenc") { 				
					val = this.pfEncryption(target[key].value, '');			
					// update name and value
					target[key].value = val;				
					target.elements[key].name = key + "__pfenc";
				}
			}
			return true;
		}
	};
	
	/**
	 * Replace value with PlannerFw encryption, add new validation or CRC32 checksum field(s) to use query string 
	 * 
	 * @public
 	 * @param {string} url   An URL with query string
	 * @param {object} data  A name/value pairs object, name is a field name of query, value is 
							 one of "pfcrc", "pfenc" or ["pfvld", "type_label"], for example, 
							 {"field1": "pfenc", "field2": "pfcrc", "field3": ["pfvld", "unistr"]}
	 * @return {string}      new URL
	 * 
	 */
	this.secureUrl = function(url, data) {
		var qpos = url.indexOf("?");
		if ( qpos != -1) {
			var dstr = url.substr(0, qpos);
			var qstr = url.substr(qpos + 1); 
			var fpairs = decodeURIComponent(qstr).split('&');
			var field = "";
			var val = "";
			var epos = "";
			var sval = "";
			var npairs = [];
			for (var k = 0; k < fpairs.length; k++) { 
				epos = fpairs[k].indexOf("=");
				field = fpairs[k].substr(0, epos);
				val = fpairs[k].substr(epos + 1);
				if (data[field]) {
					if (typeof data[field] == "string" && data[field].toLowerCase() == "pfcrc") {
						if (val) {
							sval = this.crc32CheckSum(val);
							npairs.push(fpairs[k]);
							npairs.push(field + "__pfcrc=" + sval);
						} else {
							npairs.push(fpairs[k]);
						}
					} else if (Array.isArray(data[field]) && data[field][0].toLowerCase() == "pfvld") {
						npairs.push(fpairs[k]);
						npairs.push(field + "__pfvld=" + data[field][1]);
						
					} else if (typeof data[field] == "string" &&  data[field].toLowerCase() == "pfenc") {
						if (val) {
							sval = this.pfEncryption(val, '');
							npairs.push(field + "__pfenc=" + sval);
						} else {
							npairs.push(fpairs[k]);
						}
					}
				} else {
					npairs.push(fpairs[k]);
				}
			}
			return dstr + "?" + npairs.join('&');
		} else { 
			return dstr + "?" + url; 
		}
	};
	
	/**
	 * Load external JavaScript or CSS file then execute a callback function 
	 * 
	 * @public
	 * @param {string} url         An URL of external JavaScript or CSS file
	 * @param {string} type        One of "text/javascript" and "text/css"
	 * @param {function=} cbfunc   Callback function name       
	 * @return {string|boolean}    Execute callback function after external file loaded or false if error
	 * 
	 */
	this.jscssRequest = function (url, type, cbfunc) {
		cbfun = cbfun || function() { return true; };
		
		var rd = document.getElementsByTagName("head")[0];
		if (type.toLowerCase() == "text/css") {
			var fd = document.createElement("link");
			fd.rel = "stylesheet";
			fd.href = url;
		} else {
			var fd = document.createElement("script");
			fd.charset = "utf-8";
			fd.src = url;
		}
		fd.type = type;		
		
		rd.appendChild(fd);		
		if (fd.readyState){
			fd.onreadystatechange = function() {
				if (fd.readyState == "loaded" || fd.readyState == "complete"){
					fd.onreadystatechange = null;
					cbfunc();
				}
			};
		} else {
			fd.onload = function() {
				cbfun();
			};
			
			fd.onerror = function() {
				return false;
			};
		}
	};
};

/**
 * PlannerFw storage
 * 
 * Supermodule
 *
 * @constructor
 * 
*/
var plannerStorage = function() {
	/**
	 * Converts URL or URL path to key used in Session Storage
	 * 
	 * @private
	 * @param {string} url   URL or URL path to retrieve JavaScript, CSS and HTML files
	 * @return {string}	  Key string to save code in Session Storage
	 */
	var urlToStoredKey = function(url) {
		var b64Url = window.btoa(encodeURIComponent(url));
		return "pf_" + b64Url.replace(/\+/g, "$").replace(/\//g, "_").replace(/=/g, "");
	};
    
	/**
	 * Converts a key of Session Storage to URL or URL path
	 * 
	 * @private
	 * @param {string} key   A key of Session Storage
	 * @return {string}	  URL or URL path from key of Session Storage
	 */
	var storedKeyToUrl = function(key) {
		var rawKey = key.trim().substr(3).replace(/\$/g, "+").replace(/_/g, "/");
		if (rawKey.length % 4 != 0) {
			rawKey += "===".slice(0, 4 - (rawKey.length % 4));
		}
		return decodeURIComponent(window.atob(rawKey));
	};
	
	/**
	 * Return stored value from related URL
	 * 
	 * @public
	 * @param {string} url   URL or URL path to retrieve JavaScript, CSS and HTML files
	 * @return {string}      Stored value by PlannerFw or null if failed
	 * 
	 */
	this.getStoredValue = function(url) {
		if (window.sessionStorage && typeof window.sessionStorage === "object") {
			var val = sessionStorage.getItem(urlToStoredKey(url));
			if (val) {
				return JSON.parse(val.slice(0, -22));
			}
		}
		return null;
	};
	
	/**
	 * Return size of Session Storage is able to stored new key/value pairs
	 * 
	 * @public
	 * @return {number}   Integer or 0 if there is no JavaScript, CSS and HTML contents stored
	 * 
	 */
	this.getRemainedStorage = function() {
		if (window.sessionStorage && typeof window.sessionStorage === "object") {
				return 5000000 - JSON.stringify(sessionStorage).length;
		}
		return 0;
	};
		
	/**
	 * Converts style id to URL or URL path
	 * 
	 * @public
	 * @param {string} id   Style tag id that was generated by importCss method of Planner object  
	 * @return {string}     URL or URL path
	 * 
	 */
	this.styleId2Url = function(id) {
		return storedKeyToUrl(id.replace(/-/g, "$"));
	};

	/**
	 * Converts URL or URL path to style id used by current page
	 * 
	 * @public
	 * @param {string} url  URL or URL path  
	 * @return {string}     Style id used by current page
	 * 
	 */
	this.url2StyleId = function(url) {
		return urlToStoredKey(url).replace(/\$/g, "-");
	};
	
	/**
	 *  Return a object that contains key/related-URL pairs in Session Storage 
	 *
	 * @public
	 * @param  {object|string|void} regexp   A regular expression object, a string will be converted
	 *                                       to a regular expression object, or no parameter
	 * @return {object}   An object of key/related-URL pairs. 
	 *                    Returns empty object if no match is not found. 
	 * 
	 */
	this.searchStoredKeys = function(regexp) {
		var keyUrls = {};
		if (window.sessionStorage && typeof window.sessionStorage === "object") {
			var keys = Object.keys(sessionStorage);
			for (var i = 0; i < keys.length; i++) {
				if (keys[i].substr(0, 3).toLowerCase() == "pf_") {
					if (typeof regexp == "undefined") {
						keyUrls[keys[i]] = storedKeyToUrl(keys[i]);
					} else if (regexp && storedKeyToUrl(keys[i]).search(regexp) != -1) {
						keyUrls[keys[i]] = storedKeyToUrl(keys[i]);
					}
				}
			}
		}
		return keyUrls;
	};

	/**
	 * Return a object that contains URL/content pairs in Session Storage  
	 * 
	 * @public
	 * @param  {object|string} regexp   A regular expression object, or a string will
	 *                                  be converted to a regular expression object
	 * @return {object}   An object of URL/content pairs. 
	 *                    Returns empty object if no match is not found.
	 *
	 */ 
	this.searchStoredValues = function(regexp) {
		var urlVals = {};
		if (window.sessionStorage && typeof window.sessionStorage === "object" && regexp) {
			var keys = Object.keys(sessionStorage);
			for (var i = 0; i < keys.length; i++) {
				if (keys[i].substr(0, 3).toLowerCase() == "pf_") {
					var val = sessionStorage.getItem(keys[i]);
					if (val && val.length > 22) {
						var rval = val.slice(0, -22);
						if (rval.search(regexp) != -1) {
							urlVals[storedKeyToUrl(keys[i])] = JSON.parse(rval);
						}
					}
				}
			}
		}
		return urlVals;
	};
	
	/**
	 * Switches style with id generated by importCss method of PlannerFw object
	 * and style stored by Session Storage
	 * 
	 * @public
	 * @param {string} styleId     Style tag id that was generated by importCss method of Planner object  
	 * @param {string} toStyleUrl  URL or URL path  
	 * @return {boolean}   True at success or false if failed 
	 * 
	 */
	this.switchCssById = function(styleId, toStyleUrl) {
		var storedValue = this.getStoredValue(toStyleUrl);
		if (document.getElementById(styleId) && storedValue) {
			document.getElementById(styleId).innerHTML = storedValue;
			return true;
		}
		return false;
	};

	/**
	 * Convert URL to id then switches style with id generated by importCss 
	 * method of PlannerFw and style stored by Session Storage
	 * 
	 * @public
	 * @param {string} styleUrl    URL or URL path related to style tag id of current page   
	 * @param {string} toStyleUrl  URL or URL path 
	 * @return {boolean}   True at success or false if failed 
	 * 
	 */
	this.switchCssByUrl = function(styleUrl, toStyleUrl) {
		var id = this.url2StyleId(styleUrl)
		return this.switchCssById(id, toStyleUrl);
	};	
};

/**
 * PlannerFw derived module
 * 
 * Submodule
 * 
 * @constructor
 * 
 * @param {string} version    Released version number
 * @extends  plannerEncryption, plannerRequest, plannerStorage
 * 
*/
var plannerApp = function(version) {
	"use strict";
	
	// Multiple inheritances
	plannerEncryption.apply(this, arguments);
	plannerRequest.apply(this, arguments);
	plannerStorage.apply(this, arguments);
    
	/**
	* @const
	*/
	this.TITLE = "Postprocessor Library";
	this.DESCRIPTION = "JavaScript library for page post-processing";
	this.EDITION = "Exec";
	this.VERSION = version;
	this.COPYRIGHT = "2015-2016 W3plan Technologies";
    
    /**
	 * Output error message to the browser console 
	 * 
	 * @public
	 * @param {integer} errorLevel   PlannerFw defined error level from 0 to 3 
     * @param {string} errorMeg   Error message
     * @return {undefined}
	 */
	this.errorHandler = function(errorLevel, errorMsg) {    
        errorHandle.logMessage(errorLevel, errorMsg);
	};
};

/** 
 * Create global object
 *
 */
this.postplanner = new plannerApp ("Version 2.1.0");

if (Object.freeze) {
	Object.freeze(postplanner);
}

if (window.sessionStorage && typeof window.sessionStorage === "object") {
	sessionStorage.clear = null;
}

/**
 *
 * Improve old browsers to support JavaScript functions
 * 
 */

/**
 * Removes whitespace from both ends of the string
 *
 */
if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, ""); 
	};
}

/**
 * Search an array for item value in the first occurrence
 *
 */
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf= function(item, i) {
        if (i === undefined) i= 0;
        if (i < 0) i+= this.length;
        if (i < 0) i= 0;
        for (var n = this.length; i < n; i++) {
            if (i in this && this[i] === item) return i;
        }
		return -1;
    };
}

/**
 * Search an array for item value in the last occurrence
 *
 */
if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf= function(item, i) {
        if (i === undefined) i = this.length - 1;
        if (i < 0) i += this.length;
        if (i > this.length - 1) i = this.length - 1;
        for (i++; i-- > 0;) {
            if (i in this && this[i] === item)
                return i;
        }
		return -1;
    };
}

/**
 * Return true if an object is an array, false if it is not
 *
 */
if (!Array.isArray) {
	Array.isArray = function (arr) {
		return Object.prototype.toString.call(arr) === "[object Array]";
	};
}

/**
 * Encode a string in Latin1 (ISO8859-1) character set with Base-64
 * 
 */
if (!window.btoa) {
	window.btoa = function(data) {
		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = "", tmp_arr = [];
		
		if (!data) return data;		
		data += '';
		do {
			o1 = data.charCodeAt(i++);
			o2 = data.charCodeAt(i++);
			o3 = data.charCodeAt(i++);			
			bits = o1 << 16 | o2 << 8 | o3;			
			h1 = bits >> 18 & 0x3f;
			h2 = bits >> 12 & 0x3f;
			h3 = bits >> 6 & 0x3f;
			h4 = bits & 0x3f;
			tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
		} while (i < data.length);
		
		enc = tmp_arr.join("");
		var r = data.length % 3;
		return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
	}
}

/**
 * Decode a string in Latin1 (ISO8859-1) character set with Base-64
 *
 */
if (!window.atob) {
	window.atob = function(data) {
		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = '', tmp_arr = [];

		if (!data) return data;		
		data += '';
		do {
			h1 = b64.indexOf(data.charAt(i++));
			h2 = b64.indexOf(data.charAt(i++));
			h3 = b64.indexOf(data.charAt(i++));
			h4 = b64.indexOf(data.charAt(i++));
			bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
			o1 = bits >> 16 & 0xff;
			o2 = bits >> 8 & 0xff;
			o3 = bits & 0xff;
			
			if (h3 == 64) {
			  tmp_arr[ac++] = String.fromCharCode(o1);
			} else if (h4 == 64) {
			  tmp_arr[ac++] = String.fromCharCode(o1, o2);
			} else {
			  tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
			}
		} while (i < data.length);
		
		return tmp_arr.join('').replace(/\0+$/, '');
	}
}

/**
 * Fixed IE problems
 *
 */
if (!window.console) {
	window.console = {};
}

/**
 * Fixed browser console problems
 *
 */
if (!window.console.log) {
	window.console.log = function () {};
}

})();
