const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const treeRouter = require("./routes/treeRouter");

const app = express();

// Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/TreeShop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Đã kết nối MongoDB"))
  .catch(err => console.error("Lỗi kết nối MongoDB", err));

// Cấu hình middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Sử dụng treeRouter
app.use("/trees", treeRouter);

// Route trang chủ
app.get("/", (req, res) => {
  res.redirect("/trees");
});

// Route trang giới thiệu
app.get("/about", (req, res) => {
  res.render("about");
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
