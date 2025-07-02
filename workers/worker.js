const Job = require('../db/job');
const {consumeQueue, connectQueue} = require('../queue/queue');
const syncVendor = require('../vendors/syncVendor');
const asyncVendor = require('../vendors/asyncVendor');
const pLimit = require('p-limit')

const limit = pLimit(1);

function cleanData(data) {
    return {
        name: data.name?.trim(),
    };
}

async function processJob({requestId}){
    try {
        await Job.findOneAndUpdate(
            {requestId}, 
            {status: 'processing'}
        );

        const vendorData = await limit(() => asyncVendor(requestId));

        const cleaned = cleanData(vendorData);

        await Job.findOneAndUpdate(
            {requestId},
            {cleaned_data: cleaned, status: 'complete'}
        );
    } 
    catch (error) {
        console.error(`Error processing job ${requestId}:`, error);
        await Job.findOneAndUpdate(
            {requestId},
            {status: 'failed'}
        );
    }
}

async function startWorker() {
    await connectQueue();
    await consumeQueue(processJob);
    console.log('Worker is listening for jobs...');
}
startWorker();