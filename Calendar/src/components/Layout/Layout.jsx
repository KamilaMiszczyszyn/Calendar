import { useContext } from "react";
import { Navbar, Footer } from "../index";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Layout = () => {
  const currentUser = useContext(AuthContext);
  return (
    <>
      {currentUser ? <Navbar /> : null}
        <Outlet />
      {currentUser ? <Footer /> : null}
    </>
  )
}

export default Layout