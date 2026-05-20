// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const staffRoutes = require('./routes/staffRoutes');
const labRoutes = require('./routes/labRoutes');
const checkRecordRoutes = require('./routes/checkRecordRoutes');
const missingReportRoutes=require("./routes/missingReportRoutes")
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
// mongoose.connect('mongodb+srv://eswermahes:ilife4074@cluster0.zlwh4.mongodb.net/inventory', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// mongoose.connect("mongodb://127.0.0.1:27017/academy_inventory")
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes 
app.use('/api/staff', staffRoutes);
app.use('/api/lab', labRoutes);
app.use('/api/checkrecords', checkRecordRoutes)
app.use("/api/missing",missingReportRoutes)

// Root route
app.get('/', (req, res) => {
  res.send('Academy Inventory API is running');
});

// Start server
app.listen(5000, () => {
  console.log(`🚀 Server running on port 5000`);
});