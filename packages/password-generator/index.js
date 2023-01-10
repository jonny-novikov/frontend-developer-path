const pwdChars =
    ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
     "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
     "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
     "~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

function generatePassword (pwdLen) {
    const randPassword = new Array(pwdLen).fill(0).map(x => (function (chars) {
        let umax = Math.pow(2, 32), r = new Uint32Array(1), max = umax - (umax % chars.length)
        do {
            crypto.getRandomValues(r)
        } while (r[0] > max)
        return chars[r[0] % chars.length]
    })(pwdChars)).join('')
    return randPassword
}

function domReady (fn) {
  if (typeof fn !== 'function') {
    throw new Error('Argument passed to ready should be a function');
  }
  if (document.readyState !== 'loading') {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState !== 'loading')
        fn();
    });
  }
}

domReady(function () {
  document.getElementById("generate-passwords").addEventListener('click', function () {
      renderRandomPasswords();
  })

  const elements = document.querySelectorAll(".password-item span");
  elements.forEach(function (span) {
    span.onclick = function() {
        document.execCommand("copy");
    }

    span.addEventListener("copy", function(event) {
        event.preventDefault();
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", span.textContent);
            console.log(event.clipboardData.getData("text"))
        }
    });
  });
})

function renderRandomPasswords() {
    const pwdLen = 15;
    const elements = document.querySelectorAll(".password-item span");
    elements.forEach(function (element) {
        element.innerText = generatePassword(pwdLen);
    });
}
