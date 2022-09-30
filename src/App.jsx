import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/auth-pages/Login";
import Register from "./pages/auth-pages/Register";
import About from "./pages/home-pages/About";
import Contact from "./pages/home-pages/Contact";
import Home from "./pages/home-pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* Landing pages */}
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />

          {/* Authentication pages */}
          <Route path="sign-up" element={<Register />} />
          <Route path="sign-in" element={<Login />} />

          {/* Admin pages */}
          
          {/* Writer pages */}
          {/*  */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
