const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Product = require("../controllers/productController.js"); 
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`../frontend/src/assets/images`));
  },
  filename: (req, file, callback) => {
    var filename = `${Date.now()}-bezkoder-${file.originalname}`;
    callback(null, filename);
  }
});

var uploadFiles = multer({ storage: storage })

router.post("/add",uploadFiles.array("images",10),Product.addProduct);
router.get("/get-product/:id",Product.getProduct);
router.get("/get-all",Product.getProducts);
router.get("/search/:searchTerm",Product.searchProduct);
router.put("/update-product/:id",Product.updateProduct);
router.delete("/delete-product/:id",Product.deleteProduct)

module.exports = router;
