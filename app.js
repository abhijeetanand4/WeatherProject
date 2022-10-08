const { log } = require("console");
const express = require("express");

const bodyParser = require("body-parser")

const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
        const city = req.body.cityName;
        const appid = "74bd05061939f914f14b5e4176f1ef8e";
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"";
        https.get(url, function(response){
            console.log(response.statusCode);
            response.on("data", function(data){
                const weatherData = JSON.parse(data);
                const weatherDescription = weatherData.weather[0].description;
                const weatherTemp = weatherData.main.temp;
                const weatherImage = weatherData.weather[0].icon;
                const imageURL = "http://openweathermap.org/img/wn/" +weatherImage +"@2x.png"
                res.write("<p>The weather is like " + weatherDescription + "</p>");
                res.write("<h1>The temperature is " +weatherTemp +"</h1>");
                res.write("<img src=" +imageURL + ">");
                res.send();
            });
        });
    });

app.listen(3000,function(req, res){
    console.log("App running on server port 3000");
});