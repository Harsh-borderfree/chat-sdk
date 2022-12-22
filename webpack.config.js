const path = require('path')
const pkg = require('./package.json')
const libraryName = pkg.name
var nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    BfreeChat: './src/index',
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
    library: libraryName,
    libraryTarget: 'umd',
    libraryExport: 'default',
    publicPath: '/dist/',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    symlinks: false,
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
  node: {
    fs: 'empty',
    __dirname: true,
  },
  module: {
    rules: [
      {
        // Transpile ES2015 (aka ES6) to ES5. Accept the JSX syntax by React
        // as well.

        loader: 'babel-loader',
        options: {
          // Avoid loading babel.config.js, since we only use it for React Native.
          configFile: false,

          // XXX The require.resolve bellow solves failures to locate the
          // presets when lib-jitsi-meet, for example, is npm linked in
          // jitsi-meet.
          plugins: [require.resolve('@babel/plugin-proposal-export-default-from')],
          presets: [
            [
              require.resolve('@babel/preset-env'),

              // Tell babel to avoid compiling imports into CommonJS
              // so that webpack may do tree shaking.
              {
                modules: false,

                // Specify our target browsers so no transpiling is
                // done unnecessarily. For browsers not specified
                // here, the ES2015+ profile will be used.
                targets: {
                  chrome: 80,
                  electron: 10,
                  firefox: 68,
                  safari: 14,
                },
              },
            ],
            require.resolve('@babel/preset-flow'),
            require.resolve('@babel/preset-react'),
          ],
        },
        test: /\.jsx?$/,
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: { compact: false },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 512000000,
              name: 'svg/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|jpg|png|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              limit: 512000000,
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000000,
    maxAssetSize: 512000000,
  },

  externals: [
    {
      'react': {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React',
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM',
      },
    },
    nodeExternals(),
  ],
}
