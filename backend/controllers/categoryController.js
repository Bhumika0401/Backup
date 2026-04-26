// controllers/categoryController.js

exports.getCategories = (req, res) => {
  res.json({ message: "All categories ✅" });
};

exports.createCategory = (req, res) => {
  res.json({ message: "Category created ✅", data: req.body });
};