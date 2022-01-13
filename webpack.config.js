const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const base = {
  entry: {
    'adopt-a-pup': ['app.ts'],
  },
  context: path.resolve(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      scriptLoading: 'defer',
    }),
    new CopyPlugin({
      patterns: [{ from: 'media', to: 'media' }],
      options: {
        concurrency: 100,
      },
    }),
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.ts', '.js', 'scss'],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

const sassLoader = {
  loader: 'sass-loader',
  options: {
    // Prefer Dart Sass
    implementation: require('sass'),

    // See https://github.com/webpack-contrib/sass-loader/issues/804
    webpackImporter: false,
    sassOptions: {
      includePaths: ['./node_modules'],
    },
  },
};

const prod = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          sassLoader,
        ],
      },
    ],
  },
  output: {
    publicPath: '/',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css',
      chunkFilename: 'css/[id].[chunkhash:8].css',
    }),
  ],
};

const dev = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, sassLoader],
      },
    ],
  },
  output: {
    publicPath: 'http://localhost:8080/',
  },
  stats: {
    colors: true,
  },
  devServer: {
    client: {
      logging: 'info',
    },
    compress: true,
    port: 8080,
  },
  devtool: 'inline-source-map',
};

module.exports = (env) => merge(base, env && env.production ? prod : dev);
