/**
 * Some links I used to help:
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
 * https://blog.sentry.io/client-javascript-reporting-window-onerror/
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/clearTimeout#browser_compatibility
 * https://medium.com/@mfahadqureshi786/creating-session-in-nodejs-a72d5544e4d1
 * https://stackoverflow.com/questions/9014804/javascript-validate-css
 * https://stackoverflow.com/questions/18837735/check-if-image-exists-on-server-using-javascript
 * https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType
 * https://developer.mozilla.org/en/docs/Web/API/Fetch_API
 * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 * https://stackoverflow.com/questions/667555/how-to-detect-idle-time-in-javascript
 * https://www.sitepoint.com/community/t/detect-inactivity-in-js/441917/10
 * 
 */

// Take care of some routing issues when data is posted
// Ex. if /logs is visted, make sure you rerout to /json/logs for posting
const apiBaseUrl = window.location.hostname === "localhost" 
  ? "http://localhost:3001/api/"
  : "https://satvikammula.site/api/";

const endpoints = {
    static: new URL("static/", apiBaseUrl).href,
    performance: new URL("performance/", apiBaseUrl).href,
    activity: new URL("activity/", apiBaseUrl).href
};  

// Create a global container to save all the activityData
let activityDataContainer = []

// Create a unique sessionID for users
let userSessionID = localStorage.getItem("sessionID")
// If a sessionID isn't present, make a new unique one for them
if(!userSessionID) {
    userSessionID = "sess_" + Math.random().toString(36).substring(2, 11);
    localStorage.setItem("sessionID", userSessionID);
}

/**
 * BELOW YOU CAN FIND HOW I COLLECT STATIC DATA
 * THE ORDER THAT I COLLECT THEM IN IS IN COMMENTS OR IS SIMPLY:
 * - userAgent
 * - userLanguage
 * - user accepts Cookies
 * - user allows JS
 * - user allows CSS
 * - user screen dimensions
 * - user window dimensions
 * - user network connection type
 * - user allows images
 */

