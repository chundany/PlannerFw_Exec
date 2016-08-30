/**
 * Page Processor
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
// Global error handler
var log = 0;
pfConfig.isProduct = false;
if (pfConfig.environment.toLowerCase() == "production") {
    log = 1;
    pfConfig.isProduct = true;
}

window.onerror = function (errorMsg, file, lineNo, col, error) {
    lineNo = lineNo || "";
    if (errorMsg.slice(-6) != "PfStop") 
        window.location.href  = pfConfig.clientErrorHandler + "?level=&msg=" +  encodeURIComponent(errorMsg) + "&line=" + lineNo + "&log=" + log;
};

// check whether Processor Library was loaded
if (!window.planner) {
	throw new Error("Failed to load Processor Library");
}

// Check the browser support
planner.checkEnvironment();

// Declare global variables
var pfIndex = {};
var pfModel = null;
var pfTemp = null;

// start tracking time
if (pfConfig.trackExecutedTime) {	
	pfIndex.start = planner.startWatch();
	planner.updateTrackTime(0);
}

if (pfConfig.processorPath.substr(0, 1) !== "/") {
	pfConfig.processorPath = "/" + pfConfig.processorPath;
} else if (pfConfig.processorPath.substr(-1) === "/") {
	pfConfig.processorPath = pfConfig.processorPath.slice(0, -1);
}

/**
 *  PlannerFw Router parses request to get template URL and 
 *  model URL then decides which action to take
 *  
 */
pfIndex.rurl = decodeURIComponent(window.location.href).trim();
pfIndex.lowrurl = pfIndex.rurl.toLowerCase();
pfIndex.isWebsoket = false;
pfIndex.tokenFlag = false;
pfIndex.temp = null;
pfIndex.layout = null;
pfIndex.layoutObj = null;
pfIndex.model = null;
pfIndex.method = null;
pfIndex.xmodel = null;
pfIndex.suppl = "";
pfIndex.xhrs = {};

