#!/usr/bin/perl

# The below line includes the CGI.pm Perl library
use CGI qw/:standard/;     

# CGI.pm Method
print "Cache-Control: no-cache\n";
print header;

# CGI.pm Method
print start_html("Environment Variables");

print "<h1 align='center'>Environment Variables</h1><hr />";

# Set server names properly since we are reverse proxying using nginx
$ENV{'SERVER_SIGNATURE'} = 'CSE135 Server Server at satvikammula.site Port 443';
$ENV{'SERVER_SOFTWARE'}  = 'CSE135 Server';

# Loop through all of the environment variables, then print each variable and its value
foreach my $key (sort(keys(%ENV))) {
   print  "$key = $ENV{$key}<br />\n";
}

# CGI.pm method
print end_html;