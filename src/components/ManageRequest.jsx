import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Pagination} from 'antd';

function ManageRequest() {

    //const BASE_URL_REQUEST = 'https://66c6baee8b2c10445bc77fa9.mockapi.io/productrequest'


    const [dataAPI, setDataAPI] = useState([]);
    const [CheckAPI, setCheckAPI] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                /*const res = await fetch(`${BASE_URL_REQUEST}`);
                const data = await res.json();*/
                const responseRequestList = await axios.get('https://web84-finalproject-backendcode.onrender.com/api/request/getrequest',
                    {params: {
                        page: currentPage,
                        pageSize: pageSize
                    }}
                )
                setDataAPI(responseRequestList.data.data);
                setTotalPages(responseRequestList.data.total);
                setCheckAPI(true)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [CheckAPI,currentPage, pageSize]);

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

    //Delete request
    const DeleteOne = async (requestId) => {
        axios.delete(`https://web84-finalproject-backendcode.onrender.com/api/request/deleterequest/${requestId}`)
      .then(response => {
        console.log('Request deleted successfully');
        // Remove the deleted request from the state
        setDataAPI(dataAPI.filter(item => item._id !== requestId));
      })
      .catch(error => {
        console.error(error);
      });
    };
    console.log("list request",dataAPI)
    return (
        <div className='container-manage-product'>
            <div className="d-flex justify-content-center"><h4>YÊU CẦU CỦA KHÁCH HÀNG</h4></div>
            <div className="container1 mt-5">
                <div className="row tm-content-row">
                    <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col" style={{ width: "100%" }}>
                        <div className="tm-bg-primary-dark tm-block tm-block-products">
                            <div className="tm-product-table-container">
                                <table className="table table-hover tm-table-small tm-product-table">
                                    <thead>
                                            <tr>
                                                <th scope="col" style={{ width: '27px' }}>&nbsp;</th>
                                                <th scope="col" style={{ width: '52px' }}>STT</th>
                                                
                                                <th scope="col" style={{ width: '225px' }}>TÊN KHÁCH HÀNG</th>
                                                <th scope="col" style={{ width: '200px' }}>SỐ ĐIỆN THOẠI</th>
                                                <th scope="col" style={{ width: '210px' }}>EMAIL</th>
                                                <th scope="col" style={{ width: '300px' }}>YÊU CẦU</th>
                                                
                                                <th scope="col">&nbsp;</th>
                                            </tr>
                                    </thead>
                                    {currentItems.map((item, idx) => {    
                                     return <tbody key={item._id}>
                                        <tr>
                                            <th scope="row" style={{ width: '27px' }}>
                                            </th>
                                            <td style={{ width: '52px', paddingLeft:'15px' }}>{(idx+1)+ pageSize*(currentPage-1)}</td>
                                        
                                            <td className="tm-product-name" style={{ width: '225px' }}>{item.customerName}</td>
                                            <td style={{ width: '200px' }}>{item.customerPhone}</td>
                                            <td style={{ width: '210px' }}>{item.customerEmail}</td>
                                            <td style={{ width: '300px' }}>{item.request}</td>
                                        
                                            <td>
                                                <a onClick={() => DeleteOne(item._id)} className="tm-product-delete-link">
                                                    <i className="far fa-trash-alt tm-product-delete-icon" />
                                                </a>
                                            </td>
                                    </tr>
                                </tbody>
                                    })}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Pagination
                    current={currentPage}
                    total= {totalPages}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger
            />
        </div>
    )
}

export default ManageRequest