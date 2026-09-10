import { addDays, toKey } from '../utils/dateUtils'

const today = new Date()
const dates = (offsets) => offsets.map((offset) => toKey(addDays(today, offset)))

export const sampleHabits = [
  {
    id: 'sample-1',
    name: 'Morning Exercise',
    category: 'Health',
    frequency: 'Daily',
    createdAt: toKey(addDays(today, -28)),
    completedDates: dates([-6, -5, -4, -3, -2, -1, 0, -10, -9, -8, -7, -14, -13, -12])
  },
  {
    id: 'sample-2',
    name: 'Read 30 Minutes',
    category: 'Learning',
    frequency: 'Daily',
    createdAt: toKey(addDays(today, -21)),
    completedDates: dates([-6, -5, -3, -2, 0, -9, -8, -7, -14, -12])
  },
  {
    id: 'sample-3',
    name: 'Drink Water',
    category: 'Health',
    frequency: 'Daily',
    createdAt: toKey(addDays(today, -14)),
    completedDates: dates([-6, -4, -3, -1, 0, -8, -7, -5, -10, -11])
  },
  {
    id: 'sample-4',
    name: 'Meditation',
    category: 'Mindfulness',
    frequency: 'Daily',
    createdAt: toKey(addDays(today, -30)),
    completedDates: dates([-6, -5, -4, -3, -2, -1, 0, -13, -12, -11, -10, -20, -19, -18])
  }
]