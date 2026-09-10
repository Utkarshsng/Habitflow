export function dateFromKey(key) {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function todayKey(date = new Date()) {
  return toKey(date)
}

export function toKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function addDays(date, amount) {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

export function lastDays(count, endDate = new Date()) {
  return Array.from({ length: count }, (_, index) => {
    const date = addDays(endDate, index - count + 1)
    return { date, key: toKey(date) }
  })
}

export function startOfWeek(date = new Date()) {
  const day = date.getDay()
  return addDays(new Date(date.getFullYear(), date.getMonth(), date.getDate()), -day)
}

export function weekDays(date = new Date()) {
  const start = startOfWeek(date)
  return Array.from({ length: 7 }, (_, index) => addDays(start, index))
}

export function formatDate(date, options = { month: 'short', day: 'numeric' }) {
  return new Intl.DateTimeFormat('en-US', options).format(date)
}