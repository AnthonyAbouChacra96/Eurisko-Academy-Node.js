exports.get404=(req,res,next)=>{
	//  res.sendFile(path.join(rootDir, "Views", "404.html"));
	res.status(404).render('404',{pageTitle:'Page Not Found',path:''});
};