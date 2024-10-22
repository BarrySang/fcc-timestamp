// index.js
// where your node app starts

var express = require('express');
var app = express();
var cors = require('cors');

// enable CORS for remote testing
app.use(cors({ optionsSuccessStatus: 200 }));

// serve static files
app.use(express.static('public'));

// serve the index.html on the root route
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// first API endpoint for testing
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// API endpoint for timestamp
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;

  let date;
  // Check if no date is provided
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if the input is a valid Unix timestamp or date string
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam)); // Unix timestamp in milliseconds
    } else {
      date = new Date(dateParam); // String date format
    }
  }

  // Check if date is valid
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Listen on port specified by environment or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
