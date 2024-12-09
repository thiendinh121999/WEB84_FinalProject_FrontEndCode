// kiểm tra user đã đăng nhập hay chưa
let loginHtml = document.getElementById("control-login");
let currentUser = JSON.parse(localStorage.getItem("user")) || '';
let logout = document.getElementById("logout");
if (currentUser && currentUser.username) {
    loginHtml.innerHTML = `${currentUser.username} / <i class="fa-solid fa-arrow-right-from-bracket" id="logout" style="cursor: pointer"></i>`;
} else loginHtml.innerHTML = `<a href="login.html" id="login">ĐĂNG NHẬP</a>`

// logout
document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("user");
    window.location.href = "login.html"
})

function signup(e) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var user = {
        username: username,
        email: email,
        password: password,
    };
    var json = JSON.stringify(user);
    localStorage.setItem("user", json);
    alert("Đăng ký thành công! Mời bạn đăng nhập")
    window.location.href = "login.html"
}

function login(e) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    // var user = localStorage.getItem("user");
    // var data = JSON.parse(user);
    // console.log(user);
    // console.log(data);
    if (currentUser == null) {
        alert("Vui lòng nhập Email và mật khẩu đăng nhập")
    } else if (username == currentUser.username &&
        email == currentUser.email&&
        password == currentUser.password) {
        alert("Đăng nhập thành công")
        window.location.href = "index.html"
    } else {
        alert("Tài khoản hoặc mật khẩu không chính xác")
    }
}