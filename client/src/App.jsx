import { useState } from 'react'
import './App.css'
import Uploader from './components/Uploader'

function App() {
  const [count, setCount] = useState(0)

  const apiRequest = (file) => {

    fetch("http://localhost:8000/api/analyse", {
      method: "POST",
      body: JSON.stringify({
        ppt: file
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  return <Uploader />
}

export default App
