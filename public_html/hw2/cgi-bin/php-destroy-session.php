<?php

session_start();
session_unset();
session_destroy();

if(isset($_COOKIE[session_name()])) {
    setcookie(session_name(), "", time()-3600, "/");
}

header("Cache-Control: no-cache");
header("Content-type: text/html");

echo "<html>";
echo "<head>";
echo "<title>PHP Session Destroyed</title>";
echo "</head>";
echo "<body>";
echo "<h1>Session Destroyed</h1>";
echo "<a href=\"/hw2/php-cgiform.html\">Back to the PHP CGI Form</a><br />";
echo "<a href=\"/hw2/cgi-bin/php-sessions-1.php\">Back to Page 1</a><br />";
echo "<a href=\"/hw2/cgi-bin/php-sessions-2.php\">Back to Page 2</a>";
echo "</body>";
echo "</html>";