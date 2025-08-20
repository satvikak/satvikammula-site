<?php

header("Cache-Control: no-cache");
header("Content-type: text/html");
echo "<html><head><title>GET query string</title></head>
<body><h1 align=center>GET query string</h1>
<hr/>\n";

$rawQuery = getenv("QUERY_STRING");
if(!$rawQuery) {
    $rawQuery = "";
}

echo "Raw query string: $rawQuery\n<br/><br/>";
echo "<table> Formatted Query String: ";

if($rawQuery) {
    $pieces = explode("&", $rawQuery);
    foreach($pieces as $piece) {
        $item = explode("=", $piece);
        if(count($item)==2) {
            list($var, $val) = $item;
            $var = urldecode($var);
            $val = urldecode($val);
            echo "<tr><td>" . htmlspecialchars($var) . ":</td><td>" . htmlspecialchars($val) . "</td></tr>\n";
        }
    }
}

echo "</table>";

echo "</body></html>"

?>