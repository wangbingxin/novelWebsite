'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_DOMAIN: '"yueloo.com.cn"',
  BASE_CHINESE_NAME: '"阅路小说"'
})
