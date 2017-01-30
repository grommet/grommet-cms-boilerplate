import PostModels from '../models/Post';
import colors from 'colors/safe';

const POSTS = {
  OurBrand: [
    {
      _type: 'our-brand',
      author: 'John Doe',
      title: 'Hello World - Our Brand',
      subtitle: "Blog Post",
      slug: 'my-first-post-our-brand',
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
          id: 'the-rise-of-common-sense-analytics-our-brand',
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
  ],
  ApplyingTheBrand: [
    {
      _type: 'applying-the-brand',
      author: 'John Doe',
      title: 'Hello World - Applying the Brand',
      subtitle: "Blog Post",
      slug: 'my-first-post-applying-the-brand',
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
  ],
  BrandElements: [
    {
      _type: 'brand-elements',
      author: 'John Doe',
      title: 'Hello World - Brand Elements',
      subtitle: "Blog Post",
      slug: 'my-first-post-brand-elements',
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
  ]
};

export default function buildPostCollection() {
  Object.keys(PostModels).forEach((key) => {
    if (key !== 'Post') {
      const Model = PostModels[key];
      Model.find().exec(function(err, doc) {
        if (err) console.log(colors.red('error: ', err));

        if (doc.length === 0) {
          Model.collection.insert(
            POSTS[key], 
            function(err, small) {
              if (err) 
                console.log(colors.red('error creating Post collection', err));
              console.log(colors.green(`Created ${Model} collection`));
            }
          );
        }
      });
    }
  });
};
