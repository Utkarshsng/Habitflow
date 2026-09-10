import { Flame, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { isCompleted, currentStreak } from '../../utils/habitUtils'
import { todayKey } from '../../utils/dateUtils'

function HabitCard({ habit, onToggle, onEdit, onDelete }) {
  const completed = isCompleted(habit)
  const streak = currentStreak(habit)

  return (
    <article className="habit-card">
      <div className="habit-card-top">
        <button className={`completion-button ${completed ? 'completed' : ''}`} onClick={() => onToggle(habit.id)} aria-label={`${completed ? 'Undo' : 'Complete'} ${habit.name}`}>
          {completed ? '✓' : ''}
        </button>
        <div className="habit-card-info">
          <h3>{habit.name}</h3>
          <p>{habit.category} · {habit.frequency}</p>
        </div>
        <div className="habit-actions">
          <button className="icon-button" onClick={() => onEdit(habit)} aria-label={`Edit ${habit.name}`}><Pencil size={16} /></button>
          <button className="icon-button danger-icon" onClick={() => onDelete(habit)} aria-label={`Delete ${habit.name}`}><Trash2 size={16} /></button>
          <MoreVertical size={17} className="more-icon" />
        </div>
      </div>
      <div className="habit-card-bottom">
        <span className="streak"><Flame size={15} /> {streak} day streak</span>
        <span className="today-status">{completed ? `Completed ${todayKey() === todayKey() ? 'today' : ''}` : 'Not completed'}</span>
      </div>
    </article>
  )
}

export default HabitCard