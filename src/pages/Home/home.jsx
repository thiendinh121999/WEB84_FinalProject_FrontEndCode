import React from "react";
import MainMenu from "./mainmenu";
import HomeBanner from "./home-banner";
import SaleBanner from "./salesbanner";
// import NewProductList from "./newproductlist";
import ProductRequest from "./productrequest";
import './home.css'
import ListSPChayBo from "../../components/ListSPChayBo";
import ListSPMoi from '../../components/ListSPMoi'
import ListSPTheoMua from '../../components/ListSPTheoMua'
import ListSPThun from "../../components/ListSPThun";
import Footer from "../../components/footer";
import Header from "../../components/header";

const HomePage = () => {


    return (
        <div className="homepage">
            <Header/>
            <MainMenu/>
            <HomeBanner/>
            <SaleBanner/>
            {/*KHU VỰC SẢN PHẨM MỚI*/}
            <ListSPMoi />
           
            {/*KHU VỰC SẢN PHẨN THEO MÙA*/}
            <div class="category-banner">
                 <img id="seasonal" src={require('../../img/Carousel03.jpg')} width="100%"/>
            </div>
            <ListSPTheoMua />

            {/*KHU VỰC SẢN PHẨM ĐỒ CHẠY BỘ*/}
            <div id="category-banner">
                <img id="running" src={require('../../img/Carousel02.jpg')} width="100%"/>
            </div>
            <ListSPChayBo />

            {/*KHU VỰC SẢN PHẨM ĐỒ THUN*/}
            <div id="category-banner">
                <img id="thun" src={require('../../img/Carousel01.jpg')} width="100%"/>
            </div>
            <ListSPThun />

            {/*KHU VỰC REQUEST RIÊNG*/}
            <ProductRequest/>
            <Footer/>
        </div>
    )
}
export default HomePage