<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Cache-Control" content="max-age=0">
<meta http-equiv="Expires" content="0">
<meta http-equiv="Expires" content="Tue, 01 Jan 1980 1:00:00 GMT">
<meta http-equiv="Pragma" content="no-cache">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Server outputs data model and a template URL to this contents to generate page code">
<meta name="keywords" content="PlannerFw, JSON data model, XML data model, layout, template, template compilation, PFCSS, storable CSS, CSS switch">

<title>Server assigns/transfers a template URL or a layout template URL to contents of be-index.html in the response</title>

<!--
  Apply Page Processor Library
-->
<script src="/app/lib/planner.min.js"></script>

<!-- Output a template URL and model -->
<script type="text/javascript">
	var pftml = "<?php echo $_GET['tml'] ?>";
	var pfxmdl = '<?php
						require "php-proxy-output-xml.php";
						// Escape ' in XML string
						$xml = str_replace("'", "\\'", $xml);
						
						echo $xml; 
					?>';
</script>

<!--
  Apply Page processor
-->
<script src="/app/lib/be-processor.min.js"></script>
</head>
<body>
</body>
</html>
