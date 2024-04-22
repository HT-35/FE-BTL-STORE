import {
  callAPIFunction,
  callAPIMethodDelete,
  callAPIMethodPost,
  callApiMethodGet,
  fetchMethodPostAddCart,
} from "../utils/callApi.js";

const addressInsert = document.querySelector(".address-insert");
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

  const totalPrice = Number(quantity) * Number(newPrice);
  //console.log(getProductDetailInCard);

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
                        <td class="quantity-col  text-center">
                            <p ">${quantity}</p>
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
              <button type="button" class="dropdown-item address" id='id-address'  data-id='${id}'>
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

  // ====================================== add default address ======================================

  //console.log(listAddress.data[0]);

  const { numberPhone, id_User, id, email_address } = listAddress.data[0];
  const addressShip = listAddress.data[0].address;

  const templateAdressDefault = `
       <div class="card-body  p-0" id='id-address' data-id='${id}'>
                                                    <h3 class="card-title mb-1">Địa Chỉ Giao Hàng </h3>
                                                    <div class="row mb-1">
                                                        <div class="col-4 col-sm-4 col-md-4">Số Điện Thoại
                                                        </div>
                                                        <div class="col-8 col-sm-8 col-md-8">${numberPhone}
                                                        </div>
                                                    </div>
                                                    <div class="row mb-1">
                                                        <div class="col-4 col-sm-4 col-md-4">Địa Chỉ</div>
                                                        <div class="col-8 col-sm-8 col-md-8">
                                                            ${addressShip}
                                                        </div>
                                                    </div>
                                                    <div class="row mb-1">
                                                        <div class="col-4 col-sm-4 col-md-4">Địa Chỉ Email
                                                        </div>
                                                        <div class="col-8 col-sm-8 col-md-8">
                                                            ${email_address}
                                                        </div>
                                                    </div>
                                                </div>
  `;

  addressInsert.insertAdjacentHTML("beforeend", templateAdressDefault);

  // ==================    add Create Address =============
  const templateAddAdress = `
       <button class="dropdown-item">
            <p class='text-danger'>Thêm Vị Trí Giao Hàng </p>
       </button>
    `;
  insertAddress.insertAdjacentHTML("beforeend", templateAddAdress);

  //====================    Get Selection address    =========
  const address = document.querySelectorAll(".address");

  address.forEach((item) => {
    //console.log(address);
    item.addEventListener("click", (e) => {
      let idAddress = e.currentTarget.getAttribute("data-id");

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
                           <div class="card-body  p-0" id='id-address' data-id='${idAddress}'>
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
  //=========================   button checkout  ====================================

  const btnCheckout = document.querySelector("#btn-checkout");

  btnCheckout.addEventListener("click", async () => {
    const idAddress = addressInsert
      .querySelector("#id-address")
      .getAttribute("data-id");

    const bill = {
      id_address: idAddress,
      id_product: [slugProduct],
      quanlity: [quantity],
      color: [color],
    };
    const createBill = await callAPIMethodPost(
      "http://localhost:3000/bill",
      localStorage.getItem("accessToken"),
      bill
    );

    // remove product in cart after checkout
    const product = {
      id_product: _id,
      color: color,
    };
    console.log(product);
    const removeProduct = await callAPIMethodDelete(
      "http://localhost:3000/cart/remove-product",
      localStorage.getItem("accessToken"),
      product
    );
    console.log(removeProduct);
    const idBill = createBill.data.id;
    console.log("idBill:", idBill);
    window.location.href = `/bill.html?bill=${idBill}`;
  });
});

function convertNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