// Function used to get all the necessary static and performance data
function getStaticPerformanceData() {
    // Gets user agent string
    let userAgentString = window.navigator.userAgent || null;
    // Gets user's language
    let userLanguage = window.navigator.language || null;
    // Checks if user accepts cookies
    let userAcceptsCookies = (window.navigator.cookieEnabled === true);
    // If this script runs, we know that the user allows JS
    let userAllowsJS = true;

    // Check if the user allows CSS
    let userAllowsCSS = false;
    // We check by attempting to style an element
    if(document.body && window.getComputedStyle) {
        const testCSSObject = document.createElement("div");
        // Try applying the color purple
        testCSSObject.style.color = "purple";
        document.body.appendChild(testCSSObject);
        const retrievedColor = window.getComputedStyle(testCSSObject).getPropertyValue("color");
        // If the color is correctly applied then we know true
        userAllowsCSS = (retrievedColor === "rgb(128, 0, 128)");
        // Remove the element we used for testing
        document.body.removeChild(testCSSObject);
    }

    //Get user's screen dimensions
    let userScreenHeight = window.screen.height;
    let userScreenWidth = window.screen.width;

    // Get user's window dimensions
    let userWindowHeight = window.innerHeight;
    let userWindowWidth = window.innerWidth;

    // We get the user's network connection
    let userNetworkConnection = "unknown";
    if(navigator.connection && navigator.connection.effectiveType) {
        // Check for wifi/4g/5g/hotspot/etc
        userNetworkConnection = navigator.connection.effectiveType;
    }

    // Make a container that holds all of the static data
    const staticDataContainer = {userAgentString, userLanguage, userAcceptsCookies, userAllowsJS, userAllowsImages: null, userAllowsCSS, userScreenHeight, userScreenWidth, userWindowHeight, userWindowWidth, userNetworkConnection, userSessionID};
    // Store all of our static data in local storage before sending to the server
    localStorage.setItem("staticData", JSON.stringify(staticDataContainer));

    // Check if user allows images
    const trialImage = new Image();
    // If the image loads we know true, or false otherwise
    trialImage.onload = () => updateUserAllowsImages(true);
    trialImage.onerror = () => updateUserAllowsImages(false);
    // We use a small 1x1 image to check if it renders
    trialImage.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

    // This is used to update whether images are allowed or not in a timely way
    function updateUserAllowsImages(allows) {
        // Sometimes image rendering isn't as fast as the other elements
        const staticDataCheck = JSON.parse(localStorage.getItem("staticData"));
        staticDataCheck.userAllowsImages = allows;
        localStorage.setItem("staticData", JSON.stringify(staticDataCheck));
    }

/**
 * BELOW YOU CAN FIND HOW I COLLECT PERFORMANCE DATA
 * THE ORDER THAT I COLLECT THEM IN IS IN COMMENTS OR IS SIMPLY:
 * - timing object
 * - page load start
 * - page load end
 * - total load time
 */

    // Create a container to store the performance data
    const performanceDataContainer = {};
    // Main mechanism for performance data collection
    if(performance.getEntriesByType && performance.getEntriesByType("navigation").length > 0) {
        const timeCheck = performance.getEntriesByType("navigation")[0]
        // Get whole timing object
        performanceDataContainer.timeObject = JSON.parse(JSON.stringify(timeCheck));
        // Get when page started loading
        performanceDataContainer.loadStart = timeCheck.startTime;
        // Get when page ended loading
        performanceDataContainer.loadEnd = timeCheck.loadEventEnd;
        // Get total load time
        performanceDataContainer.totalLoad = performanceDataContainer.loadEnd-performanceDataContainer.loadStart;
    }
    // Mechanism for performance data collection if previous is not enabled
    else {
        const timeCheck = window.performance.timing;
        // Get whole timing object
        performanceDataContainer.timeObject = JSON.parse(JSON.stringify(timeCheck));
        // Get when page started loading
        performanceDataContainer.loadStart = timeCheck.navigationStart;
        // Get when page ended loading
        performanceDataContainer.loadEnd = timeCheck.loadEventEnd;
        // Get total load time
        performanceDataContainer.totalLoad = performanceDataContainer.loadEnd-performanceDataContainer.loadStart;
    }

    // Make sure that the performance is tied to a user session, and all attributes are saved
    performanceDataContainer.userSessionID = userSessionID;
    localStorage.setItem("performanceData", JSON.stringify(performanceDataContainer));
}

/**
 * BELOW YOU CAN FIND HOW I COLLECT ACTIVITY DATA
 * THE ORDER THAT I COLLECT THEM IN IS IN COMMENTS OR IS SIMPLY:
 * - Any idle time (break end, break duration)
 * - Page enter time
 * - Cursor positions
 * - Clicks
 * - Scrolling
 * - Key up/Key down
 * - User left page
 * - Which page user was on
 */

