document.addEventListener("DOMContentLoaded", () => {
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
});
