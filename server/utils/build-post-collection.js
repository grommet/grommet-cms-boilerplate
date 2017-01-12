import Post from '../models/Post';
import colors from 'colors/safe';

const POSTS = [
  {
    author: 'John Doe',
    title: 'Hello World',
    slug: 'my-first-post',
    image: '/img/dashboard/posts/hello-world-cover.jpg',
    date: '01/01/2017',
    contentBlocks: [
      {
        content: "This is my first blog post!",
        blockType: "BlockHeading",
        edit: false,
        id: "f15e4fba-b794-4589-9f20-97ff13e6de82"
      },{
        content: "What an exciting day.",
        blockType: "BlockParagraph",
        edit: false,
        id: "f15e4fba-b794-4589-9f20-97ff13e6de81"
      }
    ]
  }
];

export default function buildPostCollection() {
  Post.find().exec(function(err, doc) {
    if (err) console.log(colors.red('error: ', err));

    if (doc.length === 0) {
      Post.collection.insert(
        POSTS, 
        function(err, small) {
          if (err) 
            console.log(colors.red('error creating Post collection', err));
          console.log(colors.green(`Created Post collection`));
        }
      );
    }
  });
};
