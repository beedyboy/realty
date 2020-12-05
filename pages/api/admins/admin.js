import dbConnect from '../utils/dbConnect'; 
import User from '../models/userModel'; 
dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const users = await User.find({});
                res.status(200).json({success: true, data: users});
                
            } catch (error) {
                res.status(400).json({success: false, error});
            }            
            break;
    
        case 'POST':
            try {
                if (!req.body) {
                  res.statusCode = 404;
                  res.end("Error");
                  return;
                }
                const { email }  = req.body;
              const exist = await User.findOne({ email });
                if(exist) {
                  res.status(400).json({
                    success: false,
                    message: 'An account already exist for this email'
                  })
                } else {
                  const user = new User(req.body);
                  await user.save((err, doc) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json({
                      success: true,
                      data: doc,
                    });
                  });
                }
               
              } catch (error) {
                res.status(400).json({ success: false, error });
              }         
            break; 

        case 'PUT':
          try {
              if (!req.body) {
                res.statusCode = 404;
                res.end("Error");
                return;
              }
              User.findByIdAndUpdate(req.body._id, req.body,  {new: true},(err, doc) =>{
                if(err) return res.json({ success: false, error: err });
                res.status(200).json({
                  success: true,
                  doc
                })
              }) 
              
            } catch (error) {
              res.status(400).json({ success: false, error });
            }         
          break; 
  
            default: 
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method}  Not Allowed`)
    }

    
}