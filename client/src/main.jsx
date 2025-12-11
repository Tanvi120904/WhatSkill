// src/main.jsx (Full code)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './app.css';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'; // <--- IMPORT ADDED

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* WRAPPING APP WITH BROWSER ROUTER TO PROVIDE ROUTING CONTEXT */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)