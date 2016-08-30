/**
 * Page Processor for server
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

/**
 * Page Processor configuration
 * 
 */
var pfConfig = {
	/**
	 * Set application environment either Development or Production
	 * default value is Development
	 * 
	 */
	environment : "Development",
	
	/**
	 * Set current file path started from website root
	 *  
	 */
	processorPath : "/app",
		
	/**
	 * Set site default template URL, when variable pftml is one of 
	 * undefined, 'template', '/template', 'template/' or '/template/',  
	 * this variable would be used to retrieve template
	 *
	 */
	defaultTemplate : "/template/pfm/a/index.html.js",
	
	/**
	 * Set site default template layout URL. When variable pftml is
     * one of 'layout', '/layout', 'layout/' or '/layout/',  
	 * this variable would be used to retrieve layout template
	 *
	 */
	defaultLayout : "/layout/pfm/a/index.html.js",
	
    /**
	 * An server-side file to display error message or to log client errors of production environment
	 * File extension varies depending on web servers 
     *
     * If server isn't PHP, replace it with related file 
     *
	 */
    clientErrorHandler: "/errors/php/client-error-handler.php",
	
	/**
	 * Set maximum seconds to store key/value pairs in Session Storage
	 * under PlannerFw storing mechanisms
	 *
	 */
	storeMaxAge : 1800,
	
	/**
	 * Set to track elapsed time 
	 *
	 */
	trackExecutedTime : true
};

/**
 * Processes start
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
 * 	A brief part as model was ready and template URL was assigned 
 */

pfIndex.temp = null;
pfIndex.layout = null;
pfIndex.layoutObj = null;
pfIndex.xhrs = {};
pfIndex.isXmodel = false;

if (window.pftml && window.pftml.trim().length > 1) {
	if (window.pftml && window.pftml.substr(0, 1) !== "/") {
		window.pftml = "/" + window.pftml; 
	}
	
	if (window.pftml.substr(0, 9).toLowerCase() == "/template" || window.pftml.substr(0, 7) == "/layout") {
		pfIndex.temp = window.pftml;
	} else {
		throw new Error("Template has to be from template or layout subdirectory of web site");
	}
	
} else {
	pfIndex.temp = pfConfig.defaultTemplate;
}

if (pfConfig.isProduct) {
	planner.deleteCookie("pf_times");
}

if (window.pfmdl && (typeof window.pfmdl === "string" || typeof window.pfmdl === "object")) {
	pfModel = window.pfmdl;
} else if (window.pfxmdl && typeof window.pfxmdl === "string") {
	pfModel = window.pfxmdl; 
	pfIndex.isXmodel = true;
} else {
    planner.errorHandler(2, "There is no model output");
}

if (pfIndex.isXmodel) {
	var xmodelObj = planner.string2Xml(pfModel);
	var resultJson = planner.xml2Json(xmodelObj);
	var root = Object.keys(resultJson)[0];
	pfModel = resultJson[root];
}

if (pfConfig.trackExecutedTime) {
		planner.updateTrackTime(pfIndex.start);
	}	

checkPfDataSpace();

/**
 * 	Following part is same with relative part in processor.js
 */

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
