var stBtn = document.getElementById('stBtn');
var audioFlag = true;
var audio = new Audio('/public/assets/sttheme.mp3');
stBtn.onclick = function() {
    if(audioFlag) {
        audio.play();
        audioFlag = false;
    } else {
        audio.pause();
        audioFlag = true;
    }
}

let link = document.querySelector(".link");
link.onclick = function(){
    // Program to Copy Text to Clipboard
    var linkText = document.querySelector(".link");
    var text = linkText.innerHTML;
    copyToClipboard(text);
}

let copied = document.querySelector(".copied");

const copyToClipboard = str => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      {copied.innerHTML = "Copied!";
      return navigator.clipboard.writeText(str);}
    return Promise.reject('The Clipboard API is not available.');
  };

function validate(){
    var x = document.forms["urlShortner"]["url"].value;
    if(!validURL(x)){
        alert('Please enter a valid URL');
        return false;
    }else{
        return true;
    }
}

// Password: WekR5vUishuIlCzw
// Username: strangerlinks2704

// Regex for URL
function validURL(str) {
    var pattern = new RegExp('^(https:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }