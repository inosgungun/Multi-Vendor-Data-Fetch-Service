
const express = require('express');
const {v4: uuidv4} = require('uuid');
const {sendToQueue} = require('../queue/queue');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Job = require('./db/job');

const app = express.Router();
app.use(bodyParser.json());


app.post('/jobs', async (req, res) => {
    const requestId = uuidv4();

    await Job.create({
        requestId,
        payload: req.body
    });

    await sendToQueue({
        requestId,
        payload: req.body
    })

    res.json({request_id: requestId});
})

app.get('/jobs/:requestId', async (req, res) => {
    const {requestId} = req.params;

    const job = await Job.findOne({requestId});

    if(!job){
        return res.status(404).json({
            error: 'Job not found'
        });
    }

    if(job.status == 'complete'){
        res.json({
            status: 'complete',
            result: job.cleaned_data
        });
    }
    else {
        res.json({status: 'processing'});
    }
});

app.post('/vendor-webhook/:vendor', async (req, res) => {
    const {vendor} = req.params;
    const {requestId, data} = req.body;

    if(!requestId || !data){
        return res.status(400).json({error: 'Missing request ID or Data'});
    }

    const cleaned = {
        name: data.name?.trim(),
    };

    await Job.findOneAndUpdate(
        {requestId},
        {cleaned_data: cleaned, status: 'complete'}
    );

    res.json({status: 'ok', vendor});
})

module.exports = app;