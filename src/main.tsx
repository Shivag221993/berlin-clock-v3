import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BerlinClock }from './component/BerlinClock.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BerlinClock />
  </StrictMode>,
)
