require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./database");

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// First API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", urlEncodedParser, (req, res) => {
  const urlAddress = req.body.url;
  if (isValidUrl(urlAddress)) {
    database.createAndSaveUrl(urlAddress, (err, data) => {
      if (err) {
        res.json({
          error: "failed saving url: " + err,
        });
      } else {
        res.json({
          original_url: data.url,
          short_url: data.shortenedUrl,
        });
      }
    });
  } else {
    res.json({
      error: `invalid url`,
    });
  }
});

app.get("/api/shorturl/:url", (req, res) => {
  const url = req.params.url;
  database.findUrlString(url, (err, data) => {
    if (err || data === null) {
      res.json({
        error: "failed retrieving url: " + url,
      });
    } else {
      res.redirect(data.url);
    }
  });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
