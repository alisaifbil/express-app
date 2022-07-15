require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const db = process.env.DATABASE_URL;
let cron = require('node-cron');
const cronJob = require('./src/services/schedulejob');

mongoose.connect(db);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Connected to Database Successfully');
})

const app = express();
// app.use(cors())
app.use(express.json());

// const routes = require('./src/routes/routes');

// app.use('/', routes)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

cronJob.fetchData();


