import webpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import webpackConfig from '../webpack.config';
import config from '../src/config';

const options = {
  contentBase: './dist',
  publicPath: '/',
  hot: true,
  historyApiFallback: true,
  host: 'localhost',
  open: true,
  overlay: true,
};

webpackDevServer.addDevServerEntrypoints(webpackConfig, options);
const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler, options);

server.listen(config.port, 'localhost', () => {
  // eslint-disable-next-line no-console
  console.log(`dev server listening on port ${config.port}`);
});
