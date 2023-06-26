const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'public/images',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E3);
    const extension = path.extname(file.originalname);
    const filename = file.originalname.split('.')[0] + '-' + uniqueSuffix + extension;
    callback(null, filename);
  },
});

const fileFilter = (req, file, callback) => {
  // Vérifier le type de fichier
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/bmp') {
    
    callback(null, true)
  } else {
    // Rejeter le fichier avec un message d'erreur personnalisé
    callback(new Error('Seuls les fichiers JPEG et PNG sont autorisés.'));
  }
}
module.exports = {storage, fileFilter};
