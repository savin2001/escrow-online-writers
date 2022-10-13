import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./pages/admin/Profile";
import Register from "./pages/authentication/Register";
import VerifyEmail from "./pages/authentication/VerifyEmail";
import Login from "./pages/authentication/Login";
import { AuthProvider } from "./assets/firebase/AuthContext";
import { auth } from "./assets/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "./assets/route/PrivateRoute";
import { Navigate } from "react-router-dom";
import Home from "./pages/common/Home";
import About from "./pages/common/About";
import Contact from "./pages/common/Contact";
import PageNotFound from "./pages/common/PageNotFound";

function App() {
  // User state
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <Router>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        <Navbar />
        <Routes>
          {/* Default pages */}
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/"
            element={
              !currentUser?.emailVerified ? (
                <Home />
              ) : (
                <Navigate to="/profile" replace />
              )
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/login"
            element={
              !currentUser?.emailVerified ? (
                <Login />
              ) : (
                <Navigate to="/profile" replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              !currentUser?.emailVerified ? (
                <Register />
              ) : (
                <Navigate to="/profile" replace />
              )
            }
          />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route
            exact
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* Admin pages */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
