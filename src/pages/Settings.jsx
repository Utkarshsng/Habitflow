import { useState } from 'react'
import { Moon, Sun, Trash2 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useHabits } from '../context/HabitContext'
import Modal from '../components/common/Modal'

function Settings() {
  const { dark, toggleTheme } = useTheme()
  const { clearData } = useHabits()
  const [confirm, setConfirm] = useState(false)

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Preferences</p><h1>Settings</h1><p>Customize your HabitFlow experience.</p></div>

      <article className="panel settings-panel">
        <div className="setting-info"><div className="setting-icon">{dark ? <Moon size={18} /> : <Sun size={18} />}</div><div><h2>Appearance</h2><p>Switch between light and dark mode.</p></div></div>
        <button className="theme-switch" onClick={toggleTheme} aria-label="Toggle theme"><span className={dark ? 'selected' : ''}>Dark</span><span className={!dark ? 'selected' : ''}>Light</span></button>
      </article>

      <article className="panel settings-panel danger-panel">
        <div className="setting-info"><div className="setting-icon danger-bg"><Trash2 size={18} /></div><div><h2>Clear all data</h2><p>Remove all habits and completion history from this browser.</p></div></div>
        <button className="secondary-button danger" onClick={() => setConfirm(true)}>Clear Data</button>
      </article>

      <div className="about-card"><strong>HabitFlow</strong><span>React habit tracker · Local data only</span></div>

      {confirm && (
        <Modal title="Clear all data?" onClose={() => setConfirm(false)}>
          <div className="confirm-content"><p>This action cannot be undone. All habits and completion history will be deleted from localStorage.</p>
            <div className="form-actions"><button className="secondary-button" onClick={() => setConfirm(false)}>Cancel</button><button className="primary-button danger-button" onClick={() => { clearData(); setConfirm(false) }}>Delete Everything</button></div>
          </div>
        </Modal>
      )}
    </section>
  )
}

export default Settings