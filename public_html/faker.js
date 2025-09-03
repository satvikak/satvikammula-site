// THIS IS AN EXTRA FILE USED TO GENERATE FAKE DATA
// The professor in class mentions that faker is a good package that we can use to generate extra data, so I decided to use it
// This is useful for the charting specifically, so that I have more data than just from my device


// We import faker and MongoClient to ensure we can connect to the database, and add to it
import { faker } from '@faker-js/faker';
import { MongoClient } from 'mongodb';

// Here, we connect using the secure databse connection code
import dotenv from 'dotenv';
dotenv.config({ path: './secret.env' });
const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI);

// We generate 50 entries for static and performance, and some more for activity
// The idea of this is we want to have a common collection of sessions with multiple entries connected to sessions, not just a bunch of random new sessions
const numSessions = 50;
const sessionIDs = Array.from({ length: numSessions }, () => faker.string.uuid());

// Here, we instantiate the browsers I expect to be the most common amongst real users
const browsers = ['Chrome', 'Edge', 'Safari'];
// Here, we define different types of devices that users can visit the site from
// It contains the os for identification and correspoond device width/heights
const devices = [
  { type: 'desktop', os: 'Windows', width: 1920, height: 1080 },
  { type: 'desktop', os: 'Mac', width: 1440, height: 900 },
  { type: 'phone', os: 'iOS', width: 414, height: 896 },
  { type: 'phone', os: 'Android', width: 412, height: 915 },
  { type: 'tablet', os: 'iPad', width: 1024, height: 768 },
  { type: 'tablet', os: 'Amazon Fire', width: 1280, height: 800 },
];

// Here, we defined some fun languages that I wanted users to emulate
const languages = ['en-US', 'es-ES', 'fr-FR', 'hi-IN', 'zh-CN'];

// Here, we defined some potential network connection types form real users
const networks = ['wifi', '4g', '5g', 'unknown'];

// This function is used to generate Static dta
async function generateFakeStaticData() {
  const db = client.db('cse135');
  const collection = db.collection('static');

  // Here, we make sure that sessions ID's are connected to a static entry
  const fakeData = sessionIDs.map((sid) => {
    // Here, we instantiate random devices and browsers
    const device = faker.helpers.arrayElement(devices);
    const browser = faker.helpers.arrayElement(browsers);
    // Then we put it into the format of a regular userAgent string
    const ua = `Mozilla/5.0 (${device.os}) AppleWebKit/537.36 (KHTML, like Gecko) ${browser}/${
      faker.number.int({ min: 80, max: 140 })
    }.0.0.0 Safari/537.36`;

    // Here, we randomize the potential screen heights of the entry device
    const screenHeight = device.height + faker.number.int({ min: -50, max: 50 });
    const screenWidth = device.width + faker.number.int({ min: -50, max: 50 });

    // Here, we return a static data container, similar to how we did in collector.js
    return {
      userAgentString: ua, // our formatted userAgent string
      userLanguage: faker.helpers.arrayElement(languages), // randomize language
      userAcceptsCookies: faker.datatype.boolean(), // randomize cookie usage
      userAllowsJS: true, // make sure JS is true so we ca log data
      userAllowsImages: faker.datatype.boolean(), // randomize image usability
      userAllowsCSS: faker.datatype.boolean(), // randomize css usability
      userScreenHeight: screenHeight, // set our random screenHeight
      userScreenWidth: screenWidth, // set our random screenWidth
      userWindowHeight: Math.floor(screenHeight * 0.8), // set our random window height
      userWindowWidth: Math.floor(screenWidth * 0.8), // set our random window width
      userNetworkConnection: faker.helpers.arrayElement(networks), // set a random network type
      userSessionID: sid // make sure we are connected to a unique session from our 50
    };
  });

  // Here we insert all of our static entires
  await collection.insertMany(fakeData);
}

// This function is used to generate fake performance data
async function generateFakePerformanceData() {
  const db = client.db('cse135');
  const collection = db.collection('performance');

    // Again, we make sure that we are connect to one of the unique sessions we generated (bc each unique session has unique static/performance)
    const fakePerfData = sessionIDs.map((sid) => {
    // Next, we randomly pick a device and browser for our data
    const device = faker.helpers.arrayElement(devices);
    const browser = faker.helpers.arrayElement(browsers);

    // Depending on the device type, we set realistic data types
    let baseLoad;
    // Realistic desktop load time
    if (device.type === 'desktop') baseLoad = faker.number.int({ min: 150, max: 400 });
    // Realistic tablet load time
    else if (device.type === 'tablet') baseLoad = faker.number.int({ min: 200, max: 500 });
    // Realisitc phone load time
    else baseLoad = faker.number.int({ min: 250, max: 600 });

    // We add a little bit more randomness to our total load
    const totalLoad = parseFloat((baseLoad + faker.number.int({ min: -20, max: 20 })).toFixed(2));

    // Here we return a performance object like we did in collector.js
    return {
      // The time object is roughly in the same form, since we don't really use it in the data charting
      timeObject: {
        name: 'https://satvikammula.site/',
        entryType: 'navigation',
        startTime: 0,
        duration: totalLoad,
        initiatorType: 'navigation',
        deliveryType: '',
        nextHopProtocol: 'http/1.1',
        renderBlockingStatus: 'non-blocking',
        type: 'navigate',
      },
      loadStart: 0,
      // We set our total loading time according to what we did above
      loadEnd: totalLoad,
      totalLoad: totalLoad,
      // We make sure we are connected to a unique sessionID
      userSessionID: sid
    };
  });

  // Here we insert all the fake activity entries into our database
  await collection.insertMany(fakePerfData);
}

// Here we define the basic accessible pages for our fake data, to use in charting
const pages = [
  'https://satvikammula.site',
  'https://satvikammula.site/members/satvikammula.html',
  'https://satvikammula.site/hw3/database.html',
  'https://satvikammula.site/hw3/hellodataviz.html'
];

// Here we define the function to generate fake activity data
async function generateFakeActivityData() {
  const db = client.db('cse135');
  const collection = db.collection('activity');

  // We push a bunch of random activity data to then insert al at once
  const activityData = [];

  // Based on each unique sid, we do 1 <= x <= 5 entries
  // We know that one user can enter many different pages, not just one
  sessionIDs.forEach((sid) => {
    const numEntries = faker.number.int({ min: 1, max: 5 });

    for (let i = 0; i < numEntries; i++) {
      // We pick some random page for the user to enter
      const page = faker.helpers.arrayElement(pages);

      // We enter a random timestamp to assign the activity
      const timestamp = faker.date.recent(7);

      // We push the actual activity to the array, like we did in collector.js
      activityData.push({
        sessionID: sid,
        userAction: 'pageEnter',
        timestamp: timestamp.toLocaleString(),
        pageEnterTime: timestamp.toISOString(),
        onPage: page
      });
    }
  });

  // We insert all the activity data into our activity collection in the database
  await collection.insertMany(activityData);
}

// Here is the function to actually call the functions inserting the data
async function run() {
  try {
    // We make sure we are connected first
    await client.connect();
    const db = client.db('cse135');

    // We one by one call all our functions
    const staticData = await generateFakeStaticData();
    const performanceData = await generateFakePerformanceData();
    const activityData = await generateFakeActivityData();

    // We one by one ensure that our collections are populated
    await db.collection('static').insertMany(staticData);
    await db.collection('performance').insertMany(performanceData);
    await db.collection('activity').insertMany(activityData);

  // We check for errors or success
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();