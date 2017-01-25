# Grommet CMS

This is the source code for the Grommet CMS boilerplate.
To run this application, execute the following commands:

  1. Install NPM modules

  ```bash
  $ npm install
  ```

  2. Add .env file. The project comes with a .env.example file which can be renamed to .env. These are your enviroment variables.

  3. Ensure Mongo is running. Upon starting the server the application will automatically build a hello world post and a temporary dashboard user.

  4. To start the server run:

  ```bash
  $ npm run build
  $ npm start
  ```

  5. To start the development server:

  ```bash
  $ npm run dev
  ```

  6. To create the website distribution bundle:

  ```bash
  $ npm run dist
  ```

## Generators
The projects contains built in code generation tools for easy project scaffolding.

### Run the generator

To run the generators with a list of generators, run
```
npm run generator
```

Follow the on screen prompts to select the options you wish to use.

For convenience, you can bypass the initial selection and scaffold out containers, components and pages by running

```
npm run generate:<type_of_component>
```

where <type_of_component> is one of: component, container or page.

### Generator Options

- Container `npm run generate:container`
  - Name: the name of the container, i.e. `Dashboard`
  - Connected / Not connected ES6 Class containers (higher order)
  - SCSS Modules
  - [Styled Components](https://github.com/styled-components/styled-components)
  - Reducers, actions and constants
  - GraphQL: The generator can add collocated queries and mutations using GraphQL / ApolloClient.  Accept the option to use this feature.
  - Tests for all of the above
  - README.md file that documents the container
- Component `npm run generate:component`
  - Select the type of component: Stateless functional components (recommended) / ES6 Class
  - What directory would you like your component in? (relative), defaults to `./src/js/components`
  - What is the name of the component?, i.e. `Post`
  - Would you like to import any commonly used grommet components? Multiple choice list of commonly used components.
  - Should the component have regular React PropTypes? Defaults to Yes.
  - Should the component have Flow Types instead of or along with PropTypes? Defaults to Yes.
  - Test: Should the component have an accompanying jest test file? Defaults to No.

### **Gotchas**
In order to get the import / export to work, the generator does some pattern matching of the comments in the files to place the new imports.  Just don't delete any comment that is prefixed with `GENERATOR` and things will work great. See below for an example.
