<?php
/**
 *
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 *
 */

$comment1 = "";
$comment2 = "";

require "php-output-data.php";

/**
 * Output model as string
 *
 */
$pfmdl = <<<DOC
{	
	"description": "PlannerFw template model in JSON",
	"version": "0.0.1",
	"category": "JSON data model",
	"author": "W3plan Technologies",
	"company": "W3plan Technologies",
	"copyright": "Copyright 2015-2016 W3plan Technologies, http://w3plan.net",
	"licenses": "GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>",
	"expiration": 0,
	"pfDataSet": {
			"pfSet1": $pfSet1,
			"pfSet2": $pfSet2,
			"pfSet3": $pfSet3
		}
}
DOC;

?>
