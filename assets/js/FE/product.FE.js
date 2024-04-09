import { callAPIFunction } from "../utils/callApi.js";
document.addEventListener("DOMContentLoaded", async () => {
  // ====================== Check Authen =========================
  const insertInfo = document.querySelector("#insert-info");
  if (localStorage.getItem("accessToken")) {
    insertInfo.innerHTML = "";
    console.log("ok");
    const userName = localStorage.getItem("userName");
    const templateUser = `                <div class="dropdown compare-dropdown">
                                    <a href="./dashboard.html" class="dropdown-toggle" role="button">
                                        <div class="icon">

                                            <i class="fa-regular fa-user"></i>
                                        </div>
                                        <p style="color: #ffffff;">${userName}</p>
                                    </a>
                                </div>`;

    insertInfo.insertAdjacentHTML("beforeend", templateUser);
  }
  // ====================== End Check Authen =========================

  //========================   Insert Data  =======================

  const title = document.querySelector("#title");

  const addNewDetail = document.querySelector(".add-new-Detail");

  const addNewImg = document.querySelector(".add-new-img");

  const search = window.location.search;
  const slug = search.substring(search.indexOf("=") + 1);

  const data = await callAPIFunction(`http://localhost:3000/product/${slug}`);

  const product = await data.data;
  const {
    Specifications,
    image,
    optionColorPrice,
    optionMemoryPrice,
    optionRamPrice,
    nameLaptop,
    price,
    productInformation,
  } = product;

  console.log(product);

  const imgItem = document.querySelectorAll(".img-item");

  title.innerText = nameLaptop;

  const template = `       <div class="">
                                        <div class="product-gallery product-gallery-vertical">
                                            <div class="row">
                                                <figure class="product-main-image " style="height: 50%;">
                                                    <img id="product-zoom" class="img-center"
                                                        src="https://cdn.tgdd.vn/Products/Images/44/287769/Slider/vi-vn-lenovo-ideapad-3-15iau7-i3-82rk005lvn-2.jpg"
                                                        data-zoom-image="https://cdn.tgdd.vn/Products/Images/44/287769/Slider/vi-vn-lenovo-ideapad-3-15iau7-i3-82rk005lvn-2.jpg"
                                                        alt="product image">

                                                    <a href="#" id="btn-product-gallery" class="btn-product-gallery">
                                                        <i class="icon-arrows"></i>
                                                    </a>
                                                </figure>

                                                <div id="product-zoom-gallery" class="product-image-gallery">
                                                    <a class="product-gallery-item active img-item" href="#"
                                                        data-image="https://cdn.tgdd.vn/Products/Images/44/287769/Slider/vi-vn-lenovo-ideapad-3-15iau7-i3-82rk005lvn-2.jpg"
                                                        data-zoom-image="https://cdn.tgdd.vn/Products/Images/44/287769/Slider/vi-vn-lenovo-ideapad-3-15iau7-i3-82rk005lvn-2.jpg">
                                                        <img src="https://cdn.tgdd.vn/Products/Images/44/287769/Slider/vi-vn-lenovo-ideapad-3-15iau7-i3-82rk005lvn-2.jpg"
                                                            alt="product side">
                                                    </a>

                                                    <a class="product-gallery-item img-item" href="#"
                                                        data-image="https://cdn.tgdd.vn/Products/Images/44/287769/Slider/vi-vn-lenovo-ideapad-3-15iau7-i3-82rk005lvn-3.jpg"
                                                        data-zoom-image="https://cdn.tgdd.vn/Products/Images/44/287769/Slider/vi-vn-lenovo-ideapad-3-15iau7-i3-82rk005lvn-3.jpg">
                                                        <img src="https://cdn.tgdd.vn/Products/Images/44/287769/Slider/vi-vn-lenovo-ideapad-3-15iau7-i3-82rk005lvn-3.jpg"
                                                            alt="product cross">
                                                    </a>

                                                    <a class="product-gallery-item img-item" href="#"
                                                        data-image="https://cdn.tgdd.vn/Products/Images/44/287769/Slider/vi-vn-lenovo-ideapad-3-15iau7-i3-82rk005lvn-4.jpg"
                                                        data-zoom-image="https://cdn.tgdd.vn/Products/Images/44/287769/Slider/vi-vn-lenovo-ideapad-3-15iau7-i3-82rk005lvn-4.jpg">
                                                        <img src="https://cdn.tgdd.vn/Products/Images/44/287769/Slider/vi-vn-lenovo-ideapad-3-15iau7-i3-82rk005lvn-4.jpg"
                                                            alt="product cross">
                                                    </a>
                                                    <a class="product-gallery-item img-item" href="#"
                                                        data-image="https://cdn.tgdd.vn/Products/Images/44/287769/Slider/vi-vn-lenovo-ideapad-3-15iau7-i3-82rk005lvn-5.jpg"
                                                        data-zoom-image="https://cdn.tgdd.vn/Products/Images/44/287769/Slider/vi-vn-lenovo-ideapad-3-15iau7-i3-82rk005lvn-5.jpg">
                                                        <img src="https://cdn.tgdd.vn/Products/Images/44/287769/Slider/vi-vn-lenovo-ideapad-3-15iau7-i3-82rk005lvn-5.jpg"
                                                            alt="product cross">
                                                    </a>

                                                </div>
                                            </div>
                                        </div>

                                    </div>`;

  const templateDetail = `                                    <div class="">
                                        <div class="product-details">
                                            <div class="ratings-container">
                                                <div class="ratings">
                                                    <div class="ratings-val" style="width: 80%;"></div>

                                                </div>
                                                <a class="ratings-text" href="#product-review-link" id="review-link">( 2
                                                    Reviews
                                                    )</a>
                                            </div>

                                            <div class="product-price">
                                                ${price} 
                                            </div>



                                            <div class="details-filter-row details-row-size">
                                                <label>Màu:</label>

                                                <div class="product-nav product-nav-thumbs">
                                                    <a href="#" >
                                                        <img src="assets/images/products/single/1-thumb.jpg"
                                                            alt="product desc">
                                                    </a>
                                                    <a href="#" class="active">
                                                        <img src="assets/images/products/single/2-thumb.jpg"
                                                            alt="product desc">
                                                    </a>
                                                </div>
                                            </div>


                                            <div class="row">
                                                <div class="col-12 col-sm-12 col-md-6   product-details-action">
                                                    <a href="#" class="btn-product btn-cart text-center"
                                                        style="height: 60px;"><span>Thêm Sản
                                                            Phẩm</span></a>

                                                </div>

                                                <div class=" col-12 col-sm-12 col-md-6 product-details-action">
                                                    <a href="./checkout.html" class="btn-product btn-cart"
                                                        style="height: 60px;"><span>Mua
                                                            Ngay</span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;

  //  addNewDetail.insertAdjacentHTML("beforeend", templateDetail);

  addNewImg.insertAdjacentHTML("beforeend", template);
});
