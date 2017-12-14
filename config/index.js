/* eslint key-spacing:0 spaced-comment:0 */
import path from 'path'
import _debug from 'debug'
import { argv } from 'yargs'
import ip from 'ip'

const localip = ip.address();
const debug = _debug('app:config');
debug('Creating default configuration.');

// ========================================================
// 默认配置
// ========================================================
const config = {
  env : process.env.NODE_ENV || 'localhost',
  render : process.env.RENDER_TYPE || "client",
  
  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '..'),
  dir_client : 'resources',
  dir_dist   : 'dist',
  dir_server : 'server',
  dir_test   : 'tests',
  dir_page   : 'page',

  // ----------------------------------
  // 服务器配置
  // ----------------------------------
  //server_host : localip, // use string 'localhost' to prevent exposure on local network
  //server_port : process.env.PORT || 8080,
  server_host : 'localhost', // use string 'localhost' to prevent exposure on local network
  server_port : process.env.PORT || 8080,
  // ----------------------------------
  // 编译器配置
  // ----------------------------------
  compiler_html_filename   : 'index.html',
  compiler_html_production_filename   : 'index.html',
  compiler_production_path : 'C:/phpStudy7/WWW/dist',
  compiler_css_modules     : true,
  compiler_devtool         : 'source-map',
  compiler_hash_type       : 'hash',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : 'dist/',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },
  compiler_vendor : [
    // base modules
    'react',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
    'redux-thunk',

    // lib3rd modules
    'classnames',
    'react-cookie',  // cookie 操作工具
    'object-assign'  // babel解析成ES5的时候不兼容，使用这个插件处理
  ],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_reporters : [
    { type : 'text-summary' },
    { type : 'lcov', dir : 'coverage' }
  ]
};

// ------------------------------------
// 环境变量
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__DEBUG__'    : config.env === 'development' && !argv.no_debug,
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
};

// ------------------------------------
// 验证Vendor的依赖性 是否都有安装
// ------------------------------------
const pkg = require('../package.json');

config.compiler_vendor = config.compiler_vendor
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true;

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from vendor_dependencies in ~/config/index.js`
    )
  });

// ------------------------------------
// 公共配置 
// ------------------------------------
const resolve = path.resolve;
const base = (...args) =>
  Reflect.apply(resolve, null, [config.path_base, ...args]);

config.utils_paths = {
  base   : base,
  client : base.bind(null, config.dir_client),
  dist   : base.bind(null, config.dir_dist)
};

// ========================================================
// 引入 环境配置
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`);
const environments = require('./environments').default;
const overrides = environments[config.env];
if (overrides) {
  debug('Found overrides, applying to default configuration.');
  Object.assign(config, overrides(config))
} else {
  debug('No environment overrides found, defaults will be used.')
}

export default config
