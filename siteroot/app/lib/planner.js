/**
 * Processor Library
 * 
 * PlannerFw Exec v2.1.0
 * 
 * Browser compatibilities
 *	Chrome  Firefox   IE    Opera   Safari   iOS Safari   Android   Blackberry
 *	5+      3.5+      8.0+  10.5+   4.0+     4.1+         2.1+      7+
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
 * Output error message to console, current page or error handling page 
 * 
 * Static method
 * 
 * @private 
 * @param {integer} errorLevel  PlannerFw defined error level from 0 to 3
 * @param {string} errorMsg     PlannerFw error message
 * @param {integer} lineNo      Error line number
 * @return void
 */
errorHandle.outputMessage = function(errorLevel, errorMsg, lineNo) {
    lineNo = lineNo || "";
    if (typeof pfConfig != "undefined" && pfConfig.environment.toLowerCase() == "production" || errorLevel == 3) {
        // production or error level is 3
        errorHandle.logMessage(errorLevel, errorMsg, lineNo);
    } else if (typeof pfConfig != "undefined" && pfConfig.environment.toLowerCase() == "testing") {
        // testing
        window.location.href  = pfConfig.clientErrorHandler + "?level=" + errorLevel + "&msg=" + encodeURIComponent(errorMsg) + "&line=" + lineNo + "&log=0";
        throw new Error("PfStop"); 
    } else {
        // development
        errorHandle.printMessage(errorLevel, errorMsg, lineNo);
        throw new Error("PfStop");
    }
};

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
 * Print error message on current page
 *
 * Static method
 * 
 * @private 
 * @param {integer} errorLevel  PlannerFw defined error level from 0 to 3
 * @param {string} errorMsg     PlannerFw error message
 * @param {integer} lineNo      Error line number
 * @return void
 */
errorHandle.printMessage = function(errorLevel, errorMsg, lineNo) {
    var tm = new Date();
    var mlStart = '<div style="text-align:center"><div style="text-align:left; width:800px; margin:300px auto; color:#ff0000">';
    var mlEnd = "</div></div>";
    var lineSect = lineNo ? (" - Line: " + lineNo) : "";
    if (errorLevel == 3 || typeof errorLevel == "string" && errorLevel.toLowerCase() == "notice") {
        document.write(mlStart + tm.getHours() + ":" + tm.getMinutes() + ":" + tm.getSeconds() + " - Notice: " + errorMsg + lineSect + mlEnd);
    } else if (errorLevel == 2 || typeof errorLevel == "string" && errorLevel.toLowerCase() == "warning") {
        document.write(mlStart + tm.getHours() + ":" + tm.getMinutes() + ":" + tm.getSeconds() + " - Warning: " + errorMsg + lineSect + mlEnd);
    } else {
        document.write(mlStart + tm.getHours() + ":" + tm.getMinutes() + ":" + tm.getSeconds() + " - Error: " + errorMsg + lineSect + mlEnd);
    }
    document.close();
};

/**
 * Tool kit
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
 * @return {string}	  A decimal string if radix is 10 otherwise a hexadecimal string
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
 * PlannerFw base
 * 
 * Supermodule
 * 
 * @constructor
 *
 */
