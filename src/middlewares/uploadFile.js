const multer = require('multer');

exports.uploadFile = (imageFile) => {
  const storage = multer.diskStorage({
    // storage destination
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    // filename format
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''));
    }
  });

  // file filtering
  const fileFilter = (req, file, cb) => {
    if (file.fieldname === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|JPEG|png|PNG|svg)$/)) {
        req.fileValidationError = {
          message: 'Only image fileshare allowed !'
        };
        
        return cb(new Error('Only image files are allowed !'), false);
      }

      cb(null, true);
    }
  }

  //max size for file upload
  const sizeInMB = 10;
  const maxSize = sizeInMB * 1024 * 1024;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize
    }
  }).fields([
    {
      name: imageFile,
      maxCount: 1
    }
  ]);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError)
      }

      if (!req.files && !err) {
        return res.status(400).send({
          message: 'Please select file to upload'
        });
      }

      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({
            message: `Max file sized is ${sizeInMB}`
          });
        }
        return res.status(400).send(err);
      }
      return next();
    });
  }

};