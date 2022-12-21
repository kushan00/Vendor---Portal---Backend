const Product = require("../models/productModel")
let path = require('path');
const apiResponse = require("../helpers/apiResponse");
const upload = require("../middlewares/upload");

exports.addProduct = async (req, res) => {

  var imagesArray = [];
  req.files.map(async (file) => {
    imagesArray.add(file.filename);
   });

  try {
    const newProduct = new Product({
      SKU: req.body.SKU,
      quantity: req.body.quantity,
      images: imagesArray,
      productName: req.body.productName,
      productDescription: req.body.productDescription,
    });

   await newProduct.save();

   apiResponse.Success(res,"Product Added Successfully", {data:newProduct});
  } catch (err) {
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findOne({ _id: id });
    apiResponse.Success(res,"Product Detail", {data:product});
  } catch (err) {
    apiResponse.ServerError(res,"Server Error",{err:err});
  }

};

exports.getProducts = async (req, res) => {
  try {
    let products = await Product.find();
    apiResponse.Success(res,"All Products", {data:products});
  } catch (err) {
    apiResponse.ServerError(res,"Server Error",{err:err});
  }

};


/**
 * 
 * @param {searchTerm} req 
 * @return searched products will be returned 
 */
exports.searchProduct = async (req, res) => {
  try {
    const details = await Product.find({
      $or: [
        {
            productName: { $regex: req.params.searchTerm },
        },
      ],
    });
    apiResponse.Success(res,"Search Success", {data:details});
  } catch (error) {
    apiResponse.ServerError(res,"Server Error",{err:error});
  }

}

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  const filter = { _id: id };
  const update = { 
    SKU: req.body.SKU,
    quantity: req.body.quantity,
    images: req.file.filename,
    productName: req.body.productName,
    productDescription: req.body.productDescription, 
      };

  try {
  
  let data = await Product.findOneAndUpdate(filter, update);
  console.log(data);
  apiResponse.Success(res,"Product Details Updated", {data:data});

  } catch (error) {
    apiResponse.ServerError(res,"Server Error",{err:error});
  }
}

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  const filter = { _id: id };

  try {
  
  let data = await Product.findOneAndDelete(filter);
  console.log(data);
  apiResponse.Success(res,"Product Details Updated", {data:data});

  } catch (error) {
    apiResponse.ServerError(res,"Server Error",{err:error});
  }
}
