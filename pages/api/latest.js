 import nextConnect from 'next-connect'; 
import Property from "./models/Property"; 
import dotenv from "dotenv";
import helper from './utils/helper'; 
import dbConnect from './utils/dbConnect';  
const handler = nextConnect();
 
dotenv.config();  
dbConnect(); 
  handler.get(async (req, res) => {
    try {
       const latest = await Property.find().select('province  city   price  propertyType category isSaleOrRent numOfBedRooms   numOfBathRooms numOfGarages   petsAllowed  furnished  serviced shared images title description _id').exec();
       res.status(200).json({success: true, count: latest.length, data: latest});
    } catch (error) {
      throw new Error(`We found this error ${error}`)
    }
  
  });

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler;

