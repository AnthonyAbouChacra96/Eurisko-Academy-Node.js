const Product = require("../Models/product");

exports.getAddProduct = (req, res, next) => {
  //console.log('In Another Middleware!');
  // res.send(
  //   '<form action="/admin/add-product" method="POST"><input type="text" name="title"/><button type="submit" >Add Product</button></form>'
  // );
  //	res.sendFile(path.join(rootDir, "Views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};
exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