// Function to get the actual activity on the loaded page
function getPageLoadData() {
    const sendOften = 15000;
    const maxSize = 100;

    // Function to add a specific activity to the list of activities done in a session
    function activityItemMaker(userAction, data={}) {
        // An activity has a corresponding session, action, and action data
        activityDataContainer.push({
            sessionID: userSessionID,
            userAction: userAction,
            timestamp: new Date(Date.now()).toLocaleString(),
            ...data
        });
        // If there are >=25 activities in localStorage, we push it to the server to make space (don't want to hog local storage space)
        if(activityDataContainer.length >= maxSize) {
            cleanoutActivityData();
        }
    };

    // Used to clean up data every now and then so that localStorage is not overly full
    async function cleanoutActivityData() {
        // If there's nothing to clean, we continue
        if(activityDataContainer.length === 0) {
            return;
        }
        // If there are items to send to the server, we try to
        const batchSend = activityDataContainer.splice(0, maxSize);
        try {
            await sendServerData({
                type: "activity",
                data: batchSend
            });
            // If some data was sent, we clear it
            // Any unsent data stays in our container to try being sent again later
            // activityDataContainer.splice(0, batchSend.length)
            localStorage.setItem("activityDataContainer", JSON.stringify(activityDataContainer));
        }
        catch (error) {
            // If there's an error, we log it
            console.error("Error sending activity data", error);
            activityDataContainer.unshift(...batchSend);
        }
    }

    // Used to periodically clean the local storage, another mechanism to not hog up the localServer space
    let cleanoutTimer = setInterval(cleanoutActivityData, sendOften);

    let idleBreakStart = null;
    let ifIdleCheck = null;
    let isIdle = false;

    // Function to track when the user is idle
    // Any idle time where no activity happened for a period of 2 or more seconds
    function restartIdle() {
        // We stop checking for if the user is idle (basically if idle, we don't need to keep checking idleness)
        if(ifIdleCheck) {
            clearTimeout(ifIdleCheck);
        }

        // If idle, we log it
        if(isIdle) {
            // Calculate when break ended
            const idleBreakEnd = Date.now();
            // Calculate duration of idleness
            const totalIdle = idleBreakEnd-idleBreakStart;
            activityItemMaker("idleBreak", {
                // Actually format start, end, and duration of idleness
                idleBreakStart: new Date(idleBreakStart).toISOString(),
                // Record when the break ended
                idleBreakEnd: new Date(idleBreakEnd).toISOString(),
                // Record how long it lasted (in milliseconds)
                idleDuration: totalIdle,                
            })
            // We make sure we aren't currently idle after movement, and idleness hasn't started yet
            isIdle = false;
            idleBreakStart = null;
        }
        // We start a timer to check for idleness, checking if no activity has occurred for 2+ seconds
        ifIdleCheck = setTimeout(() => {
            idleBreakStart = Date.now();
            isIdle = true;
        }, 2000);
    };

    // We mark all mouse movements as idle-breaking, basically if user moves they are no longer idle
    ["mousemove", "click", "scroll", "keydown"].forEach((eventName) => {
        window.addEventListener(eventName, restartIdle);
    });

    // When the page first loads or when we first startup, we start as non-idle
    restartIdle();

    // Function used to not track mouse movements as often, to not crash localStorage
    function slowDown(mouseMoveFxn, slowTime) {
        // If we just tracked the mouse movement, we wait sometime before logging it again (else activity is full of just mouse movement)
        let justCalled = 0;
        return function(...args) {
            const currentTime = Date.now();
            if(currentTime-justCalled >= slowTime) {
                justCalled = currentTime;
                mouseMoveFxn.apply(this, args);
            }
        }
    }

    // We track when the user entered the page
    activityItemMaker("pageEnter", {pageEnterTime: new Date().toISOString()})

    // We check for all thrown errors
    window.addEventListener("error", function (errorEvent) {
        activityItemMaker("error", {errorMessage: errorEvent.message, errorLocation: errorEvent.filename, errorLine: errorEvent.lineno, errorCol: errorEvent.colno, errorObj: errorEvent.error ? errorEvent.error.toString() : null})   
    });

    // We check for all mouse movement or cursor positions (coordinates)
    window.addEventListener("mousemove", slowDown((event) => {
        activityItemMaker("mousemove", {xMove: event.clientX, yMove: event.clientY})
    }, 500));

    // We check for Clicks (and which mouse button it was)
    window.addEventListener("click", (event) => {
        activityItemMaker("click", {xClick: event.clientX, yClick: event.clientY, button: event.button})
    });

    // We check for Scrolling (coordinates of the scroll)
    window.addEventListener("scroll", (event) => {
        activityItemMaker("scroll", {xScroll: window.scrollX, yScroll: window.scrollY})
    });

    // We check if any key is pressed down
    window.addEventListener("keydown", (event) => {
        activityItemMaker("keydown", {key: event.key})
    });  
    
    // We check if any key has gone up
    window.addEventListener("keyup", (event) => {
        activityItemMaker("keyup", {key: event.key})
    });
    
    // Function used to take care of things before user leaves the page
    window.addEventListener("beforeunload", (event)=> {
        // If the user is idle before the page closes, we log the full idleness (we don't want lingering timers or lost idle data)
        if(isIdle && idleBreakStart) {
            const idleBreakEnd = Date.now();
            const totalIdle = idleBreakEnd-idleBreakStart;
            activityItemMaker("idleBreak", {
                idleBreakStart: new Date(idleBreakStart).toISOString(),
                idleBreakEnd: new Date(idleBreakEnd).toISOString(),
                idleDuration: totalIdle,                
            })
        }    

        // We track when the user left the page
        activityItemMaker("pageLeave", { pageLeaveTime: new Date().toISOString() });
        
        // We track which page the user was on
        activityItemMaker("onPage", { onPage: window.location.href });


        // Flatten container to avoid nested arrays
        const flattened = activityDataContainer.flatMap(item => Array.isArray(item) ? item : [item]);

        // Send each object individually
        flattened.forEach(obj => {
            const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
            navigator.sendBeacon(endpoints.activity, blob);
        });

        // Cleanup the activity data, so nothing is lingering
        activityDataContainer = [];
        // We make sure the empty container is also saved in localStorage
        localStorage.setItem("activityDataContainer", JSON.stringify(activityDataContainer));

        // We clear any cleaning/idle timers that are running, so they don't start up on next page opening
        clearInterval(cleanoutTimer);
        clearTimeout(ifIdleCheck);
    });

    // const cleanoutTimer = setInterval(() => {
    //     cleanoutActivityData()
    // }, 30000) // We check every 15000ms
}

