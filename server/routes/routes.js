import express from 'express';
import PostModels from '../models/Posts';
const router = express.Router();
import { slugify } from '../utils/slugify';

const addSpaces = (s) =>
  s.replace(/([A-Z])/g, ' $1').trim();

// Get Posts
router.get('/api/routes', function(req, res) {
  let routes = {};
  Object.keys(PostModels).forEach((key) => {
    const item = addSpaces(key);
    routes[item] = slugify(item);
  });

  res.status(200).send(routes);
});

export default router;