var plannerBase = function() {
	/**
	 * Execution time variable
	 * 
	 * @private
	 * 
	 */	
	var stepTotal = 0;
	
	/**
	 * Execution times value
	 * 
	 * @private
	 * 
	 */	
	var stepVal = "";
	
	/**
	 * Return current time in microseconds (1 microseconds = 0.001 milliseconds)
	 * 
	 * @private 
	 * @return {number}
	 */
	var getMicrotime = function() {
		return Date.now ? Date.now() : (new Date()).getTime();
	};
	
	/**
	 * Return a customized XMLHttpRequest object
	 * 
	 * @private
	 * @param {string} pfType   One of "Model", "XModel", "Template", "LayoutTemplate", "PFCSS" and "Other"
	 * @param {string} src      The URL of a remote file
	 * @param {boolean=} isProduct   True for production environment, otherwise false
 	 * @param {string=} method  HTTP request method
	 * @param {string=} type    One of "", "text", "xml", "json", "document", "blob", "arraybuffer"
	 * @return {object}   An XMLHttpRequest object
	 */
	var getReqObj = function(pfType, src, isProduct, method, type) {
		isProduct = isProduct || false;
		method = method || "";
		method = method.toLowerCase();
		type = type || "";
		
		var urlPath = src.substr(0, src.indexOf("?"));
		var qstr = src.substr(src.indexOf("?") + 1);
		if (!urlPath) { 
			urlPath = src;
			qstr = "";
		}
		req = new XMLHttpRequest();
		
		if (method == "post") {
			req.open("POST", urlPath, true);
			req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		} else if (method == "put") {
			req.open("PUT", urlPath, true);
			req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		} else if (method == "delete") {
			req.open("DELETE", urlPath, true);
			req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		} else {
			if (!isProduct && qstr) {
				src = urlPath + "?_=" + getMicrotime() + "&" + qstr;		// Bypass the local cache
			} else if (!isProduct && !qstr) {
				src = urlPath + "?_=" + getMicrotime();
			}
			req.open("GET", src, true);
		}
		
		// Add identity header to XMLHttpRequest requests
		switch (pfType.toLowerCase()) {
			case "model":
				req.setRequestHeader("X-Requested-With", "ModelXMLHttpRequest");
				break;
			case "xmodel":
				req.setRequestHeader("X-Requested-With", "XModelXMLHttpRequest");
				break;
			case "template":
				req.setRequestHeader("X-Requested-With", "TemplateXMLHttpRequest");
				break;
			case "layouttemplate":
				req.setRequestHeader("X-Requested-With", "LayoutTemplateXMLHttpRequest");
				break;
			case "pfcss":
				req.setRequestHeader("X-Requested-With", "PFCSSXMLHttpRequest");
				break;
			default:
				req.setRequestHeader("X-Requested-With", "OtherXMLHttpRequest");
		}
		
		if (type.toLowerCase() === "xml") {
			req.overrideMimeType("text/xml; charset=UTF-8");	
		} else { 
			req.responseType = type.toLowerCase();
		}
		req.timeout = 3000;														// Set time out in 3 seconds
		if (method == "post" || method == "put" || method == "delete") {
			req.send(qstr);
		} else {
			req.send();
		}
		return req;
	};
	
	/**
	 * Public method of getReqObj
	 * 
	 * @public
	 */
	this.getRequestObj = function(pfType, src, isProduct, method, type) {
		return getReqObj(pfType, src, isProduct, method, type);
	};
		
	/**
	 * Return encoded JSON otherwise show error message and stop processing
	 * 
	 * @public 
	 * @param {string|object} rdata   A string or JSON object
	 * @return {object}   A JSON
	 */
	this.responseJsonEncode = function(rdata) {
		if (typeof rdata === "string") {
			try {
				rdata = this.minimizeCode(rdata);
				rdata = JSON.parse(rdata);
			} catch (e) {
                throw new Error("Data isn't a JSON string, " + e.message);
			}
		}
		
		if (rdata && typeof rdata === "object" && Object.keys(rdata).length > 0 ) {
			return rdata;
		} else {
            throw new Error("Data isn't JSON");
		}
	};
	
	/**
	 * Check received model, if model is invalid or expiration processing would be stopped
	 * 
	 * @public 
	 * @param {json} pfResp   HTTP response data
	 * @return {boolean}   return true if success
	 */
	this.checkResponseData = function(pfResp) {
		if (   typeof pfResp === "undefined" || !pfResp	|| typeof pfResp.expiration === "undefined")
		{
            throw new Error("Model is invalid");
		} else if (pfResp.expiration) {
            throw new Error("Model is expiration");
		}
		return true;
	};
	
	/**
	 * Set a new Cookie 
	 * 
	 * @public 
	 * @param {string} name      Cookie name
	 * @param {string} value     Cookie value
	 * @param {string=} expires   An optional Cookie expire time
 	 * @param {string=} path      An optional Cookie path
	 * @return {undefined}  
	 */
	this.setCookie = function(name, value, expires, path) {
		expires = expires || "";
		path = path || "/";
		document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=" + path;
	}
	
	/**
	 * Return cookie value if cookie existing otherwise null
	 * 
	 * @public 
 	 * @param {string} name   Cookie name
	 * @return {string|object}	  Cookie value or null
	 */
	this.getCookie = function(name) {
		var nameEq = name + "=";
		var ca = document.cookie.split(";");
		for (var i = 0, len = ca.length; i < len; i++) {
			var c = ca[i];
			while (c.charAt(0) == " ") {
				c = c.substring(1, c.length);
			}
			if (c.indexOf(nameEq) === 0) {
				var cVal = c.substring(nameEq.length, c.length);
				try {
					return decodeURIComponent(cVal);
				} catch(e) {
					return cVal;                          
				}
			}
		}
		return null;
	};
		
	/**
	 * Delete cookie by cookie name and cookie path
	 * 
	 * @public 
	 * @param {string} name   Cookie name
	 * @param {string=} path   An optional Cookie path
	 * @return {undefined}
	 */
	this.deleteCookie = function(name, path) {
		path = path || '/';
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=" + path;
	};
		
	/**
	 * Return current Date object
	 * 
	 * @public 
	 * @return {object}   Date Object
	 */
	this.startWatch = function() {
		return new Date();
	};
	
	/**
	 * Return elapsed time from a start time to current time in milliseconds
	 * 
	 * @public 
  	 * @param {object} start   Start Date object
	 * @return {string}   elapsed time
	 */
	this.getElapsedTime = function(start) {
		return "Total elapsed time: " + (new Date() - start) + " [milliseconds]";
	};
	
	/**
	 * Initial time cookie or update time cookie
	 * 
	 * @public 
  	 * @param {object} start   Start Date object
   	 * @param {boolean=} keepVal   Save execution times to Cookie if true
	 * @return {undefined}
	 */
	this.updateTrackTime = function(start, keepVal) {
		keepVal = keepVal || false;
		if (start) {
			var currentTotal = new Date() - start;
			if (keepVal) {
				stepVal += "." + (currentTotal - stepTotal);
				this.setCookie("pf_times", stepVal);
			} else {
				var divider = (stepVal) ? "." : "";
				stepVal += divider + (currentTotal - stepTotal);
			}
			stepTotal = currentTotal;
		} else {
			stepTotal = 0;
			stepVal = "";
		}
	};
	
	/**
	 * Minimized code by strip comments, white spaces and line breaks
	 * 
	 * @public 
	 * @param {string} str   code to minimize
	 * @return {string}   	 minimized code
	 */
	this.minimizeCode = function(str) {
		return str.replace(/[\f\t\n\r]/g, " ")
				  .replace(/\/\*((?!\*\/).)*\*\//g, "")
				  .replace(/ {2,}/g, " ")
				  .replace(/> +</g, "><")
				  .replace(/\{ +/g, "{")
				  .replace(/ +\}/g, "}")
				  .trim();
	};
	
	/**
	 * Return true if request for same domain otherwise show error message and stop processing
	 * 
	 * @public 
	 * @param {string} requ   Request URL
	 * @return {boolean}
	 */
	this.checkAllowedRequest = function(requ) {
		if (requ.substr(0, 8).indexOf("//") != -1) {
			var reqHost = requ.split("/")[2].toLowerCase(); 
			reqHost = reqHost.split(":")[0];
			if (reqHost != window.location.hostname.toLowerCase())
                throw new Error("Processing stopped as request for different hosts");
		}
		return true;
	};
	
	/**
	 * Omit protocol from an URL 
	 * 
	 * @public 
  	 * @param {string} url   A request URL
	 * @return {string}   An URL without protocol portion
	 */
	this.omitProtocol = function(url) {
		var protpos = url.indexOf("://");
		if (protpos !== -1) {
			url = url.substr(protpos + 1);
		} else if (url.substr(0, 1) !== "/")  {
			url = "/" + url;
		}
		return url;
	}
};

/**
 * PlannerFw data validation
 * 
 * Supermodule
 *
 * @constructor
 *
 */
var plannerValidation = function() {
	/**
	 * JSON schema data types
	 * 
	 * @private
	 * 
	 */
	var dataTypes = [
		"angstr", "ascstr", "b64str", "binstr", "bln", "bytstr", 		
		"clrstr", "datstr", "emlstr", "empstr", "expstr", "flsbln",
		"fltnum", "fltstr", "hexstr", "intnum", "intstr", "jsnstr",
		"lenstr", "negnum", "nngnum", "npsnum", "nrmstr", "nul", 
		"num", "numstr", "octstr", "posnum", "regstr", "str", 
		"tokstr", "trubln", "uecstr", "unistr", "urlstr"
	];
	
	/**
	 * JSON schema data constraints
	 * 
	 * @private
	 * 
	 */
	var dataCsts = [
		"totalDigi", "fractDigi", "Length", "maxLen", "minLen", 
		"maxExc", "maxInc", "minExc", "minInc", "enums", "pattern"
	];
	
	/**
	 * Return true if a number is an integer, false if it is not
	 * 
	 * @private
	 * @param {number} n   A number
	 * @return {boolean}   True or false
	 */
	var isInteger = function(n) {
		return Number(n) === n && n % 1 === 0;
	};
	
	/**
	 * Return true if a number is a float number, false if it is not
	 * 
	 * @private
	 * @param {number} n   A number
	 * @return {boolean}   True or false
	 */
	var isFloat = function(n) {
		return Number(n) === n && n % 1 !== 0;
	};
	
	/**
	 * Return true if a number is a legal number, false if it is not
	 * 
	 * @private 
	 * @param {number} n   A number
	 * @return {boolean}   True or false
	 */
	var isNumber = function(n) {
		return typeof n === "number" && !isNaN(n);
	};
	
	/**
	 * Return true if a string is a number string, false if it is not
	 * 
	 * @private
	 * @param {string} n   A string
	 * @return {boolean}   True or false
	 */
	var isNumberString = function(n) {
		return typeof n === "string" && !isNaN(n) && n == +n;
	};
	
	/**
	 * Return true if a string is an exponential number string, false if it is not
	 * 
	 * @private
	 * @param {string} n   A string
	 * @return {boolean}   True or false
	 */
	var isExponentialString = function(n) {
		return isNumberString(n) && /e\+|-/gi.test(n);
	};
	
	/**
	 * Return true if a string is a hexadecimal number string, false if it is not
	 * 
	 * @private 
	 * @param {string} n   A string
	 * @return {boolean}   True or false
	 */
	var isHexadecimalString = function(n) {
		return isNumberString(n) && /^-?0x[0-9a-f]+$/i.test(n);
	};
	
	/**
	 * Return true if a string is an octal number string, false if it is not
	 * 
	 * @private
	 * @param {string} n   A string
	 * @return {boolean}   True or false
	 */
	var isOctalString = function(n) {
		return isNumberString(n) && /^-?0[0-7]+$/i.test(n);
	};
	
	/**
	 * Return true if a string is a binary number string, false if it is not
	 * 
	 * @private 
	 * @param {string} str   A string
	 * @return {boolean}   True or false
	 */
	var isBinaryString = function(str) {
		return isNumberString(str) && /^-?[0-1]+$/i.test(str);
	};
	
	/**
	 * Return true if a string is a date or datetime string, false if it is not
	 * 
	 * @private 
	 * @param {string} str   A string
	 * @return {boolean}   True or false
	 */
	var isDateString = function(str) {
		return typeof str === "string" && new Date(str) !== "Invalid Date" && !isNaN(new Date(str));
	};
	
	/**
	 * Return true if a string is an ASCII character string, false if it is not
	 * 
	 * @private 
	 * @param {string} str   A string
	 * @return {boolean}   True or false
	 */
	var isAsciiString = function(str) {
		return typeof str === "string" && /^[\x00-\xFF]+$/.test(str);
	};
	
	/**
	 * Return true if a string is a unicode character string, false if it is not
	 * 
	 * @private 
	 * @param {string} str   A string
	 * @return {boolean}   True or false
	 */
	var isUnicodeString = function(str) {
		return typeof str === "string" && /[^\u0000-\u10FFFF]+/.test(str);
	};
	
	/**
	 * Return true if a string is a legal CSS color string,  false if it is not
	 * Legal color could be name, Hex, RGB, RGBA, HSL, HSLA
	 *
	 * @private 
	 * @param {string} str   An string
	 * @return {boolean}   True or false
	 */
	var isCssColorString = function(str) {
		if (typeof str === "string") {
			var el = document.createElement("div");
			el.style.borderColor = str;
			var elcolor = el.style.borderColor.toLowerCase();
			if (elcolor && ["transparent", "initial", "inherit"].indexOf(elcolor) == -1) {
				return true;
			}
		}
		return false;
	};
	
	/**
	 * Return true if a string is a legal CSS length string,  false if it is not
	 * Legal length could be absolute measurement and relative measurement
	 *
	 * @private 
	 * @param {string} str   An string
	 * @return {boolean}   True or false
	 */
	var isCssLengthString = function(str) {
		if (typeof str === "string") {
			var el = document.createElement("div");
			el.style.borderWidth = str;
			var elwidth = el.style.borderWidth.toLowerCase();
			if (elwidth && ["thin", "medium", "thick", "initial", "inherit"].indexOf(elwidth) == -1) {
				return true;
			}
		}
		return false;
	};
	
	/**
	 * Return true if a string is a legal CSS angle string,  false if it is not
	 * Legal angle could be deg, grad, rad and turn
	 *
	 * @private 
	 * @param {string} str   An string
	 * @return {boolean}   True or false
	 */
	var isCssAngleString = function(str) {
		if (typeof str === "string") {
			var el = document.createElement("div");
			el.style.transform = "rotate(" + str + ")";
			var elangle = el.style.transform.toLowerCase();
			if (elangle && ["none", "initial", "inherit"].indexOf(elangle) == -1) {
				return true;
			}
		}
		return false;
	};
	
	/**
	 * Return true if a object is a one dimensional array, false if it is not
	 * 
	 * @private 
	 * @param {string} obj   An object
	 * @return {boolean}   True or false
	 */
	var isOneDimensionalArray = function(obj) {
		if (Array.isArray(obj)) {
			for (var i = 0, len = obj.length; i < len; i++) {
				if (Array.isArray(obj[i])) {
					return false;
				}
			}
			return true;
		}
		return false;
	};
	
	/**
	 * Return true if a object is a multidimensional array, false if it is not
	 * 
	 * @private 
	 * @param {string} obj   An object
	 * @return {boolean}   True or false
	 */
	var isMultiDimensionalArray = function(obj) {
		if (Array.isArray(obj)) {
			for (var i = 0, len = obj.length; i < len; i++) {
				if (Array.isArray(obj[i])) {
					return true;
				}
			}
			return false;
		}
		return false;
	};
	
	/**
	 * Return true if a string is an email string,  false if it is not
	 *
	 * @private 
	 * @param {string} str   An string
	 * @return {boolean}   True or false
	 */
	var isEmailString = function (str) {
		if (typeof str === "string") {
            var pattern = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
			if (pattern.test(str)) {
				return true;
			}
		}
		return false;
	};
	
	/**
	 * Return true if a string is an absolute URL string, false if it is not
	 *
	 * @private 
	 * @param {string} str   An string
	 * @return {boolean}   True or false
	 */
	var isUrlString = function (str) {
		if (typeof str === "string") {
            var pattern = /^(ftp:\/\/|ws:\/\/|wss:\/\/|http:\/\/|https:\/\/|\/\/)((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+=]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
			if (pattern.test(str)) {
				return true;
			}
		}
		return false;
	};
	
	/**
	 * Check whether an object has properties
	 * 
	 * @private 
	 * @param {object} obj     An object 
	 * @return {boolean}	return true if object has no property otherwise return false
	 */
	var isEmptyObject = function (obj) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				return false;
			}
		}		
		return true;
	};
	
	/**
	 * Validate JSON member type formats, show error message and stop processing if fail 
	 * There is no return value to this method
	 * 
	 * @private 
	 * @param {string} notation   Data type
 	 * @param {string} constraint Data constraint
	 * @param {json} mValue       JSON member value
	 * @param {string} preMsg     Message prefix
	 * @return {undefined}
	 */
	var doValidation = function(notation, constraint, mValue, preMsg) {
		var vflag = false;
		switch(notation) {
			case "str":
				if (typeof mValue !== "string")
					vflag = true;
				break;
			case "numstr":
				if (!isNumberString(mValue))
					vflag = true;
				break;
			case "intstr":
				if (!(isNumberString(mValue) && isInteger(+mValue)))  
					vflag = true;
				break;
			case "empstr":
				if (!(typeof mValue === "string" && mValue.length == 0))
					vflag = true;
				break;
			case "fltstr":
				if (!(isNumberString(mValue) && isFloat(+mValue)))  
					vflag = true;
				break;
			case "expstr":
				if (!isExponentialString(mValue))
					vflag = true;
				break;
			case "hexstr":
				if (!isHexadecimalString(mValue))
					vflag = true;
				break;
			case "octstr":
				if (!isOctalString(mValue))
					vflag = true;
				break;
			case "binstr":
				if (!isBinaryString(mValue))
					vflag = true;
				break;
			case "datstr":
				if (!isDateString(mValue))
					vflag = true;
				break;
			case "regstr":
				if (!(typeof mValue === "string" && eval(mValue) instanceof RegExp === true))
					vflag = true;
				break;
			case "uecstr":
				var uflag = true;
				if (typeof mValue === "string") {
					try {
						var mVal = decodeURIComponent(mValue);
						if (mVal.length < mValue.length)
							uflag = false;
					} catch(e) {
                        errorHandle.outputMessage(2, "Data type" + preMsg);
					}
				}
				if (uflag)
					vflag = true;
				break;
			case "tokstr":
				if (!(typeof mValue === "string" && mValue.replace(/[\t\r\n]/g, "").replace(/^ +| +$/g, "").replace(/  +/g, " ") == mValue))
					vflag = true;
				break;
			case "nrmstr":
				if (!(typeof mValue === "string" && mValue.replace(/[\t\r\n]/g, "") == mValue))
					vflag = true;
				break;
			case "jsnstr":
				try {
					JSON.parse(mValue);
				} catch(e) {
                    errorHandle.outputMessage(2, "Data type" + preMsg);
				}
				break;
			case "b64str":
				try {
					window.atob(mValue);
				} catch(e) {
                    errorHandle.outputMessage(2, "Data type" + preMsg);
				}
				break;
			case "ascstr":
				if (!isAsciiString(mValue))
					vflag = true;
				break;
			case "unistr":
				if (!isUnicodeString(mValue))
					vflag = true;
				break;
			case "emlstr":
				if (!isEmailString(mValue))
					vflag = true;
				break;
			case "urlstr":
				if (!isUrlString(mValue))
					vflag = true;
				break;
			case "clrstr":
				if (!isCssColorString(mValue))
					vflag = true;
				break;
			case "lenstr":
				if (!isCssLengthString(mValue))
					vflag = true;
				break;
			case "angstr":
				if (!isCssAngleString(mValue))
					vflag = true;
				break;
			case "num":
				if (!isNumber(mValue))
					vflag = true;
				break;
			case "intnum":
				if (!isInteger(mValue))
					vflag = true;
				break;
			case "posnum":
				if (!(isInteger(mValue) && mValue > 0))
					vflag = true;
				break;
			case "negnum":
				if (!(isInteger(mValue) && mValue < 0))
					vflag = true;
				break;
			case "npsnum":
				if (!(isInteger(mValue) && mValue <= 0))
					vflag = true;
				break;
			case "nngnum":
				if (!(isInteger(mValue) && mValue >= 0))
					vflag = true;
				break;
			case "fltnum":
				if (!isFloat(mValue))
					vflag = true;
				break;
			case "bln":
				if (typeof mValue !== "boolean")
					vflag = true;
				break;
			case "trubln":
				if (mValue !== true)
					vflag = true;
				break;
			case "flsbln":
				if (mValue !== false)
					vflag = true;
				break;
			case "nul":
				if (mValue !== null)
					vflag = true;
				break;
		}
		
		if (vflag) {
            errorHandle.outputMessage(2, "Data type" + preMsg);
		}

		if (constraint && validateCst(mValue, constraint)) {
            errorHandle.outputMessage(2, "Data constraint" + preMsg);
		}
	};
	
	/**
	 * Check whether data is constrained by the constraint
	 * 
	 * @private 
	 * @param {string|number|boolean|null} val    	Data to check
	 * @param {object} cst     Data constraint for the data 
	 * @return {boolean}	return true if data is constrained by the constraint otherwise return false
	 */
	var validateCst = function(val, cst) {
		for (var key in cst) {
			if (dataCsts.indexOf(key) !== -1) {
				if (key == "enums") {
					if (!Array.isArray(cst.enums) || cst.enums.indexOf(val) == -1)
						return true;
				} else if (key == "pattern") {
					if (typeof cst.pattern !== "object" || cst.pattern instanceof RegExp == false || !cst.pattern.test(val))
						return true;
				} else if (key == "length") {
					if (typeof val !== "string" || val.length !== cst.length)
						return true;
				} else if (key == "maxLen") {
					if (typeof val !== "string" || val.length > cst.maxLen)
						return true;
				} else if (key == "minLen") {
					if (typeof val !== "string" || val.length < cst.minLen)
						return true;
				} else if (key == "totalDigi") {
					if (!isNumber(val) || val.toString().length !== cst.totalDigi)
						return true;
				} else if (key == "fractDigi") {
					if (!isNumber(val) || val.toString().split('.')[1].length !== cst.fractDigi)
						return true;
				} else if (key == "maxExc") {
					if (!isNumber(val) || val >= cst.maxExc) 
						return true;
				} else if (key == "maxInc") {
					if (!isNumber(val) || val > cst.maxInc)
						return true;
				} else if (key == "minExc") {
					if (!isNumber(val) || val <= cst.minExc)
						return true;
				} else if (key == "minInc") {
					if (!isNumber(val) || val < cst.minInc)
						return true;
				}
			}
		}
		return false;
	};
	
	/**
	 * Strip notations and return true if all object members are legal types, member values match CRC32 checksum or
	 * successfully replaced encrypted data with decrypted data otherwise show error message and stop processing
	 * 
	 * @public
	 * @param {object} jdata   An JSON object
	 * @param {string} pword   password for decryption
	 * @return {boolean}   True
	 */
	this.secureModel = function(jdata, pword) {
		pword = pword || '';
		if (Array.isArray(jdata)) {
			for (var i = 0, len = jdata.length; i < len; i++) {
				if (typeof jdata[i] === "object" && !isEmptyObject(jdata[i])) {
					this.secureModel(jdata[i]);
				}
			}
		} else {
			var signs = ['__pfvld', '__pfcrc'];
			var sign = "";
			var oriKey = "";
			var oriVal = "";
			var vldchk ="";
			var constraint = "";
			var jsonVal = "";
			var preMsg = "";
			
			for (var key in jdata) {
				sign = key.substr(-7).toLowerCase();
				if (signs.indexOf(sign) !== -1 && Array.isArray(jdata[key])) {
					if (jdata[key].length == 2) {
						oriKey = key.slice(0, -7);
						oriVal = jdata[key][0];
						vldchk = jdata[key][1];
						preMsg = ' to the value of member "' + oriKey + '" is wrong';
						if (typeof oriVal == 'object' && !isEmptyObject(oriVal)) {
                            errorHandle.outputMessage(2, "The value of " + oriKey + " is object with property, PlannerFw skipped it");
						} else if (sign == '__pfvld' && vldchk.hasOwnProperty("type") && dataTypes.indexOf(vldchk.type) !== -1) {
							if (vldchk.hasOwnProperty("constraint")) {
								constraint = vldchk.constraint;
							} else {
								constraint = "";
							}
							doValidation(vldchk.type, constraint, oriVal, preMsg); 
							jdata[oriKey] = oriVal;
							delete jdata[key];
						} else if (sign == '__pfcrc') {
							this.pfCheckCrc(oriVal, vldchk, preMsg);
							jdata[oriKey] = oriVal;					
							delete jdata[key];
						} else {
                            errorHandle.outputMessage(2, "type" + preMsg);
						}
					} else {
                        errorHandle.outputMessage(2, "The value of " + key + " must be an array of two elements");
					}
				} else if (key.substr(-7).toLowerCase() == '__pfenc' && typeof jdata[key] == 'string') {
						if (jdata[key]) {
							oriKey = key.slice(0, -7);
							oriVal = this.pfDecryption(jdata[key], pword);
							try {
								jsonVal = JSON.parse(oriVal);
							} catch(e) {
								jsonVal = oriVal;
							}
							jdata[oriKey] = jsonVal;							
							delete jdata[key];
						} else {
                            errorHandle.outputMessage(2, "The value of " + key + " must be an non-empty string");
						}
				} else if (typeof jdata[key] === "object" && !isEmptyObject(jdata[key])) {
					this.secureModel(jdata[key]);
				}
			}
		}
		return true;
	};	
};

