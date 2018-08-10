import webpack from 'webpack'
import cssnano from 'cssnano'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from '../config'
import _debug from 'debug'

const debug = _debug('app:webpack:config');
const paths = config.utils_paths;
const {__DEV__, __PROD__} = config.globals;

debug('Create configuration.');
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    root: paths.client(),
    extensions: ['', '.js', '.jsx', '.json']
  },
  watch: true,
  progress: true,
  colors: true,
  watchOptions:{
	poll:1000,//监测修改的时间(ms)
	aggregeateTimeout:500, //防止重复按键，500毫米内算按键一次
	ignored:/node_modules/,//不监测
  },
  module: {}
};

// ------------------------------------
// 入口
// ------------------------------------
const APP_ENTRY_PATHS = [
  'babel-polyfill',
  paths.client(config.dir_page,'client.js')
];

webpackConfig.entry = {
  app: __DEV__
    ? APP_ENTRY_PATHS.concat(`webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`)
    : APP_ENTRY_PATHS,
  vendor: config.compiler_vendor
};

// ------------------------------------
// 输出配置
// ------------------------------------
webpackConfig.output = {
  filename: `[name].[${config.compiler_hash_type}].js`,
  path: paths.dist(),
  publicPath: config.compiler_public_path
};

// ------------------------------------
// 插件
// ------------------------------------
/*
CommonsChunkPlugin 插件
是一个可选的用于建立一个独立文件(又称作 chunk)的功能，这个文件包括多个入口 chunk 的公共模块。
通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存起来到缓存中供后续使用。
这个带来速度上的提升，因为浏览器会迅速将公共的代码从缓存中取出来，
而不是每次访问一个新页面时，再去加载一个更大的文件。
*/
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new webpack.optimize.CommonsChunkPlugin({
    names: ["app", "vendor"],
    minChunks: Infinity
  }),
  new HtmlWebpackPlugin({
    template: paths.client(config.compiler_html_production_filename),
    hash: false,
    filename: config.compiler_html_filename,
    inject: 'body',
    minify: {
	  //minify 的作用是对 html 文件进行压缩，minify 的属性值是一个压缩选项或者 false 。
	  //removeAttributeQuotes: true // 移除属性的引号
      collapseWhitespace: true   // 移除空白
    }
  })
];

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(), //全局开启代码热替换
    new webpack.NoErrorsPlugin()              //跳过编译时出错的代码并记录,使编译后运行时的包不会发生错误
  )
} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(), //根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小
    new webpack.optimize.DedupePlugin(), //打包的时候删除重复或者相似的文件
    new webpack.optimize.UglifyJsPlugin({   //压缩js
      mangle: false,
      comments: false,    // remove all comments
      compress: {         // compress
        unused: true,
        dead_code: true,
        screw_ie8: true,
        warnings: false
      },
      sourceMap: false
    })
  )
}

// ------------------------------------
// Pre-Loaders
// ------------------------------------
/*
 [ NOTE ]
 We no longer use eslint-loader due to it severely impacting build
 times for larger projects. `npm run lint` still exists to aid in
 deploy processes (such as with CI), and it's recommended that you
 use a linting plugin for your IDE in place of this loader.

 If you do wish to continue using the loader, you can uncomment
 the code below and run `npm i --save-dev eslint-loader`. This code
 will be removed in a future release.

 webpackConfig.module.preLoaders = [{
 test: /\.(js|jsx)$/,
 loader: 'eslint',
 exclude: /node_modules/
 }]

 webpackConfig.eslint = {
 configFile: paths.base('.eslintrc'),
 emitWarning: __DEV__
 }
 */

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      cacheDirectory: true,
      plugins: ['transform-decorators-legacy','transform-runtime',["import", {libraryName: "antd", style: "css"}]],
      presets: ['es2015', 'react', 'stage-0']
    }
  }, {
    test: /\.json$/,
    loader: 'json'
  }
];

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader 不重复最小化.
const BASE_CSS_LOADER = 'css?sourceMap&-minimize!autoprefixer-loader?{browsers:["last 2 version","Firefox 15"]}!sass-loader?outputStyle=expanded';

// Add any packge names here whose styles need to be treated as CSS modules.
// These paths will be combined into a single regex.
const PATHS_TO_TREAT_AS_CSS_MODULES = [
  // 'react-toolbox', (example)
];

// If config has CSS modules enabled, treat this project's styles as CSS modules.
if (config.compiler_css_modules) {
  PATHS_TO_TREAT_AS_CSS_MODULES.push(
    paths.client().replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&') // eslint-disable-line
  )
}

const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length;
const cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`);

// Loaders for styles that need to be treated as CSS modules.
if (isUsingCSSModules) {
  const cssModulesLoader = [
    BASE_CSS_LOADER,
    'modules',
    'importLoaders=1',
    'localIdentName=[name]__[local]___[hash:base64:5]'
  ].join('&');

  webpackConfig.module.loaders.push({
    test: /\.scss$/,
    include: cssModulesRegex,
    loaders: [
      'style',
      cssModulesLoader,
      'postcss',
      'sass?sourceMap'
    ]
  });

  webpackConfig.module.loaders.push({
    test: /\.css$/,
    include: cssModulesRegex,
    loaders: [
      'style',
      cssModulesLoader,
      'postcss'
    ]
  })
}

// Loaders for files that should not be treated as CSS modules.
const excludeCSSModules = isUsingCSSModules ? cssModulesRegex : false
webpackConfig.module.loaders.push({
  test: /\.scss$/,
  exclude: excludeCSSModules,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss',
    'sass?sourceMap'
  ]
});
webpackConfig.module.loaders.push({
  test: /\.css$/,
  exclude: excludeCSSModules,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss'
  ]
});

// ------------------------------------
// Style Configuration
// ------------------------------------
webpackConfig.sassLoader = {
  includePaths: paths.client('styles')
};

webpackConfig.postcss = [
  cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  })
];

// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
);
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.');
  webpackConfig.module.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const [first, ...rest] = loader.loaders;
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
    Reflect.deleteProperty(loader, 'loaders')
  });

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    })
  )
}

// SERVER RENDER
let webpackConfigs;
webpackConfigs = webpackConfig;
export default webpackConfigs
