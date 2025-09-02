const express = require("express");
// const bodyParser = require("body-parser")
const {MongoClient, ObjectId} = require("mongodb");
const app = express();
const port = 3001;
app.use(express.json());
// app.use(bodyParser.json());

const mongoConnectURI = "mongodb://satvi:mongoMangodbMilkshake@127.0.0.1:27017/cse135?authSource=cse135";
const myDB = "cse135";

let db, myStaticData, myPerformanceData, myActivityData;

MongoClient.connect(mongoConnectURI).then(client => {
    db = client.db(myDB);
    myStaticData = db.collection("static");
    myPerformanceData = db.collection("performance");
    myActivityData = db.collection("activity");
    app.listen(port, () => {
        console.log(`MongoDB API server running on http://localhost:${port}`);
    });
}).catch(error => console.error("Mongo connection error:", error));

const idParseHelper = (id) => {
    try {
        return new ObjectId(id);
    }
    catch {
        return null;
    }
};

app.get("/api/static", async (request, response) => {
    try {
        const staticData = await myStaticData.find().toArray();
        response.json(staticData);
    } 
    catch (error) {
        console.error("Error fetching static item:", error);
        response.status(500).json({ error: "Failed to fetch static item" });
    }
});

app.get("/api/static/:id", async (request, response) => {
    const _id = idParseHelper(request.params.id);
    if(!_id) {
        return response.status(404).json({error: "That id doesn't exist!"});
    }
    try {
        const requestedItem = await myStaticData.findOne({_id});
        if(!requestedItem) {
            return response.status(404).json({error: "We can't find that static item!"})
        }
        response.json(requestedItem);
    }
    catch (error) {
        console.error("Error fetching static item:", error);
        response.status(500).json({error: "Failed to fetch static item"})
    }
})

app.post('/api/static', async (request, response) => {
    const {_id, ...body} = request.body;
    if(_id) {
        return response.status(400).json({ error: "POST requests cannot have an ID" });
    }
    try {
        const myNewItem = await myStaticData.insertOne(body);
        response.status(201).json({ _id: myNewItem.insertedId, ...body });
    } catch (error) {
        console.error("Error creating static item:", error);
        response.status(500).json({ error: "Failed to create static item" });
    }
});

app.put('/api/static/:id', async (request, response) => {
    const _id = idParseHelper(request.params.id);
    if(!_id) {
        return response.status(404).json({ error: "That id doesn't exist!" });
    }
    try {
        const changeMyItem = await myStaticData.findOneAndUpdate({ _id }, { $set: request.body }, { returnDocument: "after" });
        if (!changeMyItem.value) {
            return response.status(404).json({ error: "We can't find that static item!" });
        }
        response.json(changeMyItem.value);
    } catch (error) {
        console.error("Error updating static item:", error);
        response.status(500).json({ error: "Failed to update static item" });
    }
});

app.delete('/api/static/:id', async (request, response) => {
    const _id = idParseHelper(request.params.id);
    if(!_id) {
        return response.status(404).json({ error: "That id doesn't exist!" });
    }
    try {
        const deleteMyItem = await myStaticData.findOneAndDelete({ _id });
        if (!deleteMyItem.value) {
            return response.status(404).json({ error: "We can't find that static item!" });
        }
        response.json(deleteMyItem.value);
    } catch (error) {
        console.error("Error deleting static item:", error);
        response.status(500).json({ error: "Failed to delete static item" });
    }
});

app.get("/api/performance", async (request, response) => {
    try {
        const performanceData = await myPerformanceData.find().toArray();
        response.json(performanceData);
    } 
    catch (error) {
        console.error("Error fetching performance item:", error);
        response.status(500).json({ error: "Failed to fetch performance item" });
    }
});

app.get("/api/performance/:id", async (request, response) => {
    const _id = idParseHelper(request.params.id);
    if(!_id) {
        return response.status(404).json({error: "That id doesn't exist!"});
    }
    try {
        const requestedItem = await myPerformanceData.findOne({_id});
        if(!requestedItem) {
            return response.status(404).json({error: "We can't find that performance item!"})
        }
        response.json(requestedItem);
    }
    catch (error) {
        console.error("Error fetching performance item:", error);
        response.status(500).json({error: "Failed to fetch performance item"})
    }
})

