import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.module.scss';
import App from './App.tsx'

if (import.meta.env.DEV) {
  localStorage.clear();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
