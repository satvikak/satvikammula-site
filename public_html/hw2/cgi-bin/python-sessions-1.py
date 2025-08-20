#!/usr/bin/python3

import os
import cgi
from http import cookies
from pythonSessionHelper import pythonSessionHelper

def main():

    # Parse input from user
    inputField = cgi.FieldStorage()

    # Get cookies from HTTP headers
    cookie = cookies.SimpleCookie(os.environ.get("HTTP_COOKIE"))
    
    # Get sessionID
    if(cookie.get("CGISESSID")):
        sessionID = (cookie.get("CGISESSID")).value
    else:
        sessionID = None

    # Make a new session, or load a pre-existing session
    newSession = pythonSessionHelper(sessionID)
    # Get name directly from user form
    name = inputField.getfirst("username")

    # Make adjustments for a new username if entered
    if(name):
        newSession.setUsername(name)
    # Get the updated/current username
    name = newSession.getUsername()

    print("Cache-Control: no-cache")
    print("Content-Type: text/html")
    # Make sure session is consistent by setting cookie in header
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
