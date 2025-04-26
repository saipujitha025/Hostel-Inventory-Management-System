import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Services from "./components/Services";
import QA from "./components/QA";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";


function App() {
  const location = useLocation();

  // Hide Navbar on specific dashboard routes
  const hideNavbarRoutes = ["/warden-dashboard", "/student-dashboard"];
  
  
  return (
    <div>
      {/* Adjusted padding to avoid overlap with fixed navbar */}
      {!hideNavbarRoutes.some((route) =>
        location.pathname.startsWith(route)
      ) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/qa" element={<QA />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/warden-dashboard/*" element={<AdminDashboard />} />
        <Route path="/student-dashboard/*" element={<UserDashboard />} />
      </Routes>
    </div>
  );
}


export default App;
