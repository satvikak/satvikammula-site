#!/usr/bin/python3

import os
import time

def main():
    timeT = time.time()

    print("Cache-Control: no-cache")
    print("Content-type: text/html\n")
    print("<html><head><title>Hello, Python!</title></head>\
          <body><h1 align=center>Hello Python World</h1>\
          <hr/>\n")
    
    print("Satvi was here - Hello Python World!<br/>")
    print("This program was generated with the Python programming language at: %s\n<br/>" % time.ctime(timeT))

    # Get actual IP because we are forwarding from nginx to apache
    actualIP = os.getenv("HTTP_X_FORWARDED_FOR")
    if actualIP is None:
        actualIP = os.getenv("REMOTE_ADDR")
    if actualIP is None:
        actualIP = "unknown"    

    print("Your current IP address is: %s<br/>" % actualIP)

    print("</body></html>")

if __name__ == "__main__":
    main()
