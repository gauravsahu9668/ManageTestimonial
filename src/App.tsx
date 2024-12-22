import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Testimonial from "./Testimonials/Testimonial";
import { useState } from "react";
const Home = () => {
  const [id,setid]=useState("")
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-blue-500">
    <div className="bg-white p-8 rounded-xl shadow-2xl ring-4 ring-offset-4 ring-purple-300">
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
//   <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
//   <div className="bg-gray-800 p-8 rounded-xl shadow-2xl ring-4 ring-offset-4 ring-blue-500">
//     <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
//       Find Testimonial
//     </h1>
//     <input
//       type="text"
//       placeholder="Enter Testimonial ID"
//       className="w-full px-4 py-2 mb-4 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-800"
//       onChange={(e) => setid(e.target.value)}
//     />
//     <Link to={`/testimonial/${id}`}>
//       <button className="w-full px-6 py-2 text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 transition-all rounded-lg shadow-lg hover:shadow-xl font-bold">
//         See Testimonial
//       </button>
//     </Link>
//   </div>
// </div>
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