const express= require('express');
const path = require("path");
const bodyParser=require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require("./Util/path"); 

const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(rootDir,"public")));

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req,res,next)=>{
	 res.sendFile(path.join(rootDir, "Views", "404.html"));
});

app.listen(3000);
