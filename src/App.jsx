import React, { useState, useEffect } from "react";
import { auth } from "./assets/firebase/firebase";
import {AuthProvider} from "./assets/firebase/AuthContext"
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/auth-pages/Login";
import Register from "./pages/auth-pages/Register";
import About from "./pages/home-pages/About";
import Contact from "./pages/home-pages/Contact";
import Home from "./pages/home-pages/Home";
import VerifyEmail from "./pages/auth-pages/VerifyEmail";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
  return (
    <div className="App">
      <Router>
        <AuthProvider value={{ currentUser }}>
          <Navbar />
          <Routes>
            {/* Landing pages */}
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />

            {/* Authentication pages */}
            <Route path="sign-up" element={<Register />} />
            <Route path="sign-in" element={<Login />} />
            <Route path="verify-email" element={<VerifyEmail />} />
            {/* Admin pages */}

            {/* Writer pages */}
            {/*  */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