/**
 * PlannerFw encryption/decryption
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
	 * @param {string} instr   ASCII string to be encrypted and string to be decrypted
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
			pword =  "8q2EXsYBCDZcK3hajFFnyzdGRTbnrYbjYJzkbMFfRJFdvhPfBmpNVw2YkBZtM9kLW6MRAst7Vb3yh8KZwq2dTNuVdq8acHYeavBaPz3MPsBGpAP3zaCDvZUTvNGaWvpNwqwnQ9D8nZ8T4K9D8HRyQ2XTapaAeDSUfanvkCkRFzh4vSs3C9qBWxTwx9PUTTrAaL5PfgvQRWaCtCAZng3P8S9aEYEST79w2Ryu5Vs4etvKz4xdM8K7uCn2yFZ5C2MJ";
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
	 * Check data weather matching gave CRC32 checksum, if does not match PlannerFw 
	 * show error message and stop processing
	 * 
	 * @public 
 	 * @param {string} val   Original data
	 * @param {string} csm   Decimal string of CRC32 checksum 
	 * @param {string=} Msg  Error message
	 * @return {boolean}     True
	 */ 
	this.pfCheckCrc = function (val, csm, Msg) {		
		Msg = Msg || "mistook";
		if (this.crc32CheckSum(val, 10) == csm) {
			return true;
		} else {
            errorHandle.outputMessage(2, "CRC32 checksum" + Msg);
		}
	};
	
	/**
	 * Encrypt data and return result
	 * 
	 * @public
	 * @param {string} str     Plain text
  	 * @param {string=} pword  Optional password for encryption
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
            errorHandle.outputMessage(2, "Encryption failed, " + e.message);
		}
	};
	
	/**
	 * Decrypt data and return result
	 * 
	 * @public
	 * @param {string} str     PlannerFw encrypted data
  	 * @param {string=} pword  Optional password for decryption
	 * @return {string}   plain text      
	 */
	this.pfDecryption = function (str, pword) { 
		pword = pword || "";
		try {
			// decode special character "+", "/" and "=" in str
			var val = decodeURIComponent(str);
			val = window.atob(val);
			val = pfXor(val, pword);
			return decodeURIComponent(val);
		} catch (e) {
            errorHandle.outputMessage(2, "Decryption failed, " + e.message);
		}
	};
};

