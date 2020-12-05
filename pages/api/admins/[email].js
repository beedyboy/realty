import dbConnect from "../utils/dbConnect";
const User = require("../models/userModel");

dbConnect();

export default async function (req, res) {
  try {
    
    const {query: { email }} = req;
    
    await User.findOne({ email }, (err, user) => {
       console.log({user})
      if(!user) {
        return res.status(200).send({exist: false, message: 'Email is available' });
      } else {
        return res.status(400).send({exist: true, message: 'Email is not available' });
      }       
     }).catch(err => {
       console.log({err});
       res.send({ success: false, err });
     })
  } catch (error) {
    res.status(400).send({ success: false, error });
  }
}
