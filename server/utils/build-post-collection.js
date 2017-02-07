import PostModels from '../models/Post';
import colors from 'colors/safe';
import fs from 'fs';
import path from 'path';
import { slugify } from './slugify';

function typeFromName(name) {
  switch (name) {
    case 'Landing Page':
      return 'home';
    case 'Applying The Brand':
      return 'applying-the-brand';
    case 'Brand Elements':
      return 'brand-elements';
    case 'Our Brand':
      return 'our-brand';
    default: return '';
  }
}

function generateAssetMap() {
  return new Promise((res, rej) => {
    let posts = {};
    const assetFolder = path.join(__dirname, '..', './assets');
    fs.readdir(assetFolder, (err, assets) => {
      assets.forEach((asset, outerIndex) => {
        const key = asset.split(' ').join('');
        posts[`${key}`] = [];
        fs.readdir(`${assetFolder}/${asset}`, (err, innerAssets) => {
          innerAssets.forEach((innerAsset, innerIndex) => {
            if (asset !== 'Brand Corner') {
              const type = typeFromName(asset);
              const author = 'Admin User';
              const title = innerAsset;
              const subtitle = '';
              const slug = slugify(innerAsset);
              const date = new Date();
              const post = {
                __type: type,
                author,
                title,
                subtitle,
                slug,
                date,
                sections: [
                  {
                    name: `${innerAsset} Heading`,
                    id: `${slug}-heading`,
                    order: 0,
                    layout: [],
                    contentBlocks: []
                  }
                ]
              };
              posts[`${key}`][innerIndex] = post;
              if (innerIndex === innerAssets.length - 1) {
                if (outerIndex === assets.length - 1) {
                  res(posts);
                }
              }
            }
          });
        });
      });
    });
  });
}

export default function buildPostCollection() {
  generateAssetMap()
  .then(posts => {
    Object.keys(PostModels).forEach((key) => {
      if (key !== 'Post') {
        const Model = PostModels[key];
        Model.find().exec(function(err, doc) {
          if (err) console.log(colors.red('error: ', err));

          if (doc.length === 0) {
            Model.create(
              posts[key],
              function(err, small) {
                if (err) 
                  console.log(colors.red('error creating Post collection', err));
                console.log(colors.green(`Created ${key} collection`));
              }
            );
          }
        });
      }
    });
  });
};
