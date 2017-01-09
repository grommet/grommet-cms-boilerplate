// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import path from 'path';

export default {
  base: '.',
  publicPath: '',
  dist: path.resolve(__dirname, 'dist/'),
  copyAssets: [
    'src/index.html',
    'src/robots.txt',
    {
      asset: 'src/img/**',
      dist: 'dist/img/'
    },
    {
      asset: 'node_modules/grommet/*.min.js',
      dist: 'dist/assets/latest/'
    },
    {
      asset: 'node_modules/grommet/*.min.css',
      dist: 'dist/assets/latest/css/'
    },
    {
      asset: 'node_modules/grommet/img/**',
      dist: 'dist/img/'
    },
    {
      asset: 'src/video/**',
      dist: 'dist/video/'
    }
  ],
  scssAssets: ['src/scss/**/*.scss'],
  jsAssets: ['src/**/*.js'],
  mainJs: 'src/index.js',
  mainScss: 'src/scss/index.scss',
  webpack: {
    resolve: {
      root: [
        path.resolve(__dirname, './node_modules'),
        path.resolve(__dirname, './src')
      ]
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          include: /node_modules\/hpe-digitaltoolkit/
        },
        {
          test: /\.svg$/,
          loader: 'url-loader?limit=10000'
        }
      ]
    }
  },
  scssLoader: {
    test: /\.scss$/,
    loader: "file?name=assets/css/[name].css!sass?" +
      'includePaths[]=' +
      (encodeURIComponent(
        path.resolve(process.cwd(), './node_modules')
      )) +
      '&includePaths[]=' +
      (encodeURIComponent(
        path.resolve(process.cwd(),
        './node_modules/grommet/node_modules'))
      )
  },
  devServerPort: 8003,
  //devServerHost: "10.0.0.1",
  devServerProxy: {
    "/uploads/media/*": 'http://localhost:8000',
    "/api/image/*": 'http://localhost:8000'
  },
  scsslint: true,
  hot: true,
  inline: true,
  alias: {
    'grommet/scss': path.resolve(__dirname, '../grommet/src/scss'),
    'grommet': path.resolve(__dirname, '../grommet/src/js')
  },
  devPreprocess: [
    'set-webpack-alias'
  ],
  distPreprocess: [
    'set-webpack-alias'
  ]
};
