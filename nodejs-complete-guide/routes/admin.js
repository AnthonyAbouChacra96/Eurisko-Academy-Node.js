const express=require("express");

const path = require("path");

const rootDir=require('../Util/path'); 

const router= express.Router();

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});
router.get("/add-product", (req, res, next) => {
  //console.log('In Another Middleware!');
  // res.send(
  //   '<form action="/admin/add-product" method="POST"><input type="text" name="title"/><button type="submit" >Add Product</button></form>'
	// );
	 res.sendFile(path.join(rootDir, "Views", "add-product.html"));

});

module.exports =router;