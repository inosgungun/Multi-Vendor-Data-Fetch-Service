
const jobRoutes = require('./api/index');
const mongoose = require('mongoose');

app.use('/', jobRoutes);


mongoose.connect('mongodb://localhost:27017/multivendor', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

