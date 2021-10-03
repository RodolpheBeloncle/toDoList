const express = require("express");
const app = express();
const date = require(__dirname + "/currentDate.js");
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.static('public'));


// memory item todo
const items = ["Buy Food","Cook Food","Eat Food"];
const workItems = [];


app.get("/",function(req,res){
   const day = date.getDay();

    res.render("list",{listTitle : day,newListItems: items});

});



// get data from post request
app.post("/",function(req,res){
    const item = req.body.newItem;

    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/Work");

    }else{

    items.push(item);

// redirect to home route and trigger in the app.get to render all data
    res.redirect("/");
    };

});


app.post("/",function(req,res){
    const item = req.body.newItems;

    items.push(item);

    res.redirect("/")

});


// Router setting link and rendering template
app.get("/work",function(req,res){
    res.render("list", {listTitle:"Work List",newListItems:workItems});


});

app.get("/about",function(req,res){
    res.render("about");
});

app.get("/header",function(req,res){
    res.render("header");
});

app.get("/footer",function(req,res){
    res.render("footer");
});

app.listen(3000,function(){
console.log("server started on port 3000")
});
