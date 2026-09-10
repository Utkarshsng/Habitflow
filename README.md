# HabitFlow

<p align="center">
  <strong>A clean, responsive habit tracker with streaks, analytics, heatmaps, and persistent local data.</strong>
</p>

<p align="center">
  <a href="https://habitflow-ivory.vercel.app/">Live Demo</a>
  &nbsp;•&nbsp;
  <a href="#features">Features</a>
  &nbsp;•&nbsp;
  <a href="#architecture">Architecture</a>
  &nbsp;•&nbsp;
  <a href="#getting-started">Getting Started</a>
</p>

---

## Live Demo

https://habitflow-ivory.vercel.app/

---

## Overview

HabitFlow is a frontend habit-tracking application built with React and Vite. It helps users create habits, mark daily progress, maintain streaks, and understand consistency through a focused analytics dashboard.

The project was intentionally designed with a simple architecture and minimal dependencies so that the application remains easy to maintain, explain, and extend.

## Screenshots

> Add repository screenshots here when you have them:
>
> `docs/screenshots/dashboard.png`  
> `docs/screenshots/habits.png`  
> `docs/screenshots/analytics.png`  
> `docs/screenshots/dark-mode.png`

---

## Features

### Habit Management
- Create new habits
- Edit existing habits
- Delete habits with confirmation
- Assign categories and frequencies
- Client-side form validation

### Daily Tracking
- Mark habits as completed for the current day
- Undo a completion
- Persist completion history
- View current streaks

### Analytics Dashboard
- Today's completion percentage
- Active habit count
- Current streak information
- Longest streak calculation
- 30-day completion analysis
- Habit-level performance
- 30-day consistency heatmap

### User Experience
- Responsive desktop and mobile layouts
- Mobile navigation drawer
- Light and dark themes
- Theme preference persistence
- Clean empty states
- Accessible button labels and form controls

### Data Persistence
- Uses browser `localStorage`
- No backend or account required
- Habit data remains available after refreshing the browser

---

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React |
| Language | JavaScript |
| Build Tool | Vite |
| Styling | CSS |
| Routing | React Router DOM |
| Icons | lucide-react |
| Persistence | Browser localStorage |
| Code Quality | ESLint |
| Package Manager | npm |
| Deployment | Vercel |

---

## Architecture

HabitFlow follows a lightweight feature-oriented React architecture.

```text
habitflow/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── Modal.jsx
│   │   │
│   │   └── habits/
│   │       ├── HabitCard.jsx
│   │       └── HabitForm.jsx
│   │
│   ├── context/
│   │   ├── HabitContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── data/
│   │   └── sampleHabits.js
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Habits.jsx
│   │   ├── Analytics.jsx
│   │   └── Settings.jsx
│   │
│   ├── services/
│   │   └── storageService.js
│   │
│   ├── utils/
│   │   ├── dateUtils.js
│   │   └── habitUtils.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles/
│       ├── app.css
│       └── index.css
│
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

---

## How the Application Works

The main data flow is:

```text
User Action
     │
     ▼
React Component
     │
     ▼
HabitContext
     │
     ├── Add Habit
     ├── Update Habit
     ├── Delete Habit
     └── Toggle Completion
     │
     ▼
Storage Service
     │
     ▼
localStorage
```

Analytics are derived from the stored habit data:

```text
Habit Data
    │
    ▼
Utility Functions
    │
    ├── Completion Rate
    ├── Current Streak
    ├── Longest Streak
    └── Daily Completion
    │
    ▼
