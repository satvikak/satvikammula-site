#!/usr/bin/python3

import os
import uuid

class pythonSessionHelper:
    sessionLocation = "/tmp"

    def __init__(self, sessionID=None):
        if not os.path.exists(self.sessionLocation):
            os.makedirs(self.sessionLocation, exist_ok=True)
        
        if(sessionID==None):
            fullCookie = os.environ.get("HTTP_COOKIE", "")
            separateCookies = {}
            for cookiePair in fullCookie.split("; "):
                if("=" in cookiePair):
                    cookieKey, cookieValue = cookiePair.split("=", 1)
                    separateCookies[cookieKey] = cookieValue
            sessionID = separateCookies.get("CGISESSID")
            
        if(sessionID==None):
            self.sessionID = str(uuid.uuid4())
        else:
            self.sessionID = sessionID
        
        self.userDataFile = os.path.join(self.sessionLocation, f"sess_{self.sessionID}")

        try:
            with open(self.userDataFile, "r") as file:
                self.username = file.read().strip()
        except Exception:
            self.username = ""

    def getUsername(self):
        return self.username

    def setUsername(self, newName):
        self.username = newName
        self.saveSession()

    def saveSession(self):
        with open(self.userDataFile, "w") as file:
            file.write(self.username)

    def destroySession(self):
        if os.path.exists(self.userDataFile):
            os.remove(self.userDataFile)
