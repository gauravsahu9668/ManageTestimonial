import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes,Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './Testimonials/Home'
import Testimonial from './Testimonials/Testimonial'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/testimonial/1" element={<Testimonial />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
