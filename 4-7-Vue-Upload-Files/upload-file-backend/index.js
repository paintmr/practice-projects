const express = require('express');
const app = express();

// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
const multer = require('multer');

// 检查传过来的文件是否为图片
const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }
  cb(null, true);
}
const MAX_SIZE = 2000000;

const upload = multer({
  dest: './uploads/',
  fileFilter,
  limits: {
    fileSize: MAX_SIZE
  }
})

const uploadErrMsg = function (req, res, next) {
  upload.single('file')(req, res, function (err) {
    if (err) {
      if (err.code === "LIMIT_FILE_TYPES") {
        res.status(422).json({ error: "Only images are allowed" });
        return;
      }
      if (err.code === "LIMIT_FILE_SIZE") {
        res.status(422).json({ error: `Too large. Max size is ${MAX_SIZE / 1000}KB` });
        return;
      }
    }
  })
  next()
}

app.use(uploadErrMsg);

app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file == undefined) {
    res.json({ alert: "You have upload NOTHING" })
  }
  res.json({ woof: "woof", file: req.file })
})

app.listen(3344, () => console.log("Running on localhost:3344"));