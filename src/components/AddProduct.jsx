import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
function AddProduct() {
    const [selectedCategory, setSelectedCategory] = useState('createnewproduct');

    const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    }
    const inputname = useRef(null);
    const inputdescription = useRef(null);
    const inputtype = useRef(null);
    const inputprice = useRef(null);
    const inputimage = useRef(null);
    const inputreview = useRef(null);
    const inputcolorurl = useRef(null);
    const inputdetailimage1 = useRef(null);
    const inputdetailimage2 = useRef(null);
    const inputdetailimage3 = useRef(null);
    const inputdetailimage4 = useRef(null);
    const inputdetailimageBig1 = useRef(null);
    const inputdetailimageBig2 = useRef(null);

                    /*name: inputname.current.value,
                    type: inputtype.current.value,
                    description: inputdescription.current.value,
                    colorurl: inputcolorurl.current.value,
                    price: inputprice.current.value,
                    image: inputimage.current.value,
                    review: inputreview.current.value,
                    detailimage1: inputdetailimage1.current.value,
                    detailimage2: inputdetailimage2.current.value,
                    detailimage3: inputdetailimage3.current.value,
                    detailimage4: inputdetailimage4.current.value,
                    detailimageBig1: inputdetailimageBig1.current.value,
                    detailimageBig2: inputdetailimageBig1.current.value,*/
                    // inputname.current.value
    const BASE_URL = 'http://localhost:8080/api/product/'

    const [UpdateProduct, setUpdateProduct] = useState("")

    const PushProduct = async () => {
        try {
            console.log("category",selectedCategory)
            const responseAddProduct = await axios.post(`${BASE_URL}${selectedCategory}`, {
                    name: inputname.current.value,
                    type: inputtype.current.value,
                    description: inputdescription.current.value,
                    colorurl: inputcolorurl.current.value,
                    price: inputprice.current.value,
                    image: inputimage.current.value,
                    review: inputreview.current.value,
                    detailimage1: inputdetailimage1.current.value,
                    detailimage2: inputdetailimage2.current.value,
                    detailimage3: inputdetailimage3.current.value,
                    detailimage4: inputdetailimage4.current.value,
                    detailimageBig1: inputdetailimageBig1.current.value,
                    detailimageBig2: inputdetailimageBig1.current.value,
                    id: "1"
              });
        
                setUpdateProduct("Thêm sản phẩm thành công")
        } catch (error) {
            setUpdateProduct("Thêm sản phẩm thất bại")
            console.log(error)

        }
    }

    const BacktoManageProduct = () => {
        <Link className="btn btn-primary btn-block text-uppercase mb-3" to={"/Admin/ManageProduct/AddProduct"}>
            Add new product
        </Link>
    }

    return (
        <div className='container'>
            <div>
                <div>
                    <div className="container tm-mt-big tm-mb-big">
                        <div className="row">
                            <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
                                <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
                                    <div className="row">
                                        <div className="col-12">
                                            <h2 className="tm-block-title d-inline-block">Add Product</h2>
                                        </div>
                                    </div>

                                    <div className="row tm-edit-product-row">
                                        <div className="col-xl-6 col-lg-6 col-md-12">
                                            <form action="" className="tm-edit-product-form">
                                                <div className="form-group mb-3">
                                                    <label htmlFor="name">Product Name</label>
                                                    <input
                                                        ref={inputname}
                                                        id="name"
                                                        type="text"
                                                        className="form-control validate"
                                                        required="Tên sản phẩm là bắt buộc"
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="description">Description</label>
                                                    <textarea
                                                        ref={inputdescription}
                                                        id='description'
                                                        className="form-control validate"
                                                        rows={2}
                                                        required="Mô tả sản phẩm là bắt buộc"
                                                        defaultValue={""}
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="description">Type</label>
                                                    <textarea
                                                        ref={inputtype}
                                                        id="type"
                                                        className="form-control validate"
                                                        rows={1}
                                                        required="Chọn loại sản phẩm"
                                                        defaultValue={""}
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="description">Price (số)</label>
                                                    <input
                                                        ref={inputprice}
                                                        id="price"
                                                        className="form-control validate"
                                                        rows={1}
                                                        required="Chọn giá sản phẩm"
                                                        defaultValue={0}
                                                        type="number"
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="description">Đường dẫn hình ảnh</label>
                                                    <textarea
                                                        ref={inputimage}
                                                        id="image"
                                                        className="form-control validate"
                                                        rows={1}
                                                        required="Chọn đường dẫn hình ảnh"
                                                        defaultValue={""}
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="category">Category</label>
                                                    <select
                                                        className="custom-select tm-select-accounts"
                                                        id="category" 
                                                        onChange={handleCategoryChange}>
                                                        <option value={'createnewproduct'}>Sản phẩm mới</option>
                                                        <option value={'createrunproduct'}>Sản phẩm chạy bộ</option>
                                                        <option value={'createseasonalproduct'}>Sản phẩm theo mùa</option>
                                                        <option value={'createthunproduct'}>Sản phẩm đồ thun</option>
                                                    </select>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                        <label htmlFor="expire_date">Review (số)</label>
                                                        <input
                                                            ref={inputreview}
                                                            id="review"
                                                            type="number"
                                                            className="form-control validate"
                                                            data-large-mode="true"
                                                        />
                                                    </div>
                                                    <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                        <label htmlFor="stock">Đường dẫn màu sắc</label>
                                                        <input
                                                            ref={inputcolorurl}
                                                            id="colorurl"
                                                            type="text"
                                                            className="form-control validate"
                                                            required="Chọn đường dẫn màu sắc"
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
                                            <div className="tm-product-img-dummy mx-auto">
                                                <i className="fas fa-cloud-upload-alt tm-upload-icon" />
                                                <span>Chi tiết hình ảnh</span>
                                            </div>

                                            <form action="" className="tm-edit-product-form">
                                                <div className="form-group mb-3">
                                                    <label htmlFor="name">Đường dẫn ảnh chi tiết 1</label>
                                                    <input
                                                        ref={inputdetailimage1}
                                                        id="detailimage1"
                                                        type="text"
                                                        className="form-control validate"
                                                        required="Chọn đường dẫn hình ảnh"
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="name">Đường dẫn ảnh chi tiết 2</label>
                                                    <input
                                                        ref={inputdetailimage2}
                                                        id="detailimage2"
                                                        type="text"
                                                        className="form-control validate"
                                                        required="Chọn đường dẫn hình ảnh"
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="name">Đường dẫn ảnh chi tiết 3</label>
                                                    <input
                                                        ref={inputdetailimage3}
                                                        id="detailimage3"
                                                        type="text"
                                                        className="form-control validate"
                                                        required="Chọn đường dẫn hình ảnh"
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="name">Đường dẫn ảnh chi tiết 4</label>
                                                    <input
                                                        ref={inputdetailimage4}
                                                        id="detailimage4"
                                                        type="text"
                                                        className="form-control validate"
                                                        required="Chọn đường dẫn hình ảnh"
                                                    />
                                                </div>

                                                <div className="form-group mb-3">
                                                    <label htmlFor="name">Đường dẫn ảnh giới thiệu 1</label>
                                                    <input
                                                        ref={inputdetailimageBig1}
                                                        id="detailimageBig1"
                                                        type="text"
                                                        className="form-control validate"
                                                        required="Chọn đường dẫn hình ảnh"
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="name">Đường dẫn ảnh giới thiệu 2</label>
                                                    <input
                                                        ref={inputdetailimageBig2}
                                                        id="detailimageBig2"
                                                        type="text"
                                                        className="form-control validate"
                                                        required="Chọn đường dẫn hình ảnh"
                                                    />
                                                </div>
                                            </form>
                                        </div>

                                        <div className="d-flex justify-content-around">
                                            <div className="col-12">
                                                <button
                                                    onClick={PushProduct}
                                                    type="button"
                                                    className="btn btn-primary btn-block text-uppercase"
                                                >
                                                    Xác nhận thêm sản phẩm
                                                </button>

                                                <h4 style={{marginTop: "10px", marginBottom:"20px"}}>{UpdateProduct}</h4>
                                            </div>
                                            <div>


                                                <button
                                                    onClick={BacktoManageProduct}
                                                    type="button"
                                                    className="btn btn-success"
                                                >
                                                    
                                                    <Link to={"/Admin/ManageProduct"} style={{color: "white"}}>
                                                    Xong
                                                    </Link>
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default AddProduct