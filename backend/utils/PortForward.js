const udpf = require('node-udp-forwarder');
const net = require('net');
let udpForwarder = null;
let tcpForwarder = null;
const portForward = (sourcePort, destinationPort, destinationHost, protocol) => {
    if (protocol === 'udp') {
        const options = {
            protocol: 'udp4',
            port: sourcePort,
            address: "0.0.0.0",
        }
        udpForwarder = udpf.create(destinationPort, destinationHost, options);
    }
    else if (protocol === 'tcp') {
        tcpForwarder = forwardTCP(sourcePort, destinationPort, destinationHost);
    }
    else {
        throw new Error('Protocol not supported');
    }
}
const forwardTCP = (sourcePort, destinationPort, destinationHost) => {
    let server = net.createServer((sourceSocket) => {
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
    return server;
}
const closeForwardedPorts = () => {
    if(udpForwarder){
        udpForwarder.end();
        udpForwarder = null;
    }
    if(tcpForwarder){
        tcpForwarder.close();
        tcpForwarder = null;
    }
}
module.exports = [portForward, closeForwardedPorts];