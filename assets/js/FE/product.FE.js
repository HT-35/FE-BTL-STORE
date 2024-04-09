import { callAPIFunction } from "../utils/callApi.js";
document.addEventListener("DOMContentLoaded", async () => {
  // ====================== Check Authen =========================
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
  // ====================== End Check Authen =========================

  //========================   Insert Data  =======================

  const title = document.querySelector("#title");

  const addNewDetail = document.querySelector(".add-new-Detail");

  const addNewImg = document.querySelector(".add-new-img");

  const currentURL = window.location.href;

  // Phân tích URL để lấy tham số 'product'
  const urlParams = new URLSearchParams(currentURL.split("?")[1]);
  const uriProduct = urlParams.get("product");
  const uriColor = urlParams.get("color"); //  Get Query Color

  //console.log("document.addEventListener ~ uriColor:", uriColor);

  const data = await callAPIFunction(
    `http://localhost:3000/product/${uriProduct}`
  );
  const product = await data.data;

  const { nameLaptop, img, ram, storage, colors, Specifications } = product;

  const price = product.colors[0].price;
  //const Image = img[0].path;
  //const Image1 = img[1].path;
  //console.log("document.addEventListener ~ img:", img);

  // ====================  Lọc và lấy  Hình Ảnh Theo Màu Sắc   ===============================
  const newImg = img.filter((item) => item.color == uriColor);
  const Image = newImg.length > 0 ? [newImg[0].path][0] : [img[0].path][0];
  console.log(Image);
  // ==================== End Lọc và lấy  Hình Ảnh Theo Màu Sắc   ===============================

  //console.log("newImg ~ newImg:", newImg);

  //  console.log("document.addEventListener ~ Image:", Image);

  const screen = Specifications.screen.screen;
  const ramMemory = Specifications.ramMemory_hardDrive.HardDrive;
  const battery = Specifications.otherInformation.BatteryInformation;
  const cpuTechnology = Specifications.processor.cpuTechnology;
  const Battery = Specifications.otherInformation.BatteryInformation;

  title.innerText = nameLaptop;

  // Lấy thẻ hình ảnh chính
  const productZoom = document.getElementById("product-zoom");
  // Lấy thẻ gallery hình ảnh
  const productZoomGallery = document.getElementById("product-zoom-gallery");

  //  // Cập nhật hình ảnh chính
  productZoom.src = `http://localhost:3000/${Image[0]}`;
  productZoom.dataset.zoomImage = `http://localhost:3000/${Image[0]}`;

  productZoomGallery.innerHTML = "";
  Image.forEach((path, index) => {
    const galleryItem = document.createElement("a");
    galleryItem.classList.add("product-gallery-item", "img-item");
    galleryItem.href = "javascript:void(0)";
    galleryItem.dataset.image = `http://localhost:3000/${path}`;
    galleryItem.dataset.zoomImage = `http://localhost:3000/${path}`;

    const img = document.createElement("img");
    img.src = `http://localhost:3000/${path}`;
    img.alt = "product image";

    galleryItem.appendChild(img);
    productZoomGallery.appendChild(galleryItem);

    // Thêm sự kiện click để hiển thị hình ảnh khi click vào
    galleryItem.addEventListener("click", () => {
      console.log("Clicked!"); // Kiểm tra xem sự kiện click được kích hoạt hay không
      console.log(`Path: ${path}`); // Kiểm tra xem đường dẫn hình ảnh được truyền đúng hay không

      productZoom.src = `http://localhost:3000/${path}`;
      productZoom.dataset.zoomImage = `http://localhost:3000/${path}`;

      // Xóa lớp active khỏi tất cả các thẻ a trong gallery
      galleryItems.forEach((item) => {
        item.classList.remove("active");
      });

      // Thêm lớp active cho thẻ a được click
      galleryItem.classList.add("active");
    });

    // Nếu là đối tượng đầu tiên, thêm lớp active
    if (index === 0) {
      galleryItem.classList.add("active");
    }
  });

  // Lấy lại danh sách các thẻ a trong gallery
  const galleryItems = document.querySelectorAll(".product-gallery-item");

  // Thêm sự kiện click cho từng thẻ a trong gallery
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Xóa lớp active khỏi tất cả các thẻ a trong gallery
      galleryItems.forEach((item) => {
        item.classList.remove("active");
      });

      // Thêm lớp active cho thẻ a được click
      item.classList.add("active");

      // Cập nhật hình ảnh chính
      productZoom.src = item.dataset.image;
      productZoom.dataset.zoomImage = item.dataset.image;
    });
  });

  //========================  End Insert Data  =======================

  const insertOptionColor = document.querySelector(".insert-option-color");

  colors.forEach((item, index) => {
    console.log("colors.forEach ~ item:", item.color);

    const isActive = item.color === uriColor ? "active" : "";
    const templateOptionColor = `
                                    <a href="/product.html?product=${uriProduct}&color=${item.color}" class="color-thumb ml-2 text-center ${isActive}" >

                                    <p class="text-center">${item.color}</p>
                                </a>
  
    `;
    insertOptionColor.insertAdjacentHTML("beforeend", templateOptionColor);
  });

  const colorThumbnails = document.querySelectorAll(".color-thumb");

  colorThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      // Xóa lớp active khỏi tất cả các thumbnail
      colorThumbnails.forEach((thumb) => {
        thumb.classList.remove("active");
      });
      // Thêm lớp active cho thumbnail được click
      thumbnail.classList.add("active");

      // Lấy giá trị của màu sắc từ href của thumbnail
      const color = thumbnail.getAttribute("href").split("#")[1]; // Lấy phần sau dấu #
      console.log("thumbnail.addEventListener ~ color:", color);

      //window.location.href = `./product.html?product=${uriProduct}&color=${color}`;
      //window.location.replace(
      //  "./product.html?product=" + uriProduct + "&color=" + color
      //);
    });
  });
});
