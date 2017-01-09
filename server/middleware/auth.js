import passport from 'passport';

export function isAuthed(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send('Not authorized.');
  }
}
