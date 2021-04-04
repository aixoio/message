const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 4554;
app.use(express.json());
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public", "index.html"));
});
app.get("/js/main.js", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/js", "main.js"));
});
app.get("/js/index.js", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/js", "index.js"));
});
app.get("/js/box.js", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/js", "box.js"));
});
app.get("/js/display.js", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/js", "display.js"));
});
app.get("/js/message.js", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/js", "message.js"));
});
app.get("/css/main.css", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/css", "main.css"));
});
app.get("/css/index.css", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/css", "index.css"));
});
app.get("/css/box.css", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/css", "box.css"));
});
app.get("/images/join.svg", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/images", "join.svg"));
});
app.get("/images/login.svg", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/images", "login.svg"));
});
app.get("/images/exit.svg", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/images", "exit.svg"));
});
app.get("/images/close.svg", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/images", "close.svg"));
});
app.get("/images/send.svg", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/images", "send.svg"));
});
app.get("/json/bands.json", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/json", "bands.json"));
});
app.get("/json/messages.json", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/json", "messages.json"));
});
app.post("/post/new/message", function (req, res) {
  req.body.timestamp = Date.now();
  const databasePath = path.join(__dirname, "/public/json", "messages.json");
  let database = JSON.parse(fs.readFileSync(databasePath));
  database.push(req.body);
  fs.writeFileSync(databasePath, JSON.stringify(database, null, 1));
  res.json({
    status: "success"
  });
});
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public", "404error.html"));
});
app.listen(port, function () {
  console.log("Server runing at localhost:" + port);
});