Dashboard / Analytics UI
```

This keeps persistence and business calculations separate from presentation components.

---

## Data Model

Each habit follows a simple data structure:

```js
{
  id: "unique-id",
  name: "Morning Exercise",
  category: "Health",
  frequency: "Daily",
  createdAt: "2026-09-01",
  completedDates: [
    "2026-09-08",
    "2026-09-09",
    "2026-09-10"
  ]
}
```

Completion dates are stored as `YYYY-MM-DD` strings.

Instead of storing derived values such as `currentStreak` or `completionRate`, HabitFlow calculates them from the completion history.

This reduces duplicated state and prevents derived values from becoming inconsistent.

---

## State Management

HabitFlow uses **React Context API** for application-level state.

### HabitContext

Responsible for:

- Reading habits
- Creating habits
- Updating habits
- Deleting habits
- Toggling completion
- Persisting changes

### ThemeContext

Responsible for:

- Light/dark mode
- Theme switching
- Persisting the selected theme

This approach is intentionally simpler than introducing Redux because the application does not require complex global state management.

---

## Routing

The application uses React Router DOM.

| Route | Purpose |
| --- | --- |
| `/` | Dashboard |
| `/habits` | Habit management |
| `/analytics` | Progress and analytics |
| `/settings` | Theme and data settings |

---

## Analytics Logic

### Current Streak

The current streak is calculated by checking consecutive completion dates backward from today.

```text
Today       ✓
Yesterday   ✓
Day -2      ✓
Day -3      ✓
Day -4      ✗

Current streak = 4
```

### Longest Streak

The completion history is sorted chronologically and consecutive dates are grouped into streaks.

```text
✓ ✓ ✓ ✗ ✓ ✓

Longest streak = 3
```

### Completion Rate

For a selected period:

```text
Completed habit-days
-------------------- × 100
Total possible habit-days
```

This same derived data powers the dashboard and analytics views.

---

## Persistence

HabitFlow uses the browser's `localStorage`.

```text
React State
    │
    ▼
HabitContext
    │
    ▼
storageService.js
    │
    ▼
localStorage
```

The UI does not directly call `localStorage`. Persistence is isolated in `storageService.js`, making the code easier to change later.

For example, a future backend could replace the storage service without requiring every component to be rewritten.

---

## Responsive Design

The application adapts to different screen sizes.

### Desktop

```text
┌────────────┬──────────────────────────┐
│            │                          │
│ Sidebar    │       Main Content       │
│            │                          │
│ Dashboard  │                          │
│ Habits     │                          │
│ Analytics  │                          │
│ Settings   │                          │
│            │                          │
└────────────┴──────────────────────────┘
```

### Mobile

```text
┌─────────────────────────────┐
│ ☰  HabitFlow          🌙   │
├─────────────────────────────┤
│                             │
│       Main Content          │
│                             │
└─────────────────────────────┘
```

The desktop sidebar becomes a mobile navigation drawer.

---

## Project Design Principles

The project follows a few simple engineering principles:

- Keep components focused on UI responsibilities
- Keep reusable calculations inside utility functions
- Keep persistence inside the service layer
- Keep global state inside Context
- Derive analytics instead of duplicating state
- Avoid unnecessary dependencies
- Prefer readable code over clever abstractions
- Keep the UI responsive and accessible

---

## Why This Project?

HabitFlow demonstrates several practical frontend engineering concepts:

- React component design
- React Context API
- Controlled forms
- CRUD operations
- State updates and derived state
- Client-side validation
- Browser persistence
- Date-based calculations
- Data transformation
- Responsive CSS
- Routing
- Theme management
- Code organization
- ESLint-based code quality

---

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone <your-repository-url>
cd habitflow
npm install
```

### Start Development Server

```bash
npm run dev
```

The Vite development server will provide a local URL in the terminal.

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Deployment

The production version is deployed on Vercel.

Live application:

https://habitflow-ivory.vercel.app/

---

## Future Improvements

Possible future iterations include:

- User authentication
- Cloud database persistence
- Cross-device synchronization
- Habit reminders
- More detailed calendar views
- Export/import of habit data
- Automated unit and component tests
- Additional analytics
- Progressive Web App support

These features are intentionally outside the current scope so the core application remains focused and easy to understand.

---

## Learning Outcomes

This project was built to demonstrate practical React development rather than simply showcase a large number of libraries.

The main focus is on understanding:

```text
Components
    ↓
State
    ↓
Context
    ↓
Business Logic
    ↓
Persistence
    ↓
Derived Analytics
    ↓
User Interface
```

---

## License

This project is available for educational and portfolio purposes.
