import { Flame, Trophy, TrendingUp } from 'lucide-react'
import { useHabits } from '../context/HabitContext'
import { completionRate, currentStreak, longestStreak, dailyCompletion } from '../utils/habitUtils'
import { lastDays, todayKey, formatDate } from '../utils/dateUtils'

function Analytics() {
  const { habits } = useHabits()
  const rate = completionRate(habits, 30)
  const bestHabit = habits.reduce((best, habit) => {
    const value = completionRate([habit], 30)
    return !best || value > best.value ? { habit, value } : best
  }, null)
  const bestStreak = habits.reduce((best, habit) => Math.max(best, longestStreak(habit)), 0)
  const days = lastDays(30)
  const maxBar = Math.max(...days.map(({ key }) => dailyCompletion(habits, key)), 1)

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Performance</p><h1>Analytics</h1><p>Understand your consistency and find patterns in your routine.</p></div>

      <div className="stats-grid">
        <article className="stat-card"><span>30-Day Completion</span><strong>{rate}%</strong><small>Across all active habits</small></article>
        <article className="stat-card"><span>Best Streak</span><strong>{bestStreak} days</strong><small><Trophy size={13} /> Personal record</small></article>
        <article className="stat-card"><span>Top Habit</span><strong>{bestHabit?.habit.name ?? '—'}</strong><small>{bestHabit ? `${bestHabit.value}% completion` : 'Add a habit to see insights'}</small></article>
      </div>

      <article className="panel analytics-panel">
        <div className="panel-header"><div><h2>Last 30 Days</h2><p>Daily completion percentage.</p></div><TrendingUp size={19} /></div>
        <div className="analytics-chart">
          {days.map(({ key, date }) => {
            const value = dailyCompletion(habits, key)
            return <div className="analytics-column" title={`${formatDate(date)}: ${value}%`} key={key}>
              <div className="analytics-bar-track"><div className="analytics-bar" style={{ height: `${value ? Math.max((value / maxBar) * 100, 5) : 2}%` }} /></div>
            </div>
          })}
        </div>
        <div className="chart-axis"><span>30 days ago</span><span>Today</span></div>
      </article>

      <article className="panel">
        <div className="panel-header"><div><h2>Consistency Heatmap</h2><p>Each square represents one day of your activity.</p></div></div>
        <div className="heatmap">
          {days.map(({ key, date }) => {
            const value = dailyCompletion(habits, key)
            const level = value === 0 ? 0 : value < 35 ? 1 : value < 70 ? 2 : value < 100 ? 3 : 4
            return <div className={`heat-cell level-${level}`} title={`${formatDate(date)}: ${value}%`} key={key} />
          })}
        </div>
        <div className="heatmap-legend"><span>Less</span>{[0,1,2,3,4].map((level) => <i className={`heat-cell level-${level}`} key={level} />)}<span>More</span></div>
      </article>

      <div className="insight-list">
        {habits.map((habit) => (
          <article className="panel insight-row" key={habit.id}>
            <div><strong>{habit.name}</strong><span>{habit.category}</span></div>
            <div className="insight-stat"><Flame size={15} /> {currentStreak(habit)} current · {longestStreak(habit)} best</div>
            <strong>{completionRate([habit], 30)}%</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Analytics