const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const fs = require("fs");
const path = require("path")
const DB_PATH = path.join(__dirname, "db.json");

app.use(bodyParser.json())

let staticData = []
let performanceData = [];
let activityData = [];

let dbBackup = {}

const loadDB = () => {
  if (fs.existsSync(DB_PATH)) {
    const rawData = fs.readFileSync(DB_PATH, "utf-8");
    const db = JSON.parse(rawData);

    // Save everything except your managed tables
    dbBackup = { ...db };
    delete dbBackup.static;
    delete dbBackup.performance;
    delete dbBackup.activity; // <- make sure this line is here

    staticData = db.static || [];
    performanceData = db.performance || [];
    activityData = db.activity || [];
  }
};

const saveDB = () => {
  const dbToSave = {
    ...dbBackup,        // only posts, comments, logs, profile, etc.
    static: staticData,
    performance: performanceData,
    activity: activityData
  };
  fs.writeFileSync(DB_PATH, JSON.stringify(dbToSave, null, 2));
};

loadDB();

const findMyItem = (table, id) => table.find(item => String(item.id) === String(id));

const getNextId = (table) => {
  if (!table.length) return 1; // start at 1
  return Math.max(...table.map(item => Number(item.id))) + 1;
};

app.get("/api/static", (request, response) => {
  response.json(staticData);
})

app.get("/api/static/:id", (request, response) => {
  const requestedItem = findMyItem(staticData, request.params.id);
  if(!requestedItem) {
      return response.status(404).json({error: "That id doesn't exist!"});
  }
  response.json(requestedItem);
})

app.post('/api/static', (request, response) => {
  if ('id' in request.body) {
      return response.status(400).json({ error: "POST requests cannot have an ID" });
  }    
  const myNewItem = { id: request.body.id || getNextId(staticData), ...request.body };
  staticData.push(myNewItem);
  saveDB();
  response.status(201).json(myNewItem);
});

app.put('/api/static/:id', (request, response) => {
  if (!request.params.id) {
      return response.status(400).json({ error: "PUT requests require an ID" });
  }    
  const changeMyItem = staticData.findIndex(item => String(item.id) === String(request.params.id));
  if (changeMyItem === -1){
      return response.status(404).json({ error: "That id doesn't exist!" });
  }
  staticData[changeMyItem] = { ...staticData[changeMyItem], ...request.body };
  saveDB()
  response.json(staticData[changeMyItem]);
});

app.put('/api/static/', (request, response) => {
  if (!request.params.id) {
      return response.status(400).json({ error: "PUT requests require an ID" });
  }    
});

app.delete('/api/static/:id', (request, response) => {
  const deleteMyItem = staticData.findIndex(item => String(item.id) === String(request.params.id));
  if (deleteMyItem === -1){
    return response.status(404).json({ error: "That id doesn't exist!" });
  }
  const goneItem = staticData.splice(deleteMyItem, 1);
  saveDB();
  response.json(goneItem[0]);
});

app.delete('/api/static/', (request, response) => {
  if (!request.params.id) {
      return response.status(400).json({ error: "DELETE requests require an ID" });
  } 
});

app.get('/api/performance', (request, response) => response.json(performanceData));

app.get('/api/performance/:id', (request, response) => {
  const requestedItem = findMyItem(performanceData, request.params.id);
  if (!requestedItem){
      return response.status(404).json({ error: "That id doesn't exist!" });
  } 
  response.json(requestedItem);
});

app.post('/api/performance', (request, response) => {    
  const myNewItem = { id: request.body.id || getNextId(performanceData), ...request.body };
  performanceData.push(myNewItem);
  saveDB();
  response.status(201).json(myNewItem);
});

app.put('/api/performance/:id', (request, response) => {
  if (!request.params.id) {
      return response.status(400).json({ error: "PUT requests require an ID" });
  }      
  const changeMyItem = performanceData.findIndex(item => String(item.id) === String(request.params.id));
  if (changeMyItem === -1) {
    return response.status(404).json({ error: "That id doesn't exist!" });
  }
  performanceData[changeMyItem] = { ...performanceData[changeMyItem], ...request.body };
  saveDB();
  response.json(performanceData[changeMyItem]);
});

app.put('/api/performance/', (request, response) => {
  if (!request.params.id) {
      return response.status(400).json({ error: "PUT requests require an ID" });
  }    
});

app.delete('/api/performance/:id', (request, response) => {
  if (!request.params.id) {
      return response.status(400).json({ error: "DELETE requests require an ID" });
  }      
  const deleteMyItem = performanceData.findIndex(item => String(item.id) === String(request.params.id));
  if (deleteMyItem === -1) {
    return response.status(404).json({ error: "That id doesn't exist!" });
  }
  const goneItem = performanceData.splice(deleteMyItem, 1);
  saveDB();
  response.json(goneItem[0]);
});

app.delete('/api/performance/', (request, response) => {
  if (!request.params.id) {
      return response.status(400).json({ error: "DELETE requests require an ID" });
  } 
});

app.get('/api/activity', (request, response) => response.json(activityData));

app.get('/api/activity/:id', (request, response) => {
  const requestedItem = findMyItem(activityData, request.params.id);
  if (!requestedItem) {
      return response.status(404).json({ error: "That id doesn't exist!" });
  }
  response.json(requestedItem);
});

app.post('/api/activity', (request, response) => {
  if ('id' in request.body) {
      return response.status(400).json({ error: "POST requests cannot have an ID" });
  }        
  const myNewItem = { id: request.body.id || getNextId(activityData), ...request.body };
  activityData.push(myNewItem);
  saveDB();
  response.status(201).json(myNewItem);
});

app.put('/api/activity/:id', (request, response) => {
  if (!request.params.id) {
      return response.status(400).json({ error: "PUT requests require an ID" });
  }        
  const changeMyItem = activityData.findIndex(item => String(item.id) === String(request.params.id));
  if (changeMyItem === -1) {
      return response.status(404).json({ error: "That id doesn't exist!" });
  }
  activityData[changeMyItem] = { ...activityData[changeMyItem], ...request.body };
  saveDB();
  response.json(activityData[changeMyItem]);
});

app.put('/api/activity/', (request, response) => {
  if (!request.params.id) {
      return response.status(400).json({ error: "PUT requests require an ID" });
  }    
});

app.delete('/api/activity/:id', (request, response) => {
  if (!request.params.id) {
      return response.status(400).json({ error: "DELETE requests require an ID" });
  }     
  const deleteMyItem = activityData.findIndex(item => String(item.id) === String(request.params.id));
  if (deleteMyItem === -1) {
      return response.status(404).json({ error: "That id doesn't exist!" });
  }
  const goneItem = activityData.splice(deleteMyItem, 1);
  saveDB();
  response.json(goneItem[0]);
});

app.delete('/api/activity/', (request, response) => {
  if (!request.params.id) {
      return response.status(400).json({ error: "DELETE requests require an ID" });
  } 
});

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
