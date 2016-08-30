<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<title>Display error message or log client errors of production environment</title>

<!--

  You are able to modify this file to meet your requirements
  
  Web server would log other catchable errors and uncatchable errors and 
  registered user information when PlannerFw Exec is in production status
  
-->

<style>
.centerbx {
    text-align: center;
}

.innerbx {
    text-align: left; 
    width: 600px;
    margin: 200px auto;
    color: #ff0000;
    word-wrap: break-word;
}
</style>

<?php
    
    $level = htmlspecialchars($_GET['level'], ENT_QUOTES);
    $msg = htmlspecialchars($_GET['msg'], ENT_QUOTES);
    $line = htmlspecialchars($_GET['line'], ENT_QUOTES);
    $log = htmlspecialchars($_GET['log'], ENT_QUOTES);
    
    $msg = (empty($line)) ? $msg : $msg . " at line: " . $line; 
    
    // Sets 'UTC' as the default timezone
    date_default_timezone_set('UTC');    
    $date = date("Y-m-d"); 
    $datetime = date("Y-m-d H:i:s");
    
    $message_type = 3;
    $destination = $_SERVER["PFCOMPONENT_PATH"] . "/php/logs/client-errors-" . $date . ".log";
    
    /**
     * Get client IP address
     *
     * @param void
     * @return string
     */
    function getClientIP() {
        $client  = @$_SERVER['HTTP_CLIENT_IP'];
        $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
        $remote  = $_SERVER['REMOTE_ADDR'];

        if (filter_var($client, FILTER_VALIDATE_IP)) {
            $ip = $client;
        } elseif (filter_var($forward, FILTER_VALIDATE_IP)) {
            $ip = $forward;
        } else {
            $ip = $remote;
        }
        
        return $ip;
    }
    
    /*
     * Write other catchable errors and uncatchable errors from the client to log files
     * 
     */    
    if ($log == 1) {      
        // write error information to log files
        
        $message = getClientIP() . " - " . $datetime . " (UTC) --> " . $msg . " --> " . $_SERVER['REQUEST_URI'] . PHP_EOL;
        
        error_log($message, $message_type, $destination);
    }
    
?>

</head>

<body>

<div class = "centerbx">
    <div class="innerbx">
        <?php  echo $msg; ?>
    </div>
</div>

</body>
</html>
