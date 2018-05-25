var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Pietrosul Rodnei", image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Pietrosul_Rodnei%2C_Maramures%2C_Romania.jpg"},
        {name: "Muntele Retezat", image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Romania_-_camping.jpg"},
        {name: "Lacul Bicaz", image: "https://s.iha.com/00129999836/Moldavia-Lake-bicaz.jpeg"}
        ]
        
    res.render("campgrounds", {campgrounds:campgrounds});
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp camp server is running");
});