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
  createdAt: { type: Date, default: Date.now }
}, {
  collection: 'Post',
  discriminatorKey: '_type'
});

const OurBrandSchema = PostSchema.extend({
  typeSlug: { type: String, default: 'our-brand' }
});
const BrandElementsSchema = PostSchema.extend({
  typeSlug: { type: String, default: 'brand-elements' }
});
const ApplyingTheBrandSchema = PostSchema.extend({
  typeSlug: { type: String, default: 'applying-the-brand' }
});

const OurBrand = mongoose.model('OurBrand', OurBrandSchema);
const BrandElements = mongoose.model('BrandElements', BrandElementsSchema);
const ApplyingTheBrand = mongoose.model('ApplyingTheBrand', ApplyingTheBrandSchema);
const Post = mongoose.model('Post', PostSchema);

export default {
  OurBrand,
  ApplyingTheBrand,
  Post,
  BrandElements
};
