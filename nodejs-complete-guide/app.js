const express= require('express');
const path = require("path");
const bodyParser=require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require("./Util/path"); 
const errorControler=require('./Controllers/error')
// const expressHbs=require('express-handlebars')
const db=require('./Util/database');
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

app.use('/admin',adminRoutes.routes);
app.use(shopRoutes);

db.execute("select * from products")
.then(result=>{
	console.log(result[0],result[1]);
})
.catch(err=>{console.log(err);});

app.use(errorControler.get404);



app.listen(3000);
