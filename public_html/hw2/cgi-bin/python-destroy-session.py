#!/usr/bin/python3

import os
from http import cookies
from pythonSessionHelper import pythonSessionHelper

def main():

    cookie = cookies.SimpleCookie(os.environ.get("HTTP_COOKIE"))
    
    if(cookie.get("CGISESSID")):
        sessionID = (cookie.get("CGISESSID")).value
    else:
        sessionID = None

    newSession = pythonSessionHelper(sessionID)
    newSession.destroySession()

    print("Cache-Control: no-cache")
    print("Content-Type: text/html")
    print(f'Set-Cookie: CGISESSID={newSession.sessionID}; Expires=Mon, 18 Aug 2025 00:00:00 GMT; Path=/hw2/cgi-bin')
    print()

    print("<html>")
    print("<head>")
    print("<title>Python Session Destroyed</title>")
    print("</head>")
    print("<body>")
    print("<h1>Session Destroyed</h1>")
    print("<a href=\"/hw2/python-cgiform.html\">Back to the Python CGI Form</a><br />")
    print("<a href=\"/hw2/cgi-bin/python-sessions-1.py\">Back to Page 1</a><br />")
    print("<a href=\"/hw2/cgi-bin/python-sessions-2.py\">Back to Page 2</a>")
    print("</body>")
    print("</html>")

if __name__ == "__main__":
    main()
