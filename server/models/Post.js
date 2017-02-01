import mongoose, { Schema } from 'mongoose';
import extend from 'mongoose-schema-extend';
import autoIncrement from 'mongoose-auto-increment';

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
  _type: { type: String, default: 'our-brand' },
  sortOrder: { type: Number, default: 0 }
});
const BrandElementsSchema = PostSchema.extend({
  _type: { type: String, default: 'brand-elements' },
  sortOrder: { type: Number, default: 0 }
});
const ApplyingTheBrandSchema = PostSchema.extend({
  _type: { type: String, default: 'applying-the-brand' },
  sortOrder: { type: Number, default: 0 }
});

autoIncrement.initialize(mongoose.connection);
const OurBrand = mongoose.model('our-brand', OurBrandSchema);
const BrandElements = mongoose.model('brand-elements', BrandElementsSchema);
const ApplyingTheBrand = mongoose.model('applying-the-brand', ApplyingTheBrandSchema);
OurBrandSchema.plugin(autoIncrement.plugin, { model: 'our-brand', field: 'sortOrder' });
BrandElementsSchema.plugin(autoIncrement.plugin, { model: 'brand-elements', field: 'sortOrder' });
ApplyingTheBrandSchema.plugin(autoIncrement.plugin, { model: 'applying-the-brand', field: 'sortOrder' });
const Post = mongoose.model('Post', PostSchema);

export default {
  OurBrand,
  ApplyingTheBrand,
  Post,
  BrandElements
};