if ( pfIndex.lowrurl.indexOf("?tml=") !== -1 && 
	(pfIndex.lowrurl.indexOf("&mdl=") !== -1 || pfIndex.lowrurl.indexOf("&xmdl=") !== -1) &&
	(pfIndex.lowrurl.indexOf("?tml=") < pfIndex.lowrurl.indexOf("&mdl=") || pfIndex.lowrurl.indexOf("?tml=") < pfIndex.lowrurl.indexOf("&xmdl=")) )
{	
	pfIndex.qstr = pfIndex.rurl.substr(pfIndex.rurl.indexOf("?") + 1);
	
	if (pfIndex.lowrurl.indexOf("&mdl=") !== -1) {
		pfIndex.model = pfIndex.qstr.substr(pfIndex.qstr.indexOf("&mdl=") + 5);
		
		if (pfIndex.model && pfIndex.model != "/") {
			if (pfIndex.model.substr(0, 5).toLowerCase() == "ws://" || pfIndex.model.substr(0, 6).toLowerCase() == "wss://") {
				pfIndex.model = pfIndex.model.replace('...', window.location.hostname);
				
				if (pfIndex.model.indexOf("/", 6) !== -1) {
					pfIndex.suppl = pfIndex.model.substr(pfIndex.model.indexOf("/", 6));
					pfIndex.model = pfIndex.model.substring(0, pfIndex.model.indexOf("/", 6));					
				}
				if (pfIndex.model.substr(pfIndex.model.lastIndexOf(":"), 3) == "://") {
					pfIndex.model += ":" + pfConfig.defaultWebsocketPort;
				}
				pfIndex.isWebsoket = true;
				
			} else {
				if (pfIndex.model.toLowerCase().indexOf("method=get") !== -1) {
					pfIndex.model = pfIndex.model.replace(/\?method=get&/gi, "?").replace(/\?method=get/gi, "").replace(/&method=get/gi, "");
				} else if (pfIndex.model.toLowerCase().indexOf("method=post") !== -1) {
					pfIndex.method = "post";
					pfIndex.model = pfIndex.model.replace(/\?method=post&/gi, "?").replace(/\?method=post/gi, "").replace(/&method=post/gi, "");
				} else if (pfIndex.model.toLowerCase().indexOf("method=put") !== -1) {
					pfIndex.method = "put";
					pfIndex.model = pfIndex.model.replace(/\?method=put&/gi, "?").replace(/\?method=put/gi, "").replace(/&method=put/gi, "");
				} else if (pfIndex.model.toLowerCase().indexOf("method=delete") !== -1) {
					pfIndex.method = "delete";
					pfIndex.model = pfIndex.model.replace(/\?method=delete&/, "?").replace(/\?method=delete/, "").replace(/&method=delete/, "");
				}
			}
			
			planner.checkAllowedRequest(pfIndex.model);
		
		}
		
		pfIndex.tempField = pfIndex.qstr.substr(0, pfIndex.qstr.indexOf("&mdl="));
		
		pfIndex.temp = pfIndex.tempField.substr(pfIndex.tempField.indexOf("=") + 1);
		
	} else if (pfIndex.lowrurl.indexOf("&xmdl=") !== -1) {
		pfIndex.xmodel = pfIndex.qstr.substr(pfIndex.qstr.indexOf("&xmdl=") + 6);
		
		if (pfIndex.xmodel && pfIndex.xmodel != "/") {
			if (pfIndex.xmodel.substr(0, 5).toLowerCase() == "ws://" || pfIndex.xmodel.substr(0, 6).toLowerCase() == "wss://") {
				pfIndex.xmodel = pfIndex.xmodel.replace('...', window.location.hostname);
				if (pfIndex.xmodel.indexOf("/", 6) !== -1) {
					pfIndex.suppl = pfIndex.xmodel.substr(pfIndex.xmodel.indexOf("/", 6));
					pfIndex.xmodel = pfIndex.xmodel.substring(0, pfIndex.xmodel.indexOf("/", 6));					
				}
				if (pfIndex.xmodel.substr(pfIndex.xmodel.lastIndexOf(":"), 3) == "://") {
					pfIndex.xmodel += ":" + pfConfig.defaultWebsocketPort;
				}
				
				pfIndex.isWebsoket = true;
			}
			
			planner.checkAllowedRequest(pfIndex.xmodel);
			
		}
		
		pfIndex.tempField = pfIndex.qstr.substr(0, pfIndex.qstr.indexOf("&xmdl="));
		
		pfIndex.temp = pfIndex.tempField.substr(pfIndex.tempField.indexOf("=") + 1);		
	}
	
	if (pfIndex.temp && pfIndex.temp.substr(0, 1) !== "/") {
		pfIndex.temp = "/" + pfIndex.temp; 
	}
	
	if (pfIndex.temp && pfIndex.temp != "/") {
		if (pfIndex.temp.toLowerCase() == "/layout" || pfIndex.temp.toLowerCase() == "/layout/" ) {
			pfIndex.temp = pfConfig.defaultLayout;
		} else if (pfIndex.temp.toLowerCase() == "/template" || pfIndex.temp.toLowerCase() == "/template/" ) {
			pfIndex.temp = pfConfig.defaultTemplate;
		} else {
			planner.checkAllowedRequest(pfIndex.temp);
		}
	} else {
		pfIndex.temp = pfConfig.defaultTemplate;
	}
	
} else if (/\?tml=\/?template\/?.*/i.test(pfIndex.rurl)) {
	pfIndex.temp = pfIndex.rurl.substr(pfIndex.rurl.indexOf("?tml=") + 5);
	if (pfIndex.temp && pfIndex.temp.substr(0, 1) !== "/") {
		pfIndex.temp = "/" + pfIndex.temp; 
	}
	if (pfIndex.temp.length < 11) {
		pfIndex.temp = pfConfig.defaultTemplate;
	}
	pfIndex.model = pfConfig.defaultModel;
} else if (/\?tml=\/?layout\/?.*/i.test(pfIndex.rurl)) {
	pfIndex.temp = pfIndex.rurl.substr(pfIndex.rurl.indexOf("?tml=") + 5);
	if (pfIndex.temp && pfIndex.temp.substr(0, 1) !== "/") {
		pfIndex.temp = "/" + pfIndex.temp; 
	}
	if (pfIndex.temp.length < 9) {
		pfIndex.temp = pfConfig.defaultLayout;
	}
	pfIndex.model = pfConfig.defaultLayoutModel;
} else if (/\?mdl=[^\/]+/i.test(pfIndex.lowrurl)) {
	pfIndex.temp = pfConfig.defaultTemplate;
	pfIndex.model = pfIndex.rurl.substr(pfIndex.rurl.indexOf("?mdl=") + 5);
} else if (/\?xmdl=[^\/]+/i.test(pfIndex.lowrurl)) {
	pfIndex.temp = pfConfig.defaultTemplate;
	pfIndex.model = pfIndex.rurl.substr(pfIndex.rurl.indexOf("?xmdl=") + 6);
} else {
	pfIndex.temp = pfConfig.defaultTemplate;
	pfIndex.model = pfConfig.defaultModel;
}

