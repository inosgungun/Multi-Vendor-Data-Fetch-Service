
const express = require('express');
const {v4: uuidv4} = require('uuid');
const {sendToQueue} = require('../queue/queue');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Job = require('./db/job');

const app = express();
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

app.get('/jobs/{requestId}', async (req, res) => {
    
})

app.post('/vendor-webhook/{vendor}', async (req, res) => {
    
})