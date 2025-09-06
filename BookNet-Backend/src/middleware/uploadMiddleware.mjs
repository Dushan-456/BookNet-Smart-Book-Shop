import multer from 'multer';
import path from 'path';

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: './uploads/', 
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload variable
const upload = multer({
  storage: storage,
  limits: { fileSize: 20000000 }, //  Limit file size (e.g., 20MB)
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('serviceFile'); // 'serviceFile' is the HTML form field name for the file

// Check File Type
function checkFileType(file, cb){
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|pdf|doc|docx/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true);
  } else {
    cb('Error: You can only upload documents and images!');
  }
}

export default upload;