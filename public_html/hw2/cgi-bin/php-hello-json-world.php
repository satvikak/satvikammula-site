<?php

$timeT = time();
$buffer = date("r", $timeT);
$buffer = rtrim($buffer, "\n");

header("Cache-Control: no-cache");
header("Content-type: application/json");

echo "{\n";
echo "\t\"heading\":\"Satvi was here - Hello PHP\", \n";
echo "\t\"message\": \"This response was generated with the PHP programming language\", \n";
echo "\t\"date\": \"$buffer\", \n";

// Get actual IP because we are forwarding from nginx to apache
$actualIP = getenv("HTTP_X_FORWARDED_FOR");
if(!$actualIP) {
    $actualIP = getenv("REMOTE_ADDR");
}
if(!$actualIP) {
    $actualIP = "unknown";    
}

echo "\t\"currentIP\": \"$actualIP\"\n";
echo "}";

?>