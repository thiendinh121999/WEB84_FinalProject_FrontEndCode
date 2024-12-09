import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './ManageProduct.css'
import axios from 'axios';
import {Pagination} from 'antd';

function ManageOrder() {
    const BASE_URL_ORDER = 'https://66c6baee8b2c10445bc77fa9.mockapi.io/productorder';

    const [dataAPI, setDataAPI] = useState(null);
    const [CheckAPI, setCheckAPI] = useState(false);
    const [showOrderList, setShowOrderList] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseOrderList = await axios.get('http://localhost:8080/api/order/getlistorder',
                    {params: {
                        page: currentPage,
                        pageSize: pageSize
                    }}
                )
                setDataAPI(responseOrderList.data.data);
                setTotalPages(responseOrderList.data.total);
                setShowOrderList(responseOrderList.data.data.orderList)
                setCheckAPI(true)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [CheckAPI]);
    console.log('list order',dataAPI)
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

    //Delete one order
    const DeleteOne = async (requestId) => {
        axios.delete(`http://localhost:8080/api/order/deleteorder/${requestId}`)
      .then(response => {
        console.log('Order deleted successfully');
        // Remove the deleted request from the state
        setDataAPI(dataAPI.filter(item => item._id !== requestId));
      })
      .catch(error => {
        console.error(error);
      });
    };
    console.log("list request",dataAPI)

    const handleButtonClick = (_id) => {
        setShowOrderList(showOrderList === _id ? null : _id);
    };
 

    return (
        <div className="backgroundorder">
            <div className="col-12 tm-block-col">
                <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                    <div className="ordertile-pagination-wrap">
                        <h2 className="tm-block-title">Orders List</h2>
                        <Pagination
                            current={currentPage}
                            total= {totalPages}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                            showSizeChanger
                        />
                    </div>
                    <table className="table" style={{fontSize:"13px"}}>
                        <thead>
                            <tr>
                                <th scope="col">ORDER NO.</th>
                                <th scope="col">KHÁCH HÀNG</th>
                                <th scope="col">SỐ ĐIỆN THOẠI</th>
                                <th scope="col">ĐỊA CHỈ GIAO HÀNG</th>
                                <th scope="col">ÁP KHUYẾN MÃI</th>
                                <th scope="col">TỔNG BILL</th>
                                <th scope="col">THANH TOÁN</th>
                                <th scope="col">DANH SÁCH SẢN PHẨM</th>
                                <th scope="col">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item) => (
                                <React.Fragment key={item._id}>
                                    <tr>
                                        <th scope="row"><b>#{item._id}</b></th>
                                        <td>
                                            <div className="tm-status-circle moving"></div>{item.customerName}
                                        </td>
                                        <td><b>{item.customerPhoneNumber}</b></td>
                                        <td><b>{item.customerAdress}</b></td>
                                        <td><b>{item.saleOff}</b></td>
                                        <td>{item.totalBill} VNĐ</td>
                                        <td><b>{item.payMethod}</b></td>
                                        <td>
                                            <button type="button" className="btn btn-link" onClick={() => handleButtonClick(item._id)}>
                                                {showOrderList === item._id ? 'Ẩn danh sách' : 'Xem chi tiết'}
                                            </button>
                                        </td>
                                        <td>
                                            <a onClick={() => DeleteOne(item._id)} className="tm-product-delete-link">
                                                <i className="far fa-trash-alt tm-product-delete-icon" />
                                            </a>
                                        </td>
                                    </tr>
                                    {showOrderList === item._id && (
                                        <tr>
                                            <td colSpan="7">
                                                <ul>
                                                    {item.orderList.map((orderItem, index) => (
                                                        <li style={{marginBottom:"10px"}} key={index}>
                                                            <img style={{width: "30px"}} src={orderItem.itemImage}/> - {orderItem.itemName} - {orderItem.itemPrice} VNĐ
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageOrder;
