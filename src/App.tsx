import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Testimonial from "./Testimonials/Testimonial";
import { useState } from "react";
const Home = () => {
  const [id,setid]=useState("")
  return (
    <div className="flex w-[100vw] h-screen items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-blue-500">
    <div className="bg-white p-8 m-2 rounded-xl shadow-2xl ring-4 ring-offset-4 ring-purple-300">
      <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
        Enter Testimonial ID
      </h1>
      <input
        type="text"
        placeholder="Enter ID here"
        className="w-full px-4 py-2 mb-4 text-gray-600 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
        onChange={(e) => setid(e.target.value)}
      />
      <Link to={`/testimonial/${id}`}>
        <button className="w-full px-6 py-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition-all rounded-lg shadow-lg hover:shadow-xl font-bold">
          See Testimonial
        </button>
      </Link>
    </div>
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