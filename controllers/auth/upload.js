const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  filename: (req, file, cb) => {
    cb(null, `${req.uid}.${file.originalname.split('.').pop()}`);
  }
});

app.post('/upload', upload.single('image'), (req, res) => {
  // req.file contains the uploaded image
  // req.body contains the entire request body
  res.send(`Image uploaded successfully!`);
});