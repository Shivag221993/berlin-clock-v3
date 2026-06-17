import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BerlinClock } from './component/BerlinClock.tsx'
import { ROOT_ELEMENT_ID } from './constants'

createRoot(document.getElementById(ROOT_ELEMENT_ID)!).render(
  <StrictMode>
    <BerlinClock />
  </StrictMode>,
)
