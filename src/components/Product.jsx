import {React} from 'react'
import { Routes, Route, Outlet } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import MainMenu from '../pages/Home/mainmenu';
import SaleBanner from '../pages/Home/salesbanner';
import ProductRequest from '../pages/Home/productrequest';
import Header from '../components/header';
import Footer from '../components/footer';

function Product() {

    return (
        <div className="homepage">
            <Header/>
            <MainMenu/>
            <Outlet></Outlet>
            <SaleBanner/>
            {/*KHU VỰC REQUEST RIÊNG*/}
            <ProductRequest/>
            <Footer/>
        </div>
    )
}

export default Product