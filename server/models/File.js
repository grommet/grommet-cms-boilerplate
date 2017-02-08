import mongoose, { Schema } from 'mongoose';

const File = new Schema({
  title: { type: String, text: true },
  path: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('File', File);
