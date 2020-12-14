const express = require("express");

const path = require("path");

const router = express.Router();

const productsControler=require('../Controllers/products');

router.get("/add-product",productsControler.getAddProduct);
router.post("/add-product",productsControler.postAddProduct );

exports.routes = router;