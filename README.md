# CSE135: Online Database Analytics

This repository contains my work for CSE135's HWs for Summer Session 2 2025. You can find my site for this assignment at [satvikammula.site](satvikammula.site).

## Group Members
- This was a solo project completed by me, Satvi Kammula. For additional reference, my email is [sakammula@ucsd.edu](sakammula@ucsd.edu) and my PID is A18503110.

## Site Login Info
- My site is password protected to keep it safe from potential attacks. The login information can be seen below:
  - Username: satvi
  - Password: SatviServerSummer2025

## Grader Access
- Site IP Address: 137.184.189.190
- Grader Server Login
  - username: grader
  - passphrase for SSH key: GraderSpecialServerAccess25
  - sudo password for grader: websiteGraderAccess0825
-  Private SSH Key is in the Github submission!

* Note: I was able to access the grader account by first copy pasting the below private key into a nano file. Then, I ran ssh -i "insert nano file name" grader@137.184.189.190.

# Dashboard

## Distribution of Users by Network Connection Type

For my first chart, I chose to display the distribution of users by network connection type. This metric is important because site performance depends heavily on a user’s connection speed, and slower networks can significantly impact the experience. If a notable portion of users are on 3G or other weaker connections, we need to make sure our site remains usable by prioritizing lightweight assets and optimizing loading strategies. By surfacing this distribution, the chart helps us make design decisions that directly improve accessibility and fairness for all users, not just those with strong connections.

I decided to use a horizontal bar chart to present this data. Since network type is categorical, a bar chart allows for clear comparisons between groups. A horizontal layout worked best here because it avoids cramped labels and removes the unintended sense of “trend over time” that vertical bars sometimes suggest. I also added percentage labels, tooltips with exact counts, and the total sample size so viewers can quickly understand both the magnitude and the reliability of the data.

I briefly considered other options such as a pie chart, but rejected it because the percentages between categories were too close to distinguish easily in slice form. A bar chart offers more precision and readability, which makes it the best choice for this dataset. The resulting visualization not only highlights that 5G is the most common connection type, but also shows that “unknown” connections form a surprisingly large share. This insight reminds us that many users may still face constraints, and pushes us toward optimizations like compressing images, deferring noncritical JavaScript, and preparing for less reliable networks.

## Hourly Site Engagement

For my second chart, I chose to analyze hourly site engagement, measured by the number of interaction events (such as scrolling, mouse movement, key presses, and clicks). This metric helps us understand when users are most active on the site and provides valuable context for planning updates and deployments. In a real development environment, pushing changes during peak usage hours could disrupt user experience and cause frustration. By identifying times of low activity, we can minimize disruption and ensure smoother rollouts.

The data showed that engagement is highest after noon, with a noticeable peak during late-night hours. This insight suggests that maintenance and deployments should be scheduled during early mornings, when activity is minimal. It also raises an interesting secondary consideration: activity before noon was consistently low, which may point to an opportunity to improve site appeal or encourage interaction during daytime hours. Thus, the chart not only informs technical decision-making but also highlights areas for potential user experience improvement.

To visualize this data, I chose a line chart. Because the x-axis represents the 24 hours of a day, a bar chart would have felt cluttered and made it harder to see trends. A line chart, by contrast, makes the flow of engagement throughout the day clear, highlighting sharp rises and falls between adjacent hours. This emphasizes the cyclical nature of activity in a way that is intuitive to comprehend.

In terms of design choices, I added a chart subtitle to indicate the total dataset size, improving transparency and audience trust. I also included tooltips and grid lines, allowing users to view exact values when needed rather than estimating from the line. Finally, I highlighted the peak engagement time with a small annotation box. This directs attention to the most important insight at a glance and connects the chart directly to its practical implications for scheduling updates.

## Errors per Page

For my final visualization, I chose to measure errors per page. This metric is critical because a site’s primary purpose is to provide users with a smooth, functional experience. Frequent errors (such as resource loading failures, client-side script issues, or JavaScript crashes) directly impact usability and may discourage users from returning. By analyzing where errors occur, what type they are, and how often they appear, developers can prioritize fixes that will have the greatest impact on user satisfaction.

To present this data, I decided on a grid rather than a chart. A grid is particularly effective when multiple attributes need to be displayed at once. In this case, the key factors I wanted to highlight were the page URL, the type of error, the number of occurrences, and the severity. While a bar or line chart could have shown error counts or trends over time, and a pie chart could have compared relative proportions, none of these formats would have captured the full context needed to take meaningful action. A grid allows developers to immediately see not just how many errors are happening, but also what kind they are and where they are happening, making it the most effective choice for this metric.

In designing the grid, I intentionally ordered the columns to support quick understanding. The page URL comes first, followed by error type, occurrences, and severity—giving developers immediate insight into both the location and nature of an issue. I also sorted the rows by severity so the most pressing problems appear at the top, ensuring attention is directed where it is most needed. To further reinforce this, I used color coding (red, yellow, green) as a visual cue for severity levels. These colors provide an intuitive way to recognize critical versus minor issues at a glance.

Finally, I added functionality for controlling how many rows display at once, giving users flexibility in how they consume the data. This prevents information overload while still allowing deeper exploration when needed. Altogether, the grid balances clarity and detail, giving developers exactly the information they need to quickly identify and resolve issues that negatively impact the user experience.

## CSE135 HW2: Server Side Basics Done 3+ Ways

## HW2 Website Links
- As stated above, my site can be found at [satvikammula.site](satvikammula.site). If you look under the HW2 section on the site, you can find all of the Perl, C, Python, and PHP files pertaining to this assignment.

## CSE135 HW1: Client Side Basics, Site and Server Configuration

## HW1 Website Links
- As stated above, my site can be found at [satvikammula.site](satvikammula.site). Here, you can find some more information about me, as well as additional links pertaining to the homework.
- For more convenient access some of the webpages I designed for this assignment are listed:
  - [About Page](https://satvikammula.site/members/satvikammula.html)
  - [robots.txt](https://satvikammula.site/robots.txt)
  - [hello.php](https://satvikammula.site/hw1/hello.php)
  - [report.html](https://satvikammula.site/hw1/report.html)

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
