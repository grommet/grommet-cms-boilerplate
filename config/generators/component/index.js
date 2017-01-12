const path = require('path');

module.exports = {
  description: 'Generate a component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: 'Stateless Function',
      choices: () => ['ES6 Class', 'Stateless Function']
    },
    {
      type: 'input',
      name: 'path',
      message: 'What directory would you like your component in? (relative)',
      default: './src/js/components',
      validate: (value) => {
        return true;
      }
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the component?',
      default: 'Button',
      validate: (value) => {
        if ((/.+/).test(value)) {
          return true;
        }
        return 'The name is required.';
      }
    },
    {
      type: 'checkbox',
      name: 'imports',
      message: 'Would you like to import any commonly used grommet components?',
      choices: () => [
        { name: 'Anchor', value: 'Anchor', checked: false },
        { name: 'Article', value: 'Article', checked: false },
        { name: 'Button', value: 'Button', checked: false },
        { name: 'Card', value: 'Card', checked: false },
        { name: 'Heading', value: 'Heading', checked: false },
        { name: 'Header', value: 'Header', checked: false },
        { name: 'Footer', value: 'Footer', checked: false },
        { name: 'Paragraph', value: 'Paragraph', checked: false },
        { name: 'Section', value: 'Section', checked: false }
      ]
    },
    {
      type: 'confirm',
      name: 'wantPropTypes',
      default: true,
      message: 'Should the component have PropTypes?'
    },
    {
      type: 'confirm',
      name: 'wantFlowTypes',
      default: false,
      message: 'Should the component have FlowTypes?'
    },
    {
      type: 'confirm',
      name: 'wantJestTests',
      default: true,
      message: 'Should the component have an accompanying jest test file?'
    }
  ],
  actions: (data) => {
    const componentPath = path.resolve(process.cwd(), `${data.path}/{{properCase name}}/`);
    const actions = [{
      type: 'add',
      path: `${componentPath}/index.jsx`,
      templateFile: data.type === 'ES6 Class' ?
        './component/es6class.js.hbs' : './component/stateless.js.hbs',
      abortOnFail: true
    }];
    if (data.wantJestTests) {
      actions.push({
        type: 'add',
        path: `${componentPath}/tests/index.test.js`,
        templateFile: './component/test.js.hbs',
        abortOnFail: true
      });
    }
    return actions;
  }
};
