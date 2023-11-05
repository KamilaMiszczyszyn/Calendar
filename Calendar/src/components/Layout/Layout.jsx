import { useContext } from "react";
import { Navbar, Footer } from "../index";
import { Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Layout.module.css"

const Layout = () => {
  const location = useLocation();
  const currentUser = useContext(AuthContext);

  return (
    <div className={`${styles.layout_container} ${location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' ? styles.background : null}`}>
      <div className={styles.navbar}>{currentUser ? <Navbar /> : null}</div>
      <div className={styles.page_content}><Outlet /></div>
      <div className={styles.footer}> {currentUser ? <Footer /> : null}</div> 
    </div>
  )
}

export default Layout