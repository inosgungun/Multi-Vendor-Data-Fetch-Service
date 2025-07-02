const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    requestId: String,
    status: {type: String, default: 'pending'},
    payload: mongoose.Schema.Types.Mixed,
    cleaned_data: mongoose.Schema.Types.Mixed
}, {timestamps: true});

module.exports = mongoose.model('Job', JobSchema);