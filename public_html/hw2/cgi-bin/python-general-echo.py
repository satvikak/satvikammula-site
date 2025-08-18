#!/usr/bin/python3

import os
import fileinput

def main():

    toPost = ""
    for line in fileinput.input():
        toPost+=line

    if(toPost == ""):
        toPost = "(null)"

    print("Cache-Control: no-cache")
    print("Content-type: text/html\n\n")
    print("<html><head><title>General Request Echo</title></head> \
	<body><h1 align=center>General Request Echo</h1> \
  	<hr/>\n")

    sProt = os.getenv("SERVER_PROTOCOL")
    rMethod = os.getenv("REQUEST_METHOD")

    print("<table>\n")
    print(f"<tr><td>Protocol:</td><td>{sProt}</td></tr>")
    print(f"<tr><td>Method:</td><td>{rMethod}</td></tr>")
    print(f"<tr><td>Message Body:</td><td>{toPost}</td></tr>")
    print("</table>")

    print("</body>")
    print("</html>")

if __name__ == "__main__":
    main()