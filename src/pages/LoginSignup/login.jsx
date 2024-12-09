import React, { useState, useEffect } from "react";
import '../Home/home.css'
import './loginsignup.css'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const handleLoginSubmit = async (e) => {
        e.preventDefault();
        //setEmail(document.getElementById("email").value);
        //setPassword(document.getElementById("password").value);
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        try {
          // Make a GET request to fetch user data
          /*const response = await fetch(
            "https://66c4132cb026f3cc6cedf048.mockapi.io/user-account"
          );
          if (response.ok) {
            const userData = await response.json();
            const foundUser = userData.find(
              (user) => user.username === userName && user.email === email && user.password === passWord
            );
    
            if (foundUser) {
              if (foundUser.priority === "1") {
                alert("Xin chào quản trị viên!");
                localStorage.setItem("user", JSON.stringify(foundUser));
                window.location.href = "/";// Redirect to admin page
              } else {
                alert(`Xin chào ${userName}!`);
                localStorage.setItem("user", JSON.stringify(foundUser));
                window.location.href = "/";// Redirect to home page
              }
            } else {
              alert("Sai tên tài khoản hoặc mật khẩu");
            }
          } else {
            alert("Lỗi kết nối máy chủ. Xin vui lòng thử lại sau.");
          }*/
          const responseSignIn = await axios.post('http://localhost:8080/api/user/signin', {
            email,
            password,
          });
          console.log('Login successful:', responseSignIn.data.data);
          localStorage.setItem('userEmail', JSON.stringify(responseSignIn.data.data.email));
          localStorage.setItem('phoneNumber', JSON.stringify(responseSignIn.data.data.phoneNumber));
          localStorage.setItem('isAdmin', JSON.stringify(responseSignIn.data.data.isAdmin));
          if (!responseSignIn.data.data.isAdmin) {
            alert(`Xin chào ${responseSignIn.data.data.userName}!`);
            localStorage.setItem("LoggedInUser", JSON.stringify(responseSignIn.data.data.userName));
            window.location.href = "/";
          } else {
            alert("Xin chào quản trị viên!")
            localStorage.setItem("LoggedInUser", JSON.stringify(responseSignIn.data.data.userName))
            window.location.href = "/";
          }
          localStorage.setItem('accessToken', JSON.stringify(responseSignIn.data.data.accessToken));
          localStorage.setItem('refreshToken', JSON.stringify(responseSignIn.data.data.refreshToken));
          
        } catch (error) {
          //setErrorMessage(error.responseSignIn.error.message);
          alert(error)
        }
      };
    return(
        <div className="background">
            <Header/>
            <div class="login-container">
                <h1 class="form-head">Đăng nhập</h1>
                <form class="login-form" onSubmit={handleLoginSubmit}>
                    <input id="email" type="email" placeholder="Email" required="Vui lòng nhập Email"/>
                    <input id="password" type="password" placeholder="Mật khẩu" required="Vui lòng nhập mật khẩu"/>
                    <button id="btn-login" type="submit">Đăng nhập</button>
                </form>
                <hr />
                <p class="question">Bạn chưa là thành viên? <Link to="/signup">Đăng ký ngay!</Link></p>
            </div>
            <Footer/>
        </div>

    )
}
export default Login