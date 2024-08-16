require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const shortUrlSchema = mongoose.Schema({
  url: String,
  shortenedUrl: {},
});

module.exports = mongoose.model("shortenedUrlSchema", shortUrlSchema);
