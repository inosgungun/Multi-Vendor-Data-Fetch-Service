const express = require('express');
const jobRoutes = require('./api/index');
const mongoose = require('mongoose');
const { connectQueue } = require('./queue/queue');

const app = express();

app.use('/', jobRoutes);

mongoose.connect('mongodb://localhost:27017/multivendor')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


connectQueue().then(() => {
    console.log('RabbitMQ connected');
}).catch(console.error);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
