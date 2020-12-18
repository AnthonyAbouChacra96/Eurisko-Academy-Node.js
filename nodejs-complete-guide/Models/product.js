// const fs = require("fs");
// const path = require("path");
const Cart=require('./cart');
const db=require('../Util/database');
const { execute } = require('../Util/database');
// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   "data",
//   "products.json"
// );

// const getProductsFromFile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       return cb([]);
//     }
//     return cb(JSON.parse(fileContent));
//   });
// };
const products = [];
module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
	}
	
  save() {
		return db.execute("insert into products (title,price,imageUrl,description) values (?,?,?,?)"
		,[this.title,this.price,this.imageUrl,this.description]);
  };

	static deleteById(id){

	
	};


  static fetchAll() {
		return db.execute('select * from products');
	};

	static findById(id){
		return db.execute('select * from products where products.id=?',[id])
	};
};
