// connected using mongoose
// const mongoose = require('mongoose');

// const URI = "mongodb+srv://ankitsharmap413:Gzs6ySQJoPD8pM4r@cluster0.0fp2n.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
// let _db ;
// const connectMongoose =async(callback)=>{
//   try {
//     await mongoose.connect(URI)
//     _db = mongoose.connection.db;
//     console.log('inside the _db',_db.databaseName);
    
//     if (callback) {
//       callback()
//     }
//   } catch (error) {
//     console.log("show me error",error);
//   }
// }

// const getdb = () =>{
//   if (_db) {
//     return _db
//   }
//   throw " not database found"
// }


// module.exports ={
//   connectMongoose,
//   getdb
// }


const dotenv = require('dotenv');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

dotenv.config()


let _db;
const URI = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.0fp2n.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0`
const mongoConnect = callback => {
  MongoClient.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
