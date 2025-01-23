const express = require('express');
const mongoose = require('mongoose');
//const connectDB = require("./server/config/db");
const authRoutes = require('./routes/authRoutes');
const deviceRoute = require('./routes/deviceRoutes');
const sensorRoute = require('./routes/sensorRoutes');
const cookieParser = require('cookie-parser');
const Sensor = require("./models/Sensor");
const Device = require("./models/Device");
const { requireAuth, checkUser } = require('./middleware/authMiddleware');


const app = express();

// Connect to DB
//connectDB();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
//const dbURI = 'mongodb+srv://shaun:test1234@cluster0.del96.mongodb.net/node-auth';
const dbURI = 'mongodb+srv://raddy:N7cJGzWpEtLxFfXT@cluster0.be7ts.mongodb.net/datalog';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.get('/about', (req, res) => res.render('about'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/device', requireAuth, async (req, res) => {
 try {
    const locals = {
        title: "table database",
        description: "Here is shown table from database."
    }

    //let perPage = 20;
    //let page = req.query.page || 1;
    const page = parseInt(req.query.page) || 1;  // Get current page (default 1)
    const size = parseInt(req.query.size) || 10; // Get page size (default 10)

    // Fetch data with pagination
    const device = await Device.find()
    .skip((page - 1) * size)  // Skip items from previous pages
    .limit(size);             // Limit the number of items

    const totalUsers = await Device.countDocuments();  // Get total number of users
    const totalPages = Math.ceil(totalUsers / size); // Calculate total pages
        // Render the EJS template and pass data
    res.render('device', {
    users: device,
    currentPage: page,
    pageSize: size,
    totalPages: totalPages,
    pageOptions: [10, 25, 50, 100]  // Options for selecting page size
  });
} catch (err) {
  res.status(500).json({ error: err.message });
}   

  //res.render('device'));
});
app.get('/sensor', requireAuth, async (req, res) => {
  try {
     const locals = {
         title: "table database",
         description: "Here is shown table from database."
     }
 
     //let perPage = 20;
     //let page = req.query.page || 1;
     const page = parseInt(req.query.page) || 1;  // Get current page (default 1)
     const size = parseInt(req.query.size) || 10; // Get page size (default 10)
 
     // Fetch data with pagination
     const sensor = await Sensor.find()
     .skip((page - 1) * size)  // Skip items from previous pages
     .limit(size);             // Limit the number of items
 
     const totalUsers = await Sensor.countDocuments();  // Get total number of users
     const totalPages = Math.ceil(totalUsers / size); // Calculate total pages
         // Render the EJS template and pass data
     res.render('sensor', {
     users: sensor,
     currentPage: page,
     pageSize: size,
     totalPages: totalPages,
     pageOptions: [10, 25, 50, 100]  // Options for selecting page size
   });
 } catch (err) {
   res.status(500).json({ error: err.message });
 }   
 
   //res.render('device'));
 });
 
app.use(authRoutes);
app.use('/api/devices', deviceRoute);
app.use('/api/sensors', sensorRoute);