<?php

$toPost = file_get_contents("php://input");

if($toPost == "") {
    $toPost = "(null)";
}

header("Cache-Control: no-cache");
header("Content-type: text/html");
echo "<html><head><title>POST Message Body</title></head>
<body><h1 align=center>POST Message Body</h1>
<hr/>\n";


echo "Message Body: $toPost<br/>\n";

echo "</body></html>";

?>