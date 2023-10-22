import {auth} from "./../../firebase/firebase"
import {signOut} from 'firebase/auth'

const Navbar = () => {

  const logout = async () => {
    try{
      await signOut(auth);
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="container">
      <h1>Calendar</h1>
      <button onClick={logout}>Wyloguj</button>
    </div>
  )
}

export default Navbar