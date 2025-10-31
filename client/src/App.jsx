import { useState } from 'react'
import './App.css'
import Uploader from './components/Uploader'

function App() {
  const [count, setCount] = useState(0)

  return <Uploader />
}

export default App
