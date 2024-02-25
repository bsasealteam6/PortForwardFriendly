const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const portForward = require('./utils/PortForward');
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
app.post('/forward', (req, res) => {
    // Handle the request
    const { sourcePort, destinationPort, destinationHost, protocol } = req.body;
    portForward(sourcePort, destinationPort, destinationHost, protocol);
});