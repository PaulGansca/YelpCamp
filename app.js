var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Pietrosul Rodnei", image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Pietrosul_Rodnei%2C_Maramures%2C_Romania.jpg"},
    {name: "Muntele Retezat", image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Romania_-_camping.jpg"},
    {name: "Lacul Bicaz", image: "https://s.iha.com/00129999836/Moldavia-Lake-bicaz.jpeg"}
    ]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){

        
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp camp server is running");
});