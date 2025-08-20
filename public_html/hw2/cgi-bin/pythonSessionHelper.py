#!/usr/bin/python3

import os
import uuid

# Create a new class to help manage all the functions needed for sessions
class pythonSessionHelper:
    # Location to store session files
    sessionLocation = "/tmp"

    def __init__(self, sessionID=None):
        # Make sure the directory exists
        if not os.path.exists(self.sessionLocation):
            os.makedirs(self.sessionLocation, exist_ok=True)
        
        # Get session ID from cookies
        if(sessionID==None):
            fullCookie = os.environ.get("HTTP_COOKIE", "")
            separateCookies = {}
            # Parse cookies to find sessionID
            for cookiePair in fullCookie.split("; "):
                if("=" in cookiePair):
                    cookieKey, cookieValue = cookiePair.split("=", 1)
                    separateCookies[cookieKey] = cookieValue
            # Retrieve specific id from cookie
            sessionID = separateCookies.get("CGISESSID")
            
        # Generate a session id if none is found
        if(sessionID==None):
            self.sessionID = str(uuid.uuid4())
        else:
            self.sessionID = sessionID
        
        # Store the direct user session file
        self.userDataFile = os.path.join(self.sessionLocation, f"sess_{self.sessionID}")

        # Try to get username from session file if possible
        try:
            with open(self.userDataFile, "r") as file:
                self.username = file.read().strip()
        except Exception:
            self.username = ""

    # Getter method to retrieve session username
    def getUsername(self):
        return self.username

    # Setter method to update session username
    def setUsername(self, newName):
        self.username = newName
        self.saveSession()

    # Method that actually writes to the file the new username
    def saveSession(self):
        with open(self.userDataFile, "w") as file:
            file.write(self.username)

    # Destroys the session, get rid of all history of session/username
    def destroySession(self):
        if os.path.exists(self.userDataFile):
            os.remove(self.userDataFile)
