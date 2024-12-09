import React from "react";
import './footer.css'

const Footer = ()=> {
    return(
        <div>
            <div id="footer">
                <div className="footer-message">
                    <h2 className="footer-message-header">Ricky lắng nghe bạn!</h2>
                     <p className="footer-message-content">Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản phẩm tốt hơn nữa.</p>
                </div>
                <div className="phone-email">
                    <div className="phone">
                        <div>
                            <img src={require('../img/phoneIcon.png')}/>
                        </div>
                    <div style={{marginLeft: '5px'}}>
                        <p className="phone-head">Hotline</p>
                        <p  className="phone-content">1900 272 XXX</p>
                    </div>
                    </div>
      <div className="mail">
        <div>
          <img src={require('../img/mailIcon.png')}/>
        </div>
        <div style={{marginLeft: '5px'}}>
          <p className="mail-head"
            >
            Email</p>
          <p className="mail-content">pod@rickystore.me</p>
        </div>
      </div>
    </div>
    <div className="socialicon">
      <a href={0/*Add Contact Rout here*/}><img src={require('../img/youtubeicon.png')} height="35px"/></a>
      <a href={0/*Add Contact Rout here*/}><img src={require('../img/fbicon.png')} height="35px"/></a>
      <a href={0/*Add Contact Rout here*/}><img src={require('../img/tiktokicon.png')} height="35px"/></a>
      <a href={0/*Add Contact Rout here*/}><img src={require('../img/zaloicon.png')} height="35px"/></a>
    </div>
  </div>
        </div>
    )
}

export default Footer