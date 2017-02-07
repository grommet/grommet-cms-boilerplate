import File from '../models/File';
import colors from 'colors/safe';
import path from 'path';
import fs from 'fs';
import walk from 'walk';
import { unslugify } from './slugify';

const shouldMigrateFiles = true;

function createAsset(name) {
  const fileName = name.split('.')[0].split('_').join('-');
  return {
    title: unslugify(fileName),
    path: `/uploads/media/2017/2/${name}`
  };
}

function moveFile(name, oldPath) {
  return new Promise((res, rej) => {
    const newPath = path.join(__dirname, '..', '..', './uploads/media/2017/2', name);
    fs.readFile(oldPath, (err, data) => {
      fs.writeFile(newPath, data, (err) => {
        if (err) {
          rej(err);
        }
        res(`Successfully uploaded file from path: ${oldPath} to path: ${newPath}`);
      });
    });
  });
}

function loadFilesRecursively(inputFilePath) {
  return new Promise((res, rej) => {
    let files = [];
    const walker = walk.walk(inputFilePath, { followLinks: false });
    walker.on('file', (root, fileStat, next) => {
      const { name } = fileStat;
      const re = new RegExp('(jpe?g|png|gif|svg)$');
      if (re.test(name) && shouldMigrateFiles) {
        const file = createAsset(name);
        files.push(file);
        const oldFilePath = path.join(root, name);
        moveFile(name, oldFilePath).then((message) => {
          console.log(colors.green(message));
          next();
        });
      } else {
        next();
      }
    });
    walker.on('error', () => console.error(`Error ${error}`));
    walker.on('end', () => res(files));
  });
}

export default function buildFileCollection() {
  File.find().exec(function(err, doc) {
    if (err) console.log(colors.red('error: ', err));

    if (doc.length === 0) {
      const filePath = path.join(__dirname, '..', './assets');
      loadFilesRecursively(filePath).then((files) => {
        console.log(colors.green('Began creating file collection'));
        File.create(
          files, 
          function(err, small) {
            if (err) 
              console.log(colors.red('error creating File collection', err));
            console.log(colors.green(`Created File collection`));
          }
        );
      });
    }
  });
};
