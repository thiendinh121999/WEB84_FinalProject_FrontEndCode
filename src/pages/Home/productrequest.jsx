import React from "react";
import './home.css'
import { useState } from "react";
import axios from 'axios';

const ProductRequest = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const request = document.getElementById("productOrder").value;
    const customerName = document.getElementById("requesterName").value;
    const customerPhone = document.getElementById("requesterTell").value;
    const customerEmail = document.getElementById("requesterEmail").value;
    
    try {
      const responseRequest = await axios.post('http://localhost:8080/api/request/createnewrequest', {
        request: request,
        customerName: customerName,
        customerPhone: customerPhone,
        customerEmail: customerEmail
      });

        alert("Yêu cầu của bạn đã được tiếp nhận, Ricky Store sẽ liên hệ tới bạn trong thời gian sớm nhất!");
        
    } catch (error) {
      console.error("Sending request:", error);
      alert("Yêu cầu chưa được ghi nhận, vui lòng thử lại sau!");
    }
  };
  

    return(
    <div id="container-request">
        <div class="container-request-mess">
         <p>Thỏa cá tính với sản phẩm may đo riêng biệt, dành riêng cho bạn!</p>
        </div>
        <div class="container-form">
          <p class="form-header">Gửi yêu cầu cho Ricky Store</p>
        <form onSubmit={handleSubmit}>
        <div>
          <label class="form-label">Sản phẩm và số lượng bạn cần:</label>
          <input class="form-input" id="productOrder" type="text" placeholder="VD:Áo thun UV 2 cái" required/>
        </div>
        <div>
          <label class="form-label">Họ và tên của bạn:</label>
          
          <input class="form-input" id="requesterName" type="text" placeholder="VD: Nguyễn Văn A" required/>
        </div>
        <div>
          <label class="form-label">Số điện thoại của bạn:</label>
          <input class="form-input" id="requesterTell" type="tel" placeholder="VD: 0395 381 xxx" required/>
        </div>
        <div>
          <label class="form-label">Email của bạn:</label>
          <input class="form-input" id="requesterEmail" type="email" placeholder="VD: xxx@gmail.com" required/>
        </div>
        <button id="submit-button" type="submit">Gửi yêu cầu</button>
      </form>
    </div>
    </div>
    )
}

export default ProductRequest