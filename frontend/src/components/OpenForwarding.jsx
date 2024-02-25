import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const OpenForwarding = (props) => {
    const openForwarding = async () => {
        const sourcePort = document.getElementById('sourcePort').value
        const destinationPort = document.getElementById('destinationPort').value
        const destinationHost = document.getElementById('destinationHost').value
        const protocol = document.getElementById('protocol').value
        if (sourcePort === '' || destinationPort === '' || destinationHost === '') {
            alert('Please fill in all the fields')
            return
        }
        const response = await fetch('/api/forward', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                sourcePort: sourcePort,
                destinationPort: destinationPort,
                destinationHost: destinationHost,
                protocol: protocol
             })
        })
        const data = await response.json()
        props.setForwarded(data.forwarded)
        console.log(data)
    }
    return (
        <div>
            <Form.Label htmlFor="sourcePort">Source Port</Form.Label>
      <Form.Control id="sourcePort" type="number" />
      <br />
      <Form.Label htmlFor="destinationHost">Destination Host</Form.Label>
      <Form.Control id="destinationHost" placeholder='127.0.0.1' type="text" />
      <br />
      <Form.Label htmlFor="destinationPort">Destination Port</Form.Label>
      <Form.Control id="destinationPort" type="number" />
      <br />
      <Form.Label htmlFor="protocol">Protocol</Form.Label>
      <Form.Select id="protocol">
        <option value="tcp">TCP</option>
        <option value="udp">UDP</option>
      </Form.Select>
        <br />
        <Button onClick={openForwarding}>Open Forwarding</Button>
        </div>
    )
}
export default OpenForwarding
