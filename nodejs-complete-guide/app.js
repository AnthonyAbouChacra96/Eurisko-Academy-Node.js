const express= require('express');
const path = require("path");
const bodyParser=require('body-parser');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require("./Util/path"); 
// const expressHbs=require('express-handlebars')
const app=express();

// app.engine('hbs',expressHbs({
// 	layoutsDir:'Views/layouts/',
// 	defaultLayout:'main-layout',
// 	extname:'hbs'
// }))
//app.set('view engine','pug');
// app.set('view engine','hbs');
app.set('view engine','ejs');
app.set('views','Views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(rootDir,"public")));

app.use('/admin',adminData.routes);
app.use(shopRoutes);


app.use((req,res,next)=>{
	//  res.sendFile(path.join(rootDir, "Views", "404.html"));
	res.status(404).render('404',{pageTitle:'Page Not Found'});
});


app.listen(3000);
