const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const [portForward,closeForwardedPorts] = require('./utils/PortForward');
const jsonParser = require('body-parser').json();
let forwarded = false;
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
app.post('/forward', jsonParser, (req, res) => {
    // Handle the request
    console.log(req.body);
    const { sourcePort, destinationPort, destinationHost, protocol } = req.body;
    portForward(sourcePort, destinationPort, destinationHost, protocol);
    forwarded = true;
    res.json({ "forwarded": forwarded });
});
app.delete('/forward', (req, res) => {
    // Handle the request
    if (forwarded) {
        // Stop the port forwarding
        forwarded = false;
        closeForwardedPorts();
    }
    else {
        // Return an error
    }
    res.json({ "forwarded": forwarded });
});
app.get("/forwarded", (req, res) => {
    res.json({"forwarded": forwarded});
}   );