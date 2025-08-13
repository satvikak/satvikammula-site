# CSE135 HW1: Client Side Basics, Site and Server Configuration

This repository contains my work for CSE135's HW 1 for Summer Session 2 2025. You can find my site for this assignment at [satvikammula.site](satvikammula.site).

## Group Members
- This was a solo project completed by me, Satvi Kammula. For additional reference, my email is [sakammula@ucsd.edu](sakammula@ucsd.edu) and my PID is A18503110.

## Grader Access
- Site IP Address: 137.184.189.190
- Grader Server Login
  - username: grader
  - passphrase for SSH key: GraderSpecialServerAccess25
  - sudo password for grader: websiteGraderAccess0825
-  Private SSH Key is in the Github submission!

* Note: I was able to access the grader account by first copy pasting the below private key into a nano file. Then, I ran ssh -i "insert nano file name" grader@137.184.189.190.

## Website Link
- As stated above, my site can be found at [satvikammula.site](satvikammula.site). Here, you can find some more information about me, as well as additional links pertaining to the homework.
- For more convenient access some of the webpages I designed for this assignment are listed:
  - [About Page](https://satvikammula.site/members/satvikammula.html)
  - [robots.txt](https://satvikammula.site/robots.txt)
  - [hello.php](https://satvikammula.site/hw1/hello.php)
  - [report.html](https://satvikammula.site/hw1/report.html)
 
## Site Login Info
- Furthermore, my site is password protected to keep it safe from potential attacks. The login information can be seen below:
  - Username: satvi
  - Password: SatviServerSummer2025

## Details of Github Deployment Setup
- To get started, I followed the provided tutorial to connect my GitHub repository to my server. I began by creating a repo with copies of all my site’s files, and then linked that repo to the correct website directory on my server. After that, I carefully set up the post-receive hook so that I could test local pushes and make sure they updated the site properly.
- From there, I decided to go a step further. After reading more of the tutorial and doing some digging, I learned about GitHub Actions — which let you automate deployments straight from GitHub. That sounded cleaner than manually pushing every time, so I gave it a try.
- I created a .github/workflows/deploy.yml file, which defines a workflow that runs whenever I push to the master branch. This workflow connects to my server over SSH and runs a script that pulls the latest changes from the repo and updates the live site automatically. With this setup, I was able to move away from live editing on the server (which isn’t ideal long-term) and switch to a smoother, version-controlled deployment process. Using GitHub Actions ended up being a solid way to automate my updates and keep everything synced.
 
## Analysis of Compressing Textual Content
- Before installing anything, I decided to inspect my site’s content encoding using browser dev tools (tip from TA on Slack). When I checked, I noticed that my HTML, CSS, and JS files were already being served with gzip encoding. That led me to dig a bit deeper to confirm what was going on behind the scenes.
- I tried enabling the mod_deflate module just to be safe, but the system told me it was already enabled by default. To double-check, I looked into the deflate.conf configuration file, and sure enough, it had rules to compress common file types like HTML, CSS, and JS.
- So in short, I didn’t have to do anything extra, Apache was already handling compression out of the box. I didn’t see a noticeable change because everything was already compressed, but based on class discussions, I know the impact is still important. Smaller, gzip-compressed files mean less data being sent over the network and faster page load times for users.
- Even though I didn’t need to manually set anything up, it was good to verify that compression was working and it’s clear why it matters for performance.

## Analysis of Removing 'Server' Header
- To get a fully custom Server header, I started by doing some research using Google and ChatGPT to figure out what options were out there. The first method I found involved using [ServerTokens/ServerSignature](https://www.petefreitag.com/blog/servertokens-serversignature/). This was super easy to set up, but it didn’t really do what I needed — it just shortened the server string (like from Apache/2.4.52 (Ubuntu) to just Apache) rather than letting me define my own custom value.
- Next, I looked into using [mod_headers](https://publib.boulder.ibm.com/httpserv/manual70/mod/mod_headers.html). This also seemed promising — I just had to enable the module and add a line like Header always set Server "CSE135 Server" in the config. But I quickly found out that Apache sends the Server header too early in the response for this method to work properly. My custom header was either ignored or duplicated.
- Then I moved on to [mod_security](https://www.howtoforge.com/changing-apache-server-name-to-whatever-you-want-with-mod_security-on-debian-6), hoping for more control. It was a bit more complex and seemed like it might work since it’s often used for filtering and rewriting. But even there, the ctl directive (which is supposed to modify headers) wasn’t able to change the Server field — turns out mod_security is better for blocking or inspecting headers than for rewriting them.
- At that point, I realized I’d need to take a different route — that’s when I found the [reverse proxy/NGINX](https://www.youtube.com/watch?v=1fBNOXcYHGQ). The idea is that NGINX sits in front of Apache, handles incoming requests, sets headers however I want (including the custom Server header), and then passes the request along to Apache running on a local-only port. This worked really well. NGINX takes care of the public-facing stuff, including SSL and headers, while Apache just serves the content behind the scenes.
- So in the end, I used NGINX as the “face” of my site, while Apache handled the actual page content. This gave me full control over the Server header without having to mess too much with Apache’s internals.

## Screenshots
- The screenshots of my progression throughout this assignment can be seen compiled together on [this document](https://docs.google.com/document/d/1e1FDihxFZzzUfC-oeeJLDgEEoBk-GjXkfkaM0JUvfWk/edit?usp=sharing)
