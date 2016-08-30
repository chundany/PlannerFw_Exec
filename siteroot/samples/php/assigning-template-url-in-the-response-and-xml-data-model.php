<?php
/**
 * 
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
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
include "php-output-layout-xml.php";

// Get URL or URL path of related template for output data
$pftml = $_REQUEST['tml'];

// Output full page 
include "be-index.php";

exit();
?>
