const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection  
const MONGO_URI =
  "mongodb://normalapp:8vpouqLrmHy0CwXW@ac-hzku4k6-shard-00-00.qjl4hd9.mongodb.net:27017,ac-hzku4k6-shard-00-01.qjl4hd9.mongodb.net:27017,ac-hzku4k6-shard-00-02.qjl4hd9.mongodb.net:27017/clickDB?ssl=true&replicaSet=atlas-cgl8li-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// 📦 Schema
const clickSchema = new mongoose.Schema({
  action: String,
  location: String,
  pageUrl: String,
  coordinates: {
    x: Number,
    y: Number,
  },
  time: { type: Date, default: Date.now },
});

const Click = mongoose.model("Click", clickSchema);

// 🔥 Track API
app.post("/track", async (req, res) => {
  try {
    const { action, location, pageUrl, coordinates } = req.body;

    const newClick = new Click({
      action,
      location,
      pageUrl,
      coordinates,
    });

    await newClick.save();

    console.log("Saved:", newClick);

    res.status(200).json({ message: "Saved ✅" });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Error ❌" });
  }
});

// 📊 Get data
app.get("/data", async (req, res) => {
  try {
    const data = await Click.find().sort({ time: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error ❌" });
  }
});

// Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000 🚀");
});
