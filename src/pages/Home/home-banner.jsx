import React from "react";
import '../../css/owl.carousel.css'
import '../../css/owl.theme.default.css'

const HomeBanner = ()   => {
    return(
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"
        aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
        aria-label="Slide 2"></button>
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src={require('../../img/Carousel03.jpg')} className="d-block w-100" alt="Đồ theo mùa"/>
      </div>
      <div className="carousel-item">
        <img src={require('../../img/Carousel02.jpg')} className="d-block w-100" alt=""/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
      data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
      data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
    )
}

export default HomeBanner