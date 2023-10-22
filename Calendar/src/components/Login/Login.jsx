import { useContext } from 'react'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { auth } from "./../../firebase/firebase"
import {Navigate, Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
  const currentUser = useContext(AuthContext);

  const handleSubmit= async (event) =>{
    event.preventDefault()

    const email = event.target?.email.value;
    const password = event.target?.password.value;

    try{
      await signInWithEmailAndPassword(auth, email, password)
    }catch(error){
      console.log(error)
    }
  }
  
  return (
    <>
    {!currentUser ? <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Log In</button>
        <p>You do not have an account yet? <Link to="/register">Register now!</Link></p>
      </form>
    </div> : <Navigate to="/" />}
    </>
  )
}

export default Login
