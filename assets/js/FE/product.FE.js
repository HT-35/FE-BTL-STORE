import { callAPIFunction } from "../utils/callApi.js";
document.addEventListener("DOMContentLoaded", async () => {
  const addNewItem = document.querySelector(".add-new-item");

  const imgCenter = document.querySelector(".img-center");
  // console.log(imgCenter);
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

  imgCenter.src =
    "https://cdn.tgdd.vn/Products/Images/44/309016/Slider/vi-vn-apple-macbook-air-m2-2023-slider-1.jpg";

  imgCenter.dataset.zoomImage =
    "https://cdn.tgdd.vn/Products/Images/44/309016/Slider/vi-vn-apple-macbook-air-m2-2023-slider-1.jpg";

  const imgItem = document.querySelectorAll(".img-item");
  // console.log(imgItem);

  imgItem.forEach((item, index) => {
    console.log(item);
    const imgElement = item.querySelector("img");
    // console.log(imgElement);
    if (index < image.length) {
      item.dataset.image = `http://localhost:3000/${image[index]}`;
      item.dataset.zoomImage = `http://localhost:3000/${image[index]}`;

      imgElement.src = `http://localhost:3000/${image[index]}`;
    } else {
      console.log("Không đủ link ảnh trong mảng imgLinks.");
    }
  });

  const template = ` <img id="product-zoom" class="img-center"
                                                src="assets/images/products/single/1.jpg"
                                                data-zoom-image="assets/images/products/single/1-big.jpg"
                                                alt="product image">`;

  const templateContent = `                            <div class="col-md-6 add-new-text">
                                <div class="product-details">
                                    <h1 class="product-title">Dark yellow lace cut out swing dress</h1>
                                    <!-- End .product-title -->

                                    <div class="ratings-container">
                                        <div class="ratings">
                                            <div class="ratings-val" style="width: 80%;"></div><!-- End .ratings-val -->
                                        </div><!-- End .ratings -->
                                        <a class="ratings-text" href="#product-review-link" id="review-link">( 2 Reviews
                                            )</a>
                                    </div><!-- End .rating-container -->

                                    <div class="product-price">
                                        $84.00
                                    </div><!-- End .product-price -->

                                    <div class="product-content">
                                        <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus
                                            metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus.
                                        </p>
                                    </div><!-- End .product-content -->

                                    <div class="details-filter-row details-row-size">
                                        <label>Color:</label>

                                        <div class="product-nav product-nav-thumbs">
                                            <a href="#" class="active">
                                                <img src="http://localhost:3000/" alt="product desc">
                                            </a>
                                            <a href="#">
                                                <img src="assets/images/products/single/2-thumb.jpg" alt="product desc">
                                            </a>
                                        </div><!-- End .product-nav -->
                                    </div><!-- End .details-filter-row -->

                                    <div class="details-filter-row details-row-size">
                                        <label for="size">Size:</label>
                                        <div class="select-custom">
                                            <select name="size" id="size" class="form-control">
                                                <option value="#" selected="selected">Select a size</option>
                                                <option value="s">Small</option>
                                                <option value="m">Medium</option>
                                                <option value="l">Large</option>
                                                <option value="xl">Extra Large</option>
                                            </select>
                                        </div><!-- End .select-custom -->

                                        <a href="#" class="size-guide"><i class="icon-th-list"></i>size guide</a>
                                    </div><!-- End .details-filter-row -->

                                    <div class="details-filter-row details-row-size">
                                        <label for="qty">Qty:</label>
                                        <div class="product-details-quantity">
                                            <input type="number" id="qty" class="form-control" value="1" min="1"
                                                max="10" step="1" data-decimals="0" required>
                                        </div><!-- End .product-details-quantity -->
                                    </div><!-- End .details-filter-row -->

                                    <div class="product-details-action">
                                        <a href="#" class="btn-product btn-cart"><span>add to cart</span></a>

                                        <div class="details-action-wrapper">
                                            <a href="#" class="btn-product btn-wishlist" title="Wishlist"><span>Add to
                                                    Wishlist</span></a>
                                            <a href="#" class="btn-product btn-compare" title="Compare"><span>Add to
                                                    Compare</span></a>
                                        </div><!-- End .details-action-wrapper -->
                                    </div><!-- End .product-details-action -->

                                </div><!-- End .product-details -->
                            </div><!-- End .col-md-6 -->`;
});
