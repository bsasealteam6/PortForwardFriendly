const net = require('net');
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
forwardTCP(3543, 8000, 'localhost');