app.post('/api/performance', async (request, response) => {
    const {_id, ...body} = request.body;
    if(_id) {
        return response.status(400).json({ error: "POST requests cannot have an ID" });
    }    
    try {
        const myNewItem = await myPerformanceData.insertOne(body);
        response.status(201).json({ _id: myNewItem.insertedId, ...body });
    } catch (error) {
        console.error("Error creating performance item:", error);
        response.status(500).json({ error: "Failed to create performance item" });
    }
});

app.put('/api/performance/:id', async (request, response) => {
    const _id = idParseHelper(request.params.id);
    if(!_id) {
        return response.status(404).json({ error: "That id doesn't exist!" });
    }
    try {
        const changeMyItem = await myPerformanceData.findOneAndUpdate({ _id }, { $set: request.body }, { returnDocument: "after" });
        if (!changeMyItem.value) {
            return response.status(404).json({ error: "We can't find that performance item!" });
        }
        response.json(changeMyItem.value);
    } catch (error) {
        console.error("Error updating performance item:", error);
        response.status(500).json({ error: "Failed to update performance item" });
    }
});

app.delete('/api/performance/:id', async (request, response) => {
    const _id = idParseHelper(request.params.id);
    if(!_id) {
        return response.status(404).json({ error: "That id doesn't exist!" });
    }
    try {
        const deleteMyItem = await myPerformanceData.findOneAndDelete({ _id });
        if (!deleteMyItem.value) {
            return response.status(404).json({ error: "We can't find that performance item!" });
        }
        response.json(deleteMyItem.value);
    } catch (error) {
        console.error("Error deleting performance item:", error);
        response.status(500).json({ error: "Failed to delete performance item" });
    }
});

app.get("/api/activity", async (request, response) => {
    try {
        const limit = parseInt(request.query.limit); // undefined if not passed
        let cursor = myActivityData.find().sort({ timestamp: -1 }); // most recent first
        if (limit) cursor = cursor.limit(limit);
        const activityData = await cursor.toArray();
        response.json(activityData);
    } 
    catch (error) {
        console.error("Error fetching activity item:", error);
        response.status(500).json({ error: "Failed to fetch activity item" });
    }
});

app.get("/api/activity/:id", async (request, response) => {
    const _id = idParseHelper(request.params.id);
    if(!_id) {
        return response.status(404).json({error: "That id doesn't exist!"});
    }
    try {
        const requestedItem = await myActivityData.findOne({_id});
        if(!requestedItem) {
            return response.status(404).json({error: "We can't find that activity item!"})
        }
        response.json(requestedItem);
    }
    catch (error) {
        console.error("Error fetching activity item:", error);
        response.status(500).json({error: "Failed to fetch activity item"})
    }
})

app.post('/api/activity', async (request, response) => {
    const {_id, ...body} = request.body;
    if(_id) {
        return response.status(400).json({ error: "POST requests cannot have an ID" });
    }    
    try {
        const myNewItem = await myActivityData.insertOne(body);
        response.status(201).json({ _id: myNewItem.insertedId, ...body });
    } catch (error) {
        console.error("Error creating activity item:", error);
        response.status(500).json({ error: "Failed to create activity item" });
    }
});

app.put('/api/activity/:id', async (request, response) => {
    const _id = idParseHelper(request.params.id);
    if(!_id) {
        return response.status(404).json({ error: "That id doesn't exist!" });
    }
    try {
        const changeMyItem = await myActivityData.findOneAndUpdate({ _id }, { $set: request.body }, { returnDocument: "after" });
        if (!changeMyItem.value) {
            return response.status(404).json({ error: "We can't find that activity item!" });
        }
        response.json(changeMyItem.value);
    } catch (error) {
        console.error("Error updating activity item:", error);
        response.status(500).json({ error: "Failed to update activity item" });
    }
});

app.delete('/api/activity/:id', async (request, response) => {
    const _id = idParseHelper(request.params.id);
    if(!_id) {
        return response.status(404).json({ error: "That id doesn't exist!" });
    }
    try {
        const deleteMyItem = await myActivityData.findOneAndDelete({ _id });
        if (!deleteMyItem.value) {
            return response.status(404).json({ error: "We can't find that activity item!" });
        }
        response.json(deleteMyItem.value);
    } catch (error) {
        console.error("Error deleting activity item:", error);
        response.status(500).json({ error: "Failed to delete activity item" });
    }
});
