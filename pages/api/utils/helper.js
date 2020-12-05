const bcrypt = require("bcryptjs"); 
const jwt = require('jsonwebtoken'); 
// const { dataUri} = require('../middleware/multer'); 
const { cloudinary } = require('./cloudinary');

const helper = { 
//   auth:  (req, res, next) => {
// 	let token = req.cookies.auth;
// console.log({token})
// 	User.findByToken(token, (err,user) => {
// 	if(err) throw err;
// 	if(!user) return res.json({
// 	error: true
// 	});
// 	req.token = token;
// 	req.user = user;
// 	next();
// 	})
// },
  generateSlug:(data) => {
   
    let slug = data
                .toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-');  
    return slug;
},

useDate:() =>  { 
  const today= new Date();
  var mm = String(today.getMonth() + 1).padStart(2, '0')
  var dd = String(today.getDate()).padStart(2, '0')
   return  today.getFullYear() + '/' + mm + '/' + dd  
},
 getRandomNo:() => {
    
    var i = new Date().getTime();
    i = i & 0xffffff;
    return i;
}, 
      
hash: (password) => {
    const salt = bcrypt.genSaltSync();
    return  bcrypt.hashSync(password, salt);
  },
  
generateToken: (user) => { 
    try { 
    var token = jwt.sign(user.id, process.env.SECRET_KEY);
    return token;
    } catch(err) {
      console.log('error', err);
    }     
  },

getRandomizer: (bottom, top) => {
    return function() {
        return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
    }
},
generateOTP: () => {
  var rollDie = helper.getRandomizer(0, 9);

  var results = ""
  for ( var i = 0; i<7; i++ ) {
      results += rollDie() + " ";    //make a string filled with 1000 random numbers in the range 1-6.
  }
  return results;
}, 
uploader: async (image) => {
 var reply = null; 
//  console.log({image})
  await cloudinary.uploader.upload(image).then( data => {
    reply = data;
  }).catch(err => {
    console.log(err);
   }); 
  
  return reply;
   
},
uploader2: async (file) => {
  var reply = null;
  const image = dataUri(file).content; 
   await cloudinary.uploader.upload(image).then( data => {
     reply = data;
   }).catch(err => {
     console.log(err);
    }); 
   
   return reply;
    
 }

  
}

module.exports = helper;