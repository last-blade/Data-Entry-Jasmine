import { useState, useEffect } from "react";
import {
  ChevronDown,
  LogOut,
  Settings,
  Users,
  HelpCircle,
  BarChart2,
  Layers,
  FileText,
  Home,
  Bell,
  Search,
} from "react-feather";

function Sidebar({ isOpen, onToggle, activeMenu, onMenuClick, onLogout }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedGroups, setExpandedGroups] = useState({
    main: true,
    reports: false,
    settings: false,
  });

  const menuItems = {
    main: [
      { id: "Lab Recipe", label: "Lab Recipe", icon: FileText, badge: "New" },
      // { id: "dashboard", label: "Dashboard", icon: Home },
      { id: "Inventory", label: "Inventory", icon: Layers },
    ],
    reports: [
      { id: "analytics", label: "Analytics", icon: BarChart2 },
      { id: "Reports", label: "Reports", icon: FileText },
      { id: "exports", label: "Exports", icon: FileText },
    ],
    settings: [
      { id: "Settings", label: "Settings", icon: Settings },
      { id: "Users", label: "Users", icon: Users },
      { id: "Help", label: "Help", icon: HelpCircle },
    ],
  };

  const toggleGroup = (group) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const filteredMenuItems = Object.entries(menuItems).reduce(
    (acc, [key, items]) => {
      const filtered = items.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[key] = filtered;
      }
      return acc;
    },
    {}
  );

  useEffect(() => {
    // Auto-expand groups that have matching search results
    if (searchTerm) {
      const newExpandedGroups = {};
      Object.keys(filteredMenuItems).forEach((key) => {
        newExpandedGroups[key] = true;
      });
      setExpandedGroups((prev) => ({
        ...prev,
        ...newExpandedGroups,
      }));
    }
  }, [searchTerm, filteredMenuItems]);

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={onToggle}
      ></div>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">
              <span>LR</span>
              <div className="logo-pulse"></div>
            </div>
            <div className="logo-text">
              <h2>Lab Recipe</h2>
              <span className="logo-version">v2.5 Enterprise</span>
            </div>
          </div>
          <button className="close-sidebar" onClick={onToggle}>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="sidebar-search">
          <div className="search-container">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm("")}
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="sidebar-notifications">
          <div className="notification-item">
            <Bell size={16} className="notification-icon" />
            <div className="notification-content">
              <p>New recipe added</p>
              <span className="notification-time">2 min ago</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {Object.entries(filteredMenuItems).map(([group, items]) => (
            <div className="nav-group" key={group}>
              <div
                className={`nav-group-header ${
                  expandedGroups[group] ? "expanded" : ""
                }`}
                onClick={() => toggleGroup(group)}
              >
                <span className="nav-group-title">
                  {group === "main"
                    ? "Main Menu"
                    : group === "reports"
                    ? "Reports & Analytics"
                    : "System Settings"}
                </span>
                <ChevronDown size={16} className="nav-group-icon" />
              </div>

              <ul
                className={`nav-group-items ${
                  expandedGroups[group] ? "expanded" : ""
                }`}
              >
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id} className="nav-item">
                      <button
                        className={`sidebar-link ${
                          activeMenu === item.id ? "active" : ""
                        }`}
                        onClick={() => onMenuClick(item.id)}
                      >
                        <Icon size={18} className="menu-icon" />
                        <span className="menu-text">{item.label}</span>
                        {item.badge && (
                          <span className="menu-badge">{item.badge}</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User"
              />
              <span className="user-status online"></span>
            </div>
            <div className="user-details">
              <h4>Prashant</h4>
              <p>Lab Administrator</p>
            </div>
          </div>

          <button className="logout-button" onClick={onLogout}>
            <LogOut size={18} className="logout-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
