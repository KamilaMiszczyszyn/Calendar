import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { Layout, Login, Register, Home, ForgotPassword } from './components/index';
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <Routes>
          <Route path="/" element={<Layout />}>
   
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>}/>

          </Route>
        </Routes>  
        <ToastContainer />
    </>
    
        
  )
}

export default App