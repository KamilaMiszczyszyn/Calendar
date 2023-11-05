import { useContext } from 'react'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { auth } from "./../../firebase/firebase"
import {Navigate, Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import styles from "./Login.module.css"
import { toast } from 'react-toastify';


const Login = () => {
  const currentUser = useContext(AuthContext);

  const handleSubmit= async (event) =>{
    event.preventDefault()

    const email = event.target?.email.value;
    const password = event.target?.password.value;

    try{
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Login successful"); 
    }catch(error){
      toast.error("Login failed");
    }
  }
  
  return (
    <>
    {!currentUser ?
    <div className={styles.login_container}>
      <h1>Calendar</h1>
      <span>Login</span>        
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="">Password</label>
        <input type="password" name="password" id="password" />
        <Link to="/forgot-password">Forgot password?</Link>
        <button type="submit">Log in</button>
        <p>You do not have an account yet? <Link to="/register">Register now!</Link></p>
      </form>
    </div>  
    : <Navigate to="/" />}
    </>
  )
}

export default Login