/**
 * PFCSS processes
 * 
 * Supermodule
 * 
 * @constructor
 *
 */
var plannerPfCss = function() {
	/**
	 * CSS hash data container
	 * 
	 * @private
	 * 
	 */
	var cssData = {};
	
	/**
	 * CSS3 units except color units
	 * 
	 * @private
	 * 
	 */
	var cssUnits = [
					"%", "cm", "in", "mm", "pc", 
					"pt", "ch", "em", "ex", "gd", 
					"px", "rem", "vh", "vw", "vm", 
					"deg", "grad", "rad", "turn", 
					"ms", "s", "hz", "khz"
				   ];
	
	/**
	 * Parses nesting CSS as JSON, or show error message and stop processing if failed
	 * 
	 * @private 
	 * @param {string} str    CSS string
	 * @return {object}   JSON
	 */
	var cssJsonEncode = function(str) {		
		return JSON.parse(str);
	};
	
	/**
	 * Format prefix of stacking data
	 * 
	 * @private 
	 * @param {string} pref    Prefix of stacking data
	 * @return {string}   Formatted prefix
	 */
	var getPrefix = function(pref) {
		if (pref) 
			return pref + " ";
		return "";
	};
	
	/**
	 * Create formatted CSS data that can be converted to JSON
	 * 
	 * @private 
	 * @param {string} str    Nested CSS data
	 * @return {string}   Formatted CSS data
	 */	
	var structJson = function(str) {
		var _0x9652=decodeURIComponent("%7B%40%7D%40%0A%0D%7B'%241'%40replace%40%7B%0A%22%242%22%3A%22%40%7D%2C%22%241%22%40%22%40%0A%20%40%20%40str%40%7B%22%241%22%3A%7B%40%7D%2C%22%241%22%3A%7B%40%3B%22%2C%22%241%22%3A%7B%40%7D%2C%22%241%22%3A%22%40%7B%22%241%22%3A%22%40%22%2C%22%241%22%3A%22%40%3A%22%241%3B%22%2C%40'").split("@");
		var x1432223707402=[_0x9652[0],_0x9652[1],_0x9652[2],_0x9652[3],_0x9652[4],_0x9652[5],_0x9652[6],_0x9652[7],_0x9652[8],_0x9652[9],_0x9652[10],_0x9652[11],_0x9652[12],_0x9652[13],_0x9652[14],_0x9652[15],_0x9652[16],_0x9652[17]];str=x1432223707402[0]+str+x1432223707402[1];x1432223707402[9][x1432223707402[3]](/\\\r/g,x1432223707402[8])[x1432223707402[3]](/[\b\v\'\"]/g,x1432223707402[7])[x1432223707402[3]](/'/g,x1432223707402[6])[x1432223707402[3]](/}([^:,;\{}]):"/g,x1432223707402[5])[x1432223707402[3]](/\{([^:",;]+):"/g,x1432223707402[4])[x1432223707402[3]](/\{([^"\{}]+)\{/g,x1432223707402[2]);
		return str[x1432223707402[3]](/\\\n|\\\r|\\\r\\\n/g,x1432223707402[8])[x1432223707402[3]](/[\f\t\n\r]/g,x1432223707402[8])[x1432223707402[3]](/"/g,x1432223707402[17])[x1432223707402[3]](/ +/g,x1432223707402[8])[x1432223707402[3]](/:([^:;\{}]+);/g,x1432223707402[16])[x1432223707402[3]](/",([^",:\{}]+):"/g,x1432223707402[15])[x1432223707402[3]](/\{([^:",;\{}]+):"/g,x1432223707402[14])[x1432223707402[3]](/}([^:",;\{}]+):"/g,x1432223707402[13])[x1432223707402[3]](/;",([^;"\{}]+)\{/g,x1432223707402[12])[x1432223707402[3]](/}([^;"\{}]+)\{/g,x1432223707402[11])[x1432223707402[3]](/\{([^;"\{}]+)\{/g,x1432223707402[10])[x1432223707402[3]](/,( )*}/g,x1432223707402[1])[x1432223707402[3]](/\{([^;"\{}]+)\{/g,x1432223707402[10]);
	};
	
	/**
	 * Execute CSS nesting compilation and update object of cssData
	 * 
	 * @public 
	 * @param {string} cJson   CSS nesting JSON
	 * @param {string=} pref   A option string with prefix of stacking data, default value is ""
	 * @return {undefined}
	 */
	var compileNestedCss = function(cJson, pref) {
		pref = pref || "";
		pref = pref.trim();
		
		for (var m in cJson) {
			if (typeof cJson[m] == "object") {
				var rule = getPrefix(pref) + m.trim();
				rule = rule.trim();
				cssData[rule] = cssData[rule] || [];
				compileNestedCss(cJson[m], rule);			
			} else {
				cssData[pref][cssData[pref].length] = "  " + m.trim() + ": " + cJson[m].trim() + "\r\n";
			}
		}
	};
	
	/**
	 * Transform Compiled CSS into string
	 * 
	 * @private 
	 * @return {str}   CSS code
	 */
	var TransformCompiledCss = function() {
		var str = "";
		for (var rule in cssData) {
			if (cssData[rule] != []) {
				str += rule + " {\r\n";
				str += cssData[rule].join("");
				str += "}\r\n\r\n";
			}
		}
		
		return str;		
	};
	
	/**
	 * Parse generic nesting mechanism to CSS code
	 * 
	 * @public 
	 * @param {string} cssStr   Nested CSS code
	 * @param {string=} option   A optional object with minified property, default value: {minified: true}
	 * @return {string}   CSS code without nesting
	 */
	this.parseNestedCss = function(cssStr, option) {
		option = option || {minified: true};
		cssStr = structJson(cssStr);
		var cssJson = cssJsonEncode(cssStr);
		compileNestedCss(cssJson);
		
		var cstr = TransformCompiledCss();
		if (option.minified) {
			cstr = cstr.replace(/[\f\t\n\r]/g, " ")	
					   .replace(/\/\*((?!\*\/).)*\*\//g, "")
					   .replace(/ {2,}/g, " ");
		}
		return cstr;
	};
	
	/**
	 * Output pretty CSS code
	 * 
	 * @public
	 * @param {string} cssStr   Compact CSS code
	 * @return {string}   CSS code
	 */
	this.prettyCss = function(cssStr) {
		var pretty = cssStr.replace(/( *):( *)([^:;]+);( *)/g, ": $3;\r\n  ")
						   .replace(/\{( *)/g, "{\r\n  ")
						   .replace(/( *)}( *)/g, "}\r\n")
   						   .replace(/\*\/( *)/g, "*/\r\n");
		return pretty;
	};
	
	/**
	 * Convert tabs in CSS code into spaces
	 * 
	 * @public 
	 * @param {string} str   CSS code
	 * @return {string}   CSS code		
	 */
	this.tab2Space = function(str) {
		if (typeof str == "string")
			return str.replace(/\t/g, "  ");
		return str;
	};
	
	/**
	 * Return true if color is hexadecimal value, false if it is not
	 * 
	 * @public 
	 * @param {string} color   CSS color value
	 * @return {boolean}   true or false
	 */
	this.isHexColor = function(color) {
		var hexClr = color.trim();
		var matched = hexClr.match(/^#[0-9a-f]+/i);
		return hexClr == matched[0];
	};
	
	/**
	 * Return color decimal value in success, or return 0 and print error message to browser console if failed
	 * 
	 * @public 
 	 * @param {string} hexColor    Color hexadecimal value
	 * @return {number}   Formatted color decimal value or 0
	 */
	this.hex2DecColor = function(hexColor) {
		var hex = hexColor.replace("#", "");
		if (hex.length != 3 && hex.length != 6) {
            errorHandle.outputMessage(3, 'Color hexadecimal value "' + hexColor + '" is not correct.');
			return 0;
		}
		if (hex.length == 3)
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];		
		return parseInt(hex, 16);
	};
	 
	/**
	 * Return color hexadecimal value in success, or return #fff and print error message to browser console if failed
	 * 
	 * @public 
 	 * @param {expression} expression    A JavaScript expression
	 * @return {string}   Formatted color hexadecimal value or $fff
	 */
	this.dec2HexColor = function(expression) {
		var hex = expression.toString(16);
		if (!hex.length || hex.length > 6) {
            errorHandle.outputMessage(3, "Result color value is not correct.");
			return "#fff";
		}
		if (hex.length == 6 && hex[0] == hex[1] && hex[2] == hex[3] && hex[4] == hex[5]) {
			hex = "#" + hex[0] + hex[2] + hex[4];
		} else if (hex.length == 5) {
			hex = "#0" + hex;
		} else if (hex.length == 4) {
			hex = "#00" + hex;
		} else if (hex.length == 3) {
			hex = "#000" + hex;
		} else if (hex.length == 2) {
			hex = "#0000" + hex;
		} else if (hex.length == 1) {
			hex = "#00000" + hex;
		} else {
			hex = "#" + hex;
		}
		return hex;
	};
	
	/**
	 * Strip CSS unit to do unit calculation
	 * Supported CSS units:  
	 *   cm, in, mm, pc, pt, ch, em, ex, gd, px, rem, vh,
	 *   vw, vm, deg, grad, rad, turn, ms, s, hz and khz
	 * 
	 * @public 
 	 * @param {string} num    CSS amount and unit
	 * @return {string}   CSS amount
	 */
	this.stripCssUnit = function(num) {
		var numUnits = num.toString();
		return numUnits.replace(/%|cm|in|mm|pc|pt|ch|em|ex|gd|px|rem|vh|vw|vm|deg|grad|rad|turn|ms|s|hz|khz| |;/ig, "");		
	};
	
	/**
	 * Return CSS amount and unit in success, or return "0" and print error message to browser console if failed
	 * 
	 * @public 
	 * @param {expression} expression    An JavaScript expression
 	 * @param {string} str    A option of CSS unit, default unit with px
	 * @return {string}   CSS amount and unit or "0"
	 */
	this.addCssUnit = function(expression, unit) {
		unit = unit || "px";
		if (cssUnits.indexOf(unit) == -1) {
            errorHandle.outputMessage(3, "Unit you want can not be processed.");
			return "0";
		}
		expression = +expression;
		if (expression % 1 === 0){
			return expression + unit;
		}
		return expression.toFixed(3).replace(/^0+/, "").replace(/0+$/, "") + unit;
	};
	
};

/**
 * PFCSS storage
 *
 * Supermodule
 * 
 * @constructor
 * 
 */
var plannerStorage = function() {
	/**
	 * Size limit of Session Storage
	 *
	 * @private
	 */
	var storageLimit = 5000000;
	
	/**
	 * Returns a time value that is the number of seconds since 1 January, 1970 UTC
	 * 
	 * @private
	 * @return {integer}	  a time value in seconds
	 */
	var timeStamp = function() {
		return Math.round(+new Date() / 1000);
	};	
	
	/**
	 * Converts URL or URL path to key used in Session Storage
	 * 
	 * @private
 	 * @param {string} url   URL or URL path to retrieve JavaScript, CSS and HTML files
	 * @return {string}	  Key string to save code in Session Storage
	 */
	var urlToKey = function(url) {
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
	var keyToUrl = function(key) {
		var rawKey = key.trim().substr(3).replace(/\$/g, "+").replace(/_/g, "/");
		if (rawKey.length % 4 != 0) {
			rawKey += "===".slice(0, 4 - (rawKey.length % 4));
		}
		return decodeURIComponent(window.atob(rawKey));
	};
	
	/**
	 * Check if an URL is from same host with HTML/CSS Preprocessor
	 * 
	 * @private
 	 * @param {string} url   URL or URL path
	 * @return {boolean}   True if tested URL from same host with HTML/CSS Preprocessor, otherwise false
	 */
	var isSameHost = function(url) {
		var removeProtocol = url.replace(/^\/\//, "").replace(/^(http|https|ftp):\/\//gi, "");
		
		if (url.length > removeProtocol.length) {
			var host = window.location.hostname.toLowerCase();
			if (removeProtocol.indexOf("/") === -1) {
				removeProtocol += "/";
			}
			if (removeProtocol.substr(0, removeProtocol.indexOf("/")).toLowerCase() !== host) {
				return false;
			}
		}
		
		return true;
	}
	
	/**
	 * Return an array of URLs or URL paths that are not saved in Session Storage but are used by
	 * importCss and loadCss methods in template. All store key/value pairs would be updated
	 * if stored time exceed value of maxAge, which is a option parameter to the method
	 * 
	 * @private
 	 * @param {string} tmlText    Template code
	 * @param {integer=} maxAge   Optional maximum seconds to store key/value pairs in Session Storage
	 * @return {array}   An array of URL paths to retrieve remote CSS
	 */
	var getValidRetrUrls = function(tmlText, maxAge) {
		var validUrls = [];
		if (window.sessionStorage && typeof window.sessionStorage === "object") {
			var urls = tmlText.match(/planner\.(load|import)Css\s*\([^)]+\)\s*[;]?/gi);
			
			if (urls && urls.length > 0) {
				for (var i = 0; i < urls.length; i++) {
					var url = urls[i].replace(/\s*/g, "")
									 .replace(/planner\.(load|import)Css\(/gi, "")
									 .replace(/\)[;]?/g, "")
									 .slice(1, -1);
					if (   url.length > 3
						&& validUrls.indexOf(url) == -1 
						&& isSameHost(url)
						&& getStoredValuePriv(url, maxAge) === null )
					{	
						validUrls.push(url);
					}
				}
			}
		}
		
		return validUrls;
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
	 * Public method of getValidRetrUrls
	 * 
	 * @public
	 */
	this.getValidRetrieveUrls = function(tmlText, maxAge) {
		return getValidRetrUrls(tmlText, maxAge);
	};
	
	/**
	 * Escape regular expression string
	 * 
	 * @public
 	 * @param {string} str   string
	 * @return {string}	  Escaped string
	 */
	this.escapeRegExp = function(str) {
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	}
	
	/**
	 * This method except executing loadCss would output style tag with key as id and 
	 * value as contents of style, if key can not be found from Session Storage, then 
	 * output a link tag with url as value of href
	 * 
	 * @public
 	 * @param {string} url   URL or URL path to retrieve CSS files
	 * @return {string}	     HTML link tag with url as value of href 
	 */
	this.importCss = function(url) {
		if (window.sessionStorage && typeof window.sessionStorage === "object" && url.trim().length > 0) {
			var key = urlToKey(url);
			var val = getStoredValuePriv(url);
			if (val) {
				return '<style type="text/css" id="' + key.replace(/\$/g, "-") + '">\r\n' + val + '\r\n</style>\r\n';
			}
		}
		
		return '<link type="text/css" href="' + url + '" rel="stylesheet">\r\n';
	};
	
	/**
	 * Processor use this method to retrieve external CSS file,
	 * and use url as key to check Session Storage weather it exist 
	 * in Session Storage, if does not exist then save url and css
	 * code as key/value pair to Session Storage
	 * 
	 * @public
 	 * @param {string} url   URL or URL path to retrieve CSS files
	 * @return {string}	     Empty string
	 */
	this.loadCss = function(url) {
		return "";
	};
	
	/**
	 * This is a dummy method that is used in layout template
	 * 
	 * @public 
 	 * @param {object|null|string|number|boolean} mdl   An JSON member value
  	 * @param {string} tml    Raw template
	 * @return {string}	  Empty string
	 */
	this.section = function(mdl, tml) {
		return "";
	};
	
	/**
	 * Saves URL as key and related file contents as value to Session Storage 
	 * 
	 * @public
 	 * @param {string} url     URL or URL path to retrieve external CSS files
	 * @param {string} value   Contents of external CSS files
	 * @return {boolean}   True at success or false if failed
	 */
	this.updateUrlStorage = function(url, value) {
		if (window.sessionStorage && typeof window.sessionStorage === "object" && 
			url.trim().length > 0 && value.trim().length > 0) {
			var key = urlToKey(url);
			var val = this.minimizeCode(value);
			val = JSON.stringify(val);
			var stamp = ("0000000000" + timeStamp().toString(16)).substr(-10);
			var checksum = ("0000000000" + toolKit.crc32(val)).substr(-10);
			
			if (val.length + 30 < this.getRemainedStorage()) {
				sessionStorage.setItem(key, val + ":" + stamp + ":" + checksum);
				return true;
			}
		}
		
		return false;
	};
	
	/**
	 * Get stored value from related URL and keeping stored time in maximum seconds if maxAge applied 
	 * 
	 * @private
	 * @param {string} url   URL or URL path to retrieve JavaScript, CSS and HTML files
	 * @param {integer=} maxAge   Optional maximum seconds to store key/value pairs in Session Storage
     * @return {string}   Stored value by PlannerFw or null if failed
	 */
	var getStoredValuePriv = function(url, maxAge) {
		maxAge = maxAge || -1;
		if (window.sessionStorage && typeof window.sessionStorage === "object" && url.trim().length > 0) {
			var key = urlToKey(url);
			var val = sessionStorage.getItem(key);
			if (val && val.length > 22) {
				var rval = val.slice(0, -22);
				var elapsed = timeStamp() - parseInt(val.substr(-21).substr(0, 10), 16);
				var checksum = ("0000000000" + toolKit.crc32(rval)).substr(-10);
				
				if (   checksum === val.substr(-10) 
				    && (maxAge === -1 || elapsed < maxAge) )
				{	
					return JSON.parse(rval);
				}
			}
		}
		
		return null;
	};
	
	/**
	 * Public method of getStoredValuePriv
	 * 
	 * @public
	 */
	this.getStoredValue = function(url, maxAge) {
		return getStoredValuePriv(url, maxAge);
	}
	
	/**
	 *  Return a object that contains key/related-URL pairs in Session Storage 
     *
	 * @public
	 * @param  {object|string|void} regexp   A regular expression object, a string will be converted
	 *                                       to a regular expression object, or no parameter
	 * @return {object}  An object of key/related-URL pairs. 
	 *                   Returns empty object if no match is not found. 
	 */
	this.searchStoredKeys = function(regexp) {
		var keyUrls = {};
		if (window.sessionStorage && typeof window.sessionStorage === "object") {
			var keys = Object.keys(sessionStorage);
			for (var i = 0; i < keys.length; i++) {
				if (keys[i].substr(0, 3).toLowerCase() == "pf_") {
					if (typeof regexp == "undefined") {
						keyUrls[keys[i]] = keyToUrl(keys[i]);
					} else if (regexp && keyToUrl(keys[i]).search(regexp) != -1) {
						keyUrls[keys[i]] = keyToUrl(keys[i]);
					}
				}
			}
		}
		
		return keyUrls;
	};
	
	/**
	 * Return size of all key/value pairs in Session Storage 
	 * 
	 * @public
	 * @return {number}   Integer or -1 if there is no JavaScript, CSS and HTML contents stored
	 */
	this.getUrlStorageSize = function() {
		if (window.sessionStorage && typeof window.sessionStorage === "object") {
			var valSize = 0;
			var keys = Object.keys(sessionStorage);
			for (var i = 0; i < keys.length; i++) {
				if (keys[i].substr(0, 3).toLowerCase() == "pf_") {
					valSize += sessionStorage.getItem(keys[i]).length;
				}
			}
			return valSize;
		}
		
		return -1;
	};
	
	/**
	 * Return size of Session Storage is able to stored new key/value pairs
	 * 
	 * @public
	 * @return {number}   Integer or 0 if there is no JavaScript, CSS and HTML contents stored
	 */
	this.getRemainedStorage = function() {
		if (window.sessionStorage && typeof window.sessionStorage === "object") {
			return storageLimit - JSON.stringify(sessionStorage).length;
		}
		
		return 0;
	};
	
	/**
	 * Deletes all key/value pairs related with remote JavaScript, CSS and 
	 * HTML files from Session Storage 
	 * 
	 * @public
	 * @return {boolean}   True at success or false if failed
	 */
	this.removeAllCollections = function() {
		if (window.sessionStorage && typeof window.sessionStorage === "object") {
			var keys = Object.keys(sessionStorage);
			for (var i = 0; i < keys.length; i++) {
				if (keys[i].substr(0, 3).toLowerCase() == "pf_") {
					sessionStorage.removeItem(keys[i]);
				}
			}
			return true;
		}
		
		return false;
	};
	
	/**
	 * Converts URL string or array to key or key array, then deletes 
	 * result key/value pairs in Session Storage
	 * 
	 * @public
	 * @param  {string|array} urls   A string or array of URLs
	 * @return {boolean}   True at success or false if failed
	 */
	this.removePartCollections = function(urls) {
		if (window.sessionStorage && typeof window.sessionStorage === "object") {
			if (Array.isArray(urls) && urls.length > 0) {
				var flag = false;
				for (var i = 0; i < urls.length; i++) {
					var ki = urlToKey(urls[i]);
					if (sessionStorage.getItem(ki) != null) {
						sessionStorage.removeItem(ki);
						flag = true;
					}
				}
				return flag;
			} else if (typeof urls == "string" && urls.trim().length > 0) {
				var ki = urlToKey(urls);
				if (sessionStorage.getItem(ki) != null) {
					sessionStorage.removeItem(ki);
					return true;
				}
			}
		}
		
		return false;
	};
	
	/**
	 *  Return a object that contains URL/content pairs in Session Storage  
	 * 
	 * @public
	 * @param  {object|string} regexp   A regular expression object, or a string will
	 *                                  be converted to a regular expression object
	 * @return {object}  An object of URL/content pairs. 
	 *                   Returns empty object if no match is not found.
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
						var checksum = ("0000000000" + toolKit.crc32(rval)).substr(-10);
						
						if (checksum === val.substr(0, -10) && rval.search(regexp) != -1) {
							urlVals[keyToUrl(keys[i])] = JSON.parse(rval);
						}
					}
				}
			}
		}
		
		return urlVals;
	};
	
	/**
	 * Load postprocessor library
	 * 
	 * Comparison mothods in postprocessor library and methods in this library:
	 * 
 	 * crc32(str)                            --- crc32(str)
	 * crc32CheckSum(str)                    --- crc32CheckSum(str)
 	 * getStoredValue(url)                   --- getStoredValue(url)
 	 * getRemainedStorage()                  --- getRemainedStorage()
 	 * searchStoredKeys(regexp)              --- searchStoredKeys(regexp)
 	 * searchStoredValues(regexp)            --- searchStoredValues(regexp)
	 * urlToStoredKey(url)                   --- urlToKey(url)
 	 * storedKeyToUrl(key)                   --- keyToUrl(key)
	 * styleId2Url(id)                       --- 
	 * url2StyleId(url)                      --- 
	 * switchCssById(styleId, toStyleUrl)    --- 
	 * switchCssByUrl(styleUrl, toStyleUrl)  --- 
	 * md5Hash(str)                          ---
	 * 
	 * @public
	 * @return {string}   HTML script tag to load Post-Processor library
	 */
	this.loadPostProcessor = function() {
		return '<script type="text/javascript">postprocessor.min.js</script>\r\n';
	};
}

/**
 * Bidirectional JXON(lossless JavaScript XML Object Notation) transforming
 * A customized version of JXON framework from Mozilla Developer Network by W3plan Technologies
 * 
 * Supermodule
 * 
 * @constructor
 * 
 */
var plannerJxon = function() {
	/**
	 * Define variables
	 * 
	 * @private
	 * 
	 */
	var sValProp = "keyVal",			// Name for value of node
		sAttrProp = "keyAttrs",	    	// Name for attributes of node
		sAttrsPref = "_",				// Attribute prefix 
		aCache = [],
		emptyTree = {
			toString: function() {
							return "null";
					},
			valueOf: function() {
						return null;
					}
		};
	
	/**
	 * Convert variable into object if variable is not an object
	 * 
	 * @private
 	 * @param {object} vVal  A JavaScript variable
	 * @return {object} An object
	 */
	var objectify = function(vVal) {
        return vVal === null ? emptyTree : vVal instanceof Object ? vVal : new vVal.constructor(vVal);
    };
	
	/**
	 * Parse string if it is one of white space character, boolean or number 
	 * 
	 * @private
 	 * @param {string} sValue  A JavaScript variable
	 * @return    A string, or number, or boolean or null 
	 */
	var parseText = function(sValue) {
        if (/^\s*$/.test(sValue)) {
            return null;
        }
        if (/^(?:true|false)$/i.test(sValue)) {
            return sValue.toLowerCase() === "true";
        }
        if (isFinite(sValue)) {
            return parseFloat(sValue);
        } 
        return sValue;
    };
	
	/**
	 * Create JSON from an XML document object 
	 * 
	 * @private
 	 * @param {object} oParentNode  XML document object
	 * @param {integer} nVerb  An integer from 0 to 3
	 * @param {boolean} bNesteAttr  Attributes of element to nest as a child object or not
	 * @return {object}   An JSON
	 */
	var getObjTree = function(oParentNode, nVerb, bNesteAttr) {
        var
            nLevelStart = aCache.length,
            bChildren = oParentNode.hasChildNodes(),
            bHighVerb = Boolean(nVerb & 2),
            sProp, vContent, nLength = 0,
            sCollectedTxt = "",
			vResult = bHighVerb ? {} : "";
		
		if (oParentNode.hasAttributes) {
			bAttributes = oParentNode.hasAttributes();
		} else {
			bAttributes = false;
		}
		
        if (bChildren) {
            for (var oNode, nItem = 0; nItem < oParentNode.childNodes.length; nItem++) {
                oNode = oParentNode.childNodes.item(nItem);
				
                if (oNode.nodeType === 4) {
                    sCollectedTxt += oNode.nodeValue; 
                } else if (oNode.nodeType === 3) {
                    sCollectedTxt += oNode.nodeValue.trim();
                } else if (oNode.nodeType === 1) {
                    aCache.push(oNode);
                }
            }
        }
		
        var nLevelEnd = aCache.length,
            vBuiltVal = parseText(sCollectedTxt);
		
        if (!bHighVerb && (bChildren || bAttributes)) {
            vResult = nVerb === 0 ? objectify(vBuiltVal) : {};
        }
		
        for (var nElId = nLevelStart; nElId < nLevelEnd; nElId++) {
            sProp = aCache[nElId].nodeName;
            vContent = getObjTree(aCache[nElId], nVerb, bNesteAttr);
            if (vResult.hasOwnProperty(sProp)) {
                if (vResult[sProp].constructor !== Array) {
                    vResult[sProp] = [vResult[sProp]];
                }
                vResult[sProp].push(vContent);
            } else {
                vResult[sProp] = vContent;
                nLength++;
            }
        }
		
        if (bAttributes) {
            var
				nAttrLen = (oParentNode.attributes) ? oParentNode.attributes.length : 0,
                sAPrefix = bNesteAttr ? "" : sAttrsPref,
                oAttrParent = bNesteAttr ? {} : vResult;
			
            for (var oAttrib, nAttrib = 0; nAttrib < nAttrLen; nLength++, nAttrib++) {
                oAttrib = oParentNode.attributes.item(nAttrib);
                oAttrParent[sAPrefix + oAttrib.name] = parseText(oAttrib.value.trim());
            }
            if (bNesteAttr) {
                vResult[sAttrProp] = oAttrParent;
                nLength -= nAttrLen - 1;
            }
        }

        if (nVerb === 3 || (nVerb === 2 || nVerb === 1 && nLength > 0) && sCollectedTxt) {
            vResult[sValProp] = vBuiltVal;
        } else if (!bHighVerb && nLength === 0 && sCollectedTxt) {
            vResult = vBuiltVal;
        }
		
		// Force to output {} as "" 
		if (typeof vResult === "object" && Object.getOwnPropertyNames(vResult).length === 0) {
			vResult = "";
		}
		
		// Do not convert null to "null"
		if (typeof vResult === "string" && vResult.toLowerCase() == "null") {
			vResult = null;
		}
		
        aCache.length = nLevelStart;		
        return vResult;
    };
	
	/**
	 * Create XML document object from JSON
	 * 
	 * @private
 	 * @param {object} oXMLDoc  Element XML document object
	 * @param {object} oParentEl  Parent element XML object
	 * @param {object} oParentObj  An JSON
	 * @return {void}  
	 */
	var loadObjTree = function(oXMLDoc, oParentEl, oParentObj) {
		var vValue, oChild;

		if (oParentObj.constructor === String || oParentObj.constructor === Number || oParentObj.constructor === Boolean) {
			oParentEl.appendChild(oXMLDoc.createTextNode(oParentObj.toString()));
			if (oParentObj === oParentObj.valueOf()) { return; }
		} else if (oParentObj.constructor === Date) {
			oParentEl.appendChild(oXMLDoc.createTextNode(oParentObj.toGMTString()));
		}
		
		for (var sName in oParentObj) {
			vValue = oParentObj[sName];
			if (isFinite(sName) || vValue instanceof Function) { continue; }
			if (sName === sValProp) {
				if (vValue !== null && vValue !== true) {
					oParentEl.appendChild(oXMLDoc.createTextNode(vValue.constructor === Date ? vValue.toGMTString() : String(vValue))); 
				}
			} else if (sName === sAttrProp) {
				for (var sAttrib in vValue) {
					oParentEl.setAttribute(sAttrib, vValue[sAttrib]); 
				}
			} else if (sName.charAt(0) === sAttrsPref) {
				oParentEl.setAttribute(sName.slice(1), vValue);
			} else if (vValue.constructor === Array) {
				for (var nItem = 0; nItem < vValue.length; nItem++) {
					oChild = oXMLDoc.createElement(sName);
					loadObjTree(oXMLDoc, oChild, vValue[nItem]);
					oParentEl.appendChild(oChild);
				}
			} else {
				oChild = oXMLDoc.createElement(sName);
				if (vValue instanceof Object) {
					loadObjTree(oXMLDoc, oChild, vValue);
				} else if (vValue !== null && vValue !== true) {
					oChild.appendChild(oXMLDoc.createTextNode(vValue.toString()));
				}
				oParentEl.appendChild(oChild);
			}
		}
	};
	
	/**
	 * Convert XML document object into JSON
	 * 
	 * @public 
	 * @param {object} xmlObj   An XML document object
	 * @param {integer=} verbosity   An optional verbosity level of conversion
	 * @param {boolean=} nesteAttr   An optional expressing whether to nest attributes as value 
	                                 to keyAttrs, default is false
	 * @return {object}    A JSON
	 */
	this.xml2Json = function(xmlObj, verbosity, nesteAttr) {
        var verbMask = arguments.length > 1 && typeof verbosity === "number" ? verbosity & 3 : 1;
        return getObjTree(xmlObj, verbMask, arguments.length > 2 ? nesteAttr : verbMask === 3);
    };
	
	/**
	 * Convert JSON into XML document object
	 * 
	 * @public 
	 * @param {object} obj  A JSON
	 * @param {string=} namespaceURI    A optional namespace URI to XML document
	 * @param {string=} qualifiedName   A optional prefix to root node of XML document
	 * @param {object=} documentType    A optional XML documentType object
	 * @return {object}  An XML document object  
	 */
	this.json2Xml = function (obj, namespaceURI, qualifiedName, documentType) {
		var newDoc = document.implementation.createDocument(namespaceURI || null, qualifiedName || "", documentType || null);
		loadObjTree(newDoc, newDoc, obj);
		return newDoc;
	};
	
	/**
	 * Convert XML string into XML document object
	 * 
	 * @public 
	 * @param {string} xmlStr An XML string
	 * @return {object} An XML document object
	 */
	this.string2Xml = function(xmlStr) {
		return (new window.DOMParser()).parseFromString(xmlStr, 'application/xml'); 
	};
	
	/**
	 * Convert XML document object into serialized string
	 * 
	 * @public 
	 * @param {object} xmlObj  An XML document object
	 * @return {string} A serialized string
	 */
	this.xml2String = function(xmlObj) {
		if (typeof xmlObj.xml !== "undefined") {
			return xmlObj.xml;
		} else {
			return (new XMLSerializer()).serializeToString(xmlObj);
		}
	};
};

/**
 * PlannerFw derived module
 * 
 * Submodule
 * 
 * @constructor
 * 
 * @param {string} version Released version number
 * @extends plannerBase, plannerValidation, plannerEncryption, plannerPfCss, plannerStorage, plannerJxon 
 * 
 */
var plannerApp = function(version) {
	"use strict";
	
	// Multiple inheritances
	plannerBase.apply(this, arguments);
	plannerValidation.apply(this, arguments);
	plannerEncryption.apply(this, arguments);
   	plannerPfCss.apply(this, arguments);
	plannerStorage.apply(this, arguments);
	plannerJxon.apply(this, arguments);
    
	/**
	* @const
	*/
	this.TITLE = "Processor Library";
	this.DESCRIPTION = "JavaScript library for Page Processor";
	this.EDITION = "Exec";
	this.VERSION = version;
	this.COPYRIGHT = "2015-2016 W3plan Technologies";
	
	window.name = "PlannerFw Exec " + version;
	
	/**
	 * If browser version is lower than Chrome 1+, Firefox 3.5+, IE8+, Opera 10.5+ and Safari 4+
	 * then show error message and stop processing
	 * 
	 * @private 
	 * @return {undefined}
	 */
	var checkJsonSupport = function() {
		if (!(window.JSON && typeof window.JSON.parse === "function")) {
            throw new Error("Your browser doesn't support JSON");
		}
	};
	
	/**
	 * If browser version does not support XMLHttpRequest then show error message and stop processing
	 * 
	 * @private 
	 * @return {undefined}
	 */
	var checkXMLHttpRequestSupport = function() {
		if (!window.XMLHttpRequest) {
            throw new Error("Your browser doesn't support XMLHttpRequest");
		}
	};
	
	/**
	 * If browser version does not support cookie then show error message and stop processing
	 * 
	 * @private 
	 * @return {undefined}
	 */
	var checkCookieSupport = function() {
		if (!navigator.cookieEnabled) {
            errorHandle.outputMessage(2, "Your browser doesn't support cookie");
		}
	};
	
	/**
	 * Public method of checkJsonSupport and checkXMLHttpRequestSupport
	 * 
	 * @public 
	 * @return {undefined}
	 */
	this.checkEnvironment = function() {
		checkJsonSupport();
		checkXMLHttpRequestSupport();
		checkCookieSupport();
	};
    
	/**
	 * Show error message with Planner's error handler
	 * 
	 * @public
	 * @param {integer} errorLevel   PlannerFw defined error level from 0 to 3 
     * @param {string} errorMeg   Error message
     * @return {undefined}
	 */
	this.errorHandler = function(errorLevel, errorMsg) {    
        errorHandle.outputMessage(errorLevel, errorMsg);
	};
};

/**
 *
 * Create global object
 *
 */
this.planner = new plannerApp ("Version 2.1.0");

if (Object.freeze) {
	Object.freeze(planner);
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
