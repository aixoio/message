class Message {
  constructor(name, text, icon, sendurl) {
    this.name = name;
    this.text = text;
    this.icon = icon;
    this.defaulticon = true;
    this.sendurl = sendurl;
    this.usetimer = false;
  }
  send() {
    if (this.name === "" || this.name === null || this.text === "" || this.text === null || this.text === " " || this.name === " ") {
      throw new Error("No Message Or Name To Send");
    }
    if (this.usetimer) {
      console.time("Message Send In");
    }
    fetch(this.sendurl, {
      method: "post",
      body: JSON.stringify({
        name: this.name,
        text: this.text,
        icon: this.icon,
        defaulticon: this.defaulticon
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (this.usetimer) {
      console.timeEnd("Message Send In");
    }
  }
}
