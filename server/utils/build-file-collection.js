import File from '../models/File';
import colors from 'colors/safe';
import mongoose from 'mongoose';

const FILES = [
  {
    _id: mongoose.Types.ObjectId("587d4860b3ae295860c5fcbf"),
    title: "Hello World Cover",
    path: "/uploads/media/dashboard/posts/hello-world-cover.jpg",
    __v: 0,
    createdAt: "2017-01-16T22:25:36.354Z"
  }
];

export default function buildFileCollection() {
  File.find().exec(function(err, doc) {
    if (err) console.log(colors.red('error: ', err));

    if (doc.length === 0) {
      File.collection.insert(
        FILES, 
        function(err, small) {
          if (err) 
            console.log(colors.red('error creating File collection', err));
          console.log(colors.green(`Created File collection`));
        }
      );
    }
  });
};
