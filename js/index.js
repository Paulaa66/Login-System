// ===== DOM Selection =====
const userEmail = document.querySelector("#userEmail");
const userPass = document.querySelector("#userPass");
const loginBtn = document.querySelector("#loginBtn");
// ===== Variables =====
let usersContainer = [];

// ===== Startup Condition =====
if (localStorage.getItem("Users")) {
  usersContainer = JSON.parse(localStorage.getItem("Users"));
}

// ===== Functions =====
const loginUser = (e) => {
  e.preventDefault();
  for (let i = 0; i < usersContainer.length; i++) {
    if (
      usersContainer[i].email === userEmail.value &&
      usersContainer[i].password === userPass.value
    ) {
      successMsg("Welcome back!");
      localStorage.setItem("UserName", usersContainer[i].name);
      // ===== Pause to return to login page
      setTimeout(function () {
        window.location.href =
          "https://paulaa66.github.io/Login-System/pages/home.html";
      }, 2000);
      return;
    }
  }
  errorMsg("Invalid email or password. Please try again.");
};

// ===== Event Listeners =====
loginBtn.addEventListener("click", loginUser);

// ===== Alert Messages =====
const errorMsg = (text) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
    customClass: {
      popup: "border shadow-lg rounded-4",
    },
  });
};
const successMsg = (text) => {
  Swal.fire({
    title: text,
    icon: "success",
    draggable: true,
    showConfirmButton: false,
    timer: 1500,
  });
};
