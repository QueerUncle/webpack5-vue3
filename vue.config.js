/*
  @Author: lize
  @Date: 2021/4/16
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/4/16
 */
LIZE = 'webpack5-vue';
module.exports = {
    pages: {
        'index-index': {
            entry: '../src/pages/index/index/main.ts',
            template: '../src/pages/index/index/index.html',
            fileName: 'index-index.html',
            title: 'index-index',
        },
        'test-index': {
            entry: '../src/pages/test/index/main.ts',
            template: '../src/pages/test/index/index.html',
            fileName: 'test-index.html',
            title: 'test-index',
        },
    }
};
