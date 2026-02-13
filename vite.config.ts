import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        coaches: 'coaches.html',
        dashboard: 'dashboard.html',
        login: 'login.html',
        messages: 'messages.html',
        profile: 'profile.html',
        results: 'results.html',
        schedule: 'schedule.html',
        'self-assessment': 'self-assessment.html',
        signup: 'signup.html',
      },
    },
  },
})
