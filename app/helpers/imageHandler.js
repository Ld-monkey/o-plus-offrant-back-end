// A refacto !

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'public/images',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E3);
    const extension = path.extname(file.originalname);
    const filename = file.originalname.split('.')[0] + '-' + uniqueSuffix + extension;
    callback(null, filename);
  }
});



modules.exports = {upload, storage};
