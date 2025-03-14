const mongoose = require("mongoose");

const treeSchema = new mongoose.Schema({
  treename: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "" },
});

const Tree = mongoose.model("Tree", treeSchema);
module.exports = Tree;
