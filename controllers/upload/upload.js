const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import the fs module

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the folder to save uploaded files
    const uploadFolder = path.join(__dirname, 'uploads');
    // Create the upload folder if it doesn't exist
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    // Unique filename
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Maximum file size of 10MB
  fileFilter: (req, file, cb) => {
    // Allowed file types (e.g., only images)
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, JPG, PNG, GIF files are allowed.'));
    }
  },
}).single('file'); // Accept only a single file in the 'file' field

// Controller function to handle file upload
const uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      // If file upload failed
      return res.status(400).json({ message: err.message });
    }

    // File uploaded successfully
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({
      message: 'File uploaded successfully!',
      file: req.file, // You can return file info like filename, path, etc.
    });
  });
};

module.exports = uploadFile ;