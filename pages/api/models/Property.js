const mongoose = require("mongoose"); 
const PropertySchema = new mongoose.Schema({ 
  province: { type: String, require: true },
  city: { type: String, require: true },
  price: { type: String, require: true },
  propertyType: { type: String },
  category: { type: String, enum: ["land", "house"], default: "house" },
  isSaleOrRent: { type: String, enum: ["sale", "rent"], default: "sale" },
  numOfBedRooms: { type: String},
  numOfBathRooms: { type: String},
  numOfGarages: { type: Number },
  petsAllowed: { type: String, enum: ["yes", "no"], default: "no" },
  furnished: { type: String, enum: ["yes", "no"], default: "no" },
  serviced: { type: String, enum: ["yes", "no"], default: "no" },
  shared: { type: String, enum: ["yes", "no"], default: "no" },
  images: { type: String, required: true },
  title: {
    type: String,
    required: [true, "Please add a title"],
    unique: true,
    maxlength: [40, "Title cannot be more than 40 characters"],
  },
  description: {
    type: String,
    maxlength: [200, "Description cannot be more than 200 characters"],
  },
});
// const Property = mongoose.model('Property', PropertySchema);
//  module.exports = {Property}
module.exports = mongoose.models.Property || mongoose.model("Property", PropertySchema);
