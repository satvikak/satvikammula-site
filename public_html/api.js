
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use(bodyParser.json())


let staticData = []
let performanceData = [];
let activityData = [];

const findMyItem = (table, id) => table.find(item => item.id === id);

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
    const myNewItem = { id: `${Date.now()}`, ...request.body };
    staticData.push(myNewItem);
    response.status(201).json(myNewItem);
});

app.put('/api/static/:id', (request, response) => {
    const changeMyItem = staticData.findIndex(item => item.id === request.params.id);
    if (changeMyItem === -1){
        return response.status(404).json({ error: "That id doesn't exist!" });
    }
  staticData[changeMyItem] = { ...staticData[changeMyItem], ...request.body };
  response.json(staticData[changeMyItem]);
});

app.delete('/api/static/:id', (request, response) => {
  const deleteMyItem = staticData.findIndex(item => item.id === request.params.id);
  if (deleteMyItem === -1){
    return response.status(404).json({ error: "That id doesn't exist!" });
  }
  const goneItem = staticData.splice(deleteMyItem, 1);
  response.json(goneItem[0]);
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
  const myNewItem = { id: `${Date.now()}`, ...request.body };
  performanceData.push(myNewItem);
  response.status(201).json(myNewItem);
});

app.put('/api/performance/:id', (request, response) => {
  const changeMyItem = performanceData.findIndex(item => item.id === request.params.id);
  if (changeMyItem === -1) {
    return response.status(404).json({ error: "That id doesn't exist!" });
  }
  performanceData[changeMyItem] = { ...performanceData[changeMyItem], ...request.body };
  response.json(performanceData[changeMyItem]);
});

app.delete('/api/performance/:id', (request, response) => {
  const deleteMyItem = performanceData.findIndex(item => item.id === request.params.id);
  if (deleteMyItem === -1) {
    return response.status(404).json({ error: "That id doesn't exist!" });
  }
  const goneItem = performanceData.splice(deleteMyItem, 1);
  response.json(goneItem[0]);
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
    const myNewItem = { id: `${Date.now()}`, ...request.body };
    activityData.push(myNewItem);
    response.status(201).json(myNewItem);
});

app.put('/api/activity/:id', (request, response) => {
    const changeMyItem = activityData.findIndex(item => item.id === request.params.id);
    if (changeMyItem === -1) {
        return response.status(404).json({ error: "That id doesn't exist!" });
    }
    activityData[changeMyItem] = { ...activityData[changeMyItem], ...request.body };
    response.json(activityData[changeMyItem]);
});

app.delete('/api/activity/:id', (request, response) => {
    const deleteMyItem = activityData.findIndex(item => item.id === request.params.id);
    if (deleteMyItem === -1) {
        return response.status(404).json({ error: "That id doesn't exist!" });
    }
    const goneItem = activityData.splice(deleteMyItem, 1);
    response.json(goneItem[0]);
});

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
