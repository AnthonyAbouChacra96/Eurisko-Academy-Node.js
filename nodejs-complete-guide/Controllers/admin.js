const Product = require("../Models/product");
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
	const description = req.body.description;
	// req.user.createProduct({
  //   title: title, 
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description,
  //   userId: req.user.id,
	// })
	const product = new Product(title,price,description,imageUrl,null,req.user._id);
	product.save()
	.then(result=>{
		console.log('Created Product');
		res.redirect('/admin/products');
	}).catch(err=>{console.log(err);});
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  } 
	const prodId = req.params.productId;
	//req.user.getProducts({where:{id:prodId}})
	// Product.findByPk(prodId)
	Product.findById(prodId)
	.then( (product) => {
		// const product=products[0];
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  }).catch(err=>{console.log(err)});
};
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
	const updatedDescription = req.body.description;
			const product = new Product(
        updatedTitle,
        updatedPrice,
				updatedDescription, 
        updatedImageUrl, 
				prodId
			);
	product.save()
	.then(result=>{
		console.log('Updated Products')
	  res.redirect("/admin/products");
	})
	.catch(err=>{console.log(err);})

};
exports.getProducts = (req, res, next) => {
	//req.user.getProducts()
	//Product.findAll()
	Product.fetchAll()
	.then((products) => {
    res.render("admin/products", {
      prods: products, 
      pageTitle: "Admin Products",
      path: "/admin/products",
    })
  }).catch(err=>{console.log(err)});
};
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
	Product.deleteById(prodId)
	.then(()=>{console.log('Destroyed Product');  res.redirect("/admin/products");})
	.catch(err=>{console.log(err);});
};
 