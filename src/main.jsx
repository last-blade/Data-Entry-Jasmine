import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './responsive.css'
import App from './App.jsx'
import setupLocatorUI from "@locator/runtime";
import 'aos/dist/aos.css'
if (import.meta.env.MODE === "development") {
  setupLocatorUI();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
