<?php
/**
 * Read remote file with proxy function and save output to variable $xml
 * 
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 *
 */

require $_SERVER["PFCOMPONENT_PATH"] . '/php/proxy/read-remote-file.php';

// Google News RSS Feeds
$url = "https://news.google.com/?output=rss";

// Extra query fields to request
$fields = array(	"pz" => 1,
					"cf" => "all",
					"ned" => "us",
					"hl" => "en"
				);

$rss = pfReadFile($url, $fields);

if (strlen($rss) > 0) {
	// Strip special characters \t - chr(9), \n - chr(10), \r - chr(13)
	$rss = str_replace(array(chr(9), chr(10), chr(13)), "", $rss);
	
	// Compress multiple whitespaces into one whitespace
	$rss = preg_replace("/ +/", " ", $rss);
	
	// Output file contents as XML data model
	$pfNodes = "<description>Sample of server proxy for Google News RSS Feeds</description><expiration>0</expiration><pfDataSet>";
	$pfNodes_close = "</pfDataSet>";
	$closedTags = "</rss>";
	
	$xml = substr($rss, 0, strpos($rss, "<channel>")) . $pfNodes . substr($rss, strpos($rss, "<channel>"), strlen($closedTags) * -1) . $pfNodes_close . $closedTags;
	
} else {
	$xml = "";
}

?>
