const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
		type: [],
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

module.exports = User = mongoose.model("user", UserSchema);