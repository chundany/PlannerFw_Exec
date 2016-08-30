<?php
/**
 *
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 *
 */

$comment1 = "";
$comment2 = "";

require __DIR__ . "/php-output-data.php";

/**
 * Output model as a string
 * Do not add double quote to $pfDataSet Because it is an object in string
 */
$pfmdl = <<<DOC
{	
	"description": "PlannerFw template model over websocket",
	"version": "0.0.1",
	"category": "JSON data model",
	"author": "W3plan Technologies",
	"company": "W3plan Technologies",
	"copyright": "Copyright 2015-2016 W3plan Technologies, http://w3plan.net",
	"licenses": "GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>",
	"expiration": 0,
	"pfDataSet": $pfDataSet
}
DOC;

?>
