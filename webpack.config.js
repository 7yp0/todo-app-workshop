const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const packageJson = require('./package.json');

const srcPath = path.resolve(__dirname, './src');
const distPath = path.resolve(__dirname, './dist');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: ['babel-polyfill', `${srcPath}/index.js`],
  mode: 'development',
  output: {
    path: distPath,
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new Dotenv({
      safe: true,
      systemvars: true,
      silent: true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: './views/index.pug',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  {
                    targets: {
                      browsers: packageJson.browserslist,
                    },
                  },
                ],
                'stage-2',
                'react',
                'flow',
              ],
              plugins: [
                'transform-decorators-legacy',
                [
                  'babel-plugin-styled-components',
                  {
                    ssr: true,
                    displayName: true,
                  },
                ],
                [
                  'styled-components',
                  {
                    ssr: true,
                    minify: true,
                    displayName: true,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader?pretty&exports=false'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
