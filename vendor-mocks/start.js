const express = require('express');
const app = express();

app.use(express.json());

app.post('/sync-vendor', (req, res) => {
    res.json({
        requestId: req.body.requestId,
        name: ' Gungun Soni ',
        email: ' gungun@gmail.com '
    });
});

app.post('/async-vendor', (req, res) => {
    const requestId = req.body.requestId;
    setTimeout(() => {
        console.log(`Pushing data back for requestId=${requestId}`);
    }, 1000);
    res.json({status: 'accepted'});
});

app.listen(4000, () => console.log('Vendor mocks listening on port 4000'));
