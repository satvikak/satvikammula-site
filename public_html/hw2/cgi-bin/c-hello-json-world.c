#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
int main(void) {
	time_t t;
	time(&t);
	char *buffer = ctime(&t);
	buffer[strlen(buffer) - 1] = '\0';
	printf("Cache-Control: no-cache\r\n");
	printf("Content-type: application/json\r\n\r\n");
	printf("{\n\t\"message\": \"Satvi was here - Hello World\",\n");
	printf("\t\"date\": \"%s\",\n", buffer);

	char *actualIP = getenv("HTTP_X_FORWARDED_FOR");
	if(actualIP==NULL) {
		actualIP = getenv("REMOTE_ADDR");
	}
	if(actualIP==NULL) {
		actualIP = "unknown";
	}

	printf("\t\"currentIP\": \"%s\"\n}\n", actualIP);
	return 1;
}