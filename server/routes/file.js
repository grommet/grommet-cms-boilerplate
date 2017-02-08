import express from 'express';
import multer from 'multer';
import fs from 'fs';
import File from '../models/File';
import mkdirp from 'mkdirp';
import { slugifyFile } from '../utils/slugify';
import makeRexExp from '../utils/regExp';
import { isAuthed } from '../middleware/auth';

const router = express.Router();
const currYear = new Date().getFullYear();
const currMonth = new Date().getMonth() + 1;

// Setup file multer storage.
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const destPath = `./uploads/media/${currYear}/${currMonth}`;

    // Check if destination directory exists, if not make one.
    if (!fs.existsSync(destPath)) {
      mkdirp(destPath, (err) => {
        if (err) console.log(`Make directory error: ${err}`);
        callback(null, destPath);
      });
    } else {
      callback(null, destPath);
    }
  },
  filename: function (req, file, callback) {
    // slugifyFile method will slugify and time stamp a file name.
    callback(null, slugifyFile(file.originalname));
  }
});
const upload = multer({storage: storage});


// Edit file
router.post('/api/file/edit/:id', isAuthed, upload.single('file'), function (req, res) {
  File.findById(req.params.id, function (err, post) {
    if (err) {
      return res.status(400).send(err);
    }
    const filePath = (req.file !== undefined) 
      ? '/' + req.file.path 
      : post.path;

    post.path = filePath;
    post.title = req.body.title;

    return post.save(function(err) {
      if (err) return res.status(400).send(err);
      
      return res.status(200).send(post);
    });
  });
});

// Create file
router.post('/api/file/create', isAuthed, upload.single('file'), 
  function(req, res) {
    const filePath = (req.file !== undefined) 
      ? '/' + req.file.path 
      : null;

    File.create({
      title: req.body.title || '',
      path: filePath,
      createdAt: Date.now()
    }, function (err, post) {
      if (err) {
        console.log(`File error: ${err}, ${post}`);
        return res.status(400).send(err);
      }
      return res.status(200).send(post);
    });
  }
);

// Get files
router.get('/api/files', isAuthed, function(req, res) {
  const page = req.query.page || 0;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 12;
  const searchQuery = req.query.query || '';
  const skip = (page <= 1)
    ? 0
    : (page - 1) * limit;
  if (page === 0) {
    File.find().sort({ createdAt: 'desc' }).exec(
      function(err, files) {
        if (err) {
          return res.status(400).send(err);
        }

        return res.status(200).send(files);
      }
    );
  } else if (searchQuery !== '') {
    const name = makeRexExp(searchQuery);
    File.find({ name })
      .limit(limit)
      .sort({ createdAt: 'desc' }).exec(
      function(err, files) {
        if (err) {
          return res.status(400).send(err);
        }

        return res.status(200).send(files);
      }
    );
  } else {
    File.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: 'desc' }).exec(
      function(err, files) {
        if (err) {
          return res.status(400).send(err);
        }

        return res.status(200).send(files);
      }
    );
  }
});

router.get('/api/assets-count', function(err, res) {
  File.count().exec(
    function(err, count) {
      if (err) {
        return res.status(400).send(err);
      }

      return res.status(200).send({ total: count });
    }
  );
});

// Get file (unprotected)
router.get('/api/file', function (req, res) {
  const id = (req.query.id)
    ? req.query.id
    : 0;

  File.findById(id, function (err, file) {
    if (err) {
      return res.status(400).send(err);
    }

    return res.status(200).send(file);
  });
});

// Delete File
router.post('/api/file/:id/delete', isAuthed, function(req, res) { 
  File.findOne({'_id' : req.params.id }).remove().exec(function(err) {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send('success');
  });
});

export default router;
