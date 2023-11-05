import {auth} from "./../../firebase/firebase"
import {signOut} from 'firebase/auth'
import styles from "./Navbar.module.css"

const Navbar = () => {

  const logout = async () => {
    try{
      await signOut(auth);
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className={styles.navbar_container}>
      <h1>Calendar</h1>
      <button onClick={logout}>Wyloguj</button>
    </div>
  )
}

export default Navbar