const mongoose = require("mongoose"); 
const config = require("./../config/config").get(process.env.NODE_ENV);
 

 const productSchema = mongoose.Schema({ 
 	product_name: {
 	type: String,
 	required: true,
 	maxlength: 100
 	},
 	price: {
 	type: String,
 	default: 'n/a'
 	},
 	contact: { 
 	type: String
 	},
 	images: {
 	type: String,
 	maxlength: 100
 	}, 
 	description: {
 	type: String,
 	maxlength: 100
 	},
 	categoryId: { 
 	type: String,
 	required: true,
 	},
 	status: {
 	type: String,
 	enum: ['Available', 'Sold'],
 	default: 'Available'
 	},
 }, {timestamps: true})


 const product = mongoose.model('product', productSchema)

 module.exports = { product }