// jshint esversion:6
const express=require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
//  const https=require("https");
res.sendFile(__dirname+"/index.html");
//  res.send("server is running at 3000");

});
app.post("/",function(req,res){//'/'=root adress of our web site

const query=req.body.cityname;
const apiKey="e444b78df65f0b9b6abc084b8ff63a24";
const apiid="e444b78df65f0b9b6abc084b8ff63a24";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiid+"&Key="+apiKey;
https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){//'on'sends data in hexadecimal code
const weatherdata=JSON.parse(data);
const temp=weatherdata.main.temp;
const description=weatherdata.weather[0].description;
res.write("<h1>temp</h1>"+temp);
res.write("weatherdescription "+ description);
res.send();
//console.log(weatherdata);
  });
});
//  console.log("post request recieved");
});


app.listen(3000,function(){
  console.log("server running");
});
