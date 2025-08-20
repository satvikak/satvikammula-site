<?php

// Set server name properly since we are reverse proxying with nginx
$_SERVER['SERVER_SIGNATURE'] = "CSE135 Server Server at satvikammula.site Port 443";
$_SERVER['SERVER_SOFTWARE'] = "CSE135 Server";

header("Cache-Control: no-cache");
header("Content-type: text/html");

echo "<html><head><title>Environment Variables</title></head>
    <body><h1 align=center>Environment Variables</h1>
    <hr/>\n";

foreach($_SERVER as $key => $value) {
    echo "$key=$value<br/>\n";
}

echo "</body></html>";

?>
