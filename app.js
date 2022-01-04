const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const { url } = require("inspector");
const { options, post } = require("request");
const { Auth } = require("request/lib/auth");
const { json } = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res) {
    var firstname = req.body.fname;
    var lastname = req.body.lname ;
    var email = req.body.email;

    console.log(firstname,lastname,email)
    var data = {
        members : [{
            email_address : email,
            status : "subscribed",
            merge_fields : {
                FNAME : firstname,
                LNAME : lastname
            }
        }]

    };
    var JSONdata = JSON.stringify(data);
    var url = "https://us20.api.mailchimp.com/3.0/lists/4e2bfa6ba7"
    const options = {
        method : 'POST',
        auth :'ISHAN:646b79e452f9c90d0706ce07e6e74fc3-us20'
    }
    
    const request = https.request(url,options,function (response) {
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(JSONdata);
    request.end();
})

app.listen("3000",function(){
    console.log("SERVER RUNNING ON PORT 3000");
})

// API key: 646b79e452f9c90d0706ce07e6e74fc3-us20
// LIST ID : 4e2bfa6ba7