if (pfConfig.isProduct) {
	planner.deleteCookie("pf_times");
}

/**
 * 	Processor collects template, model and storable CSS 
 *  then generates HTML/CSS/JavaScriopt page
 *  
 */	
if (pfConfig.trackExecutedTime) {
	planner.updateTrackTime(pfIndex.start);
}

/**
 * 	Get model from URL
 *
 */
if (pfModel) {
	checkPfDataSpace();
} else {
	if (pfIndex.isWebsoket) {
		if (pfIndex.model) {
			var modelUrl = pfIndex.model + pfIndex.suppl;
		} else {
			var modelUrl = pfIndex.xmodel + pfIndex.suppl;
		}
		retrieveModelWs(modelUrl);
	} else {
		retrieveModel();
	}
}

/**
 * 	Retrieve model over HTTP or HTTPS
 *
 */
function retrieveModel() {
	if (pfIndex.model) {
		if (pfIndex.method) {
			var xhr = planner.getRequestObj("Model", pfIndex.model, pfConfig.isProduct, pfIndex.method);
		} else {
			var xhr = planner.getRequestObj("Model", pfIndex.model, pfConfig.isProduct);
		}
	} else {
		var xhr = planner.getRequestObj("XModel", pfIndex.xmodel, pfConfig.isProduct, "", "xml");
	} 
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200 || xhr.status == 203 ) { 
				if (pfIndex.model) {  
					pfModel = xhr.responseText;
					checkPfDataSpace();
				} else { 
					if (xhr.responseXML) {
						var resultJson = planner.xml2Json(xhr.responseXML);	
						var root = Object.keys(resultJson)[0];
						pfModel = resultJson[root];
						checkPfDataSpace();
					} else {
                        planner.errorHandler(2, "Invalid request for XML");
					}
				}
			} else {
                throw new Error("Error to access external resource, the processes stopped");
			}
		}
	};
	xhr.ontimeout = function() {
        planner.errorHandler(2, "Request Timeout");
	};
	xhr.onerror = function() {
		throw new Error("Error to access external resource, the processes stopped");
	};
}

/**
 * 	Retrieve model over WebSocket or WebSocket Security
 *
 */
function retrieveModelWs(uri) {
	if (window.WebSocket && typeof window.WebSocket === "function") {
		var wsocket = new WebSocket(uri);
		wsocket.onmessage = function(msg) {
								if (pfIndex.model) {
									pfModel = msg.data;
								} else {
									var xmodelObj = planner.string2Xml(msg.data);
									var resultJson = planner.xml2Json(xmodelObj);
									var root = Object.keys(resultJson)[0];
									pfModel = resultJson[root];
								}
								//wsocket.close();
								wsocket = null;
								checkPfDataSpace();
							};
		wsocket.onerror = function(msg) {
								//wsocket.close();
								wsocket = null;
                                planner.errorHandler(2, "A WebSocket error occurred");
							};
		wsocket.ontimeout = function(msg) { 
								wsocket = null; 
							};
	} else {
		planner.errorHandler(2, "Your browser does not support WebSocket");
	}
}

/**
 * 	Get variable pfModel and check data makeup
 */
