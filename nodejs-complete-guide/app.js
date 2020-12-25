const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf=require('csurf');
const flash=require('connect-flash');

const errorControler = require("./Controllers/error");
const User = require("./Models/user");

const MONGODB_URI =
  "mongodb+srv://Anthony_Node:ArA538SJb8wV8PAx@cluster0.zb7cb.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const csrfProtection=csrf();

app.set("view engine", "ejs");
app.set("views", "Views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const user = require("./Models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
	if(!req.session.user) return next();
	User.findById(req.session.user._id)
	.then((user) => {
		req.user=user 
		next();
	})
	.catch((err) => {
		console.log(err);
	});
});

app.use((req,res,next)=>{
	res.locals.isAuthenticated= req.session.isLoggedIn;
	res.locals.csrfToken=req.csrfToken();
	next();
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// db.execute("select * from products")
// .then(result=>{
// 	console.log(result[0],result[1]);
// })
// .catch(err=>{console.log(err);});

app.use(errorControler.get404);
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
