const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https")
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req, res)=>{
  res.sendFile(__dirname + "/signup.html");
})

app.post("/",(req, res)=>{

   const firstName = req.body.fname;
   const lastName = req.body.lname;
   const email= req.body.email;

const data = {
  members:[
    {
      email_addresss : email,
      status: "subscribes",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};
const jsonData= JSON.stringify(data);

const url = "https://us6.api.mailchimp.com/3.0/lists/4016c90964"

const options = {
  method : "POST",
  auth : "bik:0c44e7b957b30ac944f54e95ea7e0708-us6"
}

const request= https.request(url, options, (response)=>{
  response.on("data",(data)=>{
    console.log(JSON.parse(data));
  })
});
request.write(jsonData);
request.end();
})

app.listen(3000, ()=>{
  console.log("server running on 3000")
})

//API key
// 0c44e7b957b30ac944f54e95ea7e0708-us6

//list id
//4016c90964
