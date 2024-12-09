$(document).ready(function () {
    let dataJson;
    let NewProductHtml = document.getElementById('list-new-product');
    let SeasonalProductHtml = document.getElementById('list-seasonal-product');
    let RunProductHtml = document.getElementById('list-run-product');
    let ThunProductHtml = document.getElementById('list-thun-product');
    // gọi data bằng phương pháp fetch data từ file json
    async function fetchData(file) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error('Không thể kết nói tới dữ liêuh');
            }
            const data = await response.json();
            dataJson = data;
        } catch (error) {
            console.error('Lấy dữ liệu không thành công:', error);
        }
    }


    fetchData('data.json').then(() => {
        // render list new product
        dataJson.productNew.map((item) => { //sửa
            let blockProductNew = `<div class="col product-item mx-auto">
            <div class="product-img">
                <img src="${item.image}" alt="" class="img-fluid d-block mx-auto">
                <span class="heart-icon">
                    <img src="./assets/Resource/NewTag.png" height="20px">
                </span>
                <div class="row btns w-100 mx-auto text-center">
                    <button type="button" class="col-6 py-2">
                        <i class="fa fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                    <button type="button" class="col-6 py-2">
                        <i class="fa fa-binoculars"></i> Xem chi tiết
                    </button>
                </div>
            </div>

            <div class="product-info p-3">
                <span class="product-type">${item.type}</span>
                <a href="#" class="d-block text-dark text-decoration-none py-2 product-name">${item.name}</a>
                <p class="prodescript">${item.description}</p>
                <span class="product-price">VND ${item.price}</span>
                <div class="rating d-flex mt-1">
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>(${item.review} đánh giá)</span>
                </div>
            </div>
            </div>`
            NewProductHtml.innerHTML += blockProductNew; //sửa
        })

        dataJson.productSeasonal.map((item) => { //sửa
            //render list seasonal product
            let blockProductSeasonal = `<div class="col product-item mx-auto">
            <div class="product-img">
                <img src="${item.image}" alt="" class="img-fluid d-block mx-auto">
                <span class="heart-icon">
                    <img src="./assets/Resource/SeasonalTag.png" height="20px">
                </span>
                <div class="row btns w-100 mx-auto text-center">
                    <button type="button" class="col-6 py-2">
                        <i class="fa fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                    <button type="button" class="col-6 py-2">
                        <i class="fa fa-binoculars"></i> Xem chi tiết
                    </button>
                </div>
            </div>

            <div class="product-info p-3">
                <span class="product-type">${item.type}</span>
                <a href="#" class="d-block text-dark text-decoration-none py-2 product-name">${item.name}</a>
                <p class="prodescript">${item.description}</p>
                <span class="product-price">VND ${item.price}</span>
                <div class="rating d-flex mt-1">
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>(${item.review} đánh giá)</span>
                </div>
            </div>
            </div>`
            SeasonalProductHtml.innerHTML += blockProductSeasonal; //sửa
        })
        
        dataJson.productRun.map((item) => { //sửa
            //render list running product
            let blockProductRun = `<div class="col product-item mx-auto">
            <div class="product-img">
                <img src="${item.image}" alt="" class="img-fluid d-block mx-auto">
                <span class="heart-icon">
                    <img src="./assets/Resource/RunTag.png" height="20px">
                </span>
                <div class="row btns w-100 mx-auto text-center">
                    <button type="button" class="col-6 py-2">
                        <i class="fa fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                    <button type="button" class="col-6 py-2">
                        <i class="fa fa-binoculars"></i> Xem chi tiết
                    </button>
                </div>
            </div>

            <div class="product-info p-3">
                <span class="product-type">${item.type}</span>
                <a href="#" class="d-block text-dark text-decoration-none py-2 product-name">${item.name}</a>
                <p class="prodescript">${item.description}</p>
                <span class="product-price">VND ${item.price}</span>
                <div class="rating d-flex mt-1">
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>(${item.review} đánh giá)</span>
                </div>
            </div>
            </div>`
            RunProductHtml.innerHTML += blockProductRun; //sửa
        })

        dataJson.productThun.map((item) => { //sửa
            //render list seasonal product
            let blockProductThun = `<div class="col product-item mx-auto">
            <div class="product-img">
                <img src="${item.image}" alt="" class="img-fluid d-block mx-auto">
                <span class="heart-icon">
                    <img src="./assets/Resource/ThunTag.png" height="20px">
                </span>
                <div class="row btns w-100 mx-auto text-center">
                    <button type="button" class="col-6 py-2">
                        <i class="fa fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                    <button type="button" class="col-6 py-2">
                        <i class="fa fa-binoculars"></i> Xem chi tiết
                    </button>
                </div>
            </div>

            <div class="product-info p-3">
                <span class="product-type">${item.type}</span>
                <a href="#" class="d-block text-dark text-decoration-none py-2 product-name">${item.name}</a>
                <p class="prodescript">${item.description}</p>
                <span class="product-price">VND ${item.price}</span>
                <div class="rating d-flex mt-1">
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>
                        <i class="fa fa-star"></i>
                    </span>
                    <span>(${item.review} đánh giá)</span>
                </div>
            </div>
            </div>`
            ThunProductHtml.innerHTML += blockProductThun; //sửa
        })

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
    });
})