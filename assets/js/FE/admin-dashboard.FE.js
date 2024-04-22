import { callApiMethodGet } from "../utils/callApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  const insertInfo = document.querySelector("#insert-info");
  const token = localStorage.getItem("accessToken");
  //console.log(token);
  if (token) {
    insertInfo.innerHTML = "";
    //console.log("ok");
    const userName = localStorage.getItem("userName");
    const templateUser = `                <div class="dropdown compare-dropdown">
                                    <a href="#" class="dropdown-toggle" role="button">
                                        <div class="icon">

                                            <i class="fa-regular fa-user"></i>
                                        </div>
                                        <p style="color: #ffffff;">${userName}</p>
                                    </a>
                                </div>`;

    insertInfo.insertAdjacentHTML("beforeend", templateUser);
  } else {
    window.location.href = "./login.html";
  }

  // ==================   Handle signout =============================

  const btnSignout = document.querySelector(".btn-signout");
  btnSignout.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    window.location.href = "/index.html";
  });

  // ==========================  Get Detail Accout   =================================
  const user = await callApiMethodGet(
    "http://localhost:3000/user/info-user",
    localStorage.getItem("accessToken")
  );
  const { email, fullName, numberPhone } = user.data;

  const insertData = document.querySelector(".insert-data");

  const templateInfo = `
  
                                                      <div class="">
                                                        <div class="row text-center">
                                                            <div class="col-1 col-sm-1 col-md-1"></div>
                                                            <div class="col-3 col-sm-3 col-md-3">
                                                                Họ Tên :
                                                            </div>
                                                            <div class="col-8 col-sm-8 col-md-8 text-left">
                                                               ${fullName}
                                                            </div>
                                                        </div>
                                                        <div class="row text-center">
                                                            <div class="col-1 col-sm-1 col-md-1"></div>
                                                            <div class="col-3 col-sm-3 col-md-3">
                                                                Email :
                                                            </div>
                                                            <div class="col-8 col-sm-8 col-md-8 text-left">
                                                               ${email}
                                                            </div>
                                                        </div>
                                                        <div class="row text-center">
                                                            <div class="col-0 col-sm-0 col-md-1"></div>
                                                            <div class="col-4 col-sm-4 col-md-3">
                                                                Số Điện Thoại :
                                                            </div>
                                                            <div class="col-8 col-sm-8 col-md-8 text-left">
                                                               ${numberPhone}
                                                            </div>
                                                        </div>
                                                       <div class="row text-center">
                                                            <div class="col-0 col-sm-0 col-md-1"></div>
                                                            <div class="col-4 col-sm-4 col-md-3">
                                                               Vai trò:
                                                            </div>
                                                            <div class="col-8 col-sm-8 col-md-8 text-left">
                                                              Admin
                                                            </div>
                                                        </div>
                                                    </div>

  `;
  insertData.insertAdjacentHTML("beforeend", templateInfo);

  // ==========================  Get NEW bILL   =================================
});
