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
    print("Content-type: text/html\n")
    print("<html><head><title>POST Message Body</title></head>\
	<body><h1 align=center>POST Message Body</h1>\
  	<hr/>\n")

    print(f"Message Body: {toPost}\n<br/>")

    print("</body>")
    print("</html>")

if __name__ == "__main__":
    main()