#!/usr/bin/perl
print "Cache-Control: no-cache\n";
print "Content-type: text/html \n\n";

# Custom server signature and software
my $custom_signature = "CSE135 Server Server at satvikammula.site Port 443";
my $custom_software  = "CSE135 Server";

# Print HTML file top
print <<END;
<!DOCTYPE html>
<html><head><title>Environment Variables</title>
</head><body><h1 align="center">Environment Variables</h1>
<hr>
END

# Loop over the environment variables and print each variable and its value
foreach my $variable (sort keys %ENV) {
    if ($variable eq 'SERVER_SIGNATURE') {
        print "<b>$variable:</b> $custom_signature<br />\n";
    } elsif ($variable eq 'SERVER_SOFTWARE') {
        print "<b>$variable:</b> $custom_software<br />\n";
    } else {
        print "<b>$variable:</b> $ENV{$variable}<br />\n";
    }
}

# Print the HTML file bottom
print "</body></html>";