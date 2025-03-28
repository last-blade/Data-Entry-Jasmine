import { useEffect, useState } from 'react'

function Preloader() {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="preloader">
      <div className="preloader-content">
        <div className="logo-container">
          <div className="logo-icon">LR</div>
        </div>
        <h1 className="preloader-title">Lab Recipe System</h1>
        <div className="preloader-progress-container">
          <div 
            className="preloader-progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="preloader-text">Loading experience... {progress}%</p>
      </div>
      
      <div className="preloader-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
    </div>
  )
}

export default Preloader
