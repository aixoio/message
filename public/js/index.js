///////////////////
/// INITIALISE ///
/////////////////
var bandlogin;
var displayIn;
var islogedini;
const joinDiv = {
  root: document.getElementById("join"),
  input: {
    name: document.getElementById("join-dev-in")
  },
  buttons: {
    joinBtn: document.getElementById("join-div-join"),
    loginBtn: document.getElementById("login-div-join")
  }
};
const signedDev = {
  root: document.getElementById("signed-in"),
  message: {
    root: document.getElementById("message"),
    exit: document.getElementById("exit-div-sign")
  }
};
const display = new Display(document.getElementById("messages"), "/json/messages.json", getName());
/////////////
/// CODE ///
///////////
// Setup
document.getElementById("bands-error-show-join-dev").hidden = true;
joinDiv.root.hidden = ined;
signedDev.root.hidden = ined ? false : true;
if (!signedDev.root.hidden) {
  bandlogin = setInterval(checkbandloginedin, 500);
}
document.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 13: {
      if (!ined) { // not signed in
        joinDiv.buttons.joinBtn.click();
        break;
      }
      if (ined) {
        sendTheMessage();
        break;
      }
      break;
    }
  }
});
// click events
document.getElementsByClassName("x-box-btn-c-p")[0].addEventListener("click", () => document.getElementsByClassName("box-div-c-p")[0].classList.remove("show-p"));
joinDiv.buttons.joinBtn.addEventListener("click", login);
joinDiv.buttons.loginBtn.addEventListener("click", login);
signedDev.message.exit.addEventListener("click", logout);
document.getElementById("send-btn-code-message").addEventListener("click", () => sendTheMessage());
// functions
function login(event) {
  function stop() {
    throw new Error("This is a random error! To Stop Code from rining");
  }
  const nameValue = joinDiv.input.name.value;
  // username protection
  if (nameValue == "" || nameValue == " ") {
    document.getElementById("bands-error-show-join-dev").hidden = true;
    throw new Error("Must have a name");
  }
  joinDiv.input.name.value = ""; // clear input
  // check if band
  fetch("/json/bands.json")
  .then(data => data.json())
  .then(function (json) {
    var band = false;
    json.forEach(item => {
      if (nameValue.toLocaleLowerCase().includes(item.username.toLocaleLowerCase())) {
        document.getElementById("bands-error-show-join-dev").hidden = false;
        document.getElementById("bands-error-show-join-dev").textContent = item.error;
        band = true;
        stop();
        throw new Error("This user is band");
      }
    });
    // do stuff????
    if (band == false) {
      ined = true;
      joinDiv.root.hidden = true;
      lStore.setItem("ined", true);
      lStore.setItem("name", nameValue);
      display.name = getName();
      display.update();
      signedDev.root.hidden = false;
      bandlogin = setInterval(checkbandloginedin, 500);
    }
  })
  .catch(function (error) {
    throw error
  });
}
function logout(event) {
  document.getElementById("bands-error-show-join-dev").hidden = true;
  ined = false;
  joinDiv.root.hidden = false;
  signedDev.root.hidden = ined ? false : true;
  lStore.removeItem("ined");
  lStore.removeItem("name");
  clearInterval(bandlogin);
}
function checkbandloginedin() {
  var nameValue = getName();
  fetch("/json/bands.json")
  .then(data => data.json())
  .then(function (json) {
    var band = false;
    json.forEach(item => {
      if (nameValue.toLocaleLowerCase().includes(item.username.toLocaleLowerCase())) {
        logout({

        });
        document.getElementsByClassName("band-r-p-s-t-s")[0].textContent = item.error;
        document.getElementsByClassName("box-div-c-p")[0].classList.add("show-p");
        stop();
        throw new Error("This user is band");
      }
    });
  })
  .catch(function (error) {
    throw error
  });
}
function getName() {
  if (lStore.getItem("name") == null) {
    return;
  } else {
    return lStore.getItem("name");
  }
}
function sendTheMessage() {
  var message = new Message(getName(), document.getElementById("text-message").value, null, "/post/new/message");
  document.getElementById("text-message").value = "";
  message.usetimer = true;
  message.send();
  display.update();
}
function isLoginedin() {
  if (lStore.getItem("ined") == null || lStore.getItem("ined") == "" || lStore.getItem("ined") == false) {
    ined = false;
    joinDiv.root.hidden = false;
    signedDev.root.hidden = ined ? false : true;
    lStore.removeItem("ined");
    lStore.removeItem("name");
    clearInterval(bandlogin);
  } else {
    joinDiv.root.hidden = true;
    signedDev.root.hidden = false;
  }
}
// display messages
display.update();
// intervals
displayIn = setInterval(() => display.update(), 500);
islogedini = setInterval(() => isLoginedin(), 500);
