import { Link, useNavigate } from "react-router-dom"
import styles from "./ForgotPassword.module.css"
import {sendPasswordResetEmail} from '@firebase/auth';
import { auth } from "../../firebase/firebase";
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = event.target?.email.value;
        try {
        await sendPasswordResetEmail(auth, email);
        toast.success("Email message has been sent successfully"); 
        navigate('/login')
        } catch (error) {
        toast.error("Send email failed");
        }
    };

  return (
     <div className={styles.forgot_password_container}>
        <h1>Calendar</h1>
        <span>Forgot password?</span>
        <p>Enter your email address and we&apos;ll send you a link to reset your password.</p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" name="email"/>
            <button type="onSubmit">Send</button>        
        </form>
        <Link to="/login">Cancel</Link>
    </div>
  )
}

export default ForgotPassword