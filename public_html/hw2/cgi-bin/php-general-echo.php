<?php

$toPost = file_get_contents("php://input");

if($toPost == "") {
    $toPost = "(null)";
}

header("Cache-Control: no-cache");
header("Content-type: text/html");
echo "<html><head><title>General Request Echo</title></head>
<body><h1 align=center>General Request Echo</h1>
<hr/>\n";

$sProt = getenv("SERVER_PROTOCOL");
$rMethod = getenv("REQUEST_METHOD");

echo "<table>\n";
echo "<tr><td>Protocol:</td><td>$sProt</td></tr>\n";
echo "<tr><td>Method:</td><td>$rMethod</td></tr>\n";
echo "<tr><td>Message Body:</td><td>$toPost</td></tr>\n";
echo "</table>";

echo "</body></html>";

?>