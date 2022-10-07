import { useState } from "react";
import { auth, db } from "../../assets/firebase/firebase";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useAuthValue } from "../../assets/firebase/AuthContext";

function Register() {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setTimeActive } = useAuthValue();

  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setError("Passwords does not match");
      }
    }
    return isValid;
  };

  const register = (e) => {
    e.preventDefault();
    setError("");
    if (validatePassword()) {
      // Create a new user with email and password using firebase

      createUserWithEmailAndPassword(auth, email, password)
        .then(async () => {
          if (userType.length > 0) {
            try {
              if (userType === "admin") {
                const adminRef = doc(db, "users", "admin");
                await setDoc(
                  adminRef,
                  await addDoc(collection(db, "users", "admin", email), {
                    uid: auth.currentUser.uid,
                    email: email,
                  }),
                  { merge: true }
                );
              } else {
                const writerRef = doc(db, "users", "writer");
                await setDoc(
                  writerRef,
                  await addDoc(collection(db, "users", "writer", email), {
                    uid: auth.currentUser.uid,
                    email: email,
                  }),
                  { merge: true }
                );
              }
            } catch (e) {
              setError("Error adding document: ", e);
            }
          }
        })
        .then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true);
              navigate("/verify-email");
            })
            .catch((err) => alert(err.message));
        })
        .catch((err) => setError(err.message));
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="center">
      <div className="auth">
        <h1>Register</h1>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={register} name="registration_form">
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            value={confirmPassword}
            required
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <select
            id="demo-simple-select"
            value={userType}
            label="Age"
            onChange={(e) => setUserType(e.target.value)}
          >
            <option defaultValue value={""}>
              Select user type
            </option>
            <option value={"admin"}>Account Holder</option>
            <option value={"writer"}>Become a writer</option>
          </select>

          <button type="submit">Register</button>
        </form>
        <span>
          Already have an account?
          <Link to="/login">login</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
