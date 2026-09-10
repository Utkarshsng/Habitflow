const STORAGE_KEY = 'habitflow-habits'

export function loadHabits() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function saveHabits(habits) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
}

export function clearStoredHabits() {
  localStorage.removeItem(STORAGE_KEY)
}