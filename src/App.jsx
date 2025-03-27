"use client"

import { useState } from "react"
import { Toaster } from "react-hot-toast"
import Login from "./components/Login"
import Home from "./components/Home"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <div className="app">
      <Toaster position="top-right" />
      {!isLoggedIn ? <Login onLogin={handleLogin} /> : <Home />}
    </div>
  )
}

export default App

