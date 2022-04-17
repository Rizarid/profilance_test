const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isDev = process.env.NODE_ENV === 'development';

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all' 
    }
  }

  if (!isDev) {
    config.minimizer = [
      new OptimizeCSSAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  
  return config
}

const cssLoaders = (extra) => {
  const loaders = [
    MiniCSSExtractPlugin.loader,
    'css-loader',
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [require('autoprefixer')],
        },
      },
    },
    ...extra
  ]

  return loaders
}

const babelLoader = (preset) => {
  const loaders = {
    loader: 'babel-loader',
    options: { presets: ['@babel/preset-env', ...preset] }  
  };

  return [loaders]
}

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: ['@babel/polyfill', './index.tsx'],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@static': path.resolve(__dirname, 'src/static'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    }
  },

  devtool: isDev ? 'source-map' : '',

  optimization: optimization(),

  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './static/index.html',
      minify: {
        collapseWhitespace: !isDev
      }
    }),
    new MiniCSSExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    autoprefixer,
  ],

  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: babelLoader([])
      },
      {
        test: /\.jsx/,
        exclude: /node_modules/,
        use: babelLoader(['@babel/preset-react'])
      },
      {
        test: /\.css$/,
        use: cssLoaders([])
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders(['sass-loader'])
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|ept)$/,
        use: ['file-loader']
      },
    ]
  },

  devServer: {
    port: 3000,
    hot: isDev
  }
}