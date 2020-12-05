const mongoose = require('mongoose');

exports.connectToDB = ()=> {
    const databaseUrl = process.env.SOLUTION_INFLUX_DATABASE_URL;
    const defaultOptions = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    };
    return mongoose.connect(databaseUrl, defaultOptions);        
}

// import mongoose from "mongoose"; 
// const connection = {};
// async function dbConnect() {
//   if (connection.isConnected) {
//     return;
//   }

//    const db = await mongoose.connect(
//     "mongodb://testuser:develop1234@mongodb1.webrahost.eu:27017/testuser?authSource=testdatabase?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
//   );
//   connection.isConnected = db.connections[0].readyState;
//   console.log("DATABASE", connection);
// }

// export default dbConnect;
