import mongoose, { Schema } from 'mongoose';

const Post = new Schema({
  title: String,
  image: String,
  link: String,
  contentBlocks: Array,
  slug: String,
  date: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Post', Post);
