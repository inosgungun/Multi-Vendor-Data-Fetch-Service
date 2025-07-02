
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Job = require('./db/job');

const app = express();
app.use(bodyParser.json());


app.post('/jobs', async (req, res) => {

})

app.get('/jobs/{requestId}', async (req, res) => {
    
})

app.post('/vendor-webhook/{vendor}', async (req, res) => {
    
})