import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useHabits } from '../context/HabitContext'
import Modal from '../components/common/Modal'
import HabitCard from '../components/habits/HabitCard'
import HabitForm from '../components/habits/HabitForm'

function Habits() {
  const { habits, addHabit, updateHabit, deleteHabit, toggleCompletion } = useHabits()
  const [modal, setModal] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const saveHabit = (data) => {
    modal?.habit ? updateHabit(modal.habit.id, data) : addHabit(data)
    setModal(null)
  }

  return (
    <section>
      <div className="page-heading page-heading-row">
        <div><p className="eyebrow">Your routine</p><h1>My Habits</h1><p>Create, complete, edit, and remove habits from one place.</p></div>
        <button className="primary-button" onClick={() => setModal({ type: 'create' })}><Plus size={16} /> Add Habit</button>
      </div>

      {habits.length ? (
        <div className="habit-grid">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} onToggle={toggleCompletion}
              onEdit={(item) => setModal({ type: 'edit', habit: item })}
              onDelete={setDeleteTarget} />
          ))}
        </div>
      ) : (
        <div className="empty-state panel">
          <div className="empty-icon">✓</div><h2>No habits yet</h2>
          <p>Create your first habit and start tracking your progress.</p>
          <button className="primary-button" onClick={() => setModal({ type: 'create' })}><Plus size={16} /> Create Habit</button>
        </div>
      )}

      {modal && (
        <Modal title={modal.type === 'edit' ? 'Edit Habit' : 'Add New Habit'} onClose={() => setModal(null)}>
          <HabitForm initialHabit={modal.habit} onSubmit={saveHabit} onCancel={() => setModal(null)} />
        </Modal>
      )}

      {deleteTarget && (
        <Modal title="Delete habit?" onClose={() => setDeleteTarget(null)}>
          <div className="confirm-content">
            <p>This will permanently remove <strong>{deleteTarget.name}</strong> and its completion history.</p>
            <div className="form-actions">
              <button className="secondary-button" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="primary-button danger-button" onClick={() => { deleteHabit(deleteTarget.id); setDeleteTarget(null) }}>Delete Habit</button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  )
}

export default Habits