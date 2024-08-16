const shortenedUrlModel = require("./mongo");

const createAndSaveUrl = (url, done) => {
  let doc = new shortenedUrlModel();

  shortenedUrlModel
    .findOne({})
    .sort({ shortenedUrl: -1 })
    .exec((err, data) => {
      let max = data.shortenedUrl || 0;

      doc.url = url;
      doc.shortenedUrl = max + 1;

      doc.save((err, data) => {
        if (err) {
          done(err);
        } else {
          done(null, data);
        }
      });
    });
};

const findUrlString = (urlNumber, done) => {
  shortenedUrlModel.findOne({ shortenedUrl: Number(urlNumber) }, (err, data) => {
    if (err) {
      done(err);
    } else {
      done(null, data);
    }
  });
};

exports.createAndSaveUrl = createAndSaveUrl;
exports.findUrlString = findUrlString;
