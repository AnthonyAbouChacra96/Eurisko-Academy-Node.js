// const mysql=require('mysql2');
// const pool=mysql.createPool({
// 	host:'localhost',
// 	user:'root',
// 	database:'node-complete',
// 	password:'root'
// });
// module.exports=pool.promise();

// const Sequelize = require('sequelize');
// const sequelize= new Sequelize('node-complete','root','root',{dialect:'mysql',host:'localhost'});

// module.exports=sequelize;
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://Anthony_Node:ArA538SJb8wV8PAx@cluster0.zb7cb.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
			console.log("Connected!");
			_db=client.db();
			callback();
    })
    .catch((err) => {
			console.log(err);
			throw err;
		});
		
};

const getDb=()=>{
	if(_db) return _db;
	throw 'No Database Found!'
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;