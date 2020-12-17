const express = require("express");

const path = require("path");

const router = express.Router();

const adminControler=require('../Controllers/admin');

router.get("/add-product",adminControler.getAddProduct);
router.get("/products",adminControler.getProducts);
router.post("/add-product",adminControler.postAddProduct );
router.get("/edit-product/:productId", adminControler.getEditProduct);
router.post("/edit-product", adminControler.postEditProduct);
router.post("/delete-product",adminControler.postDeleteProduct);
exports.routes = router;