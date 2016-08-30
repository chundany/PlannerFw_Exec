<?php
/**
 * 
 * Copyright 2016 W3plan Technologies <http://w3plan.net/>
 *
 */

// Accept posted data from frontend 
if (isset($_POST['comment1']) && trim($_POST['comment1']) && isset($_POST['comment2']) && trim($_POST['comment2'])) {
	$comment1 = trim($_POST['comment1']);
	$comment1 = strip_tags($comment1);
	$comment2 = trim($_POST['comment2']);
	$comment2 = strip_tags($comment2);
} else {
	$comment1 = "";
	$comment2 = "";
}

// Get output data 
include "php-output-data.php";

$pfmdl = <<<DOC
{
	"description": "PlannerFw template model",
	"version": "0.0.1",
	"category": "JSON data model",
	"author": "W3plan",
	"company": "W3plan",
	"copyright": "Copyright 2015-2016 W3plan Technologies, http://w3plan.net",
	"licenses": "GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>",
	"expiration": 0,
	"pfDataSet": $pfDataSet
}
DOC;

// Get URL or URL path of related template for output data
//$pftml = "/template/pfm/a/index.html.js";
$pftml = $_REQUEST['tml'];

// Output full page 
include "be-index.php";

exit();
?>

