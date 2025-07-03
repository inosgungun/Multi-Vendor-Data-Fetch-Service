require('dotenv').config(); 

const express = require('express');
const jobRoutes = require('./api/index');
const mongoose = require('mongoose');
const { connectQueue } = require('./queue/queue');

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/multivendor";

const app = express();

app.use('/', jobRoutes);

mongoose.connect(mongoUrl, {maxPoolSize: 50})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

connectQueue().then(() => {
    console.log('Worker connected to RabbitMQ');
    consumeQueue(processJob);  
}).catch(console.error);


app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
});
