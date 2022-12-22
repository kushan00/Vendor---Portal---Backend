const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Product = require("../controllers/productController.js"); 
const path = require("path");
const multer = require("multer");

/**
 * 
 * multer multiple image uplaod function
 * 
 */
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, '../frontend/src/assets/images')
  },
  filename: (req, file, cb) => {
     //rename filename to avoid name duplication
     var fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName)
  }
})

var upload = multer({ storage: storage });

router.post("/add",upload.array("products",10),Product.addProduct);
router.get("/get-product/:id",Product.getProduct);
router.get("/get-all",Product.getProducts);
router.get("/search/:searchTerm",Product.searchProduct);
router.put("/update-product/:id",Product.updateProduct);
router.delete("/delete-product/:id",Product.deleteProduct)

module.exports = router;
