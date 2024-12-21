
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Testimonial from './Testimonials/Testimonial'
function App() {
  return (
    <>
      <Routes>
        <Route path='/testimonial/:id' element={<Testimonial></Testimonial>}></Route>
      </Routes>
    </>
  )
}

export default App
