import { addDays, dateFromKey, toKey, todayKey } from './dateUtils'

export function isCompleted(habit, date = todayKey()) {
  return habit.completedDates.includes(date)
}

export function currentStreak(habit, fromDate = new Date()) {
  let streak = 0
  let cursor = new Date(fromDate)

  while (habit.completedDates.includes(toKey(cursor))) {
    streak += 1
    cursor = addDays(cursor, -1)
  }
  return streak
}

export function longestStreak(habit) {
  if (!habit.completedDates.length) return 0
  const dates = [...habit.completedDates].sort()
  let longest = 1
  let current = 1

  for (let index = 1; index < dates.length; index += 1) {
    const previous = dateFromKey(dates[index - 1])
    const currentDate = dateFromKey(dates[index])
    const difference = Math.round((currentDate - previous) / 86400000)

    if (difference === 1) {
      current += 1
      longest = Math.max(longest, current)
    } else {
      current = 1
    }
  }
  return longest
}

export function completionRate(habits, days = 7, endDate = new Date()) {
  if (!habits.length) return 0
  let completed = 0
  for (let offset = 0; offset < days; offset += 1) {
    const date = toKey(addDays(endDate, -offset))
    completed += habits.filter((habit) => isCompleted(habit, date)).length
  }
  return Math.round((completed / (habits.length * days)) * 100)
}

export function dailyCompletion(habits, date) {
  if (!habits.length) return 0
  return Math.round((habits.filter((habit) => isCompleted(habit, date)).length / habits.length) * 100)
}