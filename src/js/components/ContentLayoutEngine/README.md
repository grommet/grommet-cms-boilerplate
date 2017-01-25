## ContentLayoutEngine Component
A higher order component that wraps sections and content blocks with layout options.

### Example

```js
<ContentLayoutEngine
  layout={this.props.layout}
  blocks={this.props.blocks} // raw blocks
>
  {blocks.map((item) =>
    <ContentBlock item={item} />
  )}
</ContentLayoutEngine>
```

### Props

Flow types

```
type LayoutType = {
  name: string,
  value: string
};

export type LayoutProps = {
  children: Array<React$Element<any>>,
  layout: Array<LayoutType>,
  blocks: Array<ContentBlockType>
};
```

### Other Information
Children are the mapped content blocks, where as the blocks are the raw contentBlocks, which contain the layout property.

Example Post object with layout options for sections / content blocks.  This is what would
```
const posts = [
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
```