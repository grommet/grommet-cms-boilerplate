import express from 'express';
import multer from 'multer';
import env from 'node-env-file';
import path from 'path';
import { isAuthed } from '../middleware/auth';

const router = express.Router();

// Load environment variables
env(path.join(__dirname, '../..', '.env'));

const isDateInString = (fileName) => {
  const fileNameArray = fileName.split('-');

  if (Array.isArray(fileNameArray) && fileNameArray.length > 1) {
    const search = fileNameArray[1].search(/^(19|20)\d{2}$/);
    if (search > -1)
      return true;
    else
      return false;
  }

  return false;
};

const year = new Date().getFullYear();
const reportPath = `../../../labs-web-static/techreports/${year}`;

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (process.env.NODE_ENV === 'production' && isDateInString(file.originalname))
      callback(null, path.join(__dirname, reportPath));
    else 
      callback(null, './uploads/media/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
const upload = multer({storage: storage});

// Create file
router.post('/api/file/create', isAuthed, upload.single('file'), 
  function(req, res) {
    let filePath = (req.file !== undefined) 
      ? '/' + req.file.path 
      : null;

    const { originalname } = req.file;
    if (process.env.NODE_ENV === 'production' && isDateInString(originalname))
      filePath = `/techreports/${year}/${originalname}`;

    res.status(200).send(
      JSON.stringify({ path: filePath })
    );
  }
);

export default router;