// Used to send activity data to the server
// Used to send activity, static, or performance data to the server
async function sendServerData(data) {
    const url = endpoints[data.type];

    // Helper to flatten any nested arrays and ensure everything is a single object
    const flattenObjects = (items) =>
        items.flatMap(item => Array.isArray(item) ? flattenObjects(item) : [item]);

    if (data.type === "activity") {
        let events = Object.values(data.data);
        events = flattenObjects(events); // Flatten nested arrays

        for (const event of events) {
            const { id, ...cleanEvent } = event; // Remove client-side id
            await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanEvent)
            });
        }
    } else {
        // static + performance
        let entries = Array.isArray(data.data) ? data.data : [data.data || data];
        entries = flattenObjects(entries); // Flatten nested arrays if any

        for (const entry of entries) {
            const { id, ...cleanEntry } = entry;
            await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanEntry)
            });
        }
    }
}

// Used to send static data to the server
function sendStaticData() {
    // We check if there actually is static data
    const staticData = JSON.parse(localStorage.getItem("staticData") || "{}");

    // Sometimes the image check can take some time, so we wait
    if (staticData.userAllowsImages === null) {
        setTimeout(sendStaticData, 50);
        return;
    }

    sendServerData({ type: "static", data: staticData });

    // // Again, we use the blob technique to appropriately use sendBeacon
    // const blob = new Blob(
    //     [JSON.stringify({ type: "Static", data: staticData })],
    //     { type: "application/json" }
    // );
    // navigator.sendBeacon(serverUrl, blob);
}

// Used to send performance data to the server
function sendPerformanceData() {
    // We check if there actually is performance data
    const performanceData = JSON.parse(localStorage.getItem("performanceData") || "{}");
    sendServerData({ type: "performance", data: performanceData });
    // // Again, we use the blob technique to appropriately use sendBeacon
    // const blob = new Blob(
    //     [JSON.stringify({ type: "Performance", data: performanceData })],
    //     { type: "application/json" }
    // );
    // navigator.sendBeacon(serverUrl, blob);
}

// We actually get the static/performance data, send it to the server and start logging the activity data as well
getStaticPerformanceData();
sendStaticData();
sendPerformanceData();
getPageLoadData();
