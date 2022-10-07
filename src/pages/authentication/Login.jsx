import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth, db } from '../../assets/firebase/firebase'
import { collection, query, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../assets/firebase/AuthContext'


function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState("admin");
  const [error, setError] = useState('')
  const { setTimeActive } = useAuthValue()
  const navigate = useNavigate()

  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password).then(async () => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("user_type", "==", "admin"));
      console.log(q)
      // Separate the users into groups during login
      // if (userType === "admin") {
      //   navigate('/profile')
      // } else if (userType === "writer") {
      // } else {
      // }
    })
      .then(() => {
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true)
              navigate('/verify-email')
            })
            .catch(err => alert(err.message))
        } else {



        }
      })
      .catch(err => setError(err.message))
  }

  return (
    <div className='center'>
      <div className='auth'>
        <h1>Log in</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={login} name='login_form'>
          <input
            type='email'
            value={email}
            required
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)} />

          <input
            type='password'
            value={password}
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)} />

          <button type='submit'>Login</button>
        </form>
        <p>
          Don't have and account?
          <Link to='/register'>Create one here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login