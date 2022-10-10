import swal from 'sweetalert';
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
let copied = document.querySelector(".copied");

const copyToClipboard = str => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      {copied.innerHTML = "Copied!";
      return navigator.clipboard.writeText(str);}
    return Promise.reject('The Clipboard API is not available.');
  };
// const shortnerBtn = document.querySelector("#shortnerBtn");
// const form1 = document.querySelector("#f1");
function validate(){
    let val = document.querySelector("#url").value;
    if(isValidUrl(val)){
        return true;
    }
    // swal("Oops!", "Link isn't valid !", "danger");
    return false;
}

// Password: WekR5vUishuIlCzw
// Username: strangerlinks2704

// Regex for URL
function isValidUrl(_string){
    const matchPattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    return matchPattern.test(_string);
  }

  let link = document.querySelector(".link");
  link.onclick = function(){
      // Program to Copy Text to Clipboard
      var linkText = document.querySelector(".link");
      var text = linkText.innerHTML;
      copyToClipboard(text);
  }
  