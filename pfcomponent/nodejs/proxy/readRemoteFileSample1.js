/**
 * Sample 1 to read Google New RSS Feed List with Node.js, PlannerFw output results as model in XML
 * 
 * This sample uses http module for response data 
 * 
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 */

var request = require('request');
var url = "http://news.google.com/?output=rss&pz=1&cf=all&ned=us&hl=en";
var contents = '';

request.get(url, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		contents = body;
	}
});

var http = require('http');

http.createServer(function (req, res) {
	var pfNodes = "<description>Sample of server proxy for Google News RSS Feeds</description><expiration>0</expiration><encryption>null</encryption><count>1</count><pfDataSet>";
	var pfNodes_close = "</pfDataSet>";
	var closedTags = "</rss>";
	
	var channelPos = contents.indexOf("<channel>");
	var contentsLen = contents.length;
	
	var xml = contents.substr(0, channelPos) + pfNodes + contents.slice(channelPos, -6) + pfNodes_close + closedTags;
    
	res.writeHead(200, {'Content-Type': 'text/plain'});
	
	res.end(xml);
}).listen(8000, '127.0.0.1');
