import { useState, useEffect, useRef } from 'react'
import KUTE from 'kute.js'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activePanel, setActivePanel] = useState('login')
  
  const blob1Ref = useRef(null)
  const blob2Ref = useRef(null)
  
  useEffect(() => {
    // Animate the blobs
    if (blob1Ref.current && blob2Ref.current) {
      const tween1 = KUTE.fromTo(
        blob1Ref.current,
        { path: blob1Ref.current.getAttribute('d') },
        { path: 'M60.5,-49.3C76.9,-34.3,87.8,-8.9,83.8,13.7C79.8,36.2,60.9,55.9,39.1,64.4C17.3,72.9,-7.4,70.2,-29.6,60.9C-51.8,51.6,-71.5,35.6,-77.2,15.1C-82.9,-5.5,-74.6,-30.6,-59.1,-45.5C-43.6,-60.4,-21.8,-65.1,0.9,-65.9C23.6,-66.7,44.1,-64.4,60.5,-49.3Z' },
        { repeat: 999, duration: 8000, yoyo: true }
      ).start()
      
      const tween2 = KUTE.fromTo(
        blob2Ref.current,
        { path: blob2Ref.current.getAttribute('d') },
        { path: 'M55.3,-46.1C69.9,-26.6,78.9,-3.1,75.5,19.1C72.1,41.4,56.3,62.4,35.6,71.2C14.9,80,-10.7,76.5,-33.1,66.3C-55.5,56.1,-74.7,39.1,-79.8,18.5C-84.9,-2.1,-75.9,-26.3,-60.8,-45.8C-45.7,-65.3,-22.8,-80.1,-0.2,-79.9C22.5,-79.8,40.7,-65.7,55.3,-46.1Z' },
        { repeat: 999, duration: 10000, yoyo: true }
      ).start()
      
      return () => {
        tween1.stop()
        tween2.stop()
      }
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Please enter both username and password')
      return
    }
    
    // Simulate loading
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 2000)
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="blob-container">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="blob blob1">
            <path ref={blob1Ref} d="M42.7,-57.2C55,-46.3,64.3,-32.2,68.9,-16.2C73.5,-0.2,73.3,17.6,65.8,31.1C58.3,44.6,43.4,53.8,27.7,59.9C12,66,-4.4,69,-20.8,66.2C-37.2,63.3,-53.6,54.6,-63.1,40.8C-72.6,27,-75.2,8.1,-72.6,-9.6C-70,-27.3,-62.2,-43.9,-49.4,-54.8C-36.6,-65.7,-18.3,-70.9,-0.9,-69.8C16.5,-68.7,30.4,-68.1,42.7,-57.2Z" transform="translate(100 100)" />
          </svg>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="blob blob2">
            <path ref={blob2Ref} d="M44.2,-51.9C58.3,-39.9,71.8,-27.2,75.9,-11.7C80,3.8,74.8,22.1,64.1,35.8C53.5,49.5,37.5,58.5,20.5,65.2C3.6,71.9,-14.3,76.2,-30.8,71.6C-47.3,67,-62.3,53.5,-70.1,36.5C-77.9,19.5,-78.5,-1,-72.2,-18.2C-65.9,-35.4,-52.7,-49.3,-38.1,-61.2C-23.5,-73.1,-7.4,-83,5.9,-79.9C19.3,-76.9,30.1,-63.9,44.2,-51.9Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="particles">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>
      </div>
      
      <div className="login-card-container">
        <div className={`login-card ${activePanel === 'login' ? 'active' : ''}`}>
          <div className="login-header">
            <div className="app-logo">
              <div className="logo-inner">LR</div>
              <div className="logo-ring"></div>
              <div className="logo-ring"></div>
              <div className="logo-ring"></div>
            </div>
            <h1 className="login-title">Lab Recipe System</h1>
            <p className="login-subtitle">Enterprise Laboratory Management Solution</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-container">
                <span className="input-icon username-icon"></span>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="glass-input"
                />
                <span className="input-focus-border"></span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <span className="input-icon password-icon"></span>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="glass-input"
                />
                <span className="input-focus-border"></span>
              </div>
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password" onClick={() => setActivePanel('forgot')}>Forgot password?</a>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className={`login-button ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
              {isLoading ? (
                <div className="button-loader">
                  <span></span><span></span><span></span>
                </div>
              ) : (
                <>
                  <span className="button-text">Sign In</span>
                  <span className="button-icon"></span>
                </>
              )}
            </button>
          </form>
          
          <div className="login-footer">
            <p>© 2025 Lab Recipe System. All rights reserved.</p>
            <div className="login-footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <div className={`login-card forgot-card ${activePanel === 'forgot' ? 'active' : ''}`}>
          <div className="login-header">
            <h2>Reset Password</h2>
            <p>Enter your email to receive reset instructions</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-container">
              <span className="input-icon email-icon"></span>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="glass-input"
              />
              <span className="input-focus-border"></span>
            </div>
          </div>
          
          <button type="button" className="login-button">
            <span className="button-text">Send Reset Link</span>
            <span className="button-icon"></span>
          </button>
          
          <button 
            type="button" 
            className="back-button"
            onClick={() => setActivePanel('login')}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
