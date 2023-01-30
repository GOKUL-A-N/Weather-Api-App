const express=require("express");

const https=require("https");

const bodyParser=require("body-parser");

const app =express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})


app.post("/",function(req,res){
  
  const query=req.body.cityName;
  const appKey="71d2786a36dbd0077dc00899b6dd9e96";
  const units="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+units;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const icon=weatherData.weather[0].icon;
      const tempDescription=weatherData.weather[0].description;
      const imgUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The weather is currently "+tempDescription+"</h1>");
      res.write("<h2>The current temprature at "+query+" is "+temp+" degrees </h2>");
      res.write("<img src="+imgUrl+">")
      res.send();
    });
  });
  
});

app.listen(3000,function(){
  console.log("Server started at server 3000");
});