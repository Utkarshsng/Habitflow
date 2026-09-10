import { Link } from 'react-router-dom'
import { ArrowRight, Flame, Target } from 'lucide-react'
import { useHabits } from '../context/HabitContext'
import { dailyCompletion, isCompleted, currentStreak } from '../utils/habitUtils'
import { todayKey, weekDays, formatDate } from '../utils/dateUtils'

function Dashboard() {
  const { habits, toggleCompletion } = useHabits()
  const today = todayKey()
  const completed = habits.filter((habit) => isCompleted(habit, today)).length
  const progress = dailyCompletion(habits, today)
  const bestStreak = habits.reduce((best, habit) => Math.max(best, currentStreak(habit)), 0)

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Today</p>
        <h1>Good morning 👋</h1>
        <p>Small steps every day lead to meaningful progress.</p>
      </div>

      <div className="stats-grid">
        <article className="stat-card"><span>Today's Progress</span><strong>{progress}%</strong><small>{completed} of {habits.length} habits completed</small></article>
        <article className="stat-card"><span>Current Streak</span><strong>{bestStreak} days</strong><small>Keep your momentum going</small></article>
        <article className="stat-card"><span>Active Habits</span><strong>{habits.length}</strong><small>Habits in your routine</small></article>
      </div>

      <div className="content-grid">
        <article className="panel">
          <div className="panel-header">
            <div><h2>Today's Habits</h2><p>Complete your habits to keep your streak alive.</p></div>
            <Link className="text-link" to="/habits">Manage <ArrowRight size={14} /></Link>
          </div>
          {habits.length === 0 ? (
            <div className="inline-empty"><Target size={22} /><p>No habits yet. Add your first habit.</p><Link className="text-link" to="/habits">Get started</Link></div>
          ) : (
            <div className="habit-list">
              {habits.map((habit) => {
                const done = isCompleted(habit, today)
                return (
                  <div className="habit-row" key={habit.id}>
                    <button className={`habit-check ${done ? 'checked' : ''}`} onClick={() => toggleCompletion(habit.id)} aria-label={`${done ? 'Undo' : 'Complete'} ${habit.name}`}>{done ? '✓' : ''}</button>
                    <div className="habit-info"><strong>{habit.name}</strong><span>{habit.category} · <Flame size={12} /> {currentStreak(habit)} day streak</span></div>
                    <span className={`status ${done ? 'done' : ''}`}>{done ? 'Completed' : 'Pending'}</span>
                  </div>
                )
              })}
            </div>
          )}
        </article>

        <article className="panel">
          <div className="panel-header"><div><h2>This Week</h2><p>Daily completion rate.</p></div></div>
          <div className="week-chart">
            {weekDays().map((date) => {
              const value = dailyCompletion(habits, todayKey(date))
              return (
                <div className="chart-column" key={todayKey(date)}>
                  <div className="bar-track"><div className="bar" style={{ height: `${Math.max(value, 4)}%` }} /></div>
                  <span>{formatDate(date, { weekday: 'short' }).slice(0, 1)}</span>
                </div>
              )
            })}
          </div>
        </article>
      </div>
    </section>
  )
}

export default Dashboard