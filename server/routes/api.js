import express from 'express';
import { slugifyFile } from '../utils/slugify';
import { isAuthed } from '../middleware/auth';

const router = express.Router();

// Check if user is authed.
router.get('/api/check', isAuthed, function(req, res) {
  res.status(200).send('success');
});

// Basic test to check API functionality is sound.
router.get('/api/ping', function(req, res) {
  res.status(200).send('pong!');
});

export default router;
