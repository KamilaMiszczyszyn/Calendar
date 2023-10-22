import { useState, createContext, useEffect, useContext} from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import {AuthContext} from './AuthContext';

const defaultUserData = {
                email: "",
                planner: [],
};

export const DataContext = createContext();

export const DataProvider = ({children}) => {
    
  const [userData, setUserData] = useState(defaultUserData);
  const currentUser = useContext(AuthContext)

  useEffect(() => {
    const getUserData = async (user) => {
        if (user) {
            try {
                const docRef = doc(db, 'users', user?.uid);
                const unsubscribe = onSnapshot(docRef, docSnap => {
                const data = docSnap.data();
                setUserData(data);});
                
                return () => unsubscribe;
            } catch (error) {
                console.log(error)
            }}
        }
        getUserData(currentUser)
    }, [currentUser]);
  
  return <DataContext.Provider value={userData}>{children}</DataContext.Provider>;
};