function setupBox(data) {
  // data has a box, button and a x button
  data.button.addEventListener("click", () => {
    data.box.classList.add("show"); // show the box on open
  });
  data.x.addEventListener("click", () => {
    data.box.classList.remove("show"); // hide the box on close
  });
}
