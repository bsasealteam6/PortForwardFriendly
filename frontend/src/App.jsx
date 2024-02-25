import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Button from 'react-bootstrap/Button'
import './App.css'
import OpenForwarding from './components/OpenForwarding'

function App() {
  const [count, setCount] = useState(0)
  const getForwarded = async () => {
    const response = await fetch('/api/forwarded')
    const data = await response.json()
    console.log(data)
    setForwarded(data.forwarded)
    setLoading(false)
  }
  const closeForwarding = async () => {
    const response = await fetch('/api/forward', {
      method: 'DELETE'
    })
    const data = await response.json()
    console.log(data)
    setForwarded(false)
  }
  const [forwarded, setForwarded] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getForwarded()
  }, []);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ):(
        forwarded ? (
          <Button onClick = {closeForwarding}>Close Forwarding</Button>
        ):(
          <OpenForwarding setForwarded={setForwarded} />
        
        )
      )}
    </>
  )
}

export default App
