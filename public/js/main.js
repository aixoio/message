///////////////////
/// INITIALISE ///
/////////////////
const lStore = localStorage;
const sStore = sessionStorage;
//////////////
/// SETUP ///
////////////
var ined;
if (lStore.getItem("ined") == null || lStore.getItem("ined") == "" || lStore.getItem("ined") == false) {
  ined = false;
} else {
  ined = true;
}
if (ined) {
  console.log("You are %csinged%c in!", "color: #00ff00;", "");
} else {
  console.log("You are %cnot%c signed in!", "color: #ff0000;", "");
}
