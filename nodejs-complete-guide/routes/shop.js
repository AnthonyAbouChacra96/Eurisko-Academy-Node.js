const path=require('path');
const express = require('express');
const rootDir = require("../Util/path"); 


const router=express.Router();
router.get("/", (req, res, next) => {
  //	console.log('In Another Middleware!');
 // res.send("<h1>Hello from Express!</h1>");
 res.sendFile(path.join(rootDir,'Views','shop.html'));
});
module.exports=router;