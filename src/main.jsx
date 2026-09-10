import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { HabitProvider } from './context/HabitContext'
import { ThemeProvider } from './context/ThemeContext'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <HabitProvider>
          <App />
        </HabitProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)