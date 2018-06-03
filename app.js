var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");

//requireing routes
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

//seedDB();  seed the DB
// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://paulgansca:paul1998@ds147190.mlab.com:47190/camp_yelp");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Hash decoder bla bla safety",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//midlleware, dry up code by calling this on every route, so that currentUser is always defined
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

//using the routes from the separate files
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp camp server is running");
});