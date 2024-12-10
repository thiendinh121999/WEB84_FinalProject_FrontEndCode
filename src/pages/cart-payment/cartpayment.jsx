import '../Home/home.css'
import './cartpayment.css'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from 'axios';

const CartPayment = () => {
    const initCartDetailNew = localStorage.getItem("CartListNew") ? JSON.parse(localStorage.getItem("CartListNew")) : [] ;
    const initCartDetailRun = localStorage.getItem("CartListRun") ? JSON.parse(localStorage.getItem("CartListRun")) : [] ;
    const initCartDetailSeasonal = localStorage.getItem("CartListSeasonal") ? JSON.parse(localStorage.getItem("CartListSeasonal")) : [] ;
    const initCartDetailThun = localStorage.getItem("CartListThun") ? JSON.parse(localStorage.getItem("CartListSeasonal")) : [] ;
    const initCartDetailDetailPage = localStorage.getItem("CartListDetailPage") ? JSON.parse(localStorage.getItem("CartListDetailPage")) : [] ;
    const [cartDetailNew, setcartDetailNew] = useState(initCartDetailNew)
    const [cartDetailRun, setcartDetailRun] = useState(initCartDetailRun)   
    const [cartDetailSeasonal, setcartDetailSeasonal] = useState(initCartDetailSeasonal)
    const [cartDetailThun, setcartDetailThun] = useState(initCartDetailThun)
    const [cartDetailDetailPage, setcartDetailDetailPage] = useState(initCartDetailDetailPage)
    const [totalPrice, settotalPrice] = useState(0)
    const [refreshTokenCheck, setRefreshTokenCheck] = useState(JSON.parse(localStorage.getItem("refreshToken")) || null);
    const totalBillPreset = totalPrice;
    const [totalBill, settotalBill] = useState(totalBillPreset)
    const [saleOffStatus, setsaleOffStatus] = useState('Không KM')
    console.log("totalBillPreset",totalBillPreset)
    const initConfirmedBuyList = [...cartDetailNew, ...cartDetailRun, ...cartDetailSeasonal,...cartDetailThun, ...cartDetailDetailPage] || []
    const [confimredBuyList, setConfirmedBuyList] = useState(initConfirmedBuyList);
    const [payMethod, setPayMethod] = useState("COD")
    //Update cart list
    useEffect (()=> {
        const updateDetailList = () => {
            setcartDetailNew(JSON.parse(localStorage.getItem("CartListNew")) || []);
            setcartDetailRun(JSON.parse(localStorage.getItem("CartListRun")) || []);
            setcartDetailSeasonal(JSON.parse(localStorage.getItem("CartListSeasonal")) || []);
            setcartDetailThun(JSON.parse(localStorage.getItem("CartListThun")) || []);
            setcartDetailDetailPage(JSON.parse(localStorage.getItem("CartListDetailPage")) || []);
            console.log("cartDetailNew",cartDetailNew)
            console.log("cartDetailRun",cartDetailRun)
            console.log("cartDetailSeasonal",cartDetailSeasonal)
            console.log("cartDetailThun",cartDetailThun)
            console.log("cartDetailDetailPage",cartDetailDetailPage)
            const totalPriceNew = cartDetailNew.reduce((acc, item) => acc + JSON.parse(item.itemPrice), 0);
            const totalPriceRun = cartDetailRun.reduce((acc, item) => acc + JSON.parse(item.itemPrice), 0);
            const totalPriceSeasonal = cartDetailSeasonal.reduce((acc, item) => acc + JSON.parse(item.itemPrice), 0);
            const totalPriceThun = cartDetailThun.reduce((acc, item) => acc + JSON.parse(item.itemPrice), 0);
            const totalPriceDetailPage = cartDetailDetailPage.reduce((acc, item) => acc + JSON.parse(item.itemPrice), 0);
            console.log("totalPriceNew",totalPriceNew)
            console.log("totalPriceRun",totalPriceRun)
            console.log("totalPriceSeasonal",totalPriceSeasonal)
            console.log("totalPriceThun",totalPriceThun)
            console.log("totalPriceDetailPage",totalPriceDetailPage)
            settotalPrice(totalPriceNew + totalPriceRun + totalPriceSeasonal + totalPriceThun + totalPriceDetailPage);
            settotalBill(totalPriceNew + totalPriceRun + totalPriceSeasonal + totalPriceThun + totalPriceDetailPage);
            return;
        };
        
        //Initial call
        updateDetailList()
        
       //Recall the funtion
        window.addEventListener('storage', (e) => {
            console.log(e)
            console.log("Event happens!")
            updateDetailList()
          });
    }, []);

    //Áp mã khuyến mãi
    const handleSaleCode = async (e) => {
        e.preventDefault()
        const salesCodeInput = document.getElementById("salecode-input").value;
        console.log("refreshTokenCheck", refreshTokenCheck)
        if (refreshTokenCheck !== null) {
            try {                
                const responseSalescode = await axios.get(`https://web84-finalproject-backendcode.onrender.com/api/salescode/getsalescode/${salesCodeInput}`);
                console.log('responseSalescode',responseSalescode)
                if (!responseSalescode) {
                    alert('Không tìm thấy mã khuyến mãi hoặc áp dụng không thành công!')
                    return;
                } 
                const multiplier = responseSalescode.data.data.multiplier
                settotalBill(totalPrice * multiplier);
                setsaleOffStatus("Áp KM") //set trang thai ap ma khi gui order
                alert("Áp mã khuyến mãi thành công!");
            } catch (error) {
                console.error("Error fetching sales codes:", error);
                alert("Mã khuyến mãi sai hoặc không tồn tại")
            }
        } else {
            alert("Vui lòng đăng nhập hoặc đăng ký thành viên để sử dụng mã khuyến mãi!");
        }
    };



    //Delete Cart
    const handleDeleteCart = () =>{
        localStorage.removeItem("CartListNew");
        localStorage.removeItem("CartListRun");
        localStorage.removeItem("CartListSeasonal");
        localStorage.removeItem("CartListDetailPage");
        setcartDetailNew([])
        setcartDetailRun([])
        setcartDetailSeasonal([])
        setcartDetailDetailPage([])
        settotalPrice(0)
        settotalBill(0)
    }
    
    //Apply Pay Card
    const handleApplyCard = () => {
        const cardnumber = document.getElementById("buyercardnumber").value;
        
        if (!cardnumber) {
            setPayMethod("COD");
            alert("Áp dụng thanh toán khi nhận hàng!")
        } else {
            setPayMethod("Debit/Credit");
            alert("Áp dụng thẻ thành công!")
        }
        
    };




    //Xac nhan mua hang

    const handleConfirmPurchase = async (e) =>{
        e.preventDefault();
        setConfirmedBuyList([...cartDetailNew, ...cartDetailRun, ...cartDetailSeasonal, ...cartDetailThun, ...cartDetailDetailPage]);
        const buyername = document.getElementById("buyername").value;
        const buyerphone = document.getElementById("buyerphone").value;
        const buyeradress = document.getElementById("buyeradress").value;
        const buyeremail = document.getElementById("buyeremail").value;
        const orderlist = confimredBuyList;
        const totalbill = totalBill;
        const cardnumber = document.getElementById("buyercardnumber").value;
        console.log("orderlist", orderlist)
        setPayMethod(cardnumber.trim() !== "" ? "Debit/Credit" : "COD");
        console.log("cardnumber",cardnumber)
        console.log("payMethod",payMethod)

        try {
            // Make a POST request to the mock API
           /* const response = await fetch(
              "https://66c6baee8b2c10445bc77fa9.mockapi.io/productorder", // Corrected API endpoint
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(confirmedOrder),
              }
            );
      
            if (response.ok) {
            alert("Đơn hàng đã được tiếp nhận, cám ơn bạn đã mua hàng!");
            window.location.href = "/"; // Redirect to home
            localStorage.removeItem("CartListNew");
            localStorage.removeItem("CartListRun");
            localStorage.removeItem("CartListSeasonal");
            localStorage.removeItem("CartListDetailPage");
            } else {
              alert("Đơn hàng chưa được tiếp nhận, xin vui lòng thử lại");
            }*/
              const responseCreateOrder = await axios.post('https://web84-finalproject-backendcode.onrender.com/api/order/createneworder', {
                customerName: buyername,
                customerPhoneNumber: buyerphone,
                customerEmail: buyeremail,
                customerAdress: buyeradress,
                orderList: orderlist,
                customerPayCard: cardnumber,
                totalBill: totalbill,
                saleOff: saleOffStatus,
                payMethod: payMethod 
              });
            alert('Cám ơn bạn đã mua hàng tại Ricky Store!')
            localStorage.removeItem("CartListNew");
            localStorage.removeItem("CartListRun");
            localStorage.removeItem("CartListSeasonal");
            localStorage.removeItem("CartListThun");
            localStorage.removeItem("CartListDetailPage");
            window.location.href = "/";
        } catch (error) {
            console.error("Error registering user:", error);
            alert('Mua hàng thất bại, quý khách vui lòng thử lại sau!')
          }
          
          
    }

    return (
        <div className="background">
            <Header/>
            <div className="cart-payment-wrap">
                <div className="cart-wrap">
                    <h1 className="cart-payment-header">1. Kiểm tra giỏ hàng của bạn</h1>
                    <div className="cartlist-wrap">
                        <div className="cartlist-header">
                            <div className="cartlist-header-product">Sản phẩm</div>
                            <div className="cart-payment-header-price">Đơn giá</div>
                        </div>
                        <div className="cart-detail-list-wrap">

                            {cartDetailNew.map((item) => (
                                <div className="cart-item-wrap">
                                    <img className="cart-prduct-image" src={item.itemImage}/>
                                    <div className="cart-item-name">{item.itemName}</div>
                                    <div className="cart-item-price">{item.itemPrice} VNĐ</div>
                                </div>
                            ))}
                            {cartDetailRun.map((item) => (
                                <div className="cart-item-wrap">
                                    <img className="cart-prduct-image" src={item.itemImage}/>
                                    <div className="cart-item-name">{item.itemName}</div>
                                    <div className="cart-item-price">{item.itemPrice} VNĐ</div>
                                </div>
                            ))}
                            {cartDetailSeasonal.map((item) => (
                                <div className="cart-item-wrap">
                                    <img className="cart-prduct-image" src={item.itemImage}/>
                                    <div className="cart-item-name">{item.itemName}</div>
                                    <div className="cart-item-price">{item.itemPrice} VNĐ</div>
                                </div>
                            ))}
                            {cartDetailThun.map((item) => (
                                <div className="cart-item-wrap">
                                    <img className="cart-prduct-image" src={item.itemImage}/>
                                    <div className="cart-item-name">{item.itemName}</div>
                                    <div className="cart-item-price">{item.itemPrice} VNĐ</div>
                                </div>
                            ))}
                            {cartDetailDetailPage.map((item) => (
                                <div className="cart-item-wrap">
                                    <img className="cart-prduct-image" src={item.itemImage}/>
                                    <div className="cart-item-name">{item.itemName}</div>
                                    <div className="cart-item-price">{item.itemPrice} VNĐ</div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleDeleteCart} className="delete-cart-btn">Xóa giỏ hàng</button>
                    </div>
                    <div className="total-price-wrap">
                        <div>Tổng giá:</div>
                        {/*LOGIC TINH TOAN O DAY*/ }
                        <div className="total-price-text"> {totalPrice} VNĐ</div>
                    </div>
                    <form onSubmit={handleSaleCode} className="salecode-wrap">
                        <div>Mã khuyến mãi:</div>
                        <div className="salecode-input-wrap">
                            <input type="text" id="salecode-input" placeholder="Member only"/>
                            <button type="submit" id="salecode-btn">Áp mã</button>
                        </div>
                    </form>
                    <div className="total-bill-wrap">
                        <div>Thành tiền:</div>
                        {/*LOGIC TINH TOAN O DAY*/ }
                        <div className="total-bill-text"> {totalBill} VNĐ</div>
                    </div>
                </div>
                <div className="payment-wrap">
                <h1 className="cart-payment-header">2. Thông tin mua hàng</h1>
                <form className="payment-form-wrap" onSubmit={handleConfirmPurchase}>
                    <div className="payment-form-item-wrap" >
                        <label>Họ tên của bạn:</label>
                        <input type="text" className="payment-input" id="buyername" required/>
                    </div>
                    <div className="payment-form-item-wrap">
                        <label>Số điện thoại của bạn:</label>
                        <input type="text" className="payment-input" id="buyerphone" required/>
                    </div>
                    <div className="payment-form-item-wrap">
                        <label>Email của bạn:</label>
                        <input type="email" className="payment-input" id="buyeremail" required/>
                    </div>
                    <div className="payment-form-item-wrap">
                        <label>Địa chỉ giao hàng:</label>
                        <input type="text" className="payment-input" id="buyeradress" required/>
                    </div>
                    <div className="payment-form-item-wrap">
                        <label>Thẻ thanh toán(*)<img style={{width: "40px"}} src={require('../../img/mastercardicon.png')} alt="Mastercard"/>:</label>
                        <input type="text" className="payment-input" id="buyercardnumber"/>
                    </div>
                    <div className="payment-form-item-wrap">
                        <label>Mã CVC(**):</label>
                        <input type="text" className="payment-input-cvc"/>
                        <button type="button" onClick={handleApplyCard} className="applycard-btn">Áp dụng</button>
                    </div>
                    <button type="submit" className="payconfirm-btn">Xác nhận mua hàng</button>
                </form>
                <i style={{marginTop: '5px', marginBottom: '2px'}}>(*)Bỏ qua nếu bạn muốn thanh toán khi nhận hàng </i>
                <i style={{marginTop: '5px', marginBottom: '2px'}}>(Xóa thông tin thẻ và nhấn áp dụng nếu bạn muốn hủy phương thức thanh toán thẻ)</i>
                <i style={{marginTop: '5px', marginBottom: '2px'}}>(**)Mã CVC là 3 số cuối phía sau thẻ tín dụng/ghi nợ</i>
                
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default CartPayment