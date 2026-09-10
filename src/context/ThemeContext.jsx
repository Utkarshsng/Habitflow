import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('habitflow-theme') === 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('habitflow-theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggleTheme = () => setDark((value) => !value)

  return <ThemeContext.Provider value={{ dark, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}