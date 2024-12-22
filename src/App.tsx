import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Testimonial from "./Testimonials/Testimonial";
const Home = () => {
  return (
    <div>
      <Link to={`/testimonial/1`}>
        <div>Go to Testimonial Dashboard</div>
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