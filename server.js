var bodyParser = require("body-parser");
var express = require("express");
const requester = require("request");
const fs = require("fs");

var app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.text({ type: "text/html" }));
app.use(bodyParser.raw());
app.set("port", process.env.PORT);

app.post("*", function (req, res) { 
  req.headers["X-Asteria-Client-IP"]=req.headers["x-forwarded-for"].split(",")[0]
  var head = req.headers;
  var headerss = JSON.stringify(head)
    .replace("'{", "")
    .replace("}'", "")
   .replace("content-length","content2").replace("accept-encoding","dfsdfsdff").replace("host","check-Host");
  var urrrl = "http://185.236.78.147:6070" + req.url;
  requester.post(
    {
      headers: JSON.parse(headerss),
      url: urrrl,
      form: req.body,
      followRedirect:false,
      followAllRedirects: false,
      json: false,
    }
  ).pipe(res);
});

app.get("*", function (req, res) {
  req.headers["X-Asteria-Client-IP"]=req.headers["x-forwarded-for"].split(",")[0]
  var head = req.headers;
  var headerss = JSON.stringify(head)
    .replace("'{", "")
    .replace("}'", "")
    .replace("content-length","content2").replace("accept-encoding","dfsdfsdff").replace("host","check-Host");
  var querystring = req.url;
  var urrrl = "http://185.236.78.147:6070" + req.url;

   requester.get(
      {
        headers: JSON.parse(headerss),
        followAllRedirects: false,
        followRedirect:false,
        url: urrrl
      }, function(error, response, body){
     console.log(response)
  }
    ).pipe(res);
});

app.listen(process.env.PORT, "0.0.0.0", function () {
  console.log(app.get("port"));
  console.log("Starting listen...");
});
