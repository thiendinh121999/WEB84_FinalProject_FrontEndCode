
import React from 'react'
// import data from '../../data/data.json';
import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './ManageProduct.css'
import axios from 'axios';
import {Pagination} from 'antd';


function ManageProduct() {


    const [dataAPI, setDataAPI] = useState(null);
    const [CheckAPI, setCheckAPI] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseProductList = await axios.get('https://web84-finalproject-backendcode.onrender.com/api/product/getallproduct',
                    {params: {
                        page: currentPage,
                        pageSize: pageSize
                    }}
                )
                setDataAPI(responseProductList.data.data);
                setTotalPages(responseProductList.data.total);
                setCheckAPI(true)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [CheckAPI, currentPage, pageSize]);

    if (!dataAPI) {
        return <p>Loading...</p>;
    }

    //Pagination

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
      };
  
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, dataAPI.length);

    const currentItems = dataAPI.slice(startIndex, endIndex);



    const DeleteOne = async (requestId) => {
        axios.delete(`https://web84-finalproject-backendcode.onrender.com/api/product/deleteoneproduct/${requestId}`)
      .then(response => {
        console.log('Request deleted successfully');
        // Remove the deleted request from the state
        setDataAPI(dataAPI.filter(item => item._id !== requestId));
      })
      .catch(error => {
        console.error(error);
      });
    };

    return (
        <div className="backgroundCRUDD">
            <div className='container-manage-product'>
            <div className="d-flex justify-content-center"><h4>DANH SÁCH SẢN PHẨM</h4></div>
                {/* <button onClick={GetData}>FetchData</button> */}
                {/* <button onClick={CreateData}>Post data mới </button> */}
                {/* <button onClick={UpdateOne}>Patch cập nhật</button> */}
                {/* <button onClick={DeleteOne}>Delete xoá</button> */}
                <div className="container1 mt-5">
                    {currentItems.map((item, idx) => {
                        return <div className="row tm-content-row" key={item._id}>
                            <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col" style={{ width: "100%" }}>
                                <div className="tm-bg-primary-dark tm-block tm-block-products">
                                    <div className="tm-product-table-container">
                                        <table className="table table-hover tm-table-small tm-product-table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" style={{ width: '27px' }}>&nbsp;</th>
                                                    <th scope="col" style={{ width: '52px' }}>STT</th>
                                                    <th scope="col" style={{ width: '33px' }}>MÃ ID</th>
                                                    <th scope="col" style={{ width: '418px' }}>TÊN SẢN PHẨM</th>
                                                    <th scope="col" style={{ width: '123px' }}>LOẠI</th>
                                                    <th scope="col" style={{ width: '210px' }}>MÔ TẢ</th>
                                                    <th scope="col" style={{ width: '82px' }}>GIÁ</th>
                                                    <th scope="col" style={{ width: '82px' }}>HÌNH</th>
                                                    <th scope="col">&nbsp;</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row" style={{ width: '27px' }}>
                                                        
                                                    </th>
                                                    <td style={{ width: '52px' }}>{(idx+1)+ pageSize*(currentPage-1)}</td>
                                                    <td style={{ width: '33px' }}>{item._id}</td>
                                                    <td className="tm-product-name" style={{ width: '418px' }}>{item.name}</td>
                                                    <td style={{ width: '123px' }}>{item.type}</td>
                                                    <td style={{ width: '210px' }}>{item.description}</td>
                                                    <td style={{ width: '82px' }}>{item.price}</td>
                                                    <td><img src={item.image} alt="" style={{ width: "82px" }} /></td>
                                                    <td>
                                                        <a onClick={() => DeleteOne(item._id)} className="tm-product-delete-link">
                                                            <i className="far fa-trash-alt tm-product-delete-icon" />
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>


                                </div>
                            </div>
                        </div>
                    })}
                    
                </div>
                {/* table container */}
                <Pagination 
                    current={currentPage}
                    total= {totalPages}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger
                    />
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Link className="btn btn-primary btn-block text-uppercase mb-3" to={"/Admin/ManageProduct/AddProduct"}>
                            THÊM SẢN PHẨM
                        </Link>
                    </div>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default ManageProduct