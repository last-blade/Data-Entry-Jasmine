function Sidebar({ isOpen, onToggle, activeMenu, onMenuClick }) {
    const menuItems = [
      'Lab Recipe',
      'Inventory',
      'Reports',
      'Settings',
      'Users',
      'Help'
    ]
  
    return (
      <>
        <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onToggle}></div>
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
          <div>
          <div className="sidebar-header">
            <h2>Lab Management</h2>
            <button className="close-sidebar" onClick={onToggle}>×</button>
          </div>
          <nav className="sidebar-nav ">
            <ul>
              {menuItems.map((item) => (
                <li key={item}>
                  <button 
                    className={`sidebar-link ${activeMenu === item ? 'active' : ''}`}
                    onClick={() => onMenuClick(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          </div>
          <div className="flex items-center justify-start pt-5 pb-5 pl-2">
            <button className="logoutBtn">Logout</button>
          </div>
        </aside>
      </>
    )
  }
  
  export default Sidebar
  