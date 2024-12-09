import React from "react";
import './mainmenu-style.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CartPayment from "../cart-payment/cartpayment";

const MainMenu = () => {
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

        //ĐẾM ITEM GIỎ HÀNG (WIP)
 const [totalCartCount, setTotalCartCount] = useState(0);


      useEffect(() => {
        const updateCartCounts = () => {
          console.log(localStorage.getItem("CartListNew"))
          console.log(localStorage.getItem("CartListRun"))
          console.log(localStorage.getItem("CartListSeasonal"))
          console.log(localStorage.getItem("CartListThun"))
          console.log(localStorage.getItem("CartListDetailPage"))

          //localStorage.getItem("CartListNew") ? JSON.parse(localStorage.getItem("CartListNew")).length : 0 ;
          const countCartListNew = localStorage.getItem("CartListNew") ? JSON.parse(localStorage.getItem("CartListNew")).length : 0 ;
          const countCartListRun = localStorage.getItem("CartListRun") ? JSON.parse(localStorage.getItem("CartListRun")).length : 0 ;
          const countCartListSeasonal = localStorage.getItem("CartListSeasonal") ? JSON.parse(localStorage.getItem("CartListSeasonal")).length : 0 ;
          const countCartListThun = localStorage.getItem("CartListThun") ? JSON.parse(localStorage.getItem("CartListThun")).length : 0 ;
          const countCartListDetailPage = localStorage.getItem("CartListDetailPage") ? JSON.parse(localStorage.getItem("CartListDetailPage")).length : 0 ;

          console.log("countCartListNew",countCartListNew)
          console.log("countCartListRun",countCartListRun)
          console.log("countCartListSeasonal",countCartListSeasonal)
          console.log("countCartListThun",countCartListThun)
          console.log("countCartListDetailPage",countCartListDetailPage)

          setTotalCartCount(countCartListNew + countCartListRun + countCartListSeasonal + countCartListDetailPage + countCartListThun);
            return;
        };
                    // Call the function initially
                    updateCartCounts();

                    // Set up a listener for storage changes
                    window.addEventListener('storage', (e) => {
                      console.log(e)
                      updateCartCounts()
                      console.log("Storage changed!")
                    });

    }, []);


    return(
        <div>
  <div className="mainmenu">
    <div className="mainmenu-logo">
    <Link to="/" onClick={scrollToTop}><img src={require('../../img/Logo 2.png')}/></Link>
    </div>
    <div className="mainmenu-link">
      <a onClick={() => window.location.replace("/#newproduct-header")}>
        <div className="mainmenu-link-product">SẢN PHẨM MỚI</div>
      </a>
      <a onClick={() => window.location.replace("/#seasonal")}>
        <div className="mainmenu-link-item">ĐỒ THEO MÙA</div>
      </a>
      <a onClick={() => window.location.replace("/#running")}>
        <div className="mainmenu-link-item">ĐỒ CHẠY BỘ</div>
      </a>
      <a onClick={() => window.location.replace("/#thun")}>
        <div className="mainmenu-link-item">ĐỒ THUN NAM</div>
      </a>
      <a onClick={() => window.location.replace("#container-request")}>
        <div className="mainmenu-link-item">SẢN XUẤT RIÊNG</div>
      </a>
    </div>
    <div className="search-cart">
      <div className="searchbar">
        <div className="search-icon">
          <img src={require('../../img/768px-Search_Icon.svg.png')}/>
        </div>
        <div className="search-input">
          <input type="text" placeholder="Tìm sản phẩm..."/>
        </div>
      </div>
      <div className="img-cart">
        <Link to="/cart&payment">
        <img src={require('../../img/bag.jpg')} height="30px"/>
        <div className="counter-wrap">
          <div className="cart-counter">{totalCartCount}</div>
        </div>
        </Link>
      </div>
    </div>
  </div>
        </div>
    )
}

export default MainMenu