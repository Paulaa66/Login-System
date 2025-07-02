// ===== DOM Selection =====
const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
const userPass = document.querySelector("#userPass");
const signupBtn = document.querySelector("#signupBtn");

// ===== Variables =====
let usersContainer = [];

// ===== Startup Condition =====
if (localStorage.getItem("Users")) {
  usersContainer = JSON.parse(localStorage.getItem("Users"));
}

// ========== Validation ==========
const validateForm = (ele) => {
  const regex = {
    userName: /^\w{3,}$/,
    userEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    userPass: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  };
  if (regex[ele.id].test(ele.value)) {
    ele.classList.remove("is-invalid");
    ele.classList.add("is-valid");
    return true;
  } else {
    ele.classList.remove("is-valid");
    ele.classList.add("is-invalid");
    return false;
  }
};

// ===== Functions =====
const registerUser = (e) => {
  e.preventDefault();
  if (
    validateForm(userName) &&
    validateForm(userEmail) &&
    validateForm(userPass)
  ) {
    // ===== Check if the user email input is duplicate
    const duplicateUser = usersContainer.find(
      (user) => user.email === userEmail.value
    );
    if (duplicateUser) {
      errorMsg("This email is already registered. Please use a different one.");
      return;
    }

    // ===== Create object of user
    const user = {
      name: userName.value,
      email: userEmail.value,
      password: userPass.value,
    };
    usersContainer.push(user);
    localStorage.setItem("Users", JSON.stringify(usersContainer));
    successMsg("You've successfully signed up.");
    // ===== Pause to return to login page
    setTimeout(function () {
      window.location.href = "/index.html";
    }, 2000);
  }
};

// ===== Event Listeners =====
signupBtn.addEventListener("click", registerUser);
userName.addEventListener("input", function () {
  validateForm(this);
});
userEmail.addEventListener("input", function () {
  validateForm(this);
});
userPass.addEventListener("input", function () {
  validateForm(this);
});

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
