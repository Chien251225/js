


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");




const app = express();
const port = 3001;

// Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/TreeShop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Lỗi kết nối MongoDB:"));
db.once("open", () => console.log("Kết nối MongoDB thành công"));

// Cấu hình View 
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Import Router
const treeRouter = require("./routes/treeRouter");
app.use("/", treeRouter);

app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});
