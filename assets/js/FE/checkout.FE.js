import { callAPIFunction, callApiMethodGet } from "../utils/callApi.js";

const token = localStorage.getItem("accessToken");
const apiGetListAddress = "http://localhost:3000/delivery-address";

document.addEventListener("DOMContentLoaded", async () => {
  const insertInfo = document.querySelector("#insert-info");
  if (localStorage.getItem("accessToken")) {
    insertInfo.innerHTML = "";

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

  // === === === === === === === === ===   Get Product    === === === === === === === === ===

  const url = new URL(window.location.href);
  const slugProduct = url.searchParams.get("product");
  const color = url.searchParams.get("color");
  //console.log("slugProduct:", slugProduct);
  //console.log("color:", color);

  const res = await callAPIFunction(
    `http://localhost:3000/product/${slugProduct}`
  );
  //console.log(res);

  const detailProduct = await res.data;

  const { _id, nameLaptop, img, ram, storage, colors } = detailProduct;

  //  const price = product.colors[0].price;

  //=== === === === === === Filter Product

  const insertData = document.querySelector("#insert-data");
  const totalCheckout = document.querySelector("#total-checkout");

  const price = colors.filter((item) => item.color == color);
  const newPrice = price.length > 0 ? price[0].price : colors[0].price;
  const imgfilter = img.filter((item) => item.color === color);
  const pathImg = imgfilter[0].path[0];
  // === === === === === === Query Cart Get Quantity
  const getProductDetailInCard = await callApiMethodGet(
    `http://localhost:3000/cart/detail?id_product=${_id}&color=${color}`,
    localStorage.getItem("accessToken")
  );

  const quantity = getProductDetailInCard.data[0].quantity;

  const totalPrice = quantity * newPrice;
  console.log(totalPrice);

  totalCheckout.innerText = `${convertNumber(totalPrice)}đ`;

  const templateProductBilling = `
          <div class="">
                    <tr>
                        <td class="product-col">
                          <div class="product">
                              <figure class="product-media">
                  
                                      <img src="http://localhost:3000/${pathImg}"
                                          alt="Product image">
                      
                              </figure>

                              <h3 class="product-title">
                               ${nameLaptop}
                              </h3>
                          </div>
                        </td>
                        <td class="price-col" >${color}</td>
                        <td class="price-col text-center">${convertNumber(
                          newPrice
                        )}đ</td>
                        <td class="quantity-col">
                            <p class="price-col text-center">${quantity}</p>
                        </td>
                        <td class="total-col text-center">${convertNumber(
                          totalPrice
                        )}đ</td>

                    </tr>
                </div>
  `;

  insertData.insertAdjacentHTML("beforeend", templateProductBilling);

  // === === === === === === === === === Lấy Địa Chỉ Giao Hàng === === === === === === === === ===
  const insertAddress = document.querySelector("#insert-address");
  const listAddress = await callApiMethodGet(apiGetListAddress, token);

  listAddress?.data.forEach((item, index) => {
    const { numberPhone, id_User, id, email_address, address } = item;
    const templateAdress = `
              <button type="button" class="dropdown-item address"  data-id='${id}'>
                <div class="card-body">
                    <h3 class="card-title mb-1">Địa Chỉ Giao Hàng ${
                      index + 1
                    }</h3>
                    <div class="row">
                        <div class="col-2 col-sm-2 col-md-2">Số Điện Thoại
                        </div>
                        <div class="col-10 col-sm-10 col-md-10" id='numberPhone-address'>0${numberPhone}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-2 col-sm-2 col-md-2">Địa Chỉ</div>
                        <div class="col-10 col-sm-10 col-md-10" id='address-address'>
                            ${address}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-2 col-sm-2 col-md-2">Địa Chỉ Email
                        </div>
                        <div class="col-10 col-sm-10 col-md-10" id='email-address'>
                           ${email_address}
                    </div>
                </div>
            </button>
  `;

    insertAddress.insertAdjacentHTML("beforeend", templateAdress);
  });
  const templateAddAdress = `
       <button class="dropdown-item">
            <p class='text-danger'>Thêm Vị Trí Giao Hàng </p>
       </button>
    `;
  insertAddress.insertAdjacentHTML("beforeend", templateAddAdress);

  //====================    Get Selection address    =========
  const address = document.querySelectorAll(".address");
  let idAddress = 0;
  address.forEach((item) => {
    //console.log(address);
    item.addEventListener("click", (e) => {
      //console.log(e.currentTarget);

      const addressInsert = document.querySelector(".address-insert");

      idAddress = e.currentTarget.getAttribute("data-id");

      const numberPhone = e.currentTarget
        .querySelector("#numberPhone-address")
        .textContent.trim();
      const address = e.currentTarget
        .querySelector("#address-address")
        .textContent.trim();
      const email = e.currentTarget
        .querySelector("#email-address")
        .textContent.trim();

      const templateAddressShiping = `
                           <div class="card-body  p-0">
                                                    <h3 class="card-title mb-1">Địa Chỉ Giao Hàng </h3>
                                                    <div class="row">
                                                        <div class="col-4 col-sm-4 col-md-4">Số Điện Thoại
                                                        </div>
                                                        <div class="col-8 col-sm-8 col-md-8">${numberPhone}
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-4 col-sm-4 col-md-4">Địa Chỉ</div>
                                                        <div class="col-8 col-sm-8 col-md-8">
                                                            ${address}
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-4 col-sm-4 col-md-4">Địa Chỉ Email
                                                        </div>
                                                        <div class="col-8 col-sm-8 col-md-8">
                                                            ${email}
                                                        </div>
                                                    </div>
                                                </div>

      `;
      addressInsert.innerHTML = "";
      addressInsert.insertAdjacentHTML("beforeend", templateAddressShiping);
    });
  });
  //setTimeout(() => {
  //  console.log("idAddress:", idAddress);
  //}, 10000);
});

function convertNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
