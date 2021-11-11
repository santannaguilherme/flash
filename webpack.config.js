
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const inlineLimit = 4096

const plugins = [
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'public/index.html'),
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: 'public',
        to: 'dist',
        toType: 'dir',
        globOptions: {
          ignore: ['.DS_Store'],
        },
      },
    ],
  }),
]


  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin(),
  )


module.exports = {
  mode:'development',
  entry: {
    'single-spa.config': './single-spa.config.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            
          },
        ],
      },
      {
        test: /\.js(x?)$/,
        exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'temp')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: 'img/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: inlineLimit,
          // use explicit fallback to avoid regression in url-loader>=1.1.0
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]',
            },
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: inlineLimit,
          // use explicit fallback to avoid regression in url-loader>=1.1.0
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]',
            },
          },
        },
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  plugins,
  devtool:  'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
}
