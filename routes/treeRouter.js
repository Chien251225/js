const express = require("express");
const router = express.Router();
const Tree = require("../Model/treeModel.js");

// Lấy danh sách tất cả cây
router.get("/", async (req, res) => {
  try {
    const trees = await Tree.find();
    res.render("index", { trees });
  } catch (error) {
    res.status(500).send("Lỗi khi lấy danh sách cây");
  }
});

// Thêm cây mới
router.post("/add", async (req, res) => {
  const { treename, description, image } = req.body;
  if (!treename || !description) {
    return res.status(400).send("Tên cây và mô tả là bắt buộc");
  }
  try {
    await Tree.create({ treename, description, image });
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Lỗi khi thêm cây mới");
  }
});

// Chỉnh sửa cây
router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { treename, description, image } = req.body;
  try {
    await Tree.findByIdAndUpdate(id, { treename, description, image });
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Lỗi khi cập nhật cây");
  }
});

// Xóa cây
router.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Tree.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Lỗi khi xóa cây");
  }
});

// Reset - Xóa toàn bộ cây
router.post("/reset", async (req, res) => {
  try {
    await Tree.deleteMany({});
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Lỗi khi reset danh sách cây");
  }
});

module.exports = router;