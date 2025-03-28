import { useState, useEffect, useRef } from "react";
import {
  Menu,
  Bell,
  Search,
  Settings,
  HelpCircle,
  User,
  ChevronDown,
  Calendar,
  Clock,
  BarChart2,
  Clipboard,
  Activity,
  LogOut,
} from "react-feather";
import Sidebar from "./Sidebar";
import LabRecipeForm from "./LabRecipeForm";
import toast from "react-hot-toast";
import Chart from "chart.js/auto";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Lab Recipe");
  const [pageLoaded, setPageLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Add animation class after component mounts
    setPageLoaded(true);

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (chartRef.current && activeMenu === "dashboard") {
      // Destroy previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            {
              label: "Recipes Created",
              data: [65, 59, 80, 81, 56, 55, 72],
              borderColor: "#4f46e5",
              backgroundColor: "rgba(79, 70, 229, 0.1)",
              tension: 0.4,
              fill: true,
            },
            {
              label: "Tests Performed",
              data: [28, 48, 40, 19, 86, 27, 90],
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              mode: "index",
              intersect: false,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "#fff",
              bodyColor: "#fff",
              borderColor: "rgba(255, 255, 255, 0.1)",
              borderWidth: 1,
              padding: 10,
              boxPadding: 5,
              usePointStyle: true,
              titleFont: {
                size: 14,
                weight: "bold",
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(0, 0, 0, 0.05)",
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [activeMenu]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
    // On mobile, close the sidebar after selecting a menu item
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    toast.success("Successfully logged out");
    // In a real app, you would redirect to login page
    window.location.reload();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`home-container ${pageLoaded ? "loaded" : ""}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        activeMenu={activeMenu}
        onMenuClick={handleMenuClick}
        onLogout={handleLogout}
      />

      <main className="main-content">
        <div className="top-bar">
          <div className="top-bar-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <Menu size={20} />
            </button>

            <div className="breadcrumb">
              <span>Dashboard</span>
              {activeMenu !== "dashboard" && (
                <>
                  <span className="breadcrumb-separator">/</span>
                  <span>{activeMenu}</span>
                </>
              )}
            </div>
          </div>

          <div className="top-bar-center">
            <div className="search-bar">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Search..." />
            </div>
          </div>

          <div className="top-bar-right">
            <div className="top-bar-date-time">
              <div className="date-display">
                <Calendar size={14} />
                <span>{formatDate(currentTime)}</span>
              </div>
              <div className="time-display">
                <Clock size={14} />
                <span>{formatTime(currentTime)}</span>
              </div>
            </div>

            <div className="top-bar-actions">
              <div className="action-item">
                <button
                  className="action-button notification-button"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell size={20} />
                  <span className="notification-badge">3</span>
                </button>

                {showNotifications && (
                  <div className="dropdown-menu notification-dropdown">
                    <div className="dropdown-header">
                      <h4>Notifications</h4>
                      <button className="mark-all-read">
                        Mark all as read
                      </button>
                    </div>
                    <div className="dropdown-items">
                      <div className="notification-item unread">
                        <div className="notification-icon success">
                          <Clipboard size={16} />
                        </div>
                        <div className="notification-content">
                          <p>New recipe has been created</p>
                          <span className="notification-time">
                            2 minutes ago
                          </span>
                        </div>
                      </div>
                      <div className="notification-item unread">
                        <div className="notification-icon warning">
                          <Activity size={16} />
                        </div>
                        <div className="notification-content">
                          <p>System update scheduled</p>
                          <span className="notification-time">1 hour ago</span>
                        </div>
                      </div>
                      <div className="notification-item">
                        <div className="notification-icon info">
                          <User size={16} />
                        </div>
                        <div className="notification-content">
                          <p>New user registered</p>
                          <span className="notification-time">Yesterday</span>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-footer">
                      <button>View all notifications</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="action-item">
                <button className="action-button">
                  <HelpCircle size={20} />
                </button>
              </div>

              <div className="action-item">
                <button className="action-button">
                  <Settings size={20} />
                </button>
              </div>

              <div className="action-item user-profile">
                <button
                  className="user-profile-button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="avatar">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="User"
                    />
                  </div>
                  <div className="user-info">
                    <span className="user-name">Prashant</span>
                    <span className="user-role">Administrator</span>
                  </div>
                  <ChevronDown size={16} className="dropdown-icon" />
                </button>

                {showUserMenu && (
                  <div className="dropdown-menu user-dropdown">
                    <div className="dropdown-header">
                      <div className="dropdown-user-info">
                        <div className="dropdown-avatar">
                          <img
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt="User"
                          />
                        </div>
                        <div>
                          <h4>Prashant</h4>
                          <p>Prashant@example.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-items">
                      <a href="#" className="dropdown-item">
                        <User size={16} />
                        <span>My Profile</span>
                      </a>
                      <a href="#" className="dropdown-item">
                        <Settings size={16} />
                        <span>Account Settings</span>
                      </a>
                      <a href="#" className="dropdown-item">
                        <Activity size={16} />
                        <span>Activity Log</span>
                      </a>
                    </div>
                    <div className="dropdown-footer">
                      <button className="logout-button" onClick={handleLogout}>
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="content-area">
          {activeMenu === "dashboard" && (
            <div className="dashboard-content" data-aos="fade-up">
              <div className="dashboard-header">
                <h1>Welcome back, Prashant</h1>
                <p>Here's what's happening with your lab today.</p>
              </div>

              <div className="stats-cards">
                <div
                  className="stat-card"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="stat-icon recipe-icon">
                    <Clipboard size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>Total Recipes</h3>
                    <div className="stat-value">1,284</div>
                    <div className="stat-change positive">
                      <span>+12.5%</span> from last month
                    </div>
                  </div>
                </div>

                <div
                  className="stat-card"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="stat-icon test-icon">
                    <Activity size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>Tests Performed</h3>
                    <div className="stat-value">867</div>
                    <div className="stat-change positive">
                      <span>+7.2%</span> from last month
                    </div>
                  </div>
                </div>

                <div
                  className="stat-card"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="stat-icon user-icon">
                    <User size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>Active Users</h3>
                    <div className="stat-value">42</div>
                    <div className="stat-change neutral">
                      <span>0%</span> from last month
                    </div>
                  </div>
                </div>

                <div
                  className="stat-card"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className="stat-icon analytics-icon">
                    <BarChart2 size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>Efficiency Rate</h3>
                    <div className="stat-value">94.2%</div>
                    <div className="stat-change positive">
                      <span>+2.4%</span> from last month
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-charts" data-aos="fade-up">
                <div className="chart-container">
                  <div className="chart-header">
                    <h3>Activity Overview</h3>
                    <div className="chart-actions">
                      <select className="chart-period-selector">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                      </select>
                    </div>
                  </div>
                  <div className="chart-body">
                    <canvas ref={chartRef} height="300"></canvas>
                  </div>
                </div>
              </div>

              <div className="recent-activity" data-aos="fade-up">
                <div className="section-header">
                  <h3>Recent Activity</h3>
                  <button className="view-all-button">View All</button>
                </div>

                <div className="activity-timeline">
                  <div className="timeline-item">
                    <div className="timeline-icon create-icon"></div>
                    <div className="timeline-content">
                      <h4>New Recipe Created</h4>
                      <p>Cotton Fabric - Lot #A12345</p>
                      <span className="timeline-time">2 hours ago</span>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-icon update-icon"></div>
                    <div className="timeline-content">
                      <h4>Recipe Updated</h4>
                      <p>Polyester Blend - Lot #B78901</p>
                      <span className="timeline-time">Yesterday</span>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-icon test-icon"></div>
                    <div className="timeline-content">
                      <h4>Test Completed</h4>
                      <p>Silk Fabric - Lot #C23456</p>
                      <span className="timeline-time">2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "Lab Recipe" && <LabRecipeForm />}

          {activeMenu !== "Lab Recipe" && activeMenu !== "dashboard" && (
            <div className="placeholder-content" data-aos="fade-up">
              <div className="placeholder-icon"></div>
              <h2>{activeMenu} Content</h2>
              <p>This section is currently under development.</p>
              <button className="placeholder-button">Explore Features</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
