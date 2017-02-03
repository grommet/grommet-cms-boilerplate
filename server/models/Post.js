import mongoose, { Schema } from 'mongoose';
import extend from 'mongoose-schema-extend';
import AutoIncrement from 'mongoose-sequence';

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

const HomeSchema = PostSchema.extend({
  _type: { type: String, default: 'home' },
  sortOrder: { type: Number, default: 0 }
});

const OurBrand = mongoose.model('our-brand', OurBrandSchema);
const BrandElements = mongoose.model('brand-elements', BrandElementsSchema);
const ApplyingTheBrand = mongoose.model('applying-the-brand', ApplyingTheBrandSchema);
const Home = mongoose.model('home', HomeSchema);
PostSchema.plugin(AutoIncrement,  { id: 'sort_order', inc_field: 'sortOrder', reference_fields: ['_type'] });
const Post = mongoose.model('Post', PostSchema);

export default {
  OurBrand,
  ApplyingTheBrand,
  Post,
  BrandElements,
  Home
};

