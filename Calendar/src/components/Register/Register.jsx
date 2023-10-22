import {createUserWithEmailAndPassword, signOut} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'
import {auth, db} from "./../../firebase/firebase"
import {useNavigate} from "react-router-dom"

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event)=>{
        event.preventDefault()

        const email = event.target?.email.value;
        const password = event.target?.password.value;
        const confirmPassword = event.target?.confirmPassword.value;

        if(password !== confirmPassword){
            console.log("Please make sure your passwords match.")
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
            }catch(error){
            console.log(error)
             }
        }
        event.target.reset();
    }

  return (
    <div className="container">
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" name="email"/>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password"/>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" type="password" name="confirmPassword"/>
            <button type="onSubmit">Sign in</button>        
        </form>
    </div>
  )
}

export default Register