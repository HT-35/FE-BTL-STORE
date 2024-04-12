import { callAPIFunction, fetchGetAllCard } from "../utils/callApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  // ==================   Check Authen ======================================

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

  // ==================  End Check Authen ======================================

  const token = localStorage.getItem("accessToken");

  const res = await fetchGetAllCard("http://localhost:3000/cart", token);
  if (res.status === false) {
    window.location.href = "/login.html";
  }
  console.log("document.addEventListener ~ res:", res);
});