function checkPfDataSpace() {
	pfModel = planner.responseJsonEncode(pfModel);
	planner.checkResponseData(pfModel);
	
	if (document.cookie.indexOf("pf_auth_token") !== -1) {
		var authToken = planner.getCookie("pf_auth_token");
		if (authToken) {
			pfIndex.tokenFlag = true;
		}
	}
	
	if (pfModel.hasOwnProperty("jwtClaim") && pfModel.jwtClaim && 
		pfModel.hasOwnProperty("jwt") && pfModel.jwt.length > 10) {
		planner.setCookie('pf_auth_token', pfModel.jwt);
		pfIndex.tokenFlag = true;
	} else if (pfModel.hasOwnProperty("jwtClaim") && !pfModel.jwtClaim && pfIndex.tokenFlag){
		planner.deleteCookie('pf_auth_token');
		pfIndex.tokenFlag = false;
	}
	
	if (pfModel.hasOwnProperty("errorLevel") && pfModel.hasOwnProperty("errorMessage")) {
        planner.errorHandler(pfModel.errorLevel, pfModel.errorMessage);
	}
	
	getMetaModel();
}

function getMetaModel() {
	var rspData = pfModel.pfDataSet;
	
	var pfDataKey = planner.getCookie("pfDataKey");	
	if (pfDataKey) {
		planner.deleteCookie("pfDataKey");
	}
	if (rspData) {
		// Validate, check and decrypt data members
		planner.secureModel(rspData, pfDataKey);
	}
	
	pfDataKey = null;	
	pfModel.pfDataSet = rspData;
	
	getTemplate();
}

/**
 * 	Get Template or Layout template from URL
 *
 */	
function getTemplate() {
	if (pfConfig.trackExecutedTime) {
		planner.updateTrackTime(pfIndex.start);
	}
	
	var reqType = "Template";
	if (pfIndex.temp.substr(0, 7).toLowerCase() == "/layout") {
		reqType = "LayoutTemplate";
	}
	
	pfIndex.xhr = planner.getRequestObj(reqType, pfIndex.temp, pfConfig.isProduct);
	
	pfIndex.xhr.onreadystatechange = function() {
		if (pfIndex.xhr.readyState == 4) {
			if (pfIndex.xhr.status == 200 || pfIndex.xhr.status == 203) {
				preparePage(pfIndex.xhr.responseText);
			} else {
                throw new Error("Error to access external resource, the processes stopped");
			}
		}
	};
	
	pfIndex.xhr.ontimeout = function() {
        planner.errorHandler(2, "Request Timeout");
	};
	
	pfIndex.xhr.onerror = function() {
        throw new Error("Error to access external resource, the processes stopped");
	};
}

/**
 * 	Prepare page code for rendering
 */
function preparePage(tmlText) {
	if (pfConfig.trackExecutedTime) {
		planner.updateTrackTime(pfIndex.start);
	}
	
	var validUrls = planner.getValidRetrieveUrls(tmlText, pfConfig.storeMaxAge);		
	var count = validUrls.length;
	
	if (0 < count) {
		getThemeFile(0, count, validUrls, renderPage, tmlText);
	} else {
		renderPage(tmlText);
	}
}

/**
 * 	Iteration function to retrieve css theme file(s) from array of URL
 *
 */
function getThemeFile(i, cnt, urls, callback, param) {
	pfIndex.xhrs[i] = planner.getRequestObj("PFCSS", urls[i], pfConfig.isProduct);
	
	pfIndex.xhrs[i].onreadystatechange = function() {
		if (pfIndex.xhrs[i].readyState == 4) {
			if (pfIndex.xhrs[i].status == 200 || pfIndex.xhrs[i].status == 203) {
				planner.updateUrlStorage(urls[i], pfIndex.xhrs[i].responseText);
			}
			
			if (i + 1 < cnt) {
				getThemeFile(i + 1, cnt, urls, callback, param);
			} else {
				callback(param);
			}
		}
	};
}

/**
 * 	Render dynamic web page
 */
function renderPage(tmlText) {
	if (pfConfig.trackExecutedTime) {
		planner.updateTrackTime(pfIndex.start);
	}
	
	eval(tmlText);
	var html = pfTemp(pfModel.pfDataSet, planner);
	
	document.write(html);
	document.close();
	
	if (pfConfig.trackExecutedTime) {
		planner.updateTrackTime(pfIndex.start, true);
        planner.errorHandler(3, planner.getElapsedTime(pfIndex.start));
	}
	
	pfModel = null;
	pfTemp = null;
	pfIndex = null;
	
	if (pfConfig.isProduct) {
		planner = null;
	}
	pfConfig = null;
}

})();
