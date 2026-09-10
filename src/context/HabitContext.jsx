import { createContext, useContext, useMemo, useState } from 'react'
import { loadHabits, saveHabits } from '../services/storageService'
import { todayKey } from '../utils/dateUtils'

const HabitContext = createContext(null)

export function HabitProvider({ children }) {
  const [habits, setHabits] = useState(loadHabits)

  const persist = (next) => {
    setHabits(next)
    saveHabits(next)
  }

  const addHabit = (habit) => {
    persist([...habits, {
      id: crypto.randomUUID(),
      name: habit.name.trim(),
      category: habit.category,
      frequency: habit.frequency,
      createdAt: todayKey(),
      completedDates: []
    }])
  }

  const updateHabit = (id, changes) => {
    persist(habits.map((habit) => habit.id === id ? { ...habit, ...changes, name: changes.name?.trim() ?? habit.name } : habit))
  }

  const deleteHabit = (id) => persist(habits.filter((habit) => habit.id !== id))

  const toggleCompletion = (id, date = todayKey()) => {
    persist(habits.map((habit) => {
      if (habit.id !== id) return habit
      const completed = new Set(habit.completedDates)
      completed.has(date) ? completed.delete(date) : completed.add(date)
      return { ...habit, completedDates: [...completed].sort() }
    }))
  }

  const clearData = () => persist([])

  const value = useMemo(
    () => ({ habits, addHabit, updateHabit, deleteHabit, toggleCompletion, clearData }),
    [habits]
  )

  return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
}

export function useHabits() {
  return useContext(HabitContext)
}