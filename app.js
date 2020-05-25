const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");
const webpush = require("web-push");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static("public"));



const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);


// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Welcome to Weather App" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});







app.get("/", function(req,res){
  res.sendFile(__dirname + "/public/index.html");
});


app.post("/temp", function(req,res){

  var weather = req.body.weather;

  var options = {
    url: "https://api.openweathermap.org/data/2.5/weather?q="+weather+",IN&appid=565536c1a8447461b017d7438a1693a3&units=metric",
    method: "GET"
  }

  request(options, function(error,response,body){
    if(error){
      res.redirect("/");
    }else{
  var data = JSON.parse(body);
  var code = data.cod;
  if(code === 200){
  var temperature = data.main.temp;
  var cloud = data.weather[0].main;
  var city = data.name;

  res.render("home", {temp: temperature, cloud: cloud, city: city});
}else{
  res.redirect("/");
}
}
  });


});









app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
