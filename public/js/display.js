class Display {
  constructor(display, url, name) {
    this.display = display;
    this.url = url;
    this.time = false;
    this.letterpx = 12;
    this.name = name;
  }
  update() {
    if (this.time) {
      console.time("Displayed In");
    }
    fetch(this.url)
    .then((messages) => messages.json())
    .then((json) => {
      this.display.innerHTML = "";
      this.display.appendChild(document.createElement("br"));
      json.forEach((item, i) => {
        let yourMessage = this.name === item.name;
        let root1 = document.createElement("div");
        root1.classList.add("message");
        root1.classList.add(yourMessage ? "your-message" : "not-your-message");
        root1.style.width = `${this.letterpx * item.text.length}px`;
        let span1 = document.createElement("span");
        span1.classList.add("text-message");
        span1.textContent = item.text;
        root1.appendChild(span1);
        let name1 = document.createElement("div");
        name1.classList.add(yourMessage ? "from-you" : "from");
        name1.textContent = item.timestamp ? `${item.name}, ${new Date(item.timestamp).toLocaleString()}` : item.name;
        this.display.append(root1, name1);
        this.display.appendChild(document.createElement("br"));
      });
      this.display.appendChild(document.createElement("br"));
      let br1 = document.createElement("br");
      this.display.appendChild(br1);
      br1.scrollIntoView();
    })
    .catch((e) => {
      throw e;
    });
    if (this.time) {
      console.timeEnd("Displayed In");
    }
  }
}
