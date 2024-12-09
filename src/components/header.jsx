import React, {useState} from "react";
import { Link } from 'react-router-dom';
import "./header-style1.css"
import axios from 'axios'


const Header = () => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("LoggedInUser")) || null);
  const isAdminStatus = JSON.parse(localStorage.getItem("isAdmin"))
  console.log("isAdminStatus",isAdminStatus)
  const handleLogout = () => {
    try {
    //const responseSignOut = axios.post('http://localhost:8080/api/user/signout');
    localStorage.removeItem("LoggedInUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("CartListNew");
    localStorage.removeItem("CartListRun");
    localStorage.removeItem("CartListSeasonal");
    localStorage.removeItem("CartListThun");
    localStorage.removeItem("CartListDetailPage");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
    } catch (error) {
      alert(error)
    }
    
    };
    console.log("currentUser",currentUser)
    //isAdminStatus = currentUser?.username === "Admin"; //check xem co phai Admin dang nhap khong

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    

  };
    return (
        <div id="navbar">
            <div class="logo">
                <Link to="/" onClick={scrollToTop}><img src={require('../img/Logo 1.png')} alt="Ricky Men Wears"/></Link>
            </div>
        <ul className="nav-links">
            <li><Link to="/" class="navitem" onClick={scrollToTop}>TRANG CHỦ</Link></li>
            <li><a onClick={() => window.location.replace("/#footer")}  class="navitem">LIÊN HỆ</a></li>
            {isAdminStatus === true && ( // NHỚ THÊM ROUTE ADMIN VÀO LINK
                <Link to="/Admin/ManageProduct" className="navitem"> 
                  QUẢN LÝ SHOP
                </Link>
              )}
            <li>
            {currentUser ? (
            <div className="logedin-wrap">
            <span> XIN CHÀO,
              {currentUser} | {" "}
              <a
                className="fa-solid logout-btn"
                id="logout"
                onClick={handleLogout}
              >ĐĂNG XUẤT</a>
            </span>
            </div>
          ) : ( 
            <Link to="/login" id="login">
              ĐĂNG NHẬP
            </Link>
          )}
            </li>
        </ul>
        </div>
    )
}
export default Header
