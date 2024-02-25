const udpf = require('node-udp-forwarder');
const net = require('net');
const portForward = (sourcePort, destinationPort, destinationHost, protocol) => {
    if (protocol === 'udp') {
        const options = {
            protocol: 'udp4',
            port: sourcePort,
            address: "0.0.0.0",
        }
        udpf.create(destinationPort, destinationHost, options);
    }
    else if (protocol === 'tcp') {
        forwardTCP(sourcePort, destinationPort, destinationHost);
    }
    else {
        throw new Error('Protocol not supported');
    }
}
const forwardTCP = (sourcePort, destinationPort, destinationHost) => {
    net.createServer((sourceSocket) => {
        var buff = "";
        var connected = false;
        var cli = net.createConnection(destinationPort, destinationHost);
        sourceSocket.on('data', (data) => {
            if (connected) {
                cli.write(data);
            }
            else {
                buff += data.toString();
            }
        });
        cli.on('connect', () => {
            connected = true;
            cli.write(buff);
            buff = "";
        });
        cli.pipe(sourceSocket);
    }).listen(sourcePort);
}
module.exports = portForward;