import { callAPIFunction } from "../utils/callApi.js";
document.addEventListener("DOMContentLoaded", async () => {
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

  const addProduct = document.querySelector(".add-new-product-laptop");

  const product = await callAPIFunction("http://localhost:3000/product/");
  console.log("product:  ", product.data);

  const ArrProduct = product.data;

  ArrProduct.map((item) => {
    console.log(item.nameLaptop);
    const { image, slug } = item;
    console.log("slug:   ", slug);
    // console.log(img[0]);
    const template = `
                                    <div class="col-6 col-md-4 col-lg-4">
                                        <div class="product product-7 text-center">
                                            <figure class="product-media">
                                                <span class="product-label label-new">New</span>
                                                <a href="product.html?product=${slug}">
                                                    <img src="http://localhost:3000/${image[0]}" alt="Product image"
                                                        class="product-image">
                                                </a>

                                                <div class="product-action">
                                                    <a href="#" class="btn-product btn-cart"><span>add to
                                                            cart</span></a>
                                                </div><!-- End .product-action -->
                                            </figure><!-- End .product-media -->

                                            <div class="product-body text-left">

                                                <h3 class="product-title"><a href="product.html?product=${slug}"
                                                        class="text-left">${item.nameLaptop}</a></h3><!-- End .product-title -->
                                                <div class="product-price justify-content-left ">
                                                    ${item.price}₫
                                                </div><!-- End .product-price -->
                                                <div class="ratings-container">
                                                    <div class="ratings">
                                                        <div class="ratings-val" style="width: 90%;"></div>

                                                    </div>
                                                    <span class="ratings-text">( 5 Reviews )</span>
                                                </div>
                                                <div class="text-left">
                                                    <p>Màn hình: 13.3", Retina</p>
                                                    <p>CPU: Apple M1</p>
                                                    <p>Card: 7 nhân GPU</p>
                                                    <p>Pin: Lên đến 18 giờ</p>
                                                    <p>Khối lượng: 1.29 kg</p>
                                                </div>

                                            </div><!-- End .product-body -->
                                        </div><!-- End .product -->
                                    </div><!-- End .col-sm-6 col-lg-4 -->
`;

    // const div = document.createElement("div");
    // div.setAttribute("class", "row");
    addProduct.insertAdjacentHTML("beforeend", template);
    // console.log(div);
    // addProduct.innerHTML = div;
  });
});
