// server.js
// where your node app starts

// Adding body parser middleware
const bodyParser = require("body-parser");

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

// END OF BOILERPLATE ------------------------------------------

// Add body parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/timestamp', (req, res) => {
    // const date = Date.now();
    // const toUTC = new Date(date).toUTCString();
    res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date?", (req, res) => {
  const reqDate = req.params.date;
  
  // Provided date is Unix format
  if (/\d{5,}/.test(reqDate)) {
     const toUTC = (new Date(parseInt(reqDate))).toUTCString();
     res.json({ unix: parseInt(reqDate), utc: toUTC});
  }
  else {
      // Provided date is string
    const date = new Date(reqDate);
    
      // Provided date is invalid 
    if (date.toString() === 'Invalid Date') {
      res.json({ error : 'Invalid Date' })
    }
    else {
      res.json({ unix: date.valueOf(), utc: date.toUTCString() }); 
    }
  }
});


