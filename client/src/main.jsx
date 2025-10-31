import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Admin from './components/Admin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Admin />
  </StrictMode>,
)
