const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    SKU: {
		type: String,
		required: true,
	},
	quantity: {
		type: String,
		required: true,
	},
	productName: {
		type: String,
		required: true,
	},
	images: {
		type: Array,
		required: true,
	},
    productDescription: {
		type: String,
		required: true,
	},
},
{
    timestamps: true,
}
);

module.exports = Product = mongoose.model("product", ProductSchema);