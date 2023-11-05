import {createUserWithEmailAndPassword, signOut} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'
import {auth, db} from "./../../firebase/firebase"
import {useNavigate, Link} from "react-router-dom"
import styles from "./Register.module.css"
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event)=>{
        event.preventDefault()

        const email = event.target?.email.value;
        const password = event.target?.password.value;
        const confirmPassword = event.target?.confirmPassword.value;

        if(password !== confirmPassword){
            toast.error("Registration failed. Please make sure your passwords match.")
        } else {
            try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user={
                email,
                planner: [],
            }

            await setDoc(doc(db,'users', userCredential.user?.uid), user);
            signOut(auth);
            navigate("/");
            toast.success("Registration successful"); 
            }catch(error){
            toast.error("Registration failed");
             }
        }
        event.target.reset();
    }

  return (
    <div className={styles.register_container}>
        <h1>Calendar</h1>
        <span>Register</span>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" name="email"/>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password"/>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" type="password" name="confirmPassword"/>
            <button type="onSubmit">Sign up</button>        
        </form>
        <Link to="/login">Cancel</Link>
    </div>
  )
}

export default Register