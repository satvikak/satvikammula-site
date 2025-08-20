#!/usr/bin/python3

import os
import urllib.parse

def main():

    print("Cache-Control: no-cache")
    print("Content-type: text/html\n")
    print("<html><head><title>GET query string</title></head>\
	<body><h1 align=center>GET query string</h1>\
  	<hr/>\n")

    rawQuery = os.getenv("QUERY_STRING", "")
    print(f"Raw query string: {rawQuery}\n<br/><br/>")
    
    print("<table> Formatted Query String:")

    if(rawQuery):
        for piece in rawQuery.split("&"):
            pieces = piece.split('=')
            if(len(pieces)==2):
                # Account for special characters and split by "=" and "&"
                # var, val = pieces
                var = urllib.parse.unquote(pieces[0])
                val = urllib.parse.unquote(pieces[1])
                print(f"<tr><td>{var:<8}:</td><td>{val}</td></tr>")
            # else:
            #     print("<tr><td>empty field:</td><td>NaaN</td></tr>")

    print("</table>")
    print("</body>")
    print("</html>")

if __name__ == "__main__":
    main()