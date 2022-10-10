const btn = document.querySelector("#register");
const fLogin = document.querySelector("#fLogin");
const fRegister = document.querySelector("#fRegister");

var registerFlag = true;
btn.onclick = function(){
    if(!registerFlag){
        fLogin.style.display = "block";
        fRegister.style.display = "none";
        btn.innerHTML = "Register";
        registerFlag = true;
    }else{
        fLogin.style.display = "none";
        fRegister.style.display = "block";
        registerFlag = false;
        btn.innerHTML = "Login";
    }
}