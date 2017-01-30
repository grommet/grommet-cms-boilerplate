import express from 'express';
import PostModels from '../models/Posts';
import { isAuthed } from '../middleware/auth';
import { slugify } from '../utils/slugify';

const router = express.Router();

const findModelByName = (name) =>
  PostModels[name];

const toUppercase = (str) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

// Get Posts
router.get('/api/posts/:name', function(req, res) {
  const page = (req.query.page)
    ? Number(req.query.page)
    : 0;
  
  const name = req.params.name;
  const modelName = name
    .split('-')
    .map(s => toUppercase(s))
    .join('');
  const Model = findModelByName(modelName);

  if (typeof Model !== 'undefined') {
    Model.find().populate('image').sort({
      date: 'desc'
    }).exec((err, posts) => {
      if (err) {
        return res.status(400).send(err);
      }

      res.status(200).send(posts);
    });
  } else {
    const statusMessage = { message: 'The requested model does not exist.' };
    res.status(400).send('The requested model does not exist.');
  }
});

// Get Post by ID
router.get('/api/post/:id', function(req, res) {
  Post.findOne({'_id': req.params.id }).populate('image').exec(function(err, post) {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send(post);
  });
});

// Get Post by slug
router.get('/api/post/title/:slug', function(req, res) {
  Post.findOne({'slug': req.params.slug }).populate('image').exec(function(err, post) {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send(post);
  });
});

// Create Post
router.post('/api/post/create', isAuthed, function(req, res) {
  Post.create({
    title: req.body.title || '',
    subtitle: req.body.subtitle || '',
    date: new Date(req.body.date).toISOString(),
    slug: slugify(req.body.title),
    image: req.body.image._id || '',
    sections: req.body.sections,
    createdAt: Date.now()
  }, function (err, post) {
    if (err) {
      console.log(`Post error: ${err}, ${post}`);
      return res.status(400).send(err);
    }
    res.status(200).send(post);
  });
});

// Edit Post
router.post('/api/post/:id', isAuthed, function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      return res.status(400).send(err);
    }

    post.title = req.body.title;
    post.subtitle = req.body.subtitle;
    post.date = new Date(req.body.date).toISOString();
    post.slug = slugify(req.body.title);
    post.sections = req.body.sections;
    post.image = (req.body.image) ? req.body.image._id : undefined;
    post.createdAt = req.body.createdAt;

    return post.save(function(err) {
      if (err) return res.status(400).send(err);
      res.status(200).send(post);
    });
  });
});

// Delete Post
router.post('/api/post/:id/delete', isAuthed, function(req, res) {
  Post.findOne({'_id' : req.params.id }).remove().exec(function(err) {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send('success');
  });
});

export default router;
