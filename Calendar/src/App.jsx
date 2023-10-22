
import './App.css'
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { Layout, Login, Register, Home } from './components/index';

function App() {

  return (
        <Routes>
          <Route path="/" element={<Layout />}>
   
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>}/>

          </Route>
        </Routes>
  )
}

export default App