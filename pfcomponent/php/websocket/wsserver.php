<?php
/*
 * Start WebSocket server from PHP command line
 * 
 * You have to modify modelServer.php to meet requirements 
 * 
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 *
 */

require __DIR__ . "/ws.php";

$config = file_get_contents(__DIR__ . "/../../component.json");

try {
	$config = json_decode($config, true);
} catch(Exception $e) {
	echo $e->getMessage();
	exit();
}

$siteRootPath = trim($config['siteRootPath']);
$siteRootPath = rtrim($siteRootPath, '/\\');

if (!$siteRootPath) {
	echo "Please set website-root path in config.php\n";
	exit();
}

$scretKey = $config['jwtSecretKey'];

// Load customized Class for WebSocket Server
require __DIR__ . "/modelServer.php";

/**
 * Set default port is 8060
 *
 * If replace it with another port number configuration in 
 * Page Processor would be updated simultaneously
 * 
 */
$wsocket = new modelServer("0.0.0.0", "8060");

$wsocket->setInstProp($scretKey, $siteRootPath);

// run as WebSocket server
try {
	$wsocket->run();
} catch (Exception $e) {
	$wsocket->stdout($e->getMessage());
}

?>
