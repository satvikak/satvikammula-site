#!/usr/bin/python3

import os

def main():
    os.environ["SERVER_SIGNATURE"] = "CSE135 Server Server at satvikammula.site Port 443"
    os.environ["SERVER_SOFTWARE"] = "CSE135 Server"

    print("Cache-Control: no-cache")
    print("Content-type: text/html\n")
    print("<html><head><title>Environment Variables</title></head> \
    <body><h1 align=center>Environment Variables</h1> \
    <hr/>\n")

    for key, value in os.environ.items():
        print(f"{key}={value}<br/>")

    print("</body></html>")

if __name__ == "__main__":
    main()