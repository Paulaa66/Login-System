// ===== DOM Selection =====
const welcomeUser = document.querySelector("#welcomeUser");
const logoutBtn = document.querySelector("#logoutBtn");

// ===== Variables =====
let UserName = "";

// ===== Startup Condition =====
if (localStorage.getItem("UserName")) {
  UserName = localStorage.getItem("UserName");
  welcomeUser.innerHTML = `Welcome ${UserName} From Home Page`;
} else {
  welcomeUser.innerHTML = `Access denied! You must log in first.`;
  logoutBtn.classList.add("d-none");
  // ===== Redirecting to login page
  setTimeout(function () {
    window.location.href = "/index.html";
  }, 2000);
}

// ===== Functions =====
const userLogOut = () => {
  localStorage.removeItem("UserName");
};

// ===== Event Listeners =====
logoutBtn.addEventListener("click", userLogOut);
