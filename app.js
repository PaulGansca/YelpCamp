var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {
        name: "Muntele Retezat",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Romania_-_camping.jpg",
        description: "This is the Retezat Mountain, beautiful scenery and host of one of the Highest peaks"
    }, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log("NEW CAMPGROUND");
            console.log(campground);
        }
    });

// LANDING PAGE
app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show collection of existing campgrounds
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           //show more information about that item
           res.render("show", {campground: foundCampground});
       }
    });
});
//CREATE - add new campgrounds to DB
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //create new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp camp server is running");
});