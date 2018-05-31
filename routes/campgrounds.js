var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX - show collection of existing campgrounds
router.get("/campgrounds", function(req, res){
    //Get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//NEW - show form to create new campground
router.get("/campgrounds/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/campgrounds/:id", function(req, res) {
    //find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           console.log(foundCampground);
           //show more information about that item
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});
//CREATE - add new campgrounds to DB
router.post("/campgrounds", isLoggedIn, function(req, res){
    //get data from form and add to campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author};
    //create new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

//EDIT Campground ROUTE
router.get("/campgrounds/:id/edit", checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground){
                res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE Campground ROUTE
router.put("/campgrounds/:id", checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//DESTROY Campground ROUTE
router.delete("/campgrounds/:id", checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            // does user own campground?
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            } else {
                res.redirect("back");
            }
        }
    });
    } else {
        res.redirect("back");
    }
}

module.exports = router;