import { useState } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { BarChart3, CheckCircle2, LayoutDashboard, Menu, Moon, Settings, Sun, X } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Habits from './pages/Habits'
import Analytics from './pages/Analytics'
import SettingsPage from './pages/Settings'
import { useTheme } from './context/ThemeContext'
import './styles/app.css'

const navigation = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/habits', label: 'Habits', icon: CheckCircle2 },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings }
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { dark, toggleTheme } = useTheme()

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">H</div>
          <div><strong>HabitFlow</strong><span>Build better habits</span></div>
          <button className="mobile-close" onClick={closeMenu} aria-label="Close menu"><X size={20} /></button>
        </div>

        <nav className="nav-list">
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={closeMenu}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={19} /><span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="profile-avatar">U</div>
          <div><strong>Your Workspace</strong><span>Personal habits</span></div>
        </div>
      </aside>

      {menuOpen && <button className="overlay" onClick={closeMenu} aria-label="Close navigation" />}

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
          <div className="mobile-brand"><div className="brand-mark">H</div><strong>HabitFlow</strong></div>
          <button className="theme-button" onClick={toggleTheme} aria-label="Toggle theme">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App