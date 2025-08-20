#!/usr/bin/python3

import os
import cgi
from http import cookies
from pythonSessionHelper import pythonSessionHelper

def main():
    inputField = cgi.FieldStorage()

    cookie = cookies.SimpleCookie(os.environ.get("HTTP_COOKIE"))
    
    if(cookie.get("CGISESSID")):
        sessionID = (cookie.get("CGISESSID")).value
    else:
        sessionID = None

    newSession = pythonSessionHelper(sessionID)
    name = inputField.getfirst("username")

    if(name):
        newSession.setUsername(name)
    
    name = newSession.getUsername()

    print("Cache-Control: no-cache")
    print("Content-Type: text/html")
    print(f'Set-Cookie: CGISESSID={newSession.sessionID}; Path=/hw2/cgi-bin')
    print()

    print("<html>")
    print("<head>")
    print("<title>Python Sessions</title>")
    print("</head>")
    print("<body>")
    print("<h1>Python Sessions Page 1</h1>")

    if(name):
        print(f"<p><b>Name:</b> {name}</p>")
    else:
        print("<p><b>Name:</b> You do not have a name set</p>")

    print("<br/><br/>")
    print("<a href=\"/hw2/cgi-bin/python-sessions-2.py\">Session Page 2</a><br/>")
    print("<a href=\"/hw2/python-cgiform.html\">Python CGI Form</a><br />")
    print("<form style=\"margin-top:30px\" action=\"/hw2/cgi-bin/python-destroy-session.py\" method=\"get\">")
    print("<button type=\"submit\">Destroy Session</button>")
    print("</form>")

    print("</body>")
    print("</html>")

if __name__ == "__main__":
    main()
