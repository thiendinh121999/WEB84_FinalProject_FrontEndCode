import React from 'react';
// import data from '../../data/data.json';
import newtag from "../img/NewTag.png";
import '../data/assets/css/style homepage.css';
import { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CarouselComponent from './CarouselComponent';
import '../css/owl.carousel.css'
import '../css/owl.theme.default.css'
import './listsp.css'
import axios from 'axios';
//import { useCart } from '../component_dinh/Cart/CartContext';

function ListSPMoi() {

    const [dataAPI, setDataAPI] = useState([]);
    const initCartList = localStorage.getItem("CartListNew") ? JSON.parse(localStorage.getItem("CartListNew")) : [] ;
    const [ CartListNew, setCartListNew ]= useState(initCartList);
    const [getAPIStatus, setGetAPIStatus] = useState(false)

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                /*const res = await fetch('https://66beccce42533c40314414cb.mockapi.io/ListSPMoi-ChayBo');
                const data = await res.json();
                setDataAPI(data);*/      
                const responseNewProduct = await axios.get('https://web84-finalproject-backendcode.onrender.com/api/product/getnewproduct')
                setDataAPI(responseNewProduct.data.data);
                setGetAPIStatus(true)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [getAPIStatus]);

    console.log("dataAPI", dataAPI)
    //TẠO ARRAY ADD CART
    const handleAddCartNew = (item) => {
        
    
        const newItemAdded = {
            itemName: item.name,
            itemPrice: item.price,
            itemImage: item.image,
        };


        console.log(newItemAdded);
        setCartListNew(prev => [...prev, newItemAdded]);
    
    };

    useEffect(() => {
        
        localStorage.setItem('CartListNew', JSON.stringify(CartListNew));
        const event = new Event('storage');
        window.dispatchEvent(event);
    }, [CartListNew]);

    if (!dataAPI) {
        return <p>Loading...</p>;
    }

    /* const [dataProductNew, setDatadataProductNew] = useState([]);

    // useEffect(() => {
    //     const newData = data.productNew.map(item => ({
    //         id: uuidv4(),
    //         ...item
    //     }));

    //     setDatadataProductNew([...newData]);
    // }, [data.productNew]);

    // CHỨC NĂNG ADD TO CART TRANG HOME*/
    

    return (
        <div>
            <div id="newproduct-header">Sản phẩm mới</div>
            <div className="container">
                {/* <div className="row g-4 my-5 mx-auto owl-carousel owl-theme"> */}
                <CarouselComponent>
                    {dataAPI.map((item) => {
                        return <div className="col product-item mx-auto" key={item._id}>
                            <div className="product-img">
                                <img src={item.image} alt="" className="img-fluid d-block mx-auto"></img>
                                <span className="heart-icon">
                                    <img src={newtag} height="20px" alt="New Tag"></img>
                                </span>
                                <div className="row btns w-100 mx-auto text-center">
                                    <button type="button" className="col-6 py-2" onClick={() => handleAddCartNew(item)}>
                                        <i className="fa fa-cart-plus"></i> Thêm vào giỏ
                                    </button>

                                    <button type="button" className="col-6 py-2">
                                        <Link to={{
                                            pathname: `/Products/${item._id}` //Chuyển đến trang detail. cần sửa
                                        }} state={{ item }}>
                                            <i className="fa fa-cart-plus" style={{ color: "white!" }}></i> Xem chi tiết
                                        </Link>
                                    </button>
                                </div>
                            </div>

                            <div className="product-info p-3">
                                <span className="product-type">{item.type}</span>
                                <Link to={{
                                            pathname: `/Products/${item._id}` //Chuyển đến trang detail. cần sửa
                                        }} state={{ item }} className="d-block text-dark text-decoration-none py-2 product-name">{item.name}</Link>
                                <p className="prodescript">{item.description}</p>
                                <span className="product-price">VNĐ {item.price}</span>
                                <div className="rating d-flex mt-1">
                                    <span>
                                        <i className="fa fa-star"></i>
                                    </span>
                                    <span>
                                        <i className="fa fa-star"></i>
                                    </span>
                                    <span>
                                        <i className="fa fa-star"></i>
                                    </span>
                                    <span>
                                        <i className="fa fa-star"></i>
                                    </span>
                                    <span>
                                        <i className="fa fa-star"></i>
                                    </span>
                                    <span><i className="fa review">({item.review} đánh giá)</i></span>
                                </div>
                            </div>
                        </div>
                    })}
                </CarouselComponent>
                {/* </div> */}
            </div>
        </div>
    );
}

export default ListSPMoi;
