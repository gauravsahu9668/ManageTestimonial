
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Testimonial from './Testimonials/Testimonial'
import Home from './Testimonials/Home'
function App() {
  return (
    <>
      <Routes>
        <Route path='/testimonial/:id' element={<Testimonial></Testimonial>}></Route>
        <Route path='/' element={<Home></Home>}></Route>
      </Routes>
    </>
  )
}

export default App
