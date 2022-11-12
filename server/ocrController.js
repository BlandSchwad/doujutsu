const gm = require("gm").subClass({ imageMagick: true });
const fs = require("fs");

module.exports.ocrPostController = (req, res) => {
  gm(req.body.url)
    .resize(req.body.res)
    .crop(req.body.width, req.body.height, req.body.x, req.body.y)
    .write("/home/andy/projects/manga/in/tenkai.jpg", function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        setTimeout(() => {
          let kanji = fs
            .readFileSync("/home/andy/projects/manga/oct.txt", "utf8")
            .split("\n");

          console.log(kanji);

          res.status(201).send(kanji[kanji.length - 2]);
        }, 200);
      }
    });
};

module.exports.ocrGetController = (req, res) => {
  fs.readFile("../../manga/oct.txt", "utf8", (err, responseText) => {
    console.log(responseText);
    res.status(200).send(responseText);
  });
};
