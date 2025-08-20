#!/usr/bin/python3

import os
from http import cookies
from pythonSessionHelper import pythonSessionHelper

def main():

    # Read cookies from HTTP request headers
    cookie = cookies.SimpleCookie(os.environ.get("HTTP_COOKIE"))
    
    # Get session id
    if(cookie.get("CGISESSID")):
        sessionID = (cookie.get("CGISESSID")).value
    else:
        sessionID = None

    # Create a new session/get existing session
    newSession = pythonSessionHelper(sessionID)
    # Retrieve username from session
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
    print("<h1>Python Sessions Page 2</h1>")

    if(name):
        print(f"<p><b>Name:</b> {name}</p>")
    else:
        print("<p><b>Name:</b> You do not have a name set</p>")

    print("<br/><br/>")
    print("<a href=\"/hw2/cgi-bin/python-sessions-1.py\">Session Page 1</a><br/>")
    print("<a href=\"/hw2/python-cgiform.html\">Python CGI Form</a><br />")
    print("<form style=\"margin-top:30px\" action=\"/hw2/cgi-bin/python-destroy-session.py\" method=\"get\">")
    print("<button type=\"submit\">Destroy Session</button>")
    print("</form>")

    print("</body>")
    print("</html>")

if __name__ == "__main__":
    main()
