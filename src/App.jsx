import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import AOS from 'aos'
import Login from './components/Login'
import Home from './components/Home'
import Preloader from './components/Preloader'
import './index.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true
    })

    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className="app">
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 5000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px 20px',
            fontSize: '14px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          }
        }}
      />
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Home />
      )}
    </div>
  )
}

export default App
