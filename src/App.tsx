
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Testimonial from './Testimonials/Testimonial'
import Home from './Testimonials/Home'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/signup' element={<Home></Home>}></Route>
       <Route path='/test/1' element={<Testimonial></Testimonial>}></Route>
      </Routes>
    </>
  )
}

export default App
