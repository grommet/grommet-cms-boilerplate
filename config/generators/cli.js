const componentGenerator = require('./component/index.js');
const SafeString = require('./utils/safeString').SafeString;
const containerGenerator = require('./container/index.js');

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.addHelper('uppercase', (text) => {
    return text.toUpperCase();
  });
  plop.addHelper('getPath', (p) => {
    const pathParts = p.split('/');
    const index = pathParts.indexOf('containers');
    const newPath = pathParts.slice(index + 1, pathParts.length);
    return [newPath.join('/')].map(i => `./${i}`)[0];
  });
  plop.addHelper('createImports', (list) => {
    const items = list.map((item) => `import ${item} from 'grommet/components/${item}';`).join('\n');
    return new SafeString(items);
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
