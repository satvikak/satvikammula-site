#include "stdio.h"
#include "stdlib.h"

int main(int argc, char **argv, char **envp)
{

  setenv("SERVER_SIGNATURE", "CSE135 Server Server at satvikammula.site Port 443", 1);
  setenv("SERVER_SOFTWARE",  "CSE135 Server", 1);

  // print HTML header	
  printf("Cache-Control: no-cache\n");
  printf("Content-type: text/html\n\n");
  printf("<html><head><title>Environment Variables</title></head> \
	<body><h1 align=center>Environment Variables</h1> \
  	<hr/>\n");

  for (char **env = envp; *env != 0; env++)
  {
    char *thisEnv = *env;
    printf("%s\n<br/>", thisEnv);
  }

  // print HTML footer
  printf("</body></html>");
  return 0;
}