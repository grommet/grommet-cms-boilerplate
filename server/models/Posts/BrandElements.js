import mongoose, { Schema } from 'mongoose';

const BrandElements = new Schema({
  title: String,
  subtitle: String,
  image: { type: String, ref: 'File' },
  link: String,
  sections: Array,
  slug: String,
  date: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('BrandElements', BrandElements);
