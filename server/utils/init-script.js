import mongoose from 'mongoose';
import colors from 'colors/safe';
import User from '../models/User';
import buildFileCollection from './build-file-collection';
import buildPostCollection from './build-post-collection';

// Use native promises
mongoose.Promise = global.Promise;

const defaultUsername = 'temp-admin';
const defaultPassword = 'temp-password';

function generateTempAdminUser() {
  User.find().exec(function(err, user) {
    if (err) console.log(colors.red('error: ', err));

    if (user.length === 0) {
      User.register(new User({
        username: defaultUsername
      }), defaultPassword, callback);
    }
  });
}

function callback(err, user) {
  if (err) console.log(colors.red('error creating temp admin: ', err));

  console.log(colors.green(`Created user: "${defaultUsername}" password: "${defaultPassword}"`));
  console.log(colors.green('This user SHOULD be deleted once a new user has been created in the dashboard.'));
}

export function initScript() {
  buildFileCollection();
  buildPostCollection();
  generateTempAdminUser();
};
