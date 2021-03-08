
// Login form
const loginForm = document.getElementById("loginForm");
const loginFormInputs = loginForm.querySelectorAll("input");
const loginFormEmail = loginForm.querySelector("input[name=email]")
const loginFormPassword = loginForm.querySelector("input[name=password]")
const loginFormButton = loginForm.querySelector("button");

// Register form
const registerForm = document.getElementById("registerForm");
const registerFormEmail = loginForm.querySelector("input[name=email]")
const registerFormPassword = loginForm.querySelector("input[name=password]")
const registerFormfirstname = loginForm.querySelector("input[name=firstname]")
const registerFormlastname = loginForm.querySelector("input[name=lastname]")
const registerFormButton = registerForm.querySelector("button");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert(loginFormEmail.value);
    alert(loginFormPassword.value);

});

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
});