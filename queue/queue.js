const amqp = require('amqplib');

let channel;

async function connectQueue() {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertQueue('fetch_requests');
}

async function sendToQueue(message) {
    channel.sendToQueue('fetch_requests', Buffer.from(JSON.stringify(message)));
}

async function consumeQueue(handler) {
    channel.consume('fetch_requests', async (msg) => {
        if (msg !== null) {
            const data = JSON.parse(msg.content.toString());
            await handler(data);
            channel.ack(msg);
        }
    });
}

module.exports = {
    connectQueue,
    sendToQueue,
    consumeQueue
};
