const express = require('express');
const app = express();
const sharp = require('sharp');
const fs = require('fs');
// const path = require('path')

// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
const multer = require('multer');

// app.use("/static", express.static(path.join(__dirname), "static"))
app.use("/static", express.static("static"))

// 检查传过来的文件是否为图片
const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  };
  cb(null, true);
}
const MAX_SIZE = 200000;

const upload = multer({
  dest: './uploads/',
  fileFilter,
  limits: {
    fileSize: MAX_SIZE
  }
})

const dropZoneUpload = multer({
  dest: './dropZoneUpload/',
})

const singleUpload = upload.single('file')
app.post('/upload', (req, res) => {
  singleUpload(req, res, function (err) {
    if (err) {
      if (err.code === "LIMIT_FILE_TYPES") {
        res.status(421).json({ error: "Only images are allowed" });
        return;
      }
      if (err.code === "LIMIT_FILE_SIZE") {
        res.status(422).json({ error: `Too large. Max size is ${MAX_SIZE / 1000}KB` });
        return;
      }
    }
    if (!req.file) {
      res.json({ alert: "You have upload NOTHING" })
    } else {
      console.log(req.file)
      res.json({ singleFile: "singleFile", file: req.file })
    }
  })
})

const multiUpload = upload.array('files');
app.post('/multiple', (req, res) => {
  multiUpload(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_TYPES") {
        res.status(423).json({ error: "All files should be images" });
        return;
      }
      if (err.code === "LIMIT_FILE_SIZE") { // 这个完全无效
        res.status(424).json({ error: `At least one file too large. Max size is ${MAX_SIZE / 1000}KB` });
        return;
      }
    }
    if (req.files.length == 0) {
      res.json({ alert: "You have upload NOTHING" })
    }
    else {
      console.log(req.files)
      res.json({ multiFile: "multiFile", files: req.files })
    }
  })
})

app.post("/dropzone", dropZoneUpload.single("file"), async (req, res) => {
  // app.post("/dropzone", upload.single("file"), async (req, res) => {
  try {
    console.log(req.file)
    await sharp(req.file.path)
      .resize(300)
      .toFile(`./static/${req.file.originalname}`);

    fs.unlink(req.file.path, () => {
      res.json({ file: `/static/${req.file.originalname}` })
    })
  } catch (err) {
    console.log(err)
    res.status(999).json({ err });
  }
})

app.listen(3344, () => console.log("Running on localhost:3344"));