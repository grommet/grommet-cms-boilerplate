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
        id: 'next-next-marquee',
        order: 0,
        layout: [],
        contentBlocks: []
      },
      {
        name: 'Memory in the middle',
        id: 'memory-in-the-middle',
        order: 1,
        layout: [
          {
            name: 'pad',
            value: 'none'
          },
          {
            name: 'basis',
            value: 'full'
          },
          {
            name: 'pad',
            value: 'none'
          },
          {
            name: 'direction',
            value: 'column'
          },
          {
            name: 'justify',
            value: 'center'
          },
          {
            name: 'align',
            value: 'center'
          },
          {
            name: 'full',
            value: 'false'
          },
          {
            name: 'wrap',
            value: 'false'
          }
        ],
        contentBlocks: [
          {
            content: "This is my first blog post!",
            blockType: "BlockHeading",
            edit: false,
            layout: [
              {
                name: 'pad',
                value: 'none'
              },
              {
                name: 'size',
                value: 'auto'
              },
              {
                name: 'flex',
                value: 'false'
              }
            ],
            id: "f15e4fba-b794-4589-9f20-97ff13e6de82"
          },{
            content: "What an exciting day.",
            blockType: "BlockParagraph",
            edit: false,
            layout: [
              {
                name: 'pad',
                value: 'none'
              },
              {
                name: 'size',
                value: 'auto'
              },
              {
                name: 'flex',
                value: 'false'
              }
            ],
            id: "f15e4fba-b794-4589-9f20-97ff13e6de81"
          }
        ]
      },
      {
        name: 'The rise of common sense analytics',
        id: 'the-rise-of-common-sense-analytics',
        order: 2,
        layout: [
          {
            name: 'pad',
            value: 'none'
          },
          {
            name: 'basis',
            value: 'full'
          },
          {
            name: 'pad',
            value: 'none'
          },
          {
            name: 'direction',
            value: 'column'
          },
          {
            name: 'justify',
            value: 'center'
          },
          {
            name: 'align',
            value: 'center'
          },
          {
            name: 'full',
            value: 'false'
          },
          {
            name: 'wrap',
            value: 'false'
          }
        ],
        contentBlocks: [
          {
            content: "This is my first blog post!",
            blockType: "BlockHeading",
            edit: false,
            layout: [
              {
                name: 'pad',
                value: 'none'
              },
              {
                name: 'size',
                value: 'auto'
              },
              {
                name: 'flex',
                value: 'false'
              }
            ],
            id: "f15e4fba-b794-4589-9f20-97ff13e6de82"
          },{
            content: "What an exciting day.",
            blockType: "BlockParagraph",
            edit: false,
            layout: [
              {
                name: 'pad',
                value: 'none'
              },
              {
                name: 'size',
                value: 'auto'
              },
              {
                name: 'flex',
                value: 'false'
              }
            ],
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
