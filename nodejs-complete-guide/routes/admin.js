const express=require("express");
const router= express.Router();

router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});
router.get("/add-product", (req, res, next) => {
  //console.log('In Another Middleware!');
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"/><button type="submit" >Add Product</button></form>'
  );
});

module.exports =router;