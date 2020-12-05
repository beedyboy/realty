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
                User.findOne({'email': req.body.email}, (err, user) => {
                  if(!user) return res.json({isAuth: false, message: 'Auth failed, user not found!'});
             
                  user.comparePassword(req.body.password, (err, isMatch) => {
                    if(!isMatch) return res.json({isAuth: false, message: "Wrong email or password"});
             
                    user.generateToken((err, user) => {
                      if(err) return res.status(400).send(err);
                      res.cookie('auth', user.token).json({
                        isAuth: true,
                        id: user._id,
                        email: user.email,
                        message: "Logged in successfully"
                      })
                    })
                  })
                })
               
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
                const user = new User(req.body);
                await user.save((err, doc) => {
                  if (err) return res.json({ success: false, err });
                  res.status(200).json({
                    success: true,
                    data: doc,
                  });
                });
              
              
            } catch (error) {
              res.status(400).json({ success: false, error });
            }         
          break; 
  
            default: 
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method}  Not Allowed`)
    }

    
}