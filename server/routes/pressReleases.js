import express from 'express';
const router = express.Router();
import PressRelease from '../models/PressRelease';
import { isAuthed } from '../middleware/auth';
import { slugify } from '../utils/slugify';

// Get Press Releases
router.get('/api/press-releases', function(req, res) {
  const page = (req.query.page)
    ? Number(req.query.page)
    : 0;

  if (page === 0) {
    PressRelease.find().sort({
      date: 'desc'
    }).exec((err, posts) => {
      if (err) {
        return res.status(400).send(err);
      }

      res.status(200).send(posts);
    });
  } else {
    const limit = 3;
    const skip = (page === '1')
      ? 0
      : (page - 1) * limit;
    PressRelease.find().skip(skip).limit(limit).sort({
      date: 'desc'
    }).exec((err, posts) => {
      if (err) {
        return res.status(400).send(err);
      }

      res.status(200).send(posts);
    });
  }
});

// Get Press Release by ID
router.get('/api/press-release/:id', function(req, res) {
  PressRelease.findById(req.params.id, function (err, post) {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send(post);
  });
});

// Get Press Release by slug
router.get('/api/press-release/title/:slug', function(req, res) { 
  PressRelease.findOne({'slug': req.params.slug }).exec(function(err, posts) {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send(posts);
    
  });
});

// Create Press Release
router.post('/api/press-release/create', isAuthed, function(req, res) {
  PressRelease.create({
    title: req.body.title || '',
    date: new Date(req.body.date).toISOString(),
    slug: slugify(req.body.title),
    contentBlocks: req.body.contentBlocks || [],
    link: req.body.link || '',
    postType: req.body.postType || '',
    image: req.body.image || '',
    createdAt: Date.now()
  }, function (err, post) {
    if (err) {
      console.log(`PressRelease error: ${err}, ${post}`);
      return res.status(400).send(err);
    }
    res.status(200).send(post);
  });
});

// Edit PressRelease
router.post('/api/press-release/:id', isAuthed, function (req, res) {
  PressRelease.findById(req.params.id, function (err, post) {
    if (err) {
      return res.status(400).send(err);
    }

    post.title = req.body.title;
    post.date = new Date(req.body.date).toISOString();
    post.slug = slugify(req.body.title);
    post.contentBlocks = req.body.contentBlocks;
    post.link = req.body.link;
    post.postType = req.body.postType;
    post.image = req.body.image;
    post.createdAt = req.body.createdAt;

    return post.save(function(err) {
      if (err) return res.status(400).send(err);
      res.status(200).send(post);
    });
  });
});

// Delete PressRelease
router.post('/api/press-release/:id/delete', isAuthed, function(req, res) { 
  PressRelease.findOne({'_id' : req.params.id }).remove().exec(function(err) {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send('success');
  });
});

export default router;
