import { useState, useEffect, createContext } from "react"
import { auth } from "../firebase/firebase"
import { onAuthStateChanged} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
			const unsubscribe = onAuthStateChanged(auth, (user) => {
				setCurrentUser(user);
			});
			return unsubscribe;
		}, [])

    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
        )
}

