module.exports = {/*导出配置*/
  configureWebpack: {/*webpack配置信息*/
    resolve: {//解析
      extensions: [],
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}