import { useEffect, useState } from 'react'

const categories = ['Health', 'Learning', 'Fitness', 'Mindfulness', 'Personal']

function HabitForm({ initialHabit, onSubmit, onCancel }) {
  const [name, setName] = useState(initialHabit?.name ?? '')
  const [category, setCategory] = useState(initialHabit?.category ?? 'Health')
  const [frequency, setFrequency] = useState(initialHabit?.frequency ?? 'Daily')
  const valid = name.trim().length >= 2

  useEffect(() => {
    setName(initialHabit?.name ?? '')
    setCategory(initialHabit?.category ?? 'Health')
    setFrequency(initialHabit?.frequency ?? 'Daily')
  }, [initialHabit])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!valid) return
    onSubmit({ name, category, frequency })
  }

  return (
    <form onSubmit={handleSubmit} className="habit-form">
      <label>
        Habit name
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Read 30 minutes" autoFocus />
        {name.length > 0 && !valid && <small className="field-error">Use at least 2 characters.</small>}
      </label>
      <label>
        Category
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label>
        Frequency
        <select value={frequency} onChange={(event) => setFrequency(event.target.value)}>
          <option>Daily</option>
          <option>Weekdays</option>
          <option>Weekly</option>
        </select>
      </label>
      <div className="form-actions">
        <button type="button" className="secondary-button" onClick={onCancel}>Cancel</button>
        <button type="submit" className="primary-button" disabled={!valid}>{initialHabit ? 'Save Changes' : 'Create Habit'}</button>
      </div>
    </form>
  )
}

export default HabitForm