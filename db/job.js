const mongoose = require('moongoose');

const JobSchema = new mongoose.Schema({
    requestId: String,
    status: {type: String, default: 'pending'},
    

})