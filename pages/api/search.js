 import nextConnect from 'next-connect'; 
import Property from "./models/Property"; 
import dotenv from "dotenv";
// import helper from './utils/helper'; 
import dbConnect from './utils/dbConnect';  
const handler = nextConnect();
 
dotenv.config();  
dbConnect(); 
  handler.post(async (req, res) => {
    try {
      const { isSaleOrRent, petsAllowed, furnished, serviced, shared, location: city, property_type} = req.body;
   
      const query = {
        isSaleOrRent: isSaleOrRent,
        ...(true && {'$or': [{PropertyType : property_type}, {category : property_type}]}),
        ...(true && {'$or': [{city : new RegExp(city, 'i')}, {province : new RegExp(city, 'i')}]}),
        ...(petsAllowed && {petsAllowed : petsAllowed}),
        ...(furnished && {furnished : furnished}),
        ...(serviced && {serviced : serviced}),
        ...(shared && {shared : shared}),
      }

      console.log({query})
       const latest = await Property.find(query).select('province  city   price  propertyType category isSaleOrRent numOfBedRooms   numOfBathRooms numOfGarages   petsAllowed  furnished  serviced shared images title description _id').exec();
       res.status(200).json({success: true, count: latest.length, data: latest});
    } catch (error) {
      throw new Error(`We found this error ${error}`)
    }
  
  });

 

export default handler;

