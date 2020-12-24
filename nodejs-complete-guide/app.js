const express= require('express');
const path = require("path");
const bodyParser=require('body-parser');
const rootDir = require("./Util/path"); 
const errorControler=require('./Controllers/error')
// const expressHbs=require('express-handlebars')
//  const sequelize=require('./Util/database');
//  const Product = require('./Models/product');
//  const User = require('./Models/user');
//  const Cart = require('./Models/cart');
//  const CartItem = require('./Models/cart-item');
//  const Order = require('./Models/order');
//  const OrderItem = require('./Models/order-item');

const mongoConnect=require('./Util/database').mongoConnect;
 const User = require('./Models/user');

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
	
	const adminRoutes = require('./routes/admin');
	 const shopRoutes = require('./routes/shop');
	
	app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

app.use((req,res,next)=>{
	User.findById("5fe2899c611ee6340dd05302")
    .then((user) => {
      req.user = new User(user.name,user.email,user.cart,user._id) ;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
})

app.use('/admin',adminRoutes.routes);
app.use(shopRoutes);

// db.execute("select * from products")
// .then(result=>{
// 	console.log(result[0],result[1]);
// })
// .catch(err=>{console.log(err);});

app.use(errorControler.get404);
// Product.belongsTo(User),{constraints:true,onDelete:'CASCADE'};
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product,{through:CartItem});
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product,{through:OrderItem})
// //sequelize.sync({force:true})
// sequelize.sync()
// .then(result=>{
// 	return User.findByPk(1);
// })
// .then(user=>{
// 	if(!user){
// 	return	User.create({name:'Anthony',email:'test@test.com'})
// 	}
// 	return user;
// })
// .then(user=>{
// 	console.log(user);
// return	user.createCart();

// })
// .then(cart=>{
// 		app.listen(3000);
// })
// .catch(err=>{
// 	console.log(err);
// });

mongoConnect(()=>{
	app.listen(3000);
});

