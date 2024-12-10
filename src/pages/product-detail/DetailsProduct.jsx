import React, { useState, useEffect, useRef } from 'react';
import { useLocation  } from 'react-router-dom';

function DetailsProduct() {
    const location = useLocation();
    const product = location.state.item || {}; //This line retrieves the product data passed from the previous route using the state property in the location object


    const [ImageShow, setImageShow] = useState(product ? product.detailimage1 : '');
    const [ImageList, setImageList] = useState(product ? [product.detailimage1, product.detailimage2, product.detailimage3, product.detailimage4] : []);
    const [AmoutProduct, setAmountProduct] = useState(1);
    const initCartList = localStorage.getItem("CartListDetailPage") ? JSON.parse(localStorage.getItem("CartListDetailPage")) : [] ;
    const [ CartListDetailPage, setCartListDetailPage ]= useState(initCartList);
    

    useEffect(() => {
        if (product) {
            setImageShow(product.detailimage1);
            setImageList([product.detailimage1, product.detailimage2, product.detailimage3, product.detailimage4]);
        }
    }, [product]);

    const ChangeImageShow = (num) => {
        setImageShow(ImageList[num]);
    };

    const DecreaseAmount = () => {
        if (AmoutProduct <= 1) {
            setAmountProduct(1)
        } else {
            setAmountProduct(prev => prev - 1);
        }
    }

    const IncreaseAmount = () => {
        setAmountProduct(prev => prev + 1);
    }


    const [selectedSize, setSelectedSize] = useState(null);

    const sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

    //TẠO ARRAY ADD CART
    const handleAddCartDetailPage = (product) => {
        
    
        const newItemAdded = {
            itemName: product.name,
            itemPrice: product.price,
            itemImage: ImageShow,
        };


        console.log(newItemAdded);
        setCartListDetailPage(prev => [...prev, newItemAdded]);
    
    };

    useEffect(() => {
        
        localStorage.setItem('CartListDetailPage', JSON.stringify(CartListDetailPage));
        const event = new Event('storage');
        window.dispatchEvent(event);
    }, [CartListDetailPage]);

    return (

        <div className='container text-center' style={{ height: "auto" }}>
            {/*<div style={{ textAlign: "left" }}>
                <p><a href="http://localhost:3000/">Trang chủ</a> <span> / Chi tiết sản phẩm</span></p>
            </div>*/}

            <div className='d-flex justify-content-evenly container' style={{ marginTop: "20px" }}>
                <div style={{ width: "8%" }}>
                    <div >
                        {ImageList.map(((item, idx) => {
                            return <div onClick={() => ChangeImageShow(idx)} style={{ marginBottom: '15px',paddingBottom: '5px', paddingTop: '5px'}}><img src={item} style={{ boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', maxWidth: '60px' , border:'1px solid black', padding: '2px', cursor:'pointer' }} /></div>
                        }))}
                    </div>
                </div>

                <div style={{ width: "50%" }}>
                    <div>
                        <img src={ImageShow} style={{ height: "700px", boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }} />
                    </div>
                </div>


                <div style={{ width: "42%" }}>
                    <div>
                        <h1 className='' style={{ textAlign: "left" }}>{product.name}</h1>
                        <p className='text-start'>{product.type}</p>

                        <div style={{ textAlign: "left" }}>
                            {/*<div style={{ margin: '5px 0px' }}><s>199.000đ</s></div>*/}
                            <div style={{ margin: '5px 0px' }}>
                                <h3>{product.price} VNĐ<span style={{ backgroundColor: "blue", color: "white", marginLeft: "10px", borderRadius: "10px" }}>-50% cho thành viên</span></h3>
                            </div>

                            <div className='rounded-pill' style={{ margin: '10px 0px', backgroundColor: '#dbd7d7', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h6 style={{ marginTop: '12px' }}>Giảm thêm 10K/sản phẩm cho đơn từ 3 sản phẩm thể thao bất kỳ</h6>
                            </div>
                        </div>

                        <div className='rounded p-1 bg-opacity-10 border border-info border-start-0 rounded-end' style={{ display: "flex", margin: '15px 0px' }}>
                            <div>
                                <p className="important-margin"><h6 style={{ color: "blue" }}>Áo thun thể thảo Coolmate Basics</h6></p>
                                <p className="important-margin"><h6>Tặng cho hoá đơn thanh toán từ 399k</h6></p>
                            </div>
                            <div style={{ paddingLeft: "20px" }}>
                                <div style={{ display: "flex" }}>
                                    <div className=''>
                                        <img src="https://media3.coolmate.me/cdn-cgi/image/width=400,height=400,quality=80,format=auto/uploads/July2024/Tuong_1.jpg" className='tw-object-cover rounded-circle' style={{ maxHeight: "70px", marginTop: "10px" }} />
                                    </div>
                                    <div>
                                        <img src="https://media3.coolmate.me/cdn-cgi/image/width=400,height=400,quality=80,format=auto/uploads/July2024/Tuong_10.jpg" className='tw-object-cover rounded-circle' style={{ maxHeight: "70px", marginTop: "10px" }} />
                                    </div>
                                    <div>
                                        <img src="https://media3.coolmate.me/cdn-cgi/image/width=400,height=400,quality=80,format=auto/uploads/July2024/Tuong_15.jpg" className='tw-object-cover rounded-circle' style={{ maxHeight: "70px", marginTop: "10px" }} />
                                    </div>
                                    <div>
                                        <img src="https://media3.coolmate.me/cdn-cgi/image/width=400,height=400,quality=80,format=auto/uploads/July2024/Tuong_5.jpg" className='tw-object-cover rounded-circle' style={{ maxHeight: "70px", marginTop: "10px" }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p style={{ textAlign: "left", margin: '5px 0px' }}>Màu sắc: <span style={{ fontWeight: "bold" }}>{product.description}</span>
                                <img src={product.colorurl} className='tw-object-cover rounded-circle' style={{ maxHeight: "30px", width: "45px", marginLeft: "15px" }} />
                            </p>

                        </div>

                        <div>
                            <div className="row justify-content-between">
                                <div className="col-4">
                                    Kích thước:
                                </div>
                                <div className="col-4">
                                    <a href="https://www.coolmate.me/product/ao-singlet-nam-chay-bo-khong-duong-may-coolfast-sieu-nhe-exdry-thoang-mat?color=xanh-danube#size-guide" style={{ textDecoration: 'underline' }}>Hướng dẫn chọn size:</a>
                                </div>
                            </div>

                            {/* Chon Size */}
                            <div className="container text-center" style={{ margin: '15px 0px' }}>
                                <div className="row align-items-start">
                                    {sizes.map((size) => (
                                        <div
                                            key={size}
                                            className={`col rounded-pill size-button ${selectedSize === size ? 'selected' : ''}`}
                                            style={{ margin: '0px 10px', cursor: 'pointer', backgroundColor: 'orange' }}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            <span><h4 style={{ marginTop: '10px' }}>{size}</h4></span>
                                        </div>
                                    ))}
                                </div>
                                {selectedSize && <div style={{ marginTop: '20px' }}>Bạn đã chọn kích thước: {selectedSize}</div>}
                            </div>
                        </div>

                        {/* Chon So Luong */}
                        <div className='d-flex justify-content-around' id='buy-amount'>
                            {/*<div>
                                <button onClick={() => DecreaseAmount()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>

                                </button>

                                <input type="text" name="" id="amount" value={AmoutProduct} />
                                <button onClick={() => IncreaseAmount()}>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>

                            </div> */}

                            {/* Button Chon Kich Thuoc */}
                            <div onClick={() =>{handleAddCartDetailPage(product)}} className='d-inline-flex p-2 btn-amout rounded-pill'>
                                <h6 style={{ marginTop: '12px', color:'white' }}  >Thêm vào giỏ hàng</h6>
                            </div>
                        </div>

                        <div class="d-flex p-2" style={{ marginTop: '10px' }}>
                            <img src="https://page.widget.zalo.me/static/images/2.0/Logo.svg" style={{ width: "40px" }} />
                            <span style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                                <a href="https://zalo.me/1517736583279228381">Chat zalo để được tư vấn ngay! (8am - 22pm)</a>
                            </span>
                        </div>

                        <div class="container text-center">
                            <div class="row">
                                <div class="col d-inline-flex p-2">
                                    <img src="https://www.coolmate.me/images/product-detail/return.svg" style={{ width: "40px" }} />
                                    <span style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                                        Đổi trả cực dễ chỉ cần số điện thoại
                                    </span>
                                </div>
                                <div class="col d-inline-flex p-2">
                                    <img src="https://www.coolmate.me/images/product-detail/return-60.svg" style={{ width: "40px" }} />
                                    <span style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                                        60 ngày đổi trả vì bất kỳ lý do gì
                                    </span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col d-inline-flex p-2">
                                    <img src="https://www.coolmate.me/images/product-detail/phone.svg" style={{ width: "40px" }} />
                                    <span style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                                        Hotline 1900.27.27.37 hỗ trợ từ 8h30 - 22h mỗi ngày
                                    </span>
                                </div>
                                <div class="col d-inline-flex p-2">
                                    <img src="https://www.coolmate.me/images/product-detail/location.svg" style={{ width: "40px" }} />
                                    <span style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                                        Đến tận nơi nhận hàng trả, hoàn tiền trong 24h
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: "left" }}>
                <p><h3>Chi tiết sản phẩm</h3></p>
            </div>
            <div style={{ width: "1272px" }}>
                <img src={product.detailimageBig1} alt="" className='ImageDetailsBig' />
                <img src={product.detailimageBig2} alt="" className='ImageDetailsBig' />
            </div>


        </div>

    )
}

export default DetailsProduct