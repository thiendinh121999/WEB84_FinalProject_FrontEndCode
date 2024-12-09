import React from "react";
import $ from 'jquery'
import './home.css'
import productdataJson from '../productdata.json'
import '../css/owl.carousel.css'
import '../css/owl.theme.default.css'

/*CHƯA DÙNG ĐƯỢC*/
const NewProductList = ()=>{
    console.log(productdataJson)
    document.addEventListener('DOMContentLoaded', () => {

            $('.owl-carousel').owlCarousel({
                loop: true,
                margin: 0,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    768: {
                        items: 2,
                    },
                    1100: {
                        items: 3,
                    },
                    1400: {
                        items: 4,
                        loop: false,
                    }
                }
            });
        })
    
    return(
        <div className="container">
            <div className="row g-4 my-5">
                {productdataJson.productNew.map((item) => (
                    <div key={item.id} className="col product-item mx-auto">
                        <div className="product-img">
                            <img src={require(`${item.image}`)} alt={item.name} className="img-fluid d-block mx-auto" />
                            <span className="heart-icon">
                                <img src={require('../img/NewTag.png')} height="20px" alt="New Tag" />
                            </span>
                            {/* Buttons here */}
                        </div>

                        <div className="product-info p-3">
                            <span className="product-type">{item.type}</span>
                            <a href="#" className="d-block text-dark text-decoration-none py-2 product-name">
                                {item.name}
                            </a>
                            <p className="prodescript">{item.description}</p>
                            <span className="product-price">VND {item.price}</span>
                            {/* Rating stars here */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewProductList