import mongoose, { Schema } from 'mongoose';

const PressRelease = new Schema({
  title: String,
  image: String,
  postType: String,
  link: String,
  contentBlocks: Array,
  slug: String,
  date: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('PressRelease', PressRelease);
