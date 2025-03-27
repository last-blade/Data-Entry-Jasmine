"use client"

import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import LabRecipeForm from './LabRecipeForm'

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState('Lab Recipe')
  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    // Add animation class after component mounts
    setPageLoaded(true)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem)
    // On mobile, close the sidebar after selecting a menu item
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false)
    }
  }

  return (
    <div className={`home-container ${pageLoaded ? 'loaded' : ''}`}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={toggleSidebar} 
        activeMenu={activeMenu}
        onMenuClick={handleMenuClick}
      />
      <main className="main-content">
        <div className="top-bar">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <span className="menu-icon"></span>
          </button>
          <h1>{activeMenu}</h1>
          <div className="top-bar-actions">
            <button className="action-button notification-button">
              <span className="notification-icon"></span>
              <span className="notification-badge">3</span>
            </button>
            <div className="user-profile">
              <div className="avatar">JD</div>
            </div>
          </div>
        </div>
        <div className="content-area">
          <div className="page-header">
            <h2>{activeMenu}</h2>
            <p className="breadcrumb">Dashboard / {activeMenu}</p>
          </div>
          {activeMenu === 'Lab Recipe' && <LabRecipeForm />}
          {activeMenu !== 'Lab Recipe' && (
            <div className="placeholder-content">
              <div className="placeholder-icon"></div>
              <h2>{activeMenu} Content</h2>
              <p>This is a placeholder for the {activeMenu} section.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
