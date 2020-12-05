const mongoose = require("mongoose"); 
const config = require("./../config/config").get(process.env.NODE_ENV);


 const categorySchema = mongoose.Schema({
 	name: {
 	type: String,
 	required: true, 
 	unique: 1
 	}, 
 	description: {
 	type: String,
 	maxlength: 200
 	} 
 })


 const Category = mongoose.model('Category', categorySchema)

 module.exports = { Category }