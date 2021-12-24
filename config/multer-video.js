const multer = require("multer");
const path = require("path");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /mp4|MPEG-4|mkv/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Video Only!");
  }
}

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "../../react-js/Online-Course-React-JS/public/video/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
