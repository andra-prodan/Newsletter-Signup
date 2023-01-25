const express = require("express");
const bodyParcer = require("body-parser");
const request = require("request");
const https = require("https");
const { post } = require("request");

const app = express();
app.use(bodyParcer.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const JSONdata = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/313a793727"

    const options = {
        method: "POST",
        auth: "admin:c9ca055ac54e8847231a6e1c8cbb3051-us21"

    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
        } else res.sendFile(__dirname+"/failure.html");

        response.on("data", function (data) {
            // console.log(JSON.parse(data));
        })
    })
    request.write(JSONdata);
    request.end();

})

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(3000, function () {
    console.log("Server running...")
})


// c9ca055ac54e8847231a6e1c8cbb3051-us21

//313a793727