
// Login form
const loginForm = document.getElementById("loginForm");
const loginFormInputs = loginForm.querySelectorAll("input");
const loginFormEmail = loginForm.querySelector("input[name=email]")
const loginFormPassword = loginForm.querySelector("input[name=password]")
const loginFormButton = loginForm.querySelector("button");

// Register form
const registerForm = document.getElementById("registerForm");
const registerFormEmail = registerForm.querySelector("input[name=email]")
const registerFormPassword = registerForm.querySelector("input[name=password]")
const registerFormFirstname = registerForm.querySelector("input[name=firstname]")
const registerFormLastname = registerForm.querySelector("input[name=lastname]")
const registerFormButton = registerForm.querySelector("button");

const errorElem = document.getElementById("errorMessage");
const logoutButton = document.getElementById("logout");
const switchButton = document.getElementById("switch");

var api = "http://localhost:3000";
var login = true;
var logged = false;
//  xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);

const toggleDisplayElem = (elem) => {
    if (elem.style.visibility == "visible") {
        elem.style.visibility = "hidden";
        elem.style.maxHeight = "0";    
    } else {
        elem.style.visibility = "visible";
        elem.style.maxHeight = null;    
    }
}

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let xhr = new XMLHttpRequest();  
    xhr.open("POST", api + "/auth/login", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`email=${loginFormEmail.value}&password=${loginFormPassword.value}`);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status != 200) {
            errorElem.innerHTML = xhr.response;
            return;
        } else if(xhr.readyState == 4 && xhr.status == 200) {
            errorElem.innerHTML = xhr.response;
            toggleDisplayElem(loginForm);
            toggleDisplayElem(logoutButton);
            toggleDisplayElem(switchButton);
            logged = true;
        }   
    }    
});

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    let xhr = new XMLHttpRequest();  
    xhr.open("POST", api + "/auth/register", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`email=${registerFormEmail.value}&password=${registerFormPassword.value}&firstname=${registerFormFirstname}&lastname=${registerFormLastname}`);
    
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status != 200) {
            errorElem.innerHTML = xhr.response;
        } else if(xhr.readyState == 4 && xhr.status == 200) {
            toggleDisplayElem(loginForm);
            toggleDisplayElem(logoutButton);
            toggleDisplayElem(switchButton);
            errorElem.innerHTML = xhr.response;
            logged = true;
        }   
    }    
});


switchButton.addEventListener("click", (event) =>{
    login = !login;
    toggleDisplayElem(loginForm);
    toggleDisplayElem(registerForm);
    errorElem.innerHTML= "";  
});


logoutButton.addEventListener("click", (event) => {
    errorElem.innerHTML = "";
    login = true;
    logged = false;
    toggleDisplayElem(loginForm);
    toggleDisplayElem(switchButton);
    toggleDisplayElem(logoutButton);
    errorElem.innerHTML= "";
}); 
