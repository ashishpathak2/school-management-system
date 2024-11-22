const multer = require('multer');

const upload = multer({
  dest: 'uploads/', // Temporary storage for uploaded files
});

module.exports = { upload };
