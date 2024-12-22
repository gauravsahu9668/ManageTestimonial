import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Testimonial from "./Testimonials/Testimonial";
import { useState } from "react";
const Home = () => {
  const [id,setid]=useState("")
  return (
    <div>
      <input type="text" placeholder="enter id here" onChange={(e)=>{setid(e.target.value)}}></input>
      <Link to={`/testimonial/${id}`}>
      <button>Go to testimnial</button>
      </Link>
    </div>
  );
};
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testimonial/:id" element={<Testimonial />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;