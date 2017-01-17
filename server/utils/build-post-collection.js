import Post from '../models/Post';
import colors from 'colors/safe';

const POSTS = [
  {
    author: 'John Doe',
    title: 'Hello World',
    subtitle: "Blog Post",
    slug: 'my-first-post',
    image: '587d4860b3ae295860c5fcbf',
    date: '01/01/2017',
    sections: [
      {
        name: 'Next Next',
        id: 'Marquee',
        order: 0,
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
      },
      {
        name: 'Memory in the middle',
        id: 'Section 1',
        order: 1,
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
      },
      {
        name: 'The rise of common sense analytics',
        id: 'Section 2',
        order: 2,
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
