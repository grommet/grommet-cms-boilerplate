import express from 'express';
import * as PostModels from '../models/Post';
const router = express.Router();
import { slugify } from '../utils/slugify';

const addSpaces = (s) =>
  s.replace(/([A-Z])/g, ' $1').trim();

// Get Posts
router.get('/api/routes', function(req, res) {
  let routes = [];
  Object.keys(PostModels).forEach((key) => {
    const item = {
      label: addSpaces(key),
      slug: slugify(addSpaces(key))
    };
    routes.push(item);
  });

  res.status(200).send({
    routes
  });
});

export default router;
