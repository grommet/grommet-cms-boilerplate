import mongoose, { Schema } from 'mongoose';
import extend from 'mongoose-schema-extend';

const PostSchema = new Schema({
  title: String,
  subtitle: String,
  image: { type: String, ref: 'File' },
  link: String,
  sections: Array,
  slug: String,
  date: Date,
  createdAt: { type: Date, default: Date.now },
  _type: String
}, {
  collection: 'posts',
  discriminatorKey: '_type'
});

const OurBrandSchema = PostSchema.extend({
  _type: { type: String, default: 'our-brand' }
});
const BrandElementsSchema = PostSchema.extend({
  _type: { type: String, default: 'brand-elements' }
});
const ApplyingTheBrandSchema = PostSchema.extend({
  _type: { type: String, default: 'applying-the-brand' }
});

const OurBrand = mongoose.model('our-brand', OurBrandSchema);
const BrandElements = mongoose.model('brand-elements', BrandElementsSchema);
const ApplyingTheBrand = mongoose.model('applying-the-brand', ApplyingTheBrandSchema);
const Post = mongoose.model('Post', PostSchema);

export default {
  OurBrand,
  ApplyingTheBrand,
  Post,
  BrandElements
};
