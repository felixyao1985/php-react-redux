//根据执行环境定义配置重写。
export default {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  // NOTE: In development, we use an explicit public path when the assets
  // are served webpack by to fix this issue:
  // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
  development: (config) => ({
    compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
    gzip : {
      enabled: true,
      threshold: '100kb'
    },
    proxy: {
      enabled: false,
      options: {
        host: 'http://localhost:8080',
        match: /^\/api\/.*/
      }
    }
  }),
  localhost: (config) => ({
    compiler_public_path: '',
    gzip : {
      enabled: true,
      threshold: '100kb'
    }
  }),
  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: (config) => ({
    compiler_html_filename: 'index.tpl',
    compiler_html_production_filename: 'production.html',
    compiler_public_path: '/assessment/tpl_thumb/dayreport/dist/',
    compiler_fail_on_warning: false,
    compiler_hash_type: 'chunkhash',
    compiler_devtool: null,
    compiler_stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    },
    gzip : {
      enabled: true,
      threshold: '100kb'
    }
  })
}
