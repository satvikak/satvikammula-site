<?php

$timeT = time();

header("Cache-Control: no-cache");
header("Content-type: text/html");
echo "<html><head><title>Hello, PHP!</title></head>
        <body><h1 align=center>Hello PHP World</h1>
        <hr/>\n";

echo "Satvi was here - Hello PHP World! <br/>";
echo "This program was generated with the PHP programming language at: " . date("r", $timeT) . "<br/>";

// Get actual IP because we are forwarding from nginx to apache
$actualIP = getenv("HTTP_X_FORWARDED_FOR");
if(!$actualIP) {
    $actualIP = getenv("REMOTE_ADDR");
}
if(!$actualIP) {
    $actualIP = "unknown";
}

echo "Your current IP address is: $actualIP";

echo "</body></html>";

?>