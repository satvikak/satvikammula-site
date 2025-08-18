#!/usr/bin/python3

import os
import time

def main():
    timeT = time.time()
    buffer = time.ctime(timeT)
    buffer = buffer.rstrip("\n")
    
    print("Cache-Control: no-cache")
    print("Content-type: application/json\n")

    print("{")
    print(f'\t"heading": "Hello Python", ')
    print(f'\t"message": "This response was generated with the Python programming language", ')
    print(f'\t"date": {buffer}", ')

    actualIP = os.getenv("HTTP_X_FORWARDED_FOR")
    if actualIP is None:
        actualIP = os.getenv("REMOTE_ADDR")
    if actualIP is None:
        actualIP = "unknown"    

    print(f'\t"currentIP": "{actualIP}"')
    print("}")

if __name__ == "__main__":
    main